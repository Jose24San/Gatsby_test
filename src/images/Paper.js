import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const Paper = ( { className, style } ) => {
  const data = useStaticQuery( graphql`
    query {
      placeholderImage: file(relativePath: { eq: "paper.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  ` )

  return (
    <Img
      style={ style }
      className={ className }
      fluid={ data.placeholderImage.childImageSharp.fluid }
    />
  )
}

Paper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Paper
