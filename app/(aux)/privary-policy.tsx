import { useQuery } from '@apollo/client'
import { SimplePage } from '~/components'
import { GET_CONTENT } from '~/graphql/queries'

export default function PrivacyPolicy() {
  const { data } = useQuery(GET_CONTENT, {
    variables: { name: 'privacy-policy' },
  })

  const pageData = data.appContentCollection?.edges?.[0]?.node

  return (
    pageData && <SimplePage title={pageData.t}  />
  )
}
