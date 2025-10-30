import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ChatArea from './components/ChatArea'
import InputBox from './components/InputBox'

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [codePanelOpen, setCodePanelOpen] = useState(false) // reserved for future
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  const conversations = useMemo(() => {
    return [
      { id: '1', title: 'Array methods in JS', updatedAt: 'Just now', active: true },
      { id: '2', title: 'Python recursion tips', updatedAt: '1h ago' },
    ]
  }, [])

  const showToast = (text) => {
    const id = uuid()
    setToasts((t) => [...t, { id, text }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, 1800)
  }

  const mockRespond = async (prompt) => {
    setLoading(true)
    // Simple mocked response with optional code block
    const lower = prompt.toLowerCase()
    const hasAlgo = lower.includes('binary search') || lower.includes('algorithm') || lower.includes('code')
    const content = hasAlgo
      ? `Here is a binary search implementation in JavaScript:\n\n\n\n\n\n\n\n\n\n```javascript\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\nconsole.log(binarySearch([1,3,5,7,9], 7)); // 3\n```\n\nComplexity: O(log n).`
      : `Great question! Here are some insights about ${prompt}:\n\n- Break the problem into smaller pieces.\n- Add logs and test small parts.\n- Prefer clarity over cleverness.`

    await new Promise((r) => setTimeout(r, 900))

    setMessages((m) => [
      ...m,
      { id: uuid(), role: 'assistant', content, timestamp: Date.now() },
    ])
    setLoading(false)
  }

  const handleSend = async (text) => {
    const userMessage = { id: uuid(), role: 'user', content: text, timestamp: Date.now() }
    setMessages((m) => [...m, userMessage])
    // Trigger mock response
    mockRespond(text)
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#f5f5f5] font-inter">
      <div className="flex">
        <div className={`hidden md:block transition-[width] duration-300 ${sidebarCollapsed ? 'w-16' : 'w-72'}`}>
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed((s) => !s)}
            conversations={conversations}
            onNewChat={() => setMessages([])}
          />
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onToggleSidebar={() => setSidebarCollapsed((s) => !s)}
            onToggleCodePanel={() => setCodePanelOpen((s) => !s)}
          />

          <div className="flex-1 flex min-h-0">
            <div className="flex-1 flex flex-col min-w-0">
              <ChatArea messages={messages} loading={loading} showToast={showToast} />
              <InputBox onSend={handleSend} disabled={loading} />
            </div>
            {/* Optional right code panel placeholder for future extension */}
            {codePanelOpen && (
              <div className="hidden lg:block w-[360px] border-l border-[#404040] bg-[#0f0f0f] p-4 text-zinc-400">
                <div className="sticky top-14">
                  <div className="text-sm mb-2 text-zinc-500">Code Panel</div>
                  <p className="text-sm">Pin snippets, notes, or diffs here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="px-3 py-2 rounded-md bg-[#1a1a1a] border border-[#404040] text-sm text-zinc-200 shadow"
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  )
}
