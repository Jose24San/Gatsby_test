


export const CONTACT_US_SUBMISSION = 'CONTACT_US_SUBMISSION';


export const contactUsSubmission = ( info: {
  name: string,
  email: string,
  message: string,
} ) => ( {
  type: CONTACT_US_SUBMISSION,
  payload: info,
} );


