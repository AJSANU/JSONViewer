import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { stringifyPretty } from '@/utils/json-utils'

export function JsonInputPanel({ jsonText, setJsonText, parseError, onLoadSample }:{ jsonText:string; setJsonText:(v:string)=>void; parseError:string|null; onLoadSample:()=>void }){
  return (
    <Card className="shadow-xl">
      <CardHeader><CardTitle>JSON Input</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Textarea value={jsonText} onChange={(e)=>setJsonText(e.target.value)} className="font-mono h-64"/>
        {parseError ? (
          <p className="text-sm text-red-400">Parse error: {parseError}</p>
        ) : (
          <p className="text-sm opacity-70">Valid JSON ✓</p>
        )}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onLoadSample}>Load Sample</Button>
          <Button onClick={()=>navigator.clipboard.readText().then(t=>setJsonText(t))}>Paste from Clipboard</Button>
        </div>
      </CardContent>
    </Card>
  )
}
