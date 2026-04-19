import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
        <span className="text-dark font-display font-bold text-xs">C</span>
      </div>
      <span className="font-display font-bold text-lg text-text-primary">
        Click<span className="text-primary">2</span>Buy
      </span>
    </div>
  )
}

export default Logo
