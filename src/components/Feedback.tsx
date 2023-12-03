import * as StoreReview from 'expo-store-review'
import { FC, useEffect, useRef, useState } from 'react'
import { useAnalytics } from '~/hooks'
import { Prompt, PromptProps, PromptRef } from './Prompt'
import { TextField } from './TextField'

export const Feedback: FC = () => {
  const { capture } = useAnalytics()
  const prompt = useRef<PromptRef>(null)
  const [comment, setComment] = useState('')
  const [currentStep, setCurrentStep] = useState('feedbackRequest')

  useEffect(() => {
    prompt.current?.show()
    capture('user_feedback:feedback_request')
  }, [])

  const steps: Record<string, PromptProps> = {
    feedbackRequest: {
      title: 'Happy with our app?',
      description: "We'd love to hear your thoughts! Your feedback helps us improve.",
      confirmText: 'Yes! 👍',
      cancelText: 'Not really 👎',
      async onConfirm() {
        prompt.current?.hide()
        capture('user_feedback:feedback_submit', { is_positive: true })

        // If the feedback is positive, ask for a store review
        if (await StoreReview.hasAction()) {
          StoreReview.requestReview()
          capture('user_feedback:store_review_request')
        }
      },
      onCancel() {
        console.log('cancel')
        capture('user_feedback:feedback_submit', { is_positive: false })

        // If the feedback is negative, ask for a comment
        setCurrentStep('commentRequest')
      },
      onDismiss() {
        capture('user_feedback:feedback_dismiss')
      },
    },
    commentRequest: {
      title: 'Could you tell us how we can improve?',
      description: 'We would love to hear your feedback',
      confirmText: 'Submit',
      cancelText: 'Cancel',
      onConfirm() {
        capture('user_feedback:comment_submit', { comment })
        setCurrentStep('thankYou')
      },
      onCancel() {
        prompt.current?.hide()
        capture('user_feedback:comment_dismiss')
      },
      onDismiss() {
        capture('user_feedback:comment_dismiss')
      },
      children: (
        <TextField
          label="Can you tell us more?"
          multiline
          styleClassName="h-24 mb-6 z-20"
          numberOfLines={8}
          onChange={setComment}
          keyboardType="name-phone-pad"
          returnKeyType="default"
        />
      ),
    },
    thankYou: {
      title: 'Thank you for your feedback!',
      description: 'We will use it to improve our app.',
      confirmText: 'Ok',
      showCancel: false,
      onConfirm() {
        prompt.current?.hide()
      },
    },
  }

  return (
    <Prompt ref={prompt} {...steps[currentStep]}>
      {steps[currentStep]?.children}
    </Prompt>
  )
}
