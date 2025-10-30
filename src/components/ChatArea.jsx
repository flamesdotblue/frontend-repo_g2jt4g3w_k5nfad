import { useEffect, useRef, useState, useMemo } from 'react'
import Spline from '@splinetool/react-spline'
import Message from './Message'
import { ArrowDown } from 'lucide-react'

export default function ChatArea({ messages, loading, showToast }) {
  const containerRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40
    if (atBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, loading])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
      setShowScrollButton(!atBottom)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const isEmpty = !messages || messages.length === 0

  return (
    <div className="relative flex-1 bg-[#0f0f0f]">
      <div ref={containerRef} className="h-[calc(100vh-56px-92px)] overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        {isEmpty ? (
          <div className="h-full min-h-[60vh] grid md:grid-cols-2 gap-6 items-stretch">
            <div className="relative rounded-xl border border-[#404040] bg-[#1a1a1a] overflow-hidden">
              <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
            </div>
            <div className="flex flex-col items-start justify-center p-6 md:p-10 rounded-xl border border-[#404040] bg-[#1a1a1a]">
              <h2 className="text-2xl font-semibold text-white mb-2">Welcome to DevAI</h2>
              <p className="text-zinc-400 mb-6">Your professional AI coding assistant. Ask anything about code, get explanations, and generate snippets with beautiful formatting.</p>
              <div className="grid gap-3 w-full">
                {[
                  'Explain recursion with examples',
                  'Write a binary search algorithm',
                  'Debug my Python code',
                  'Optimize this JavaScript function',
                ].map((t) => (
                  <div key={t} className="px-4 py-3 rounded-lg border border-[#404040] bg-[#0f0f0f] text-zinc-300 hover:border-[#f97316] hover:text-white transition-all duration-200">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <Message key={m.id} message={m} showToast={showToast} />)
            )}
            {loading && (
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '120ms' }} />
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '240ms' }} />
              </div>
            )}
          </div>
        )}
      </div>

      {showScrollButton && (
        <button
          onClick={() => containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })}
          className="absolute right-6 bottom-[104px] p-2 rounded-full border border-[#404040] bg-[#1a1a1a] text-zinc-300 hover:text-white hover:border-[#f97316] transition-all duration-200 shadow"
          aria-label="Scroll to bottom"
        >
          <ArrowDown size={18} />
        </button>
      )}
    </div>
  )
}
