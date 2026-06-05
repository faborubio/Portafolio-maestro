// Genera los iconos del PWA (F sobre fondo navy) desde public/logo-f.png.
// Uso: node scripts/generate-pwa-icons.mjs
import sharp from 'sharp'

const SRC = 'public/logo-f.png'
const BG = { r: 10, g: 18, b: 33, alpha: 1 } // #0a1221

const make = async (size, out, ratio = 0.62) => {
  const logo = await sharp(SRC)
    .resize({ height: Math.round(size * ratio), fit: 'inside' })
    .toBuffer()
  await sharp({ create: { width: size, height: size, channels: 4, background: BG } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(out)
  console.log('✓', out)
}

await make(192, 'public/pwa-192x192.png')
await make(512, 'public/pwa-512x512.png')
await make(180, 'public/apple-touch-icon.png')
