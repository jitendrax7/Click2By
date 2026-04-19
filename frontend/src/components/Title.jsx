import React from 'react'

const Title = ({ text1, text2, subtitle, center = false }) => {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-primary">
        <span className="text-text-muted font-normal">{text1} </span>
        {text2}
      </h2>
      <div className={`mt-3 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
        <div className="w-10 h-[2px] bg-primary rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-4 h-[2px] bg-primary/40 rounded-full" />
      </div>
      {subtitle && (
        <p className="mt-4 text-text-muted text-sm sm:text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default Title
