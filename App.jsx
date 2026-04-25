import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, Calendar, Users, 
  CheckCircle2, Package, TrendingUp, Clock, History, LogOut, 
  ShoppingBag, Trash2, Receipt, BookOpen, ExternalLink, ChevronDown, ChevronUp, PieChart, Info
} from 'lucide-react';

const PetalArchiveOS = () => {
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [basket, setBasket] = useState([]);
  const [openPriceCat, setOpenPriceCat] = useState(null);
  const [session, setSession] = useState({ eventName: '', organiser: '', location: '', date: new Date().toISOString().split('T')[0] });
  const [currentItem, setCurrentItem] = useState({ category: '', series: '', style: '', metal: '', chain: '', shape: '', base: '', colourLetter: '', price: '' });
  const [customer, setCustomer] = useState({ race: 'C', age: '20s', gender: 'F', payment: 'QR' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('petal_archive_v16');
    if (saved) { setSession(JSON.parse(saved)); setStep(1); }
  }, []);

  const startSession = () => {
    localStorage.setItem('petal_archive_v16', JSON.stringify(session));
    setStep(1);
  };

  const endSession = () => {
    if(window.confirm('End Bazaar Session? All local tracker data will be reset.')) {
      localStorage.removeItem('petal_archive_v16');
      setStep(0); setView('input');
    }
  };

  const addToBasket = () => {
    setBasket([...basket, { ...currentItem, id: Date.now() }]);
    setCurrentItem({ category: '', series: '', style: '', metal: '', chain: '', shape: '', base: '', colourLetter: '', price: '' });
    setStep(1); 
  };

  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2 block">{children}</label>;
  const GridBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`py-4 px-1 rounded-xl border text-[10px] font-black transition-all ${active ? 'bg-[#1B3022] text-white border-[#1B3022]' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'}`}>{label}</button>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-4 max-w-md mx-auto pb-32">
      <AnimatePresence mode="wait">
        {/* PAGE 0: SALES TRACKER SETUP */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 space-y-6">
            <header className="text-center"><h1 className="text-4xl font-serif italic">The Petal Archive</h1><p className="text-[10px] uppercase tracking-[0.4em] text-[#B5935E] font-black mt-1">Sales Tracker</p></header>
            <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-5">
              <div><Label>Event Name</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-xl outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. HOLIDAY HOME MARKET" value={session.eventName} onChange={e => setSession({...session, eventName: e.target.value.toUpperCase()})} /></div>
              <div><Label>Organiser</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-xl outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. ROTAN LOT" value={session.organiser} onChange={e => setSession({...session, organiser: e.target.value.toUpperCase()})} /></div>
              <div><Label>Location</Label><div className="grid grid-cols-2 gap-2 mb-3">{['163 Mall', 'Waterfront', 'Intermark', 'BSC', 'The Campus', 'Publika', 'Others'].map(loc => (<GridBtn key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />))}</div></div>
              <div><Label>Date</Label><input type="date" className="w-full p-4 bg-[#FDFBF7] rounded-xl ring-1 ring-gray-100" value={session.date} onChange={e => setSession({...session, date: e.target.value})} /></div>
              <button onClick={startSession} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold shadow-xl">Open Tracker</button>
            </div>
          </motion.div>
        )}

        {/* INPUT VIEW */}
        {step > 0 && view === 'input' && (
          <motion.div initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="bg-[#1B3022] p-4 rounded-2xl flex justify-between items-center shadow-lg"><div className="text-white"><p className="text-[10px] font-black uppercase text-[#B5935E]">{session.organiser}</p><p className="text-[11px] font-serif italic">{basket.length} Items</p></div>{basket.length > 0 && <button onClick={() => setStep(3)} className="bg-[#B5935E] text-[#1B3022] px-5 py-2 rounded-xl text-[10px] font-black uppercase">Checkout</button>}</div>
            {step === 1 && (
              <div className="space-y-6">
                <section><Label>1. Main Item</Label><div className="grid grid-cols-4 gap-2">{['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (<GridBtn key={c} label={c} active={currentItem.category === c} onClick={() => setCurrentItem({...currentItem, category: c})} />))}</div></section>
                <section><Label>2. Chain Type</Label><div className="grid grid-cols-4 gap-2">{['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (<GridBtn key={ch} label={ch} active={currentItem.chain === ch} onClick={() => setCurrentItem({...currentItem, chain: ch})} />))}</div></section>
                <section><Label>3. Series</Label><div className="grid grid-cols-3 gap-2">{['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None'].map(s => (<GridBtn key={s} label={s} active={currentItem.series === s} onClick={() => setCurrentItem({...currentItem, series: s})} />))}</div></section>
                <section><Label>4. Style</Label><div className="grid grid-cols-3 gap-2">{['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'Slider', 'None'].map(st => (<GridBtn key={st} label={st} active={currentItem.style === st} onClick={() => setCurrentItem({...currentItem, style: st})} />))}</div></section>
                <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-black text-sm">NEXT: MATERIALS</button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-6">
                <section><Label>Metal</Label><div className="grid grid-cols-4 gap-2">{['STU', 'STG', 'STR', 'Brass'].map(m => (<GridBtn key={m} label={m} active={currentItem.metal === m} onClick={() => setCurrentItem({...currentItem, metal: m})} />))}</div></section>
                <section><Label>Shape</Label><div className="grid grid-cols-3 gap-2">{['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (<GridBtn key={sh} label={sh} active={currentItem.shape === sh} onClick={() => setCurrentItem({...currentItem, shape: sh})} />))}</div></section>
                <section><Label>Base</Label><div className="grid grid-cols-3 gap-2">{['MOP', 'Black', 'White', 'Clear', 'Others'].map(b => (<GridBtn key={b} label={b} active={currentItem.base === b} onClick={() => setCurrentItem({...currentItem, base: b})} />))}</div></section>
                <section><Label>Colour / Letter</Label><div className="grid grid-cols-3 gap-2">{['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (<GridBtn key={col} label={col} active={currentItem.colourLetter === col} onClick={() => setCurrentItem({...currentItem, colourLetter: col})} />))}</div></section>
                <section><Label>Price (RM)</Label><input type="number" className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none text-2xl font-serif text-[#1B3022]" value={currentItem.price} onChange={e => setCurrentItem({...currentItem, price: e.target.value})} /></section>
                <div className="flex gap-4"><button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-bold uppercase text-[10px]">Back</button><button onClick={addToBasket} disabled={!currentItem.price} className="flex-[2] bg-[#B5935E] text-[#1B3022] py-4 rounded-2xl font-black shadow-xl">ADD TO BASKET</button></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 text-center shadow-sm"><Label>Grand Total</Label><div className="text-6xl font-serif mb-6">RM {basket.reduce((acc, item) => acc + Number(item.price || 0), 0)}</div><div className="grid grid-cols-3 gap-2">{['Cash', 'Card', 'QR'].map(p => (<button key={p} onClick={() => setCustomer({...customer, payment: p})} className={`py-3 text-[10px] font-black rounded-xl border ${customer.payment === p ? 'bg-[#1B3022] text-white border-[#1B3022]' : 'bg-gray-50 text-gray-300'}`}>{p}</button>))}</div></div>
                <section className="bg-white p-8 rounded-[3rem] border border-gray-100 space-y-4"><Label>Customer Profile</Label><div className="flex gap-2"><button onClick={() => setCustomer({...customer, gender: 'F'})} className={`flex-1 py-4 rounded-2xl font-black text-[11px] ${customer.gender === 'F' ? 'bg-[#1B3022] text-white shadow-lg' : 'bg-gray-50'}`}>FEMALE</button><button onClick={() => setCustomer({...customer, gender: 'M'})} className={`flex-1 py-4 rounded-2xl font-black text-[11px] ${customer.gender === 'M' ? 'bg-[#1B3022] text-white shadow-lg' : 'bg-gray-50'}`}>MALE</button></div><div className="grid grid-cols-4 gap-2">{['C', 'M', 'I', 'O'].map(r => (<button key={r} onClick={() => setCustomer({...customer, race: r})} className={`py-2 rounded-lg text-[10px] font-black ${customer.race === r ? 'bg-[#B5935E] text-white' : 'bg-gray-50'}`}>{r}</button>))}</div><div className="grid grid-cols-5 gap-2">{['10s', '20s', '30s', '40s', '50s'].map(a => (<button key={a} onClick={() => setCustomer({...customer, age: a})} className={`py-2 rounded-lg text-[10px] font-black ${customer.age === a ? 'bg-[#B5935E] text-white' : 'bg-gray-50'}`}>{a}</button>))}</div></section>
                <button onClick={() => { setShowSuccess(true); setBasket([]); setStep(1); setTimeout(() => setShowSuccess(false), 1500); }} className="w-full bg-[#1B3022] text-white py-7 rounded-3xl font-black text-xl shadow-2xl tracking-widest uppercase">LOG TRANSACTION</button>
              </div>
            )}
          </motion.div>
        )}

        {/* SESSION INSIGHTS */}
        {view === 'dashboard' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic">Session Insights</h2></header>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B3022] p-6 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-between h-32"><p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Revenue Today</p><h3 className="text-3xl font-serif italic">RM 1,420</h3></div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-32"><p className="text-[9px] font-bold text-[#B5935E] uppercase tracking-widest">Pieces Sold</p><h3 className="text-3xl font-serif italic text-[#1B3022]">18</h3></div>
            </div>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100"><Label>Daily Customer Profile</Label><div className="flex gap-4"><div className="flex-1 space-y-2"><p className="text-[8px] font-black text-gray-400">Race Split</p><div className="flex h-1.5 rounded-full overflow-hidden"><div className="w-[70%] bg-[#B5935E]"/><div className="w-[30%] bg-[#1B3022]"/></div></div><div className="flex-1 space-y-2"><p className="text-[8px] font-black text-gray-400">Age Split</p><div className="flex h-1.5 rounded-full overflow-hidden"><div className="w-[60%] bg-[#1B3022]"/><div className="w-[40%] bg-gray-200"/></div></div></div></section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100"><Label>Top Categories Today</Label><div className="space-y-2">{['Necklace', 'Bracelet', 'Ring'].map((cat, i) => (<div key={i} className="flex justify-between text-[10px] font-black uppercase border-b border-gray-50 pb-2"><span>{cat}</span><span className="text-[#B5935E]">{8-i} sold</span></div>))}</div></section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm"><Label>Peak Selling Period</Label><div className="flex items-end gap-1 h-16 pt-4">{[15, 30, 70, 100, 85, 45, 20].map((h, i) => (<div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm" style={{ height: `${h}%` }} />))}</div></section>
          </motion.div>
        )}

        {/* BUSINESS INTELLIGENCE */}
        {view === 'history' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic">Business Intelligence</h2></header>
            <section className="bg-[#1B3022] p-8 rounded-[3rem] text-white shadow-xl"><Label><span className="text-[#B5935E]">Customer Revenue Visualisation</span></Label><div className="flex justify-center items-center py-4"><div className="relative w-32 h-32 rounded-full border-8 border-[#B5935E] flex items-center justify-center"><p className="text-[8px] uppercase font-black text-center">Spending by Race/Age</p></div></div><div className="grid grid-cols-2 gap-4 mt-4 text-[8px] font-black uppercase tracking-tighter"><div><span className="inline-block w-2 h-2 bg-[#B5935E] mr-1"/> Chinese: RM 2.8k</div><div><span className="inline-block w-2 h-2 bg-white/20 mr-1"/> 20s: RM 1.9k</div></div></section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100"><Label>Revenue Per Location (Daily Avg)</Label><div className="space-y-3">{[{l: '163 Mall', r: 'RM 1,840'}, {l: 'Waterfront', r: 'RM 1,420'}].map((loc, i) => (<div key={i} className="flex justify-between text-[11px] font-serif border-b border-gray-50 pb-2"><span className="text-gray-400 uppercase font-black text-[9px] not-italic">{loc.l}</span><span>{loc.r}</span></div>))}</div></section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100"><Label>Monthly Revenue</Label><div className="flex items-end gap-1 h-24 pt-4">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (<div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm" style={{ height: `${(i+1)*8}%` }} />))}</div></section>
          </motion.div>
        )}

        {/* COMMAND CENTER (Settings) */}
        {view === 'settings' && step > 0 && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Command Center</h2></header>
            {/* Quick Rules Section */}
            <section className="bg-[#1B3022] p-6 rounded-3xl text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-[#B5935E] font-black text-[10px] uppercase tracking-widest"><BookOpen size={14}/> Quick Rules</div>
              <div className="space-y-2 text-[9px] font-bold uppercase tracking-widest">
                <div className="flex justify-between border-b border-white/10 pb-2"><span>Chains Alone</span><span className="text-[#B5935E]">Minus RM 30 from original</span></div>
                <div className="flex justify-between"><span>Clover Items</span><span className="text-[#B5935E]">Plus RM 14 to original</span></div>
              </div>
            </section>
            {/* Price Directory Accordions */}
            <section className="bg-white p-2 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#B5935E]"/><Label>Price Directory</Label></div>
              <div className="space-y-1">
                {[{c: "Necklaces", i: [{n: "Cable / Snake Chain", p: "95"}, {n: "Beaded / Kiss / M-Paperclip", p: "105"}, {n: "Paperclip etc.", p: "129"}, {n: "3-Pearl / Agate", p: "159"}, {n: "1/2 Pearl / Full (Star)", p: "179"}, {n: "Full Pearl", p: "239"}]},
                  {c: "Bracelets", i: [{n: "Snake / Box Slider", p: "95"}, {n: "M-Paper / Twist / Paperclip", p: "105"}, {n: "CZ / Big Link / Knot", p: "115"}, {n: "1/2 Pearl", p: "149"}, {n: "Charm Bracelet (3 Charms)", p: "169"}]},
                  {c: "Bangles, Rings & Earrings", i: [{n: "Bangle (Twist)", p: "129"}, {n: "Bangle (Curb / Open Link)", p: "115"}, {n: "Hoop Earrings", p: "95"}, {n: "Hook / Stud / Dangle", p: "89"}, {n: "Pebble Large / Small", p: "95 / 89"}, {n: "Rings", p: "89"}]},
                  {c: "Add-Ons & Standalone", i: [{n: "Floral Charm", p: "40"}, {n: "Letter Charm", p: "30"}, {n: "Pendant Alone", p: "75"}, {n: "Floral Charm Alone", p: "55"}, {n: "Letter Charm Alone", p: "45"}]}
                ].map((group, i) => (
                  <div key={i} className="px-2">
                    <button onClick={() => setOpenPriceCat(openPriceCat === i ? null : i)} className="w-full p-4 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#1B3022] bg-[#FDFBF7] rounded-xl mb-1">
                      {group.c} {openPriceCat === i ? <ChevronUp size={12}/> : <ChevronDown size={12}/>}
                    </button>
                    {openPriceCat === i && (
                      <div className="p-4 space-y-3 bg-white border border-gray-50 rounded-xl mb-2 animate-in slide-in-from-top-2">
                        {group.i.map((it, j) => (<div key={j} className="flex justify-between text-[10px] border-b border-gray-50 pb-2 italic"><span className="text-gray-400 font-bold uppercase not-italic tracking-tighter">{it.n}</span><span className="font-serif italic text-[#1B3022]">RM {it.p}</span></div>))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            <a href="https://sheets.google.com" target="_blank" className="flex items-center justify-center gap-2 w-full p-4 bg-[#E8EEE9] rounded-2xl text-[10px] font-black uppercase tracking-widest"><ExternalLink size={14}/> Master Sheet Database</a>
            <button onClick={endSession} className="w-full bg-red-50 text-red-400 py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2">END SESSION</button>
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
