import { Attachments } from '@ant-design/x'
import { Image } from 'antd'
import hljs from 'highlight.js'
import ReactMarkdown from 'react-markdown'

import 'highlight.js/styles/vs2015.css'
import type { FileContent, ImageContent, TextContent, MessageContent } from '@pc/types/chat'
import type { ReactElement } from 'react'

// 定义内容处理器的类型映射
type ContentHandlers = {
  [K in MessageContent['type']]: (data: Extract<MessageContent, { type: K }>) => ReactElement
}

const imageContent = (data: ImageContent): ReactElement => {
  const { content } = data
  console.log(content, 'content')
  return <Image src={content}></Image>
}

const fileContent = (data: FileContent): ReactElement => {
  const { content } = data
  return <Attachments.FileCard item={content} />
}

const textContent = (data: TextContent): ReactElement => {
  const { content } = data
  return (
    <div className="text-content">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''

            if (language && hljs.getLanguage(language)) {
              const highlightedCode = hljs.highlight(String(children).replace(/\n$/, ''), {
                language,
                ignoreIllegals: true
              }).value

              return (
                <pre
                  className={`hljs language-${language}`}
                  style={{ borderRadius: '8px', padding: '16px' }}>
                  <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
                </pre>
              )
            }

            return (
              <code
                className={className}
                style={{ borderRadius: '4px', padding: '2px 6px' }}
                {...props}>
                {children}
              </code>
            )
          }
        }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export const allMessageContent: ContentHandlers = {
  image: imageContent,
  file: fileContent,
  text: textContent
}
