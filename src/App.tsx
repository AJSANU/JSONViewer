import { Outlet, NavLink } from 'react-router-dom'
import { Sun, Moon, Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function App() {
  const [dark, setDark] = useState(true)
  useEffect(() => { document.documentElement.classList.toggle('dark', dark) }, [dark])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">AJ JSON Viewer</NavLink>
          <nav className="hidden md:flex items-center gap-4 text-sm opacity-80">
            <NavLink to="/" className={({isActive})=> isActive? 'underline' : ''}>Home</NavLink>
            <NavLink to="/viewer" className={({isActive})=> isActive? 'underline' : ''}>JSON Viewer</NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={()=>setDark(v=>!v)}>
              {dark? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
            </Button>
            <a href="https://github.com" target="_blank" className="opacity-80 hover:opacity-100">
              <Github className="h-5 w-5"/>
            </a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet/>
      </main>
      <footer className="max-w-7xl mx-auto px-4 pb-8 text-xs opacity-60">
        Built with React+TS • Tailwind • React Flow • Framer Motion • JSONPath
      </footer>
    </div>
  )
}
