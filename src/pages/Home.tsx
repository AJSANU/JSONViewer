import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Share2, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Hero />

      <Card className="col-span-1 md:col-span-2 bg-gradient-to-tr from-white/5 to-white/10 border-white/10 shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl"><Share2 className="h-5 w-5"/> Viewers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ViewerCard
              title="Twist JSON Viewer"
              desc="Collapsible tree • Search & highlight • JSONPath • Node actions • Graph • Insights"
              to="/viewer"
            />
            <ComingSoonCard title="Diff JSON Viewer" desc="Side‑by‑side diff & merge with conflict hints"/>
            <ComingSoonCard title="Schema Explorer" desc="Zod/JSON Schema guided validation & forms"/>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Hero(){
  return (
    <div className="col-span-1 md:col-span-2 rounded-3xl border border-white/10 p-8 bg-[radial-gradient(80%_120%_at_0%_0%,_rgba(99,102,241,0.12),_transparent),radial-gradient(80%_120%_at_100%_0%,_rgba(16,185,129,0.12),_transparent)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Beautiful, Modular JSON Tools</h1>
          <p className="mt-2 opacity-80 max-w-2xl">Start with the Twist JSON Viewer. Designed for speed, clarity and control — and ready for more viewers soon.</p>
          <div className="mt-4 flex items-center gap-3">
            <Link to="/viewer"><Button>Open Viewer <ArrowRight className="ml-2 h-4 w-4"/></Button></Link>
            <Button variant="secondary">
              <Sparkles className="h-4 w-4 mr-2"/> Showcase Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ViewerCard({title, desc, to}:{title:string; desc:string; to:string}){
  return (
    <Link to={to} className="group">
      <Card className="h-full transition-all border-white/10 group-hover:border-white/20 group-hover:shadow-2xl bg-gradient-to-br from-white/5 to-white/10">
        <CardHeader className="pb-2"><CardTitle className="text-lg">{title}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm opacity-80 min-h-[48px]">{desc}</p>
          <div className="mt-4">
            <Button variant="ghost" className="px-0">Open <ArrowRight className="ml-2 h-4 w-4"/></Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function ComingSoonCard({title, desc}:{title:string; desc:string}){
  return (
    <div className="group">
      <Card className="h-full border-dashed">
        <CardHeader className="pb-2"><CardTitle className="text-lg opacity-70">{title}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm opacity-60 min-h-[48px]">{desc}</p>
          <div className="mt-4 opacity-60">Coming soon…</div>
        </CardContent>
      </Card>
    </div>
  )
}
