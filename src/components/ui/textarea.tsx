import React from 'react'
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({className='', ...props}, ref)=> (
  <textarea ref={ref} className={"w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 font-mono "+className} {...props}/>
))
Textarea.displayName='Textarea'
