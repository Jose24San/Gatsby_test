import React from 'react';
import PropTypes from 'prop-types'

const styles = {
  container: {
    width: '100%',
    maxWidth: 1008,
    margin: '0 auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
}

const PageWidth = ( { children, containerStyle, className } ) => (
  <div
    className={ className }
    style={ { ...styles.container, ...containerStyle } }
  >
    { children }
  </div>
)

PageWidth.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  containerStyle: PropTypes.object,
}

export default PageWidth
