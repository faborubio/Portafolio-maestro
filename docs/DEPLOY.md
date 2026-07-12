# DEPLOY.md — Cómo se pone en producción

> Se actualiza al cambiar el proceso de deploy.

## Resumen

- **Hosting:** Firebase Hosting, proyecto `fabian-portafolio`, sirve la carpeta `dist/`.
- **Backend:** Cloud Function `sendcontactemail` (us-central1) detrás del rewrite
  `/api/send` definido en [firebase.json](../firebase.json).
- **CLI:** `firebase-tools` no está instalada global en esta máquina; se invoca con `npx`.

## Deploy del front (el caso común)

```bash
npm run build
npx firebase-tools deploy --only hosting
```

Verificación post-deploy: abrir https://faborubio.dev — el SW del PWA está en
`autoUpdate` y `sw.js`/`manifest.webmanifest` se sirven sin caché (headers en
`firebase.json`), así que la nueva versión llega sola; puede requerir una recarga.

## Deploy completo (front + función de contacto)

```bash
npm run build
npx firebase-tools deploy --only "hosting,functions:sendContactEmail"
```

> **Siempre filtrar por `functions:sendContactEmail`, nunca `--only functions` a secas.**
> El proyecto Firebase `fabian-portafolio` es compartido: aloja los sitios
> `atalaya-demo`, `atalaya-live`, `mojitos-landing` y `telar-tejido`, y la función
> `api` (us-central1) es el **backend vivo de telar** (desplegado desde el repo
> `ProyectosPortafolio/telar`, rewrite `/api/**` de `telar-tejido.web.app`).
> Un deploy sin filtro detecta `api` como "huérfana" y propone borrarla — hacerlo
> rompería la demo de telar.

Las credenciales de la función son secrets de Firebase (no van en el repo):

```bash
npx firebase-tools functions:secrets:set GMAIL_USER
npx firebase-tools functions:secrets:set GMAIL_PASS   # app password de Gmail
```

## Dominio propio: faborubio.dev (Namecheap)

Configurado el 2026-07-08. Registros en Namecheap → Advanced DNS:

| Tipo | Host | Valor |
|---|---|---|
| A | `@` | `199.36.158.100` |
| A | `www` | `199.36.158.100` |
| TXT | `@` | `hosting-site=fabian-portafolio` |

- El dominio se dio de alta en Firebase Console → Hosting → "Agregar dominio personalizado".
  No hay soporte de CLI para esto. **Ojo**: en el alta original solo quedó activo el apex;
  `www.faborubio.dev` hubo que agregarlo aparte (2026-07-12) como redirect al apex — si un
  subdominio sirve el cert de `firebaseapp.com`, es que no está agregado en Console.
- `.dev` es HTTPS-only (precarga HSTS): el sitio no carga hasta que Firebase emite el
  certificado (minutos a 24 h tras verificar el TXT).
- **Activo desde 2026-07-09**; las URLs públicas del repo ya apuntan a `faborubio.dev`.
  El dominio por defecto `fabian-portafolio.web.app` sigue sirviendo el mismo contenido.
- **Google Search Console**: propiedad de dominio `faborubio.dev` verificada vía TXT en
  Namecheap (no borrar ese registro), sitemap enviado. El TXT de Google convive con el
  de Firebase en el host `@`.

## Notas

- `vite.config.js` tiene comentada una `base: '/Portafolio-maestro/'` para GitHub Pages;
  **no** activarla mientras el hosting sea Firebase.
- `dist/` está gitignorada; el deploy siempre parte de un build fresco local.
