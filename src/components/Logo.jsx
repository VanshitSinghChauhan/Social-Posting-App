import React from 'react'

function Logo({width = '100px', className = ''}) {
  return (
    <div style={{ width }} className={`font-semibold tracking-wide text-slate-900 ${className}`}>
      PostingApp
    </div>
  )
}

export default Logo