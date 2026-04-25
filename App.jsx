import React, { useState } from 'react';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, 
  Calendar, Users, CheckCircle2, Package, TrendingUp, Clock, History, LogOut
} from 'lucide-react';

const PetalArchiveOS = () => {
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [session, setSession] = useState({
    organiser: '', location: '', otherLocation: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [sale, setSale] = useState({
    category: '', series: '', style: '', metal: '', 
    chain: '', otherChain: '', shape: '', otherShape: '', 
    base: '', otherBase: '', colourLetter: '', otherColour: '', 
    price: '', payment: 'TnG',
    customer: { race: 'C', age: '20-35', gender: 'F' }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toCaps = (val) => val.toUpperCase();

  // --- STYLING HELPERS ---
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-3 block">{children}</label>;

  const GridButton = ({ label, active, onClick }) => (
    <button 
      onClick={onClick}
      className={`py-3.5 px-1 rounded-xl border text-[10px] font-black transition-all duration-200
        ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md scale-[0.98]' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'}`}
    >
      {label}
    </button>
  );

  const StatBar = ({ label, percentage, color = "bg-[#B5935E]" }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-black uppercase text-gray-400">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-[#1B3022] rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <CheckCircle2 size={48} className="text-[#B5935E]" />
        </div>
        <h2 className="text-3xl font-serif italic text-[#1B3022]">Logged</h2>
        <p className="text-[#B5935E] font-bold text-[10px] uppercase tracking-widest mt-2 font-bold">Sales Sheet Updated</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-5 max-w-md mx-auto overflow-x-hidden">
      
      {/* 0. SALES TRACKER SETUP */}
      {step === 0 && (
        <div className="pt-10 space-y-8 animate-in fade-in duration-500">
          <div className="text-center">
            <h1 className="text-4xl font-serif italic text-[#1B3022]">The Petal Archive</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#B5935E] font-black mt-2">Sales Tracker</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
            <div>
              <Label>Organiser</Label>
              <input className="w-full p-4 bg-[#FDFBF7] rounded-2xl border-none outline-none ring-1 ring-gray-50 uppercase text-xs font-bold" placeholder="E.G. CURATE / BAZAAR" value={session.organiser} onChange={e => setSession({...session, organiser: toCaps(e.target.value)})} />
            </div>
            <div>
              <Label>Location</Label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {['TRX Plaza', 'Waterfront', 'Intermark', 'BSC', 'Campus', 'Publika', 'Others'].map(loc => (
                  <GridButton key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />
                ))}
              </div>
              {session.location === 'Others' && <input className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none ring-1 ring-gray-100 text-xs uppercase font-bold" placeholder="TYPE LOCATION..." onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})} />}
            </div>
            <div>
              <Label>Date</Label>
              <input type="date" className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none ring-1 ring-gray-100" value={session.date} onChange={e => setSession({...session, date: e.target.value})} />
            </div>
            <button onClick={() => setStep(1)} disabled={!session.location} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold text-lg shadow-lg">Open Tracker</button>
          </div>
        </div>
      )}

      {/* 1. INPUT VIEW */}
      {step > 0 && view === 'input' && (
        <div className="pb-28 animate-in slide-in-from-right duration-300">
          <div className="flex justify-between items-center mb-6 bg-white/60 p-3 rounded-2xl border border-white backdrop-blur-sm shadow-sm">
             <div className="text-[9px] font-black text-[#B5935E] uppercase tracking-tighter">
               {session.organiser} @ {session.location === 'Others' ? session.otherLocation : session.location}
             </div>
             <div className="text-[9px] font-bold text-gray-300 italic">{session.date}</div>
          </div>

          {step === 1 && (
            <div className="space-y-7">
              <section>
                <Label>1. Main Item</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (
                    <GridButton key={c} label={c} active={sale.category === c} onClick={() => setSale({...sale, category: c})} />
                  ))}
                </div>
              </section>

              <section>
                <Label>2. Chain Type</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (
                    <GridButton key={ch} label={ch} active={sale.chain === ch} onClick={() => setSale({...sale, chain: ch})} />
                  ))}
                </div>
                {sale.chain === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-2xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY CHAIN..." onChange={e => setSale({...sale, otherChain: toCaps(e.target.value)})} />}
              </section>

              <div className="grid grid-cols-2 gap-4">
                <section>
                  <Label>3. Series</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None'].map(s => (
                      <GridButton key={s} label={s} active={sale.series === s} onClick={() => setSale({...sale, series: s})} />
                    ))}
                  </div>
                </section>
                <section>
                  <Label>4. Style</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'Slider', 'None'].map(st => (
                      <GridButton key={st} label={st} active={sale.style === st} onClick={() => setSale({...sale, style: st})} />
                    ))}
                  </div>
                </section>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-black text-sm tracking-widest shadow-xl mt-4">NEXT: MATERIALS</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <section>
                <Label>Metal</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['STU', 'STG', 'STR', 'Brass'].map(m => (
                    <GridButton key={m} label={m} active={sale.metal === m} onClick={() => setSale({...sale, metal: m})} />
                  ))}
                </div>
              </section>

              <section>
                <Label>Shape Selection</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (
                    <GridButton key={sh} label={sh} active={sale.shape === sh} onClick={() => setSale({...sale, shape: sh})} />
                  ))}
                </div>
                {sale.shape === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-2xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY SHAPE..." onChange={e => setSale({...sale, otherShape: toCaps(e.target.value)})} />}
              </section>

              <section>
                <Label>Base Selection</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['MOP', 'Black', 'White', 'Clear', 'Others'].map(b => (
                    <GridButton key={b} label={b} active={sale.base === b} onClick={() => setSale({...sale, base: b})} />
                  ))}
                </div>
                {sale.base === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-2xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY BASE..." onChange={e => setSale({...sale, otherBase: toCaps(e.target.value)})} />}
              </section>

              <section>
                <Label>Colour / Letter</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (
                    <GridButton key={col} label={col} active={sale.colourLetter === col} onClick={() => setSale({...sale, colourLetter: col})} />
                  ))}
                </div>
                {sale.colourLetter === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-2xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY COLOUR/LETTER..." onChange={e => setSale({...sale, otherColour: toCaps(e.target.value)})} />}
              </section>

              <div className="flex gap-4 pt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-black uppercase text-[10px]">Back</button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-[#1B3022] text-white py-4 rounded-2xl font-black text-sm shadow-xl">PAYMENT & PROFILE</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 text-center shadow-sm">
                <Label>Price (RM)</Label>
                <input type="number" className="w-full text-7xl font-serif text-[#1B3022] text-center outline-none bg-transparent" placeholder="0" value={sale.price} onChange={e => setSale({...sale, price: e.target.value})} autoFocus />
                <div className="flex gap-2 mt-10">
                  {['TnG', 'Grab', 'Cash', 'Card'].map(p => (
                    <button key={p} onClick={() => setSale({...sale, payment: p})} className={`flex-1 py-3 text-[10px] font-black rounded-xl border ${sale.payment === p ? 'bg-[#1B3022] text-white' : 'bg-gray-50 text-gray-300 border-transparent'}`}>{p}</button>
                  ))}
                </div>
              </div>

              <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
                <Label>Customer Persona</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['F', 'M'].map(g => (
                    <button key={g} onClick={() => setSale({...sale, customer: {...sale.customer, gender: g}})} className={`py-4 rounded-2xl border text-[11px] font-black transition-all ${sale.customer.gender === g ? 'bg-[#1B3022] text-white' : 'bg-[#FDFBF7] text-gray-400'}`}>{g === 'F' ? 'FEMALE' : 'MALE'}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {['C', 'M', 'I', 'O'].map(r => (
                    <button key={r} onClick={() => setSale({...sale, customer: {...sale.customer, race: r}})} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${sale.customer.race === r ? 'bg-[#B5935E] text-white' : 'bg-[#FDFBF7] text-gray-400 border-transparent'}`}>{r}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {['<20', '20-35', '35-50', '50+'].map(a => (
                    <button key={a} onClick={() => setSale({...sale, customer: {...sale.customer, age: a}})} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${sale.customer.age === a ? 'bg-[#B5935E] text-white' : 'bg-[#FDFBF7] text-gray-400 border-transparent'}`}>{a}</button>
                  ))}
                </div>
              </section>

              <button onClick={() => { setIsSaving(true); setTimeout(() => { setShowSuccess(true); setIsSaving(false); setTimeout(() => { setShowSuccess(false); setStep(1); setSale({...sale, price: '', colourLetter: ''}); }, 1500)}, 1000)}} className="w-full bg-[#1B3022] text-white py-7 rounded-3xl font-black text-xl shadow-2xl shadow-green-900/40 uppercase tracking-widest">LOG SALE</button>
            </div>
          )}
        </div>
      )}

      {/* 2. DASHBOARD VIEW */}
      {step > 0 && view === 'dashboard' && (
        <div className="animate-in fade-in duration-500 pb-28">
          <header className="text-center py-8">
            <h2 className="text-3xl font-serif italic text-[#1B3022]">Live Insights</h2>
            <p className="text-[9px] text-[#B5935E] font-bold uppercase tracking-[0.4em] mt-1 italic">Session Analytics</p>
          </header>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#1B3022] p-6 rounded-[2.5rem] text-white shadow-xl">
              <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Revenue</p>
              <h3 className="text-3xl font-serif italic mt-1">RM 1,240</h3>
              <div className="flex items-center gap-1 text-[9px] text-[#B5935E] mt-3 font-black uppercase italic"><TrendingUp size={12} /> vs Last Event</div>
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between">
              <p className="text-[9px] font-bold text-[#B5935E] uppercase tracking-widest">ATV (Avg)</p>
              <h3 className="text-3xl font-serif italic text-[#1B3022]">RM 114</h3>
              <p className="text-[9px] text-gray-300 font-bold uppercase mt-2">18 PCS SOLD</p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
              <h4 className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest mb-6 border-b pb-2 flex justify-between items-center">
                <span>Top Sellers</span>
                <Package size={14}/>
              </h4>
              <div className="space-y-3">
                {[
                  { name: 'Necklace / CZ', rev: 'RM 520', pcs: 4 },
                  { name: 'Bracelet / Alphabet', rev: 'RM 380', pcs: 3 },
                  { name: 'Ring / Plain', rev: 'RM 220', pcs: 2 }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1B3022] uppercase text-[10px] tracking-tighter">{item.name}</span>
                    <div className="text-right">
                      <div className="font-serif italic text-[#B5935E]">{item.rev}</div>
                      <div className="text-[8px] text-gray-300 font-bold">{item.pcs} SOLD</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
              <h4 className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest mb-6 border-b pb-2 flex justify-between items-center">
                <span>Customer Profile</span>
                <Users size={14}/>
              </h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-4">
                  <StatBar label="Chinese" percentage={75} />
                  <StatBar label="Malay" percentage={15} />
                  <StatBar label="Indian" percentage={10} />
                </div>
                <div className="space-y-4">
                  <StatBar label="20-35" percentage={60} color="bg-[#1B3022]" />
                  <StatBar label="35-50" percentage={30} color="bg-[#1B3022]" />
                  <StatBar label="50+" percentage={10} color="bg-[#1B3022]" />
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
              <h4 className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest mb-6 border-b pb-2 flex justify-between items-center">
                <span>Peak Sales Hours</span>
                <Clock size={14}/>
              </h4>
              <div className="flex items-end gap-1 h-24 pt-4">
                {[15, 30, 45, 90, 80, 40, 20, 10].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-bold text-gray-300 uppercase mt-2">
                <span>11 AM</span>
                <span>3 PM (Peak)</span>
                <span>9 PM</span>
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
              <h4 className="text-[10px] font-black text-[#B5935E] uppercase tracking-widest mb-6 border-b pb-2 flex justify-between items-center">
                <span>Location Performance</span>
                <History size={14}/>
              </h4>
              <div className="space-y-4">
                {[
                  { loc: 'TRX Plaza', rev: 'RM 4,200', perf: 100 },
                  { loc: 'Publika', rev: 'RM 3,100', perf: 75 },
                  { loc: 'BSC', rev: 'RM 1,900', perf: 45 }
                ].map((l, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-black uppercase">
                      <span>{l.loc}</span>
                      <span className="font-serif italic">{l.rev}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                      <div className="h-full bg-[#B5935E]" style={{ width: `${l.perf}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 3. SETTINGS / SESSION MANAGER VIEW */}
      {step > 0 && view === 'settings' && (
        <div className="animate-in slide-in-from-bottom duration-500 pt-10 pb-28">
           <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif italic text-[#1B3022] mb-2">Session Manager</h2>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-8">Tracker configurations</p>
              
              <div className="space-y-6">
                <div className="flex justify-between border-b pb-4">
                  <span className="text-[10px] font-black text-[#B5935E] uppercase">Organiser</span>
                  <span className="text-xs font-bold text-[#1B3022]">{session.organiser}</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-[10px] font-black text-[#B5935E] uppercase">Venue</span>
                  <span className="text-xs font-bold text-[#1B3022]">{session.location}</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-[10px] font-black text-[#B5935E] uppercase">Date</span>
                  <span className="text-xs font-bold text-[#1B3022]">{session.date}</span>
                </div>
              </div>

              <div className="mt-12 space-y-3">
                <button onClick={() => setStep(0)} className="w-full bg-[#FDFBF7] text-[#1B3022] py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 border border-gray-100">
                   <MapPin size={14}/> Change Location
                </button>
                <button onClick={() => { if(window.confirm('End Session? Data will be locked.')){ setStep(0); setView('input'); }}} className="w-full bg-red-50 text-red-400 py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2">
                   <LogOut size={14}/> Close Session
                </button>
              </div>
           </div>
        </div>
      )}

      {/* FIXED BOTTOM NAVIGATION */}
      {step > 0 && (
        <nav className="fixed bottom-8 left-6 right-6 bg-[#1B3022] rounded-[2.5rem] p-2 flex justify-around items-center z-50 border border-white/5 shadow-2xl">
          <button onClick={() => setView('input')} className={`p-4 rounded-2xl transition-all ${view === 'input' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}><Plus size={24} /></button>
          <button onClick={() => setView('dashboard')} className={`p-4 rounded-2xl transition-all ${view === 'dashboard' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}><BarChart3 size={24} /></button>
          <button onClick={() => setView('settings')} className={`p-4 rounded-2xl transition-all ${view === 'settings' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}><Settings size={24} /></button>
        </nav>
      )}
    </div>
  );
};

export default PetalArchiveOS;
