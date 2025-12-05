import { useMemo, useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { JsonTree } from "@/components/json-tree/JsonTree"
import { JsonGraph } from "@/components/graph/JsonGraph"
import { JsonInputPanel } from "@/components/panels/JsonInputPanel"
import { JsonPathPanel } from "@/components/panels/JsonPathPanel"
import { JsonInsights } from "@/components/panels/JsonInsights"

import {
  includesInsensitive,
  stringifyPretty,
  computeInsights,
  makeGraph,
  setByPath,
  deleteByPath,
} from "@/utils/json-utils"

import type { JsonValue, Path } from "@/types/json-types"
import { PauseCircle, Sun, Moon, Eye, EyeOff } from "lucide-react"
import "@/styles/premium.css"

const SAMPLE: JsonValue = {
  app: {
    name: "Abhishek JSON Viewer",
    version: "1.0.0",
    features: ["search", "edit", "export", "graph", "jsonpath", "insights"],
  },
  users: [
    { id: 1, name: "Abhishek", roles: ["admin", "editor"], active: true },
    { id: 2, name: "Priya", roles: ["viewer"], active: true },
  ],
  stats: { visits: 12345, flags: { inBeta: true, darkAllowed: true } },
}

export default function JsonViewerPage() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  // toggles
  const [showJson, setShowJson] = useState(true)
  const [showGraph, setShowGraph] = useState(false)

  // data state
  const [jsonText, setJsonText] = useState(stringifyPretty(SAMPLE))
  const [data, setData] = useState<JsonValue>(SAMPLE)
  const [search, setSearch] = useState("")
  const [jsonPathResultIds, setJsonPathResultIds] = useState<Set<string>>(new Set())
  const [selectedPathId, setSelectedPathId] = useState<string | null>(null)

  const parseError = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText)
      setData(parsed)
      return null
    } catch (e: any) {
      return e.message as string
    }
  }, [jsonText])

  const matches = useMemo(() => {
    const set = new Set<string>()
    if (!search.trim()) return set

    function walk(node: JsonValue, path: Path = []) {
      const id = path.map(String).join("/")
      const keyLabel = path.length ? String(path[path.length - 1]) : "root"

      if (includesInsensitive(keyLabel, search)) set.add(id)

      if (node == null || typeof node !== "object") {
        if (includesInsensitive(String(node), search)) set.add(id)
        return
      }

      if (Array.isArray(node)) node.forEach((n, i) => walk(n, [...path, i]))
      else Object.entries(node).forEach(([k, v]) => walk(v, [...path, k]))
    }
    walk(data)
    return set
  }, [data, search])

  const insights = useMemo(() => computeInsights(data), [data])
  const graph = useMemo(() => makeGraph(data), [data])

  function handleEdit(path: Path, current: JsonValue) {
    const raw = prompt("Edit JSON for: " + (path.join(".") || "root"), stringifyPretty(current))
    if (raw == null) return
    try {
      const val = JSON.parse(raw)
      const updated = setByPath(data, path, val)
      setData(updated)
      setJsonText(stringifyPretty(updated))
    } catch (e: any) {
      alert("Invalid JSON: " + e.message)
    }
  }

  function handleDelete(path: Path) {
    if (!confirm("Delete this key/index?")) return
    const updated = deleteByPath(data, path)
    setData(updated)
    setJsonText(stringifyPretty(updated))
  }

  function handlePick(path: Path) {
    setSelectedPathId(path.map(String).join("/"))
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* -------------------------------------------------- */}
      {/* TOP CONTROLS (Premium Card) */}
      {/* -------------------------------------------------- */}
      <div className="col-span-12 premium-card flex items-center gap-3 animate-fade-in">
        <input
          className="premium-input w-64"
          placeholder="Search key/value…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* PREMIUM CLEAR BUTTON */}
        <button className="pretty-btn" onClick={() => setSearch("")}>
          <PauseCircle className="h-4 w-4" />
          Clear
        </button>

        {/* PREMIUM PANEL TOGGLES */}
        <button className="pretty-btn-outline" onClick={() => setShowJson((v) => !v)}>
          {showJson ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showJson ? "Hide JSON" : "Show JSON"}
        </button>

        {/* PREMIUM PANEL TOGGLES 
        <button className="pretty-btn-outline" onClick={() => setShowGraph((v) => !v)}>
          {showGraph ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showGraph ? "Hide Graph" : "Show Graph"}
        </button>
        */}

        {/* THEME SWITCH → Keep ShadCN Button */}
        <div className="ml-auto flex items-center gap-2">
          <Sun className="h-4 w-4 opacity-60" />
          <Button variant="ghost" onClick={() => setDark((v) => !v)}>
            {dark ? "Dark" : "Light"} <Moon className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* LEFT PANELS (Glass Cards) */}
      {/* -------------------------------------------------- */}
      <div className="col-span-12 md:col-span-4 space-y-4">
        <div className="premium-card animate-fade-in">
          <div className="section-title">JSON Input</div>
          <JsonInputPanel
            jsonText={jsonText}
            setJsonText={setJsonText}
            parseError={parseError}
            onLoadSample={() => setJsonText(stringifyPretty(SAMPLE))}
          />
        </div>

        <div className="premium-card animate-fade-in">
          <div className="section-title">Insights</div>
          <JsonInsights insights={insights} />
        </div>

        <div className="premium-card animate-fade-in">
          <div className="section-title">JSONPath</div>
          <JsonPathPanel data={data} onResultIds={setJsonPathResultIds} />
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* JSON TREE (Glass Card) */}
      {/* -------------------------------------------------- */}
      {showJson && (
        <div className="col-span-12 md:col-span-8 animate-fade-in">
          <div className="premium-card h-full">
            <div className="section-title">JSON Tree</div>
            <div className="max-h-[75vh] overflow-auto pr-1">
              <JsonTree
                data={data}
                path={[]}
                matches={new Set([...matches, ...jsonPathResultIds])}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPick={handlePick}
              />
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* GRAPH (Premium) */}
      {/* -------------------------------------------------- */}
      {showGraph && (
        <div className="col-span-12 md:col-span-8 animate-fade-in">
          <div className="premium-card">
            <div className="section-title">Graph View</div>
            <JsonGraph graph={graph} selectedPathId={selectedPathId} highlightIds={jsonPathResultIds} />
          </div>
        </div>
      )}
    </div>
  )
}
