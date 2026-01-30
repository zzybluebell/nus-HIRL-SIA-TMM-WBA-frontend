const isDevelopment = process.env.NODE_ENV === 'development'

const currentHost = window.location.host
const currentProtocol = window.location.protocol
const currentUrl = `${currentProtocol}//${currentHost}/`

export const isLocal = currentHost.includes('localhost')
export const isNUS = currentHost.includes('getwellnessbuddy')
const isUAT = currentHost.includes('wellnessbuddyuat')
const isDR = currentHost.includes('app')
const isProd = currentHost.includes('wellnessbuddy') && (!isUAT && !isDR);


export const baseURL = isDevelopment ? '/' : 'https://www.getwellnessbuddy.com/'

export const fitbitClientID = isNUS ? '23R8RL' : isProd ? '2382FM' : '23RP85'
// export const fitbitRedirectURI = 'https://www.getwellnessbuddy.com/onboarding'
// export const fitbitRedirectURI = 'http://localhost:3000/onboarding'
// export const fitbitRedirectURI = 'https://wellnessbuddyuat.sq.com.sg/onboarding'
export const fitbitRedirectURI = isDevelopment ? 'https://www.getwellnessbuddy.com/onboarding' : `${currentUrl}onboarding`

export const ssoURI = isUAT 
  ? 'https://sqauthuat.sq.com.sg/affwebservices/public/saml2sso?SPID=WellnessBuddyApp' : isDR ?
    'https://sqauthuat.sq.com.sg/affwebservices/public/saml2sso?SPID=WellnessBuddyAppDR'
  : 'https://sqauthprod.sq.com.sg/affwebservices/public/saml2sso?SPID=WellnessBuddyApp'
