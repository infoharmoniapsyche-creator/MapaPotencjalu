import React from 'react'

export default function SymbolCard({ symbol, onToggle, selected }){
  return (
    <article onClick={onToggle} className={`p-4 rounded-2xl transition cursor-pointer card ${selected ? 'ring-4 ring-emerald-100' : 'hover:shadow-lg'}`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{symbol.icon}</div>
        <div>
          <h4 className="font-semibold text-lg">{symbol.title}</h4>
          <div className="text-xs text-gray-500">{symbol.kraina}</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-700">{symbol.narration}</div>
      <div className="mt-2 text-xs text-gray-600"><strong>Wskazówka:</strong> {symbol.tip}</div>
    </article>
  )
}
