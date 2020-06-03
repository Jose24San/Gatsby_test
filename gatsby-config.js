module.exports = {
  siteMetadata: {
    title: 'Fitomation',
    description: 'An application dedicated to using software to drive down the cost of personalized training',
    author: 'Fitomation',
  },
  plugins: [
    'gatsby-plugin-material-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${ __dirname }/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyDqocPOu_ZMLivtKW1xk1WdzrR29zZooA8',
          authDomain: 'fitness-tracker-a5204.firebaseapp.com',
          databaseURL: 'https://fitness-tracker-a5204.firebaseio.com',
          projectId: 'fitness-tracker-a5204',
          storageBucket: 'fitness-tracker-a5204.appspot.com',
          messagingSenderId: '791050351564',
          appId: '1:791050351564:web:27ddb808b18fa1d5eba369',
        }
      },
    }
    // {
    //   resolve: 'gatsby-plugin-typescript',
    //   options: {
    //     inTSX: true,
    //     jsxPragma: 'jsx',
    //     allExtensions: true,
    //   }
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
