import type { JsonValue, Path, JsonObject } from '@/types/json-types'
import type { Node, Edge, Position } from 'reactflow'
import { Position as FlowPosition } from 'reactflow'

export function isObject(v:any): v is JsonObject { return v!==null && typeof v==='object' && !Array.isArray(v) }
export function cloneDeep<T>(v:T):T { return JSON.parse(JSON.stringify(v)) }
export function stringifyPretty(v: JsonValue){ return JSON.stringify(v, null, 2) }
export function includesInsensitive(hay:string, needle:string){ return hay.toLowerCase().includes(needle.trim().toLowerCase()) }

export function setByPath(root: JsonValue, path: Path, value: JsonValue): JsonValue {
  if(path.length===0) return value
  const draft = cloneDeep(root)
  let cur: any = draft
  for(let i=0;i<path.length-1;i++){
    const k: any = path[i]
    if(cur[k]==null || typeof cur[k] !== 'object'){
      const next = path[i+1]
      cur[k] = typeof next === 'number' ? [] : {}
    }
    cur = cur[k]
  }
  cur[path[path.length-1] as any] = value as any
  return draft
}

export function deleteByPath(root: JsonValue, path: Path): JsonValue {
  if(path.length===0) return root
  const draft = cloneDeep(root)
  let cur: any = draft
  for(let i=0;i<path.length-1;i++){
    cur = cur[path[i] as any]
    if(cur==null) return draft
  }
  const last = path[path.length-1]
  if(Array.isArray(cur) && typeof last==='number') cur.splice(last,1)
  else delete cur[last as any]
  return draft
}

export function download(filename:string, content:string){
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type: 'application/json' }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}

export async function copy(text:string){ try{ await navigator.clipboard.writeText(text) } catch{} }

export function computeInsights(data: JsonValue){
  const seen = new Map<string, number>()
  let maxArray = 0, arraysFound = 0, totalKeys = 0, depth = 0
  function walk(node: JsonValue, d=1){
    depth = Math.max(depth, d)
    if(Array.isArray(node)){
      arraysFound += 1; maxArray = Math.max(maxArray, node.length)
      node.forEach(n=>walk(n, d+1))
    } else if(isObject(node)){
      for(const k of Object.keys(node)){
        totalKeys += 1; seen.set(k, (seen.get(k) || 0)+1); walk(node[k], d+1)
      }
    }
  }
  walk(data ?? null)
  let mostFrequentKey = '', maxCount = 0
  for(const [k,c] of seen){ if(c>maxCount){ maxCount=c; mostFrequentKey=k } }
  return { depth, totalKeys, arraysFound, largestArray: maxArray, mostFrequentKey }
}

export function makeGraph(data: JsonValue){
  const nodes: Node[] = []
  const edges: Edge[] = []
  const idForPath = (p: Path) => p.map(String).join('/') || 'root'

  function addNode(path: Path, label: string, value: JsonValue, parent?: Path){
    const id = idForPath(path)
    nodes.push({ id, position: { x: Math.random()*600, y: Math.random()*400 }, data: { label }, sourcePosition: FlowPosition.Right, targetPosition: FlowPosition.Left, style: { borderRadius: 14, padding: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' } })
    if(parent){ edges.push({ id: `${id}-edge`, source: idForPath(parent), target: id }) }
  }
  function walk(node: JsonValue, path: Path=[]){
    const keyLabel = path.length===0 ? 'root' : String(path[path.length-1])
    addNode(path, keyLabel, node, path.length ? path.slice(0,-1) : undefined)
    if(Array.isArray(node)) node.forEach((n,i)=>walk(n,[...path,i]))
    else if(isObject(node)) Object.entries(node).forEach(([k,v])=>walk(v,[...path,k]))
  }
  walk(data)
  return { nodes, edges }
}
