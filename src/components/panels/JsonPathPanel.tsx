import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { JSONPath } from 'jsonpath-plus'
import type { JsonValue, Path } from '@/types/json-types'
import { isObject } from '@/utils/json-utils'
import { Play } from 'lucide-react'
import { useState } from 'react'

export function JsonPathPanel({ data, onResultIds }:{ data: JsonValue; onResultIds: (ids:Set<string>)=>void }){
  const [jsonPath, setJsonPath] = useState('$')
  const [count, setCount] = useState(0)

  function run(){
    try{
      const results: any[] = JSONPath({ path: jsonPath, json: data }) as any[]
      const ids = new Set<string>()
      function walk(node: JsonValue, path: Path=[]){
        const id = path.map(String).join('/')
        if(results.includes(node as any)) ids.add(id)
        if(Array.isArray(node)) node.forEach((n,i)=>walk(n,[...path,i]))
        else if(isObject(node)) Object.entries(node).forEach(([k,v])=>walk(v,[...path,k]))
      }
      walk(data)
      onResultIds(ids)
      setCount(ids.size)
    }catch{ onResultIds(new Set()); setCount(0) }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader><CardTitle>JSONPath</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <Input value={jsonPath} onChange={(e)=>setJsonPath(e.target.value)} placeholder="$.store.book[?(@.price < 20)].title"/>
        <div className="flex gap-2">
          <Button onClick={run}><Play className="h-4 w-4 mr-2"/>Run</Button>
          <Badge variant="secondary">Matches: {count}</Badge>
        </div>
        <p className="text-xs opacity-70">Results are highlighted in the tree and graph.</p>
      </CardContent>
    </Card>
  )
}
