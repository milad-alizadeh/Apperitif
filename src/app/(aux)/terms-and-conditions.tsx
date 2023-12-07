import { SimplePage } from '~/components'
import { useStore } from '~/providers'

export default function TermsAndConditionsScreen() {
  const { appContent } = useStore()
  const pageContent = appContent?.terms_and_conditions ?? { title: '', content: '' }

  return pageContent && <SimplePage title={pageContent.title} content={pageContent.content} />
}
