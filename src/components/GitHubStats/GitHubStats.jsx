import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './GitHubStats.scss'

const USER = 'faborubio'
const CACHE_KEY = 'gh_stats_v1'

const GitHubStats = () => {
  const { t } = useTranslation()
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(CACHE_KEY)) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (data) return
    let alive = true
    ;(async () => {
      try {
        const [u, repos] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`).then((r) => (r.ok ? r.json() : null)),
          fetch(`https://api.github.com/users/${USER}/repos?sort=pushed&per_page=1`).then((r) =>
            r.ok ? r.json() : []
          ),
        ])
        if (!u || !alive) return
        const next = {
          repos: u.public_repos,
          followers: u.followers,
          url: u.html_url,
          latest: repos?.[0] ? { name: repos[0].name, url: repos[0].html_url } : null,
        }
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(next))
        if (alive) setData(next)
      } catch {
        /* silencioso: si falla, el widget simplemente no se muestra */
      }
    })()
    return () => {
      alive = false
    }
  }, [data])

  if (!data) return null

  return (
    <div className="gh-stats">
      <a className="gh-stats__profile" href={data.url} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} />
        <span className="gh-stats__live" aria-hidden="true" />
      </a>
      <span className="gh-stats__item">
        <b>{data.repos}</b> {t('portfolio.gh.repos')}
      </span>
      <span className="gh-stats__sep">·</span>
      <span className="gh-stats__item">
        <b>{data.followers}</b> {t('portfolio.gh.followers')}
      </span>
      {data.latest && (
        <>
          <span className="gh-stats__sep">·</span>
          <span className="gh-stats__item">
            {t('portfolio.gh.latest')}:{' '}
            <a href={data.latest.url} target="_blank" rel="noreferrer" className="gh-stats__repo">
              {data.latest.name}
            </a>
          </span>
        </>
      )}
    </div>
  )
}

export default GitHubStats
