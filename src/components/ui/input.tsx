import React from 'react'
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className='', ...props}, ref)=> (
  <input ref={ref} className={"w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20 "+className} {...props}/>
))
Input.displayName='Input'
