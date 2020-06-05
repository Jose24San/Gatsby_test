import React from 'react'
import Typography from '@material-ui/core/Typography'
import PageWidth from './PageWidth'
import { colors } from '../../styles/theme'

const styles = {
  container: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: colors.black,
  },
  text: {
    color: '#fff',
  }
}

const Footer = () => {
  return (
    <div style={ styles.container }>
      <PageWidth>
        <Typography variant="body1" style={ styles.text }>
          Copyright 2020 Fitomation, All Rights Reserved
        </Typography>
      </PageWidth>
    </div>

  )
}

export default Footer
