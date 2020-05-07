import React from 'react'
import PropTypes from 'prop-types'
import BaseLayout from './BaseLayout'
import HeroBanner from '../components/HeroBanner'
import PageWidth from '../components/PageWidth'


const SingleColumn = ( { children, title, subtitle, containerStyle, className } ) => {

  return (
    <BaseLayout>
      <HeroBanner title={ title } subtitle={ subtitle } />
      <PageWidth className={ className } containerStyle={ containerStyle }>
        { children }
      </PageWidth>
    </BaseLayout>
  )
}

SingleColumn.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  containerStyle: PropTypes.object,
  className: PropTypes.string,
}

export default SingleColumn

