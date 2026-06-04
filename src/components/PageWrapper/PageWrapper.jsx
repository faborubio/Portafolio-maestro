import './PageWrapper.scss'

const PageWrapper = ({ children, className = '', id = '' }) => {
  return (
    <section className={`page ${className}`} id={id}>
      {children}
    </section>
  )
}

export default PageWrapper
