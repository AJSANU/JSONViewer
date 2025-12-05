import React from 'react'
import clsx from 'classnames'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'secondary'|'ghost'; size?: 'default'|'icon' }
export const Button: React.FC<Props> = ({ className, variant='default', size='default', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl border border-white/10 shadow-sm transition active:scale-[.98] disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-white/10 hover:bg-white/20 px-3 py-2',
    secondary: 'bg-white/5 hover:bg-white/10 px-3 py-2',
    ghost: 'bg-transparent hover:bg-white/10 px-2 py-2'
  }
  const sizes = { default: '', icon: 'h-9 w-9 p-0' }
  return <button className={clsx(base, variants[variant], sizes[size], className)} {...props} />
}
export default Button
