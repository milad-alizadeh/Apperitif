import * as Updates from 'expo-updates'

let APP_VARIANT = 'development'

// let SUPABASE_URL = 'http://192.168.68.52:54321'
// let SUPABASE_ANON_KEY =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
let SENTRY_DSN =
  'https://ddd6990a76b5dbf8816a4292e0288dba@o4506057195585536.ingest.sentry.io/4506057201418241'
let SUPABASE_URL = 'https://hgdshmminhuzqfcevzfi.supabase.co'
let SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZHNobW1pbmh1enFmY2V2emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDQyODksImV4cCI6MjAxNjQyMDI4OX0.M4BUPdlgv8d1aXCtPOUSzW29Iz4TV2tSA-PDV-NdC6M'
let ANDROID_CLIENT_ID = '387765460024-17r8negv0lecu3vbubce39l7jkd3lepu.apps.googleusercontent.com'
let IOS_CLIENT_ID = '387765460024-2s3u3uvbn0aojjk34h1no81dsquv5saa.apps.googleusercontent.com'
let SENTRY_PROJECT = 'apperitif-staging'
let SENTRY_ORG = 'bubblewrap'
let MIXPANEL_API_KEY = '346afa9c1e93ad4c9d4adbbb895a9e0b'
let MIXPANEL_SERVER_URL = 'https://api-eu.mixpanel.com'
let PRIVACY_POLICY_URL = 'https://bubblewrap.ai/privacy-policy.html'
let END_USER_LICENCE_AGREEMENT_URL = 'https://bubblewrap.ai/end-user-licence-agreement.html'

if (Updates.channel === 'staging') {
  APP_VARIANT = 'staging'
  ANDROID_CLIENT_ID = '387765460024-s1t0op27cenve9qerh7dqbj7837o12gk.apps.googleusercontent.com'
  IOS_CLIENT_ID = '387765460024-n1rej4c8npbr7jcijr3b7tq25a8m93ci.apps.googleusercontent.com'
  SENTRY_DSN =
    'https://ddd6990a76b5dbf8816a4292e0288dba@o4506057195585536.ingest.sentry.io/4506057201418241'
  SENTRY_ORG = 'bubblewrap'
  SENTRY_PROJECT = 'apperitif-staging'
  SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZHNobW1pbmh1enFmY2V2emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDQyODksImV4cCI6MjAxNjQyMDI4OX0.M4BUPdlgv8d1aXCtPOUSzW29Iz4TV2tSA-PDV-NdC6M'
  SUPABASE_URL = 'https://hgdshmminhuzqfcevzfi.supabase.co'
  MIXPANEL_API_KEY = '346afa9c1e93ad4c9d4adbbb895a9e0b'
}

if (Updates.channel === 'production') {
  ANDROID_CLIENT_ID = '387765460024-cffpkqkda7vh56hbd72k8j2ce8bjna7v.apps.googleusercontent.com'
  IOS_CLIENT_ID = '387765460024-u00ludqbbapijlebphm3a36c4kpsq2a8.apps.googleusercontent.com'
  SENTRY_DSN =
    'https://7e6f18a1c3b107d00d654b86112f657e@o4506057195585536.ingest.sentry.io/4506057225601024'
  SENTRY_ORG = 'bubblewrap'
  SENTRY_PROJECT = 'apperitif'
  SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dGZzcHltenFzeWhtdmt6Z2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNjQ2MzksImV4cCI6MjAxMDY0MDYzOX0.2L62sBDhHRNDbNWGcWsT91EFoqyM6oXIbh_L8JupACk'
  SUPABASE_URL = 'https://kvtfspymzqsyhmvkzgej.supabase.co'
  MIXPANEL_API_KEY = '54ab0b5ebd1d63df14421059d145e622'
}

export {
  APP_VARIANT,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  MIXPANEL_API_KEY,
  MIXPANEL_SERVER_URL,
  PRIVACY_POLICY_URL,
  END_USER_LICENCE_AGREEMENT_URL,
}
