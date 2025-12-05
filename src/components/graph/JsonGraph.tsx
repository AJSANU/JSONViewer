import React from 'react'
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow'
import 'reactflow/dist/style.css'
import type { GraphData } from '@/types/json-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function JsonGraph({ graph, selectedPathId, highlightIds }:{ graph: GraphData; selectedPathId: string | null; highlightIds: Set<string> }){
  return (
    <Card className="shadow-xl h-[700px]">
      <CardHeader><CardTitle>Structure Graph</CardTitle></CardHeader>
      <CardContent className="h-[630px]">
        <div className="w-full h-full rounded-2xl overflow-hidden border">
          <ReactFlow
            nodes={graph.nodes.map(n=>({
              ...n,
              style: {
                ...n.style,
                background: (selectedPathId && n.id===selectedPathId) || highlightIds.has(n.id) ? 'rgba(99,102,241,0.15)' : 'white',
                border: (selectedPathId && n.id===selectedPathId) || highlightIds.has(n.id) ? '2px solid rgba(99,102,241,0.6)' : '1px solid rgba(0,0,0,0.1)'
              }
            }))}
            edges={graph.edges}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  )
}
