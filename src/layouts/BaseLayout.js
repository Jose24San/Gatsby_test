import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '../styles/theme'
import Footer from '../components/Footer'
import Header from '../components/Header'

const BaseLayout = ( { children } ) => (
  <ThemeProvider theme={ theme }>
    <Header />
    { children }
    <Footer />
  </ThemeProvider>
)

BaseLayout.propTypes = {
  children: PropTypes.arrayOf( PropTypes.element )
}

export default BaseLayout
