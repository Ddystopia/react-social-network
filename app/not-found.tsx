import React from 'react'
import classNames from '/styles/NotFoundPage.module.css'

const NotFoundPage: React.FC = () => {
  return (
    <section className={classNames.container}>
      <h1>404</h1>
      <h2>Not found</h2>
    </section>
  )
}
export default NotFoundPage
