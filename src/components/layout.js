import React from 'react'
import PropTypes from 'prop-types'
import HeroBanner from './HeroBanner'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './Header'
import './layout.css'

const Layout = ( { children } ) => {
  const data = useStaticQuery( graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  ` )

  return (
    <>
      <Header siteTitle={ data.site.siteMetadata.title }/>
      <HeroBanner />
      <div
        style={ {
          margin: '0 auto',
          maxWidth: 1008,
          padding: '1rem',
        } }
      >
        <main>{ children }</main>
        {/*<footer>*/}
        {/*  © { new Date().getFullYear() }, Built with*/}
        {/*  { ' ' }*/}
        {/*  <a href="https://www.gatsbyjs.org">Gatsby</a>*/}
        {/*</footer>*/}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
