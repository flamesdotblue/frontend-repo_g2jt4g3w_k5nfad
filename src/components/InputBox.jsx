import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'

export default function InputBox({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const adjustHeight = () => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = '0px'
    const h = Math.min(ta.scrollHeight, 200)
    ta.style.height = h + 'px'
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onSend?.(v)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="sticky bottom-0 bg-[#0f0f0f]/80 backdrop-blur border-t border-[#404040]">
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-end gap-2 p-2 rounded-2xl bg-[#1a1a1a] border border-[#404040] focus-within:border-[#f97316] transition-colors">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask me anything about code..."
            className="flex-1 bg-transparent outline-none text-[#f5f5f5] placeholder:text-zinc-500 resize-none leading-6 py-2 pl-3 pr-2"
            disabled={disabled}
          />
          <button
            onClick={submit}
            disabled={disabled || value.trim().length === 0}
            className="shrink-0 rounded-full bg-[#f97316] hover:bg-[#fb7e2c] disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 transition-all duration-200 shadow"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
