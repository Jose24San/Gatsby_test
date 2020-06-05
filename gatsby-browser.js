/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import './src/styles/global.css'
export { default as wrapRootElement } from './src/redux/setup/ReduxWrapper'

