import { PanelRight, Menu } from 'lucide-react'

export default function Header({ onToggleSidebar, onToggleCodePanel }) {
  return (
    <header className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur border-b border-[#404040]">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-[#1a1a1a] text-zinc-300"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-[15px] sm:text-base md:text-lg font-semibold text-[#f5f5f5]">
            DevAI - Code Assistant
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCodePanel}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#404040] hover:border-[#f97316] text-zinc-300 hover:text-white transition-all duration-200"
          >
            <PanelRight size={18} />
            <span className="hidden sm:inline">Code Panel</span>
          </button>
        </div>
      </div>
    </header>
  )
}
