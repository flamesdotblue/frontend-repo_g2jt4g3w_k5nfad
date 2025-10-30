import { useState } from 'react'
import { Plus, Settings, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

export default function Sidebar({ collapsed, onToggle, conversations = [], onNewChat, onSelectConversation }) {
  const [hovered, setHovered] = useState(false)
  const widthClass = collapsed ? 'w-16' : 'w-72'

  return (
    <aside
      className={`${widthClass} h-screen bg-[#1a1a1a] text-[#f5f5f5] flex flex-col border-r border-[#404040] transition-[width] duration-300 ease-in-out`}
    >
      <div className="p-3 flex items-center gap-2 border-b border-[#404040]">
        <button
          onClick={onToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="p-2 rounded-lg hover:bg-[#2a2a2a] transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
        {!collapsed && (
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#fb7e2c] text-white font-medium py-2 rounded-lg transition-all duration-200 shadow"
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        )}
        {collapsed && (
          <button
            onClick={onNewChat}
            className="ml-1 p-2 bg-[#f97316] hover:bg-[#fb7e2c] text-white rounded-lg transition-all duration-200 shadow"
            aria-label="New chat"
          >
            <Plus size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="p-4 text-sm text-zinc-400">
            {!collapsed ? 'No conversations yet' : ''}
          </div>
        ) : (
          <ul className="p-2 space-y-1">
            {conversations.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onSelectConversation?.(c)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-[#2a2a2a] transition-all duration-200 ${c.active ? 'bg-[#2a2a2a]' : ''}`}
                >
                  <div className="p-2 rounded-md bg-[#2d2d2d] text-zinc-300">
                    <MessageSquare size={16} />
                  </div>
                  {!collapsed && (
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{c.title}</div>
                      <div className="truncate text-xs text-zinc-400">{c.updatedAt}</div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-3 border-t border-[#404040]">
        <button
          className={`w-full ${collapsed ? 'justify-center' : ''} flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-all duration-200 text-zinc-300`}
        >
          <div className="p-2 rounded-md bg-[#2d2d2d]">
            <Settings size={16} />
          </div>
          {!collapsed && <span className="text-sm">Settings</span>}
        </button>
      </div>
    </aside>
  )
}
