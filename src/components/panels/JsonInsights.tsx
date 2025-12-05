import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function JsonInsights({ insights }:{ insights: { depth:number; totalKeys:number; arraysFound:number; largestArray:number; mostFrequentKey:string } }){
  return (
    <Card className="shadow-xl">
      <CardHeader><CardTitle>Insights</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 text-sm">
        <Stat label="Depth" value={String(insights.depth)} />
        <Stat label="Total keys" value={String(insights.totalKeys)} />
        <Stat label="Arrays" value={String(insights.arraysFound)} />
        <Stat label="Largest array" value={String(insights.largestArray)} />
        <div className="col-span-2"><Stat label="Most frequent key" value={insights.mostFrequentKey || '—'} /></div>
      </CardContent>
    </Card>
  )
}

function Stat({ label, value }:{label:string; value:string}){
  return (
    <div className="rounded-xl bg-gradient-to-tr from-white/5 to-white/10 p-3 border border-white/10">
      <div className="text-xs opacity-70">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  )
}
