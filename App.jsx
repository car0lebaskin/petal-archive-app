import React, { useState } from 'react';
import { 
  Leaf, Plus, BarChart3, Settings, ChevronRight, 
  MapPin, Calendar, Users, CheckCircle2, UserCircle2 
} from 'lucide-react';

const PetalArchiveOS = () => {
  // --- APP STATE ---
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [session, setSession] = useState({
    organiser: '',
    location: '',
    otherLocation: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [sale, setSale] = useState({
    category: '', series: '', style: '', metal: '', 
    chain: '', shape: '', otherShape: '', base: '', otherBase: '',
    colourLetter: '', otherColour: '', price: '', payment: 'TnG',
    customer: { race: 'C', age: '20s', gender: 'F' }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- LOGIC ---
  const handleLog = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        // Reset specific sale items but keep metal/base/payment as likely defaults
        setSale({...sale, category: '', series: '', style: '', chain: '', shape: '', colourLetter: '', price: ''});
      }, 1200);
    }, 800);
  };

  const toCaps = (val) => val.toUpperCase();

  // --- SHARED UI ---
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest mb-2 block">{children}</label>;

  const GridButton = ({ label, active, onClick, cols = "grid-cols-2" }) => (
    <button 
      onClick={onClick}
      className={`py-3 px-2 rounded-xl border text-[11px] font-bold transition-all shadow-sm
        ${active ? 'bg-[#1B3022] text-white border-[#1B3022]' : 'bg-white text-[#1B3022] border-gray-100'}`}
    >
      {label}
    </button>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#1B3022] rounded-full flex items-center justify-center mb-4 shadow-xl">
          <CheckCircle2 size={40} className="text-[#B5935E]" />
        </div>
        <h2 className="text-2xl font-serif italic text-[#1B3022]">Logged to Archive</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-4 max-w-md mx-auto">
      
      {/* 0. SESSION SETUP */}
      {step === 0 && (
        <div className="pt-8 space-y-6 animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif italic text-[#1B3022]">The Petal Archive</h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#B5935E] font-bold mt-1">Session Setup</p>
          </div>

          <div className="space-y-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50">
            <div>
              <Label>Organiser</Label>
              <input 
                className="w-full p-4 bg-[#FDFBF7] rounded-xl border-none outline-none ring-1 ring-gray-100"
                placeholder="E.G. CURATE / APW"
                value={session.organiser}
                onChange={e => setSession({...session, organiser: toCaps(e.target.value)})}
              />
            </div>

            <div>
              <Label>Location</Label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {['TRX Plaza', 'Waterfront, DPC', 'The Intermark', 'BSC', 'The Campus', 'Publika', 'Others'].map(loc => (
                  <GridButton 
                    key={loc} label={loc} 
                    active={session.location === loc} 
                    onClick={() => setSession({...session, location: loc})} 
                  />
                ))}
              </div>
              {session.location === 'Others' && (
                <input 
                  className="w-full p-3 mt-2 bg-[#FDFBF7] rounded-xl border-none outline-none ring-1 ring-gray-100 text-xs"
                  placeholder="TYPE LOCATION..."
                  onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})}
                />
              )}
            </div>

            <div>
              <Label>Date</Label>
              <input 
                type="date" className="w-full p-4 bg-[#FDFBF7] rounded-xl border-none outline-none ring-1 ring-gray-100"
                value={session.date} onChange={e => setSession({...session, date: e.target.value})}
              />
            </div>

            <button 
              onClick={() => setStep(1)} 
              disabled={!session.organiser || !session.location}
              className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold mt-4 shadow-lg disabled:opacity-20"
            >
              Start Session
            </button>
          </div>
        </div>
      )}

      {/* 1. SALES INPUT FLOW */}
      {step > 0 && (
        <div className="pb-24">
          <div className="flex justify-between items-center mb-6 px-1">
             <div className="text-[9px] font-black text-[#B5935E] uppercase tracking-tighter">
               {session.organiser} @ {session.location === 'Others' ? session.otherLocation : session.location}
             </div>
             <div className="text-[9px] font-bold text-gray-300">{session.date}</div>
          </div>

          {step === 1 && (
            <div className="space-y-5 animate-in slide-in-from-right duration-300">
              <section>
                <Label>1. Main Item</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (
                    <GridButton key={c} label={c} active={sale.category === c} onClick={() => setSale({...sale, category: c})} />
                  ))}
                </div>
              </section>

              <section>
                <Label>2. Series</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket'].map(s => (
                    <GridButton key={s} label={s} active={sale.series === s} onClick={() => setSale({...sale, series: s})} />
                  ))}
                </div>
              </section>

              <section>
                <Label>3. Style</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle'].map(st => (
                    <GridButton key={st} label={st} active={sale.style === st} onClick={() => setSale({...sale, style: st})} />
                  ))}
                </div>
              </section>

              <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold shadow-lg">Next: Material & Build</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-in slide-in-from-right duration-300">
              <section>
                <Label>Metal</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['STU', 'STG', 'STR', 'Brass'].map(m => (
                    <GridButton key={m} label={m} active={sale.metal === m} onClick={() => setSale({...sale, metal: m})} />
                  ))}
                </div>
              </section>

              <section>
                <Label>Chain Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Cable', 'Snake', 'Paperclip', 'M-Paperclip', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (
                    <GridButton key={ch} label={ch} active={sale.chain === ch} onClick={() => setSale({...sale, chain: ch})} />
                  ))}
                </div>
              </section>

              <div className="grid grid-cols-2 gap-4">
                <section>
                  <Label>Shape</Label>
                  <div className="flex flex-col gap-2">
                    {['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (
                      <GridButton key={sh} label={sh} active={sale.shape === sh} onClick={() => setSale({...sale, shape: sh})} />
                    ))}
                    {sale.shape === 'Others' && (
                      <input className="p-2 text-[10px] border-b outline-none uppercase" placeholder="DESCRIBE..." onChange={e => setSale({...sale, otherShape: toCaps(e.target.value)})} />
                    )}
                  </div>
                </section>
                <section>
                  <Label>Base</Label>
                  <div className="flex flex-col gap-2">
                    {['MOP (P)', 'Black (B)', 'White (W)', 'Clear (C)', 'Others'].map(b => (
                      <GridButton key={b} label={b} active={sale.base === b} onClick={() => setSale({...sale, base: b})} />
                    ))}
                    {sale.base === 'Others' && (
                      <input className="p-2 text-[10px] border-b outline-none uppercase" placeholder="DESCRIBE..." onChange={e => setSale({...sale, otherBase: toCaps(e.target.value)})} />
                    )}
                  </div>
                </section>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-bold">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-[#1B3022] text-white py-4 rounded-2xl font-bold">Details & Pay</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-400">
              <section>
                <Label>Colour / Letter</Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (
                    <GridButton key={col} label={col} active={sale.colourLetter === col} onClick={() => setSale({...sale, colourLetter: col})} />
                  ))}
                </div>
                {sale.colourLetter === 'Others' && (
                  <input className="w-full p-4 bg-white border border-gray-100 rounded-xl outline-none" placeholder="TYPE MANUALLY (ALL CAPS)..." onChange={e => setSale({...sale, otherColour: toCaps(e.target.value)})} />
                )}
              </section>

              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 text-center">
                <span className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest block mb-2">Sale Price</span>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-xl font-serif italic text-gray-300">RM</span>
                  <input type="number" className="w-32 text-5xl font-serif text-[#1B3022] text-center outline-none bg-transparent" placeholder="0" value={sale.price} onChange={e => setSale({...sale, price: e.target.value})} />
                </div>
                <div className="flex gap-1 mt-6">
                  {['TnG', 'Grab', 'Cash', 'Card'].map(p => (
                    <button key={p} onClick={() => setSale({...sale, payment: p})} className={`flex-1 py-2 text-[9px] font-black rounded-lg border ${sale.payment === p ? 'bg-[#1B3022] text-white' : 'bg-gray-50 text-gray-300'}`}>{p}</button>
                  ))}
                </div>
              </div>

              <section className="bg-white p-5 rounded-[2rem] border border-gray-100">
                <Label>Customer Profile</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {['F', 'M', 'O'].map(g => (
                      <button key={g} onClick={() => setSale({...sale, customer: {...sale.customer, gender: g}})} className={`flex-1 py-2 rounded-lg border text-[10px] font-black ${sale.customer.gender === g ? 'bg-[#1B3022] text-white' : 'bg-white text-gray-300'}`}>{g === 'O' ? 'OTHER' : g === 'F' ? 'FEMALE' : 'MALE'}</button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {['C', 'M', 'I', 'O'].map(r => (
                      <button key={r} onClick={() => setSale({...sale, customer: {...sale.customer, race: r}})} className={`flex-1 py-2 rounded-lg border text-[10px] font-black ${sale.customer.race === r ? 'bg-[#B5935E] text-white' : 'bg-white text-gray-300'}`}>{r}</button>
                    ))}
                  </div>
                  <div className="flex gap-1">
                    {['<20', '20-35', '35-50', '50+'].map(a => (
                      <button key={a} onClick={() => setSale({...sale, customer: {...sale.customer, age: a}})} className={`flex-1 py-2 rounded-lg border text-[10px] font-black ${sale.customer.age === a ? 'bg-[#B5935E] text-white' : 'bg-white text-gray-300'}`}>{a}</button>
                    ))}
                  </div>
                </div>
              </section>

              <button onClick={handleLog} className="w-full bg-[#1B3022] text-white py-6 rounded-3xl font-black text-xl shadow-2xl">
                {isSaving ? "LOGGING..." : "LOG SALE"}
              </button>
            </div>
          )}

          {/* NAV BAR */}
          <nav className="fixed bottom-6 left-4 right-4 bg-[#1B3022] rounded-2xl p-2 flex justify-around items-center z-50">
            <button onClick={() => setView('input')} className={`p-4 rounded-xl ${view === 'input' ? 'bg-[#B5935E] text-white' : 'text-gray-500'}`}><Plus size={20} /></button>
            <button onClick={() => setView('dashboard')} className={`p-4 rounded-xl ${view === 'dashboard' ? 'bg-[#B5935E] text-white' : 'text-gray-500'}`}><BarChart3 size={20} /></button>
            <button onClick={() => setStep(0)} className="p-4 text-gray-500"><Settings size={20} /></button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default PetalArchiveOS;
