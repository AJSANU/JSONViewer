import React, { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Copy, Download, Edit } from 'lucide-react'
import type { JsonValue, Path, JsonObject } from '@/types/json-types'
import { isObject, stringifyPretty, download, copy } from '@/utils/json-utils'

interface Props {
  data: JsonValue
  path: Path
  matches: Set<string>
  onEdit: (path: Path, current: JsonValue) => void
  onDelete: (path: Path) => void
  onPick: (path: Path) => void
}

export const JsonTree: React.FC<Props> = ({ data, path, matches, onEdit, onDelete, onPick }) => {
  const [open, setOpen] = useState(true)
  const isLeaf = !(Array.isArray(data) || isObject(data))
  const id = path.map(String).join('/')
  const kLabel = path.length===0 ? 'root' : String(path[path.length-1])
  const isMatch = matches.has(id)

  const valuePreview = useMemo(()=>{
    if(isLeaf) return String(data)
    if(Array.isArray(data)) return `Array(${data.length})`
    return `Object(${Object.keys(data as JsonObject).length})`
  }, [data, isLeaf])

  return (
    <div className={`rounded-xl ${isMatch? 'ring-2 ring-yellow-400' : ''} transition-all`} style={{background: isMatch? 'rgba(255,235,59,0.08)':'transparent'}}>
      <div className="group flex items-center gap-2 py-1 px-2 hover:bg-white/5 rounded-lg">
        <button onClick={()=>setOpen(!open)} className="h-6 w-6 flex items-center justify-center rounded hover:bg-white/10">
          {isLeaf? null : (open? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>) }
        </button>
        <Badge variant="secondary" className="font-mono text-xs" onClick={()=>onPick(path)}>{kLabel}</Badge>
        <span className="font-mono text-xs opacity-70">: {valuePreview}</span>
        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={()=>copy(kLabel)}><Copy className="h-4 w-4"/></Button>
          <Button size="icon" variant="ghost" onClick={()=>copy(isLeaf? String(data) : stringifyPretty(data))}><Copy className="h-4 w-4"/></Button>
          <Button size="icon" variant="ghost" onClick={()=>download(`${kLabel || 'root'}.json`, stringifyPretty(data))}><Download className="h-4 w-4"/></Button>
          <Button size="icon" variant="ghost" onClick={()=>onEdit(path, data)}><Edit className="h-4 w-4"/></Button>
          <Button size="icon" variant="ghost" onClick={()=>onDelete(path)}><span className="text-red-400">×</span></Button>
        </div>
      </div>

      {open && !isLeaf && (
        <div className="ml-6 border-l pl-3">
          {Array.isArray(data) ? (
            data.map((v,i)=> (
              <JsonTree key={i} data={v} path={[...path, i]} matches={matches} onEdit={onEdit} onDelete={onDelete} onPick={onPick}/>
            ))
          ) : (
            Object.entries(data as JsonObject).map(([k,v])=> (
              <JsonTree key={k} data={v} path={[...path, k]} matches={matches} onEdit={onEdit} onDelete={onDelete} onPick={onPick}/>
            ))
          )}
        </div>
      )}
    </div>
  )
}
