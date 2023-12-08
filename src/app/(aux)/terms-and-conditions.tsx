import { SimplePage } from '~/components'
import { useAppContent } from '~/providers'

export default function TermsAndConditionsScreen() {
  const { terms_and_conditions } = useAppContent()
  const pageContent = terms_and_conditions ?? { title: '', content: '' }

  return pageContent && <SimplePage title={pageContent.title} content={pageContent.content} />
}
