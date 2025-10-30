import { useState, useMemo } from 'react'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ language = '', value = '', showToast }) {
  const [copied, setCopied] = useState(false)

  const lang = useMemo(() => {
    if (language) return language.replace('language-', '')
    return ''
  }, [language])

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      showToast?.('Code copied to clipboard')
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      showToast?.('Failed to copy')
    }
  }

  return (
    <div className="relative group rounded-lg overflow-hidden border border-[#2a2a2a] bg-[#1e1e1e]">
      <div className="absolute top-2 left-2 text-[11px] uppercase tracking-wide text-zinc-400 px-2 py-0.5 rounded bg-black/40">
        {lang || 'code'}
      </div>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 inline-flex items-center gap-1.5 px-2 py-1 text-xs rounded-md bg-black/40 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#2a2a2a] hover:border-[#f97316] hover:text-white"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={lang || undefined}
        style={atomDark}
        customStyle={{ margin: 0, background: '#1e1e1e', fontSize: 14, lineHeight: 1.6 }}
        showLineNumbers={false}
        codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' } }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}
