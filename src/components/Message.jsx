import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'

function Avatar({ role }) {
  const isUser = role === 'user'
  const bg = isUser ? 'bg-[#f97316]' : 'bg-gradient-to-br from-indigo-500 to-purple-600'
  return (
    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center text-white text-xs shrink-0`}> 
      {isUser ? 'U' : 'AI'}
    </div>
  )
}

export default function Message({ message, showToast }) {
  const isUser = message.role === 'user'
  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar role={message.role} />
        <div>
          <div
            className={`${
              isUser ? 'bg-[#f97316] text-white' : 'bg-transparent text-zinc-300'
            } rounded-2xl px-4 py-3 text-base leading-relaxed shadow-sm`}
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  if (inline) {
                    return (
                      <code className="px-1 py-0.5 rounded bg-[#1e1e1e] text-orange-200" {...props}>
                        {children}
                      </code>
                    )
                  }
                  return (
                    <CodeBlock
                      language={match ? match[0] : ''}
                      value={String(children).replace(/\n$/, '')}
                      showToast={showToast}
                    />
                  )
                },
                p({ children }) {
                  return <p className="mb-3 last:mb-0">{children}</p>
                },
                ul({ children }) {
                  return <ul className="list-disc ml-5 space-y-1 mb-3 last:mb-0">{children}</ul>
                },
                ol({ children }) {
                  return <ol className="list-decimal ml-5 space-y-1 mb-3 last:mb-0">{children}</ol>
                },
                a({ href, children }) {
                  return (
                    <a href={href} className="text-orange-300 hover:underline" target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          <div className={`mt-1 text-xs ${isUser ? 'text-orange-200/80 text-right' : 'text-zinc-500'}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  )
}
