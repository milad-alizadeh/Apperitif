module.exports = {
  client: {
    service: {
      name: 'apperitif-graphql',
      url: `https://hgdshmminhuzqfcevzfi.supabase.co/graphql/v1`,
      headers: {
        apikey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZHNobW1pbmh1enFmY2V2emZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4NDQyODksImV4cCI6MjAxNjQyMDI4OX0.M4BUPdlgv8d1aXCtPOUSzW29Iz4TV2tSA-PDV-NdC6M',
      },
    },
    includes: ['src/graphql/**/*.{ts,tsx,js,jsx,graphql}'],
  },
}
