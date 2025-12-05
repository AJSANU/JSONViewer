import React from 'react'
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={"rounded-3xl border border-white/10 bg-white/[.03] " + className} {...props} />
)
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={"p-4 " + className} {...props} />
)
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className='', ...props }) => (
  <h3 className={"text-base font-semibold " + className} {...props} />
)
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) => (
  <div className={"p-4 pt-0 " + className} {...props} />
)
