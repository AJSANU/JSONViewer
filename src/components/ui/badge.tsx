import React from 'react'
export const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement> & {variant?:'secondary'|'default'}> = ({className='', variant='default', ...props}) => (
  <span className={(variant==='secondary' ? 'bg-white/10' : 'bg-white/20')+ ' text-xs px-2 py-0.5 rounded-md border border-white/10 ' + className} {...props} />
)
