import React, { useState } from 'react'
import SymbolCard from './components/SymbolCard'
import symbols from './data/symbols.json'

export default function App(){
  const [kraina, setKraina] = useState(null)
  const [selected, setSelected] = useState([])
  const [showReport, setShowReport] = useState(false)

  function toggleSymbol(sym){
    const exists = selected.find(s => s.title === sym.title && s.kraina === sym.kraina)
    if(exists){
      setSelected(selected.filter(s=>!(s.title===sym.title && s.kraina===sym.kraina)))
    } else {
      setSelected([...selected, sym])
    }
  }

  function resetAll(){
    setSelected([])
    setKraina(null)
    setShowReport(false)
  }

  function generateReport(){
    setShowReport(true)
  }

  if(kraina===null){
    return (
      <div className="min-h-screen header-bg flex items-center justify-center p-6">
        <div className="max-w-4xl text-center card rounded-3xl p-8 shadow-soft">
          <h1 className="text-5xl font-extrabold mb-3">Mapa Potencjału</h1>
          <p className="text-gray-600 mb-6">Interaktywna gra dla doradców zawodowych — odkryj wartości, talenty, cienie i wizję. Delikatna estetyka, profesjonalna analiza.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>setKraina('Wartości')} className="px-6 py-3 rounded-full bg-gradient-to-r from-soft-emerald to-teal-400 text-white font-semibold shadow">Rozpocznij</button>
            <button onClick={()=>setKraina('Wartości')} className="px-6 py-3 rounded-full bg-white shadow">Szybki start</button>
          </div>
          <div className="mt-6 text-sm text-gray-500">Wybierz krainę u góry lub rozpocznij od Wartości</div>
        </div>
      </div>
    )
  }

  const filtered = symbols.filter(s => s.kraina === kraina)

  return (
    <div className="min-h-screen p-6">
      <header className="max-w-6xl mx-auto text-center mb-6">
        <h1 className="text-3xl font-semibold mb-2">Mapa Potencjału</h1>
        <p className="text-sm text-gray-600">Kraina: <strong>{kraina}</strong> — kliknij symbole, by je dodać do swojego raportu</p>
        <div className="mt-3 flex justify-center gap-2">
          {['Wartości','Talenty','Cienie','Wizja'].map(k => (
            <button key={k} onClick={()=>{setKraina(k); setShowReport(false)}} className={`px-3 py-1 rounded-full ${kraina===k ? 'bg-emerald-400 text-white' : 'bg-white shadow'}`}>
              {k}
            </button>
          ))}
        </div>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((sym,i) => (
            <SymbolCard key={i} symbol={sym} onToggle={()=>toggleSymbol(sym)} selected={!!selected.find(s=>s.title===sym.title && s.kraina===sym.kraina)} />
          ))}
        </section>
        <aside className="space-y-4">
          <div className="card p-4 rounded-2xl shadow-soft">
            <h3 className="font-semibold mb-2">Twój wybór</h3>
            <div className="text-sm text-gray-600 mb-2">{selected.length} symboli</div>
            <ul className="text-sm space-y-1 max-h-48 overflow-auto">
              {selected.map((s,i)=> <li key={i} className="px-2 py-1 rounded">{s.icon} {s.title} <span className="text-xs text-gray-400">({s.kraina})</span></li>)}
            </ul>
            <div className="mt-3 flex gap-2">
              <button onClick={generateReport} className="flex-1 px-3 py-2 bg-emerald-400 text-white rounded">Generuj raport</button>
              <button onClick={resetAll} className="px-3 py-2 bg-white shadow rounded">Reset</button>
            </div>
          </div>
          <div className="card p-4 rounded-2xl shadow-soft text-sm text-gray-600">
            <h4 className="font-semibold mb-2">Instrukcja</h4>
            <ol className="list-decimal list-inside text-xs">
              <li>Kliknij symbole, które rezonują.</li>
              <li>Zbierz minimum 3 symbole z różnych krain.</li>
              <li>Generuj raport i omów go z klientem.</li>
            </ol>
          </div>
        </aside>
      </main>

      {showReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-3xl w-full rounded-2xl p-6 shadow-xl overflow-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold mb-3">Raport — Twoja Mapa</h2>
            <p className="text-sm text-gray-600 mb-4">Poniżej synteza wybranych symboli. Użyj jako punktu wyjścia do rozmowy doradczej.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selected.map((s,i)=> (
                <div key={i} className="p-3 border rounded">
                  <div className="text-2xl">{s.icon}</div>
                  <h3 className="font-semibold">{s.title} <span className="text-xs text-gray-400">({s.kraina})</span></h3>
                  <p className="italic text-sm mt-2">{s.narration}</p>
                  <p className="text-xs"><strong>Wskazówka:</strong> {s.tip}</p>
                  <p className="text-xs"><strong>Pytanie:</strong> {s.question}</p>
                  <p className="text-xs"><strong>Eksperyment:</strong> {s.experiment}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>{setShowReport(false)}} className="px-4 py-2 bg-white shadow rounded">Zamknij</button>
              <button onClick={()=>{ navigator.clipboard.writeText(JSON.stringify(selected, null, 2)); alert('Raport skopiowany do schowka.'); }} className="px-4 py-2 bg-emerald-400 text-white rounded">Kopiuj raport</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
