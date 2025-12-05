import type { Node, Edge } from 'reactflow'

export type JsonValue = null | string | number | boolean | JsonObject | JsonArray
export interface JsonObject { [k: string]: JsonValue }
export interface JsonArray extends Array<JsonValue> {}
export type Path = (string | number)[]

export type GraphData = { nodes: Node[]; edges: Edge[] }
