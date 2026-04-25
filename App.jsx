import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, Calendar, Users, 
  CheckCircle2, Package, TrendingUp, Clock, History, LogOut, 
  ShoppingBag, Trash2, Receipt, BookOpen, ExternalLink, ChevronDown, ChevronUp, PieChart
} from 'lucide-react';

const PetalArchiveOS = () => {
  // --- STATE ---
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [basket, setBasket] = useState([]);
  const [openPriceCat, setOpenPriceCat] = useState(null);
  const [session, setSession] = useState({ 
    eventName: '', organiser: '', location: '', otherLocation: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  
  const [currentItem, setCurrentItem] = useState({
    category: '', series: '', style: '', metal: '', chain: '', otherChain: '', 
    shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: ''
  });

  const [customer, setCustomer] = useState({ race: 'C', age: '20s', gender: 'F', payment: 'QR' });
  const [showSuccess, setShowSuccess] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    const saved = localStorage.getItem('petal_archive_v15');
    if (saved) { setSession(JSON.parse(saved)); setStep(1); }
  }, []);

  const startSession = () => {
    localStorage.setItem('petal_archive_v15', JSON.stringify(session));
    setStep(1);
  };

  const endSession = () => {
    if(window.confirm('End Session? Local tracker will be reset.')) {
      localStorage.removeItem('petal_archive_v15');
      setStep(0); setView('input');
    }
  };

  // --- HELPERS ---
  const toCaps = (val) => val.toUpperCase();
  const addToBasket = () => {
    setBasket([...basket, { ...currentItem, id: Date.now() }]);
    setCurrentItem({ category: '', series: '', style: '', metal: '', chain: '', otherChain: '', shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: '' });
    setStep(1); 
  };

  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2 block">{children}</label>;
  const GridBtn = ({ label, active, onClick, cols = "grid-cols-2" }) => (
    <button onClick={onClick} className={`py-3.5 px-1 rounded-xl border text-[10px] font-black transition-all ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm active:bg-gray-50'}`}>{label}</button>
  );

  // --- VIEWS ---
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#1B3022] rounded-full flex items-center justify-center mb-4 shadow-xl"><CheckCircle2 size={40} className="text-[#B5935E]" /></motion.div>
        <h2 className="text-2xl font-serif italic text-[#1B3022]">Logged to Sheets</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-4 max-w-md mx-auto pb-32 overflow-x-hidden">
      
      <AnimatePresence mode="wait">
        {/* STEP 0: SALES TRACKER SETUP */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 space-y-6">
            <header className="text-center"><h1 className="text-4xl font-serif italic">The Petal Archive</h1><p className="text-[10px] uppercase tracking-[0.4em] text-[#B5935E] font-black mt-1">Sales Tracker</p></header>
            <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
              <div><Label>Event Name</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-xl outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. WATERFRONT BAZAAR" value={session.eventName} onChange={e => setSession({...session, eventName: toCaps(e.target.value)})} /></div>
              <div><Label>Location</Label>
                <div className="grid grid-cols-2 gap-2 mb-3">{['163 Mall', 'Waterfront', 'Intermark', 'BSC', 'The Campus', 'Publika', 'Others'].map(loc => (<GridBtn key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />))}</div>
                {session.location === 'Others' && <input className="w-full p-3 bg-[#FDFBF7] rounded-xl ring-1 ring-gray-100 text-xs uppercase font-bold" placeholder="SPECIFY..." value={session.otherLocation} onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})} />}
              </div>
              <div><Label>Date</Label><input type="date" className="w-full p-4 bg-[#FDFBF7] rounded-xl ring-1 ring-gray-100" value={session.date} onChange={e => setSession({...session, date: e.target.value})} /></div>
              <button onClick={startSession} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold shadow-lg mt-2">Open Tracker</button>
            </div>
          </motion.div>
        )}

        {/* INPUT VIEW */}
        {step > 0 && view === 'input' && (
          <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="bg-[#1B3022] p-4 rounded-2xl flex justify-between items-center shadow-lg">
              <div className="text-white"><p className="text-[10px] font-black uppercase text-[#B5935E] tracking-widest">{session.location}</p><p className="text-[11px] font-serif italic">{basket.length} Items</p></div>
              {basket.length > 0 && <button onClick={() => setStep(3)} className="bg-[#B5935E] text-[#1B3022] px-5 py-2 rounded-xl text-[10px] font-black uppercase">Checkout</button>}
            </div>

            {step === 1 && (
              <div className="space-y-7">
                <section><Label>1. Main Item</Label><div className="grid grid-cols-4 gap-2">{['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (<GridBtn key={c} label={c} active={currentItem.category === c} onClick={() => setCurrentItem({...currentItem, category: c})} />))}</div></section>
                <section><Label>2. Chain Type</Label><div className="grid grid-cols-4 gap-2">{['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (<GridBtn key={ch} label={ch} active={currentItem.chain === ch} onClick={() => setCurrentItem({...currentItem, chain: ch})} />))}</div>{currentItem.chain === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY CHAIN..." onChange={e => setCurrentItem({...currentItem, otherChain: toCaps(e.target.value)})} />}</section>
                
                {/* Horizontal Layout for 3 & 4 */}
                <section><Label>3. Series</Label><div className="grid grid-cols-3 gap-2">{['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None'].map(s => (<GridBtn key={s} label={s} active={currentItem.series === s} onClick={() => setCurrentItem({...currentItem, series: s})} />))}</div></section>
                <section><Label>4. Style</Label><div className="grid grid-cols-3 gap-2">{['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'Slider', 'None'].map(st => (<GridBtn key={st} label={st} active={currentItem.style === st} onClick={() => setCurrentItem({...currentItem, style: st})} />))}</div></section>
                
                <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-black text-sm shadow-xl">NEXT DETAILS</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <section><Label>Metal</Label><div className="grid grid-cols-4 gap-2">{['STU', 'STG', 'STR', 'Brass'].map(m => (<GridBtn key={m} label={m} active={currentItem.metal === m} onClick={() => setCurrentItem({...currentItem, metal: m})} />))}</div></section>
                <section><Label>Shape Selection</Label><div className="grid grid-cols-3 gap-2">{['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (<GridBtn key={sh} label={sh} active={currentItem.shape === sh} onClick={() => setCurrentItem({...currentItem, shape: sh})} />))}</div>{currentItem.shape === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY SHAPE..." onChange={e => setCurrentItem({...currentItem, otherShape: toCaps(e.target.value)})} />}</section>
                <section><Label>Base Selection</Label><div className="grid grid-cols-3 gap-2">{['MOP', 'Black', 'White', 'Clear', 'Others'].map(b => (<GridBtn key={b} label={b} active={currentItem.base === b} onClick={() => setCurrentItem({...currentItem, base: b})} />))}</div>{currentItem.base === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY BASE..." onChange={e => setCurrentItem({...currentItem, otherBase: toCaps(e.target.value)})} />}</section>
                <section><Label>Colour / Letter</Label><div className="grid grid-cols-3 gap-2">{['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (<GridBtn key={col} label={col} active={currentItem.colourLetter === col} onClick={() => setCurrentItem({...currentItem, colourLetter: col})} />))}</div>{currentItem.colourLetter === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY COLOUR/LETTER..." onChange={e => setCurrentItem({...currentItem, otherColour: toCaps(e.target.value)})} />}</section>
                <section><Label>Price (RM)</Label><input type="number" className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none text-2xl font-serif text-[#1B3022]" placeholder="0" value={currentItem.price} onChange={e => setCurrentItem({...currentItem, price: e.target.value})} /></section>
                <div className="flex gap-4 pt-4"><button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-bold uppercase text-[10px]">Back</button><button onClick={addToBasket} disabled={!currentItem.price} className="flex-[2] bg-[#B5935E] text-[#1B3022] py-4 rounded-2xl font-black text-sm shadow-xl">ADD TO BASKET</button></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 text-center shadow-sm">
                  <Label>Grand Total</Label>
                  <div className="text-6xl font-serif text-[#1B3022] mb-6">RM {basket.reduce((acc, item) => acc + Number(item.price || 0), 0)}</div>
                  <div className="grid grid-cols-3 gap-2">{['Cash', 'Card', 'QR'].map(p => (<button key={p} onClick={() => setCustomer({...customer, payment: p})} className={`py-3 text-[10px] font-black rounded-xl border ${customer.payment === p ? 'bg-[#1B3022] text-white' : 'bg-gray-50'}`}>{p}</button>))}</div>
                </div>
                <section className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-4 shadow-sm">
                  <Label>Customer Profile</Label>
                  <div className="flex gap-2">
                    <button onClick={() => setCustomer({...customer, gender: 'F'})} className={`flex-1 py-4 rounded-2xl font-black text-[11px] ${customer.gender === 'F' ? 'bg-[#1B3022] text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}>FEMALE</button>
                    <button onClick={() => setCustomer({...customer, gender: 'M'})} className={`flex-1 py-4 rounded-2xl font-black text-[11px] ${customer.gender === 'M' ? 'bg-[#1B3022] text-white shadow-lg' : 'bg-gray-50 text-gray-300'}`}>MALE</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">{['C', 'M', 'I', 'O'].map(r => (<button key={r} onClick={() => setCustomer({...customer, race: r})} className={`py-2 rounded-lg text-[10px] font-black ${customer.race === r ? 'bg-[#B5935E] text-white shadow-md' : 'bg-gray-50 text-gray-300'}`}>{r}</button>))}</div>
                  <div className="grid grid-cols-5 gap-2">{['10s', '20s', '30s', '40s', '50s'].map(a => (<button key={a} onClick={() => setCustomer({...customer, age: a})} className={`py-2 rounded-lg text-[10px] font-black ${customer.age === a ? 'bg-[#B5935E] text-white shadow-md' : 'bg-gray-50 text-gray-300'}`}>{a}</button>))}</div>
                </section>
                <button onClick={() => { setShowSuccess(true); setBasket([]); setStep(1); setTimeout(() => setShowSuccess(false), 1500); }} className="w-full bg-[#1B3022] text-white py-7 rounded-3xl font-black text-xl shadow-2xl tracking-widest uppercase">LOG TRANSACTION</button>
              </div>
            )}
          </motion.div>
        )}

        {/* SESSION INSIGHTS */}
        {view === 'dashboard' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Session Insights</h2></header>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B3022] p-6 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between h-32">
                <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Revenue Today</p>
                <h3 className="text-3xl font-serif italic">RM 1,240</h3>
              </div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-32">
                <p className="text-[9px] font-bold text-[#B5935E] uppercase tracking-widest">Pieces Sold</p>
                <h3 className="text-3xl font-serif italic text-[#1B3022]">18 <span className="text-xs opacity-20 italic">pcs</span></h3>
              </div>
            </div>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <Label>Top Categories Sold</Label>
              <div className="space-y-3">
                 {[{n: 'Necklace', c: 8}, {n: 'Bracelet', c: 5}, {n: 'Earring', c: 3}, {n: 'Ring', c: 2}].map((cat, i) => (
                   <div key={i} className="flex justify-between text-[10px] font-black uppercase tracking-tighter border-b border-gray-50 pb-2">
                     <span>{cat.n}</span>
                     <span className="text-[#B5935E] italic font-serif">{cat.c} sold</span>
                   </div>
                 ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <Label>Hourly Sales Curve</Label>
              <div className="flex items-end gap-1 h-20 pt-4">
                {[15, 30, 70, 100, 85, 45, 20].map((h, i) => (<div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm" style={{ height: `${h}%` }} />))}
              </div>
              <p className="text-[7px] text-gray-300 font-black mt-2 text-center uppercase tracking-widest">1PM — 3PM Peak Period</p>
            </section>
          </motion.div>
        )}

        {/* BUSINESS INTELLIGENCE */}
        {view === 'history' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Business Intelligence</h2></header>
            
            <section className="bg-[#1B3022] p-8 rounded-[3rem] text-white shadow-xl space-y-4">
              <Label><span className="text-[#B5935E]">Revenue Per Location (Daily Avg)</span></Label>
              <div className="space-y-3">
                {[{l: '163 Mall', r: 'RM 1,840'}, {l: 'Waterfront', r: 'RM 1,420'}, {l: 'The Campus', r: 'RM 950'}].map((loc, i) => (
                  <div key={i} className="flex justify-between text-[11px] font-serif italic text-[#B5935E] border-b border-white/10 pb-2">
                    <span className="text-white/50 uppercase font-black text-[9px] not-italic">{loc.l}</span>
                    <span>{loc.r}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <Label>Monthly Revenue Year-to-Date</Label>
              <div className="flex items-end gap-1 h-24 pt-4">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                  <div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm opacity-80" style={{ height: `${(i+1)*8}%` }} />
                ))}
              </div>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><PieChart size={14} className="text-[#B5935E]"/><Label>Revenue by Customer Profile</Label></div>
              <div className="space-y-4">
                <div className="space-y-1"><p className="text-[8px] font-black uppercase text-gray-400">Race Split: Chinese (RM 2,840)</p><div className="w-full h-1 bg-[#B5935E] rounded-full" /></div>
                <div className="space-y-1"><p className="text-[8px] font-black uppercase text-gray-400">Age Split: 20s (RM 1,920)</p><div className="w-full h-1 bg-[#1B3022] rounded-full w-[65%]" /></div>
              </div>
            </section>
          </motion.div>
        )}

        {/* COMMAND CENTRE */}
        {view === 'settings' && step > 0 && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Command Centre</h2></header>
            
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6"><BookOpen size={18} className="text-[#B5935E]"/><Label>Price Directory</Label></div>
              <div className="space-y-2">
                {[{c: "Necklaces", i: [{n: "Cable/Snake", p: "95"}, {n: "3-Pearl", p: "159"}]}, {c: "Bracelets", i: [{n: "Snake Slider", p: "95"}]}].map((group, i) => (
                  <div key={i} className="border-b border-gray-50">
                    <button onClick={() => setOpenPriceCat(openPriceCat === i ? null : i)} className="w-full py-3 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {group.c} {openPriceCat === i ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                    </button>
                    {openPriceCat === i && (
                      <div className="pb-4 space-y-2">
                        {group.i.map((it, j) => (<div key={j} className="flex justify-between text-[10px] border-b border-gray-50 pb-1"><span>{it.n}</span><span className="font-serif italic text-[#B5935E]">RM {it.p}</span></div>))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <a href="#" target="_blank" className="flex items-center justify-center gap-2 w-full p-5 bg-[#E8EEE9] rounded-[2rem] text-[10px] font-black uppercase tracking-widest">
              <ExternalLink size={14}/> Master Database
            </a>

            <button onClick={endSession} className="w-full bg-red-50 text-red-400 py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2 mt-4"><LogOut size={14}/> Close Bazaar Session</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      {step > 0 && (
        <nav className="fixed bottom-8 left-6 right-6 bg-[#1B3022] rounded-[2.5rem] p-2 flex justify-around items-center z-50 shadow-2xl border border-white/5 backdrop-blur-md">
          <button onClick={() => setView('input')} className={`p-4 rounded-2xl transition-all ${view === 'input' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500'}`}><Plus size={22} /></button>
          <button onClick={() => setView('dashboard')} className={`p-4 rounded-2xl transition-all ${view === 'dashboard' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500'}`}><BarChart3 size={22} /></button>
          <button onClick={() => setView('history')} className={`p-4 rounded-2xl transition-all ${view === 'history' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500'}`}><History size={22} /></button>
          <button onClick={() => setView('settings')} className={`p-4 rounded-2xl transition-all ${view === 'settings' ? 'bg-[#B5935E] text-white shadow-lg' : 'text-gray-500'}`}><Settings size={22} /></button>
        </nav>
      )}
    </div>
  );
};

export default PetalArchiveOS;
