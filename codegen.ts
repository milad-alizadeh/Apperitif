import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      [`https://hgdshmminhuzqfcevzfi.supabase.co/graphql/v1`]: {
        headers: {
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZHNobW1pbmh1enFmY2V2emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDQyODksImV4cCI6MjAxNjQyMDI4OX0.M4BUPdlgv8d1aXCtPOUSzW29Iz4TV2tSA-PDV-NdC6M',
        },
      },
    },
    './src/graphql/localState.graphql',
  ],
  documents: ['./src/**/!(*.d).{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
