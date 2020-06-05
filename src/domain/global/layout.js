import React from 'react'
import PropTypes from 'prop-types'
import HeroBanner from './HeroBanner'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../../styles/theme'

import Header from './Header'
import './layout.css'
import Footer from './Footer'

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: 1008,
    padding: '1rem',
  },
}

const Layout = ( { children, style } ) => {
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
    <ThemeProvider theme={ theme }>
      <Header siteTitle={ data.site.siteMetadata.title }/>
      <HeroBanner />
      <div style={ { ...styles.container, ...style } }>
        <main>{ children }</main>


        {/*<footer>*/}
        {/*  © { new Date().getFullYear() }, Built with*/}
        {/*  { ' ' }*/}
        {/*  <a href="https://www.gatsbyjs.org">Gatsby</a>*/}
        {/*</footer>*/}
      </div>
      <Footer />
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
}

export default Layout
