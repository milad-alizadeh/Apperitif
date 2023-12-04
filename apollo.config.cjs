const 

module.exports = {
  client: {
    service: {
      name: 'apperitif-graphql',
      url: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/graphql/v1`,
      headers: {
        apikey: `${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    },
    includes: ['src/graphql/**/*.{ts,tsx,js,jsx,graphql}'],
  },
}
