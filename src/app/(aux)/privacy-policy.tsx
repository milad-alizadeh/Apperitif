import { SimplePage } from '~/components'
import { useAppContent } from '~/providers'

export default function PrivacyPolicyScreen() {
  const { privacy_policy } = useAppContent()
  const pageContent = privacy_policy ?? { title: '', content: '' }

  return pageContent && <SimplePage title={pageContent.title} content={pageContent.content} />
}
