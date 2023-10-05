import React, { FC } from 'react'
import { Header } from './Header'
import { Markdown } from './Markdown'
import { Screen } from './Screen'

const SimplePage: FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <Screen preset="scroll" safeAreaEdges={['top', 'bottom']}>
      <Header title="Simple Page" />
      <Markdown text={content} />
    </Screen>
  )
}
