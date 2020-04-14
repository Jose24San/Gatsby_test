import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  primaryLightColor: '#484848',
  black: '#0e1012', // primary color
  primaryDarkColor: '#000',
  textGrey: '#738a94',


  greyBackground: '#E1E2E1',
  whiteBackground: '#F4F5F6',


  secondaryColor: '#009688',
  secondaryColorLight: '#52c7b8',
  secondaryColorDark: '#00675b',
}

export const theme = createMuiTheme( {
  palette: {
    primary: {
      main: colors.black
    },
    secondary: {
      main: colors.secondaryColor,
    }
  },
  // overrides: {
  //   MuiButton: {
  //
  //   },
  // }
} )





