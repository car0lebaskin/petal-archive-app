import React, { useState, useEffect } from 'react';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, 
  Calendar, Users, CheckCircle2, Package, TrendingUp, Clock, History, LogOut, ShoppingBag, Trash2, LineChart, Layers, Database, ChevronDown, FileText
} from 'lucide-react';

const PetalArchiveOS = () => {
  // --- CORE STATE ---
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [basket, setBasket] = useState([]);
  const [activePriceCat, setActivePriceCat] = useState(null);
  
  const [session, setSession] = useState({ 
    eventName: '', organiser: '', location: '', otherLocation: '', 
    date: new Date().toISOString().split('T')[0],
    boothFee: '', otherExpenses: 0
  });
  
  const [currentItem, setCurrentItem] = useState({
    category: '', series: '', style: '', metal: '', chain: '', otherChain: '', shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: ''
  });

  const [customer, setCustomer] = useState({ race: 'C', age: '20s', gender: 'F', payment: 'TnG' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- PERSISTENCE ENGINE ---
  useEffect(() => {
    const savedSession = localStorage.getItem('pa_session');
    const savedBasket = localStorage.getItem('pa_basket');
    const savedStep = localStorage.getItem('pa_step');
    const savedView = localStorage.getItem('pa_view');

    if (savedSession) setSession(JSON.parse(savedSession));
    if (savedBasket) setBasket(JSON.parse(savedBasket));
    if (savedStep) setStep(Number(savedStep));
    if (savedView) setView(savedView);
  }, []);

  useEffect(() => {
    if (step > 0) {
      localStorage.setItem('pa_session', JSON.stringify(session));
      localStorage.setItem('pa_basket', JSON.stringify(basket));
      localStorage.setItem('pa_step', step.toString());
      localStorage.setItem('pa_view', view);
    }
  }, [session, basket, step, view]);

  const endSession = () => {
    if(window.confirm('End Session? This clears ALL memory for this bazaar.')) {
      localStorage.clear();
      setSession({ eventName: '', organiser: '', location: '', otherLocation: '', date: new Date().toISOString().split('T')[0], boothFee: '', otherExpenses: 0 });
      setBasket([]);
      setStep(0);
      setView('input');
    }
  };

  // --- HELPERS ---
  const toCaps = (val) => val ? val.toUpperCase() : '';
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-3 block">{children}</label>;
  
  const GridButton = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`py-4 px-1 rounded-xl border text-[10px] font-black transition-all ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm active:bg-gray-50'}`}>{label}</button>
  );

  const StatBar = ({ label, percentage, color = "bg-[#B5935E]" }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[8px] font-black uppercase text-gray-400"><span>{label}</span><span>{percentage}%</span></div>
      <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${percentage}%` }} /></div>
    </div>
  );

  // --- PRICE DIRECTORY DATA ---
  const priceList = [
    { 
      category: 'Necklaces', 
      items: [
        { name: 'Cable / Snake Chain', price: 'RM 95' },
        { name: 'Beaded / Kiss / M-Paper / Paperclip', price: 'RM 105' },
        { name: 'Etc. Chain Types', price: 'RM 129' },
        { name: '3-Pearl / 3-Agate / W-CZ / Multi CZ', price: 'RM 159' },
        { name: '1/2 Pearl / Full Pearl (Std)', price: 'RM 179' },
        { name: 'Full Pearl (Premium)', price: 'RM 239' }
      ] 
    },
    { 
      category: 'Bracelets', 
      items: [
        { name: 'Snake / Skinny / Thick / Box Slider', price: 'RM 95' },
        { name: 'M-Paper / Paperclip / Twist', price: 'RM 105' },
        { name: 'Pretzel / etc / CZ Big Link / Knot', price: 'RM 115' },
        { name: 'Spl M-Paper (W/B/CZ)', price: 'RM 115' },
        { name: '1/2 Pearl Bracelet', price: 'RM 149' },
        { name: 'Charm Bracelet (3 Charms)', price: 'RM 169' }
      ] 
    },
    {
      category: 'Bangles & Rings',
      items: [
        { name: 'Bangle (Curb link / Open)', price: 'RM 115' },
        { name: 'Bangle (Twist)', price: 'RM 129' },
        { name: 'Rings (Standard)', price: 'RM 89' }
      ]
    },
    {
      category: 'Earrings',
      items: [
        { name: 'Hook / Studs / Dangle', price: 'RM 89' },
        { name: 'Hoops / Pebble Large', price: 'RM 95' },
        { name: 'Pebble Small', price: 'RM 89' }
      ]
    },
    {
      category: 'Add-ons & Standalone',
      items: [
        { name: 'Pendant (Alone)', price: 'RM 75' },
        { name: 'Floral / STG PDP Charm (Alone)', price: 'RM 55' },
        { name: 'Letter Charm (Alone)', price: 'RM 45' },
        { name: 'Add-on Floral / STG PDP', price: 'RM 40' },
        { name: 'Add-on Letter Charm', price: 'RM 30' }
      ]
    }
  ];

  const globalRules = [
    { rule: 'Chains Alone', desc: 'Minus RM 30 from original item price' },
    { rule: 'Clover Items', desc: 'Plus RM 14 to original price' }
  ];

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in">
        <div className="w-24 h-24 bg-[#1B3022] rounded-full flex items-center justify-center mb-6 shadow-2xl animate-pulse"><CheckCircle2 size={48} className="text-[#B5935E]" /></div>
        <h2 className="text-3xl font-serif italic text-[#1B3022]">Logged to Archive</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-5 max-w-md mx-auto overflow-x-hidden pb-32">
      
      {/* 0. STARTUP: SESSION SETUP (PAGE 0) */}
      {step === 0 && (
        <div className="pt-10 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-serif italic text-[#1B3022]">The Petal Archive</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#B5935E] font-black mt-2">Sales Tracker</p>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-5">
            <div><Label>Event Name</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-2xl border-none outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. 163 MALL MAY" value={session.eventName} onChange={e => setSession({...session, eventName: toCaps(e.target.value)})} /></div>
            <div><Label>Organiser</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-2xl border-none outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. CURATE" value={session.organiser} onChange={e => setSession({...session, organiser: toCaps(e.target.value)})} /></div>
            <div>
              <Label>Location</Label>
              <div className="grid grid-cols-2 gap-2">
                {['163 Mall', 'Waterfront', 'Intermark', 'BSC', 'The Campus', 'Publika', 'Others'].map(loc => (<GridButton key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />))}
              </div>
              {session.location === 'Others' && <input className="w-full mt-2 p-3 bg-[#FDFBF7] rounded-xl outline-none ring-1 ring-gray-100 text-xs font-bold uppercase" placeholder="SPECIFY LOCATION..." value={session.otherLocation} onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})} />}
            </div>
            <div><Label>Date</Label><div className="relative"><Calendar className="absolute left-4 top-4 text-[#B5935E]" size={18} /><input type="date" className="w-full pl-12 p-4 bg-[#FDFBF7] rounded-2xl outline-none ring-1 ring-gray-100 font-bold" value={session.date} onChange={e => setSession({...session, date: e.target.value})} /></div></div>
            <button onClick={() => setStep(1)} disabled={!session.location || !session.eventName} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold text-lg shadow-xl">Open Tracker</button>
          </div>
        </div>
      )}

      {/* 1. INPUT FLOW */}
      {step > 0 && view === 'input' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#1B3022] p-4 rounded-2xl shadow-lg sticky top-0 z-10 border border-white/10">
             <div className="flex items-center gap-3 text-white">
               <ShoppingBag size={20} className="text-[#B5935E]" />
               <div><p className="text-[9px] font-black uppercase text-[#B5935E]">{basket.length} Items</p><p className="text-[10px] opacity-50 uppercase tracking-tighter">{session.eventName} @ {session.location}</p></div>
             </div>
             {basket.length > 0 && <button onClick={() => setStep(3)} className="bg-[#B5935E] text-[#1B3022] px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-inner active:scale-95">Checkout</button>}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <section><Label>1. Main Item</Label><div className="grid grid-cols-4 gap-2">{['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (<GridButton key={c} label={c} active={currentItem.category === c} onClick={() => setCurrentItem({...currentItem, category: c})} />))}</div></section>
              <section><Label>2. Chain</Label>
                <div className="grid grid-cols-4 gap-2">{['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (<GridButton key={ch} label={ch} active={currentItem.chain === ch} onClick={() => setCurrentItem({...currentItem, chain: ch})} />))}</div>
                {currentItem.chain === 'Others' && <input className="w-full mt-2 p-3 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY CHAIN..." value={currentItem.otherChain} onChange={e => setCurrentItem({...currentItem, otherChain: toCaps(e.target.value)})} />}
              </section>
              <div className="grid grid-cols-2 gap-4">
                <section><Label>3. Series</Label><div className="grid grid-cols-1 gap-2">{['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None'].map(s => (<GridButton key={s} label={s} active={currentItem.series === s} onClick={() => setCurrentItem({...currentItem, series: s})} />))}</div></section>
                <section><Label>4. Style</Label><div className="grid grid-cols-1 gap-2">{['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'Slider', 'None'].map(st => (<GridButton key={st} label={st} active={currentItem.style === st} onClick={() => setCurrentItem({...currentItem, style: st})} />))}</div></section>
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-black shadow-lg">NEXT: DETAILS</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <section><Label>Metal</Label><div className="grid grid-cols-4 gap-2">{['STU', 'STG', 'STR', 'Brass'].map(m => (<GridButton key={m} label={m} active={currentItem.metal === m} onClick={() => setCurrentItem({...currentItem, metal: m})} />))}</div></section>
              <section><Label>Shape</Label><div className="grid grid-cols-3 gap-2">{['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (<GridButton key={sh} label={sh} active={currentItem.shape === sh} onClick={() => setCurrentItem({...currentItem, shape: sh})} />))}</div>
                {currentItem.shape === 'Others' && <input className="w-full mt-2 p-3 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY SHAPE..." value={currentItem.otherShape} onChange={e => setCurrentItem({...currentItem, otherShape: toCaps(e.target.value)})} />}
              </section>
              <section><Label>Base</Label><div className="grid grid-cols-3 gap-2">{['MOP', 'Black', 'White', 'Clear', 'Others'].map(b => (<GridButton key={b} label={b} active={currentItem.base === b} onClick={() => setCurrentItem({...currentItem, base: b})} />))}</div>
                {currentItem.base === 'Others' && <input className="w-full mt-2 p-3 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY BASE..." value={currentItem.otherBase} onChange={e => setCurrentItem({...currentItem, otherBase: toCaps(e.target.value)})} />}
              </section>
              <section><Label>Colour/Letter</Label><div className="grid grid-cols-3 gap-2">{['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (<GridButton key={col} label={col} active={currentItem.colourLetter === col} onClick={() => setCurrentItem({...currentItem, colourLetter: col})} />))}</div>
                {currentItem.colourLetter === 'Others' && <input className="w-full mt-2 p-3 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY COLOUR..." value={currentItem.otherColour} onChange={e => setCurrentItem({...currentItem, otherColour: toCaps(e.target.value)})} />}
              </section>
              <section><Label>Price (RM)</Label><input type="number" className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none text-3xl font-serif text-[#1B3022]" placeholder="0" value={currentItem.price} onChange={e => setCurrentItem({...currentItem, price: e.target.value})} /></section>
              <div className="flex gap-4 pt-4"><button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-bold uppercase text-[10px]">Back</button><button onClick={() => {setBasket([...basket, {...currentItem, id: Date.now()}]); setStep(1); setCurrentItem({category: '', series: '', style: '', metal: '', chain: '', otherChain: '', shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: ''})}} disabled={!currentItem.price} className="flex-[2] bg-[#B5935E] text-[#1B3022] py-4 rounded-2xl font-black text-sm shadow-xl">ADD TO BASKET</button></div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[3rem] border border-gray-100 text-center shadow-sm">
                <Label>Grand Total</Label>
                <div className="text-7xl font-serif text-[#1B3022] mb-6 tracking-tighter">RM {basket.reduce((acc, item) => acc + Number(item.price || 0), 0)}</div>
                <div className="grid grid-cols-4 gap-2">{['TnG', 'Grab', 'Cash', 'Card'].map(p => (<button key={p} onClick={() => setCustomer({...customer, payment: p})} className={`py-3 text-[10px] font-black rounded-xl border ${customer.payment === p ? 'bg-[#1B3022] text-white' : 'bg-gray-50 text-gray-300'}`}>{p}</button>))}</div>
              </div>
              <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-4">
                  <Label>Customer Profile</Label>
                  <div className="grid grid-cols-2 gap-3">{['F', 'M'].map(g => (<button key={g} onClick={() => setCustomer({...customer, gender: g})} className={`py-4 rounded-2xl border text-[11px] font-black ${customer.gender === g ? 'bg-[#1B3022] text-white' : 'bg-[#FDFBF7] text-gray-400'}`}>{g === 'F' ? 'FEMALE' : 'MALE'}</button>))}</div>
                  <div className="flex gap-2">{['C', 'M', 'I', 'O'].map(r => (<button key={r} onClick={() => setCustomer({...customer, race: r})} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${customer.race === r ? 'bg-[#B5935E] text-white' : 'bg-[#FDFBF7] text-gray-400'}`}>{r}</button>))}</div>
                  <div className="flex gap-1">{['10s', '20s', '30s', '40s', '50s'].map(a => (<button key={a} onClick={() => setCustomer({...customer, age: a})} className={`flex-1 py-3 rounded-xl border text-[10px] font-black ${customer.age === a ? 'bg-[#B5935E] text-white' : 'bg-[#FDFBF7] text-gray-400'}`}>{a}</button>))}</div>
              </section>
              <button onClick={() => { setIsSaving(true); setTimeout(() => { setShowSuccess(true); setBasket([]); setStep(1); setIsSaving(false); setTimeout(() => setShowSuccess(false), 1200); }, 1000); }} className="w-full bg-[#1B3022] text-white py-7 rounded-3xl font-black text-xl shadow-2xl tracking-widest uppercase">LOG {basket.length} ITEMS</button>
            </div>
          )}
        </div>
      )}

      {/* 2. DASHBOARD & 3. HISTORY (PLACEHOLDERS) */}
      {view === 'dashboard' && step > 0 && <div className="text-center py-20 font-serif italic">Dashboard Loading...</div>}
      {view === 'history' && step > 0 && <div className="text-center py-20 font-serif italic">History Insights Loading...</div>}

      {/* 4. SETTINGS: COMMAND CENTER */}
      {view === 'settings' && step > 0 && (
        <div className="space-y-6 pb-20">
          <header className="text-center py-6"><h2 className="text-3xl font-serif italic">Command Center</h2></header>
          
          <section className="bg-[#1B3022] p-6 rounded-[2rem] text-white shadow-lg">
            <div className="flex items-center gap-2 mb-4"><FileText size={16} className="text-[#B5935E]" /><span className="text-[10px] font-black uppercase tracking-widest">Quick Rules</span></div>
            <div className="space-y-3">{globalRules.map((r, i) => (<div key={i} className="flex justify-between items-start border-b border-white/10 pb-2"><span className="text-[10px] font-bold text-[#B5935E] uppercase">{r.rule}</span><span className="text-[9px] text-right opacity-80">{r.desc}</span></div>))}</div>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#FDFBF7] px-6 py-4 border-b border-gray-50 flex items-center gap-2"><Database size={14} className="text-[#B5935E]" /><span className="text-[10px] font-black uppercase tracking-widest">Price Directory</span></div>
            <div className="p-2 space-y-1">
              {priceList.map((cat, idx) => (
                <div key={idx} className="border-b border-gray-50 last:border-0">
                  <button onClick={() => setActivePriceCat(activePriceCat === idx ? null : idx)} className="w-full py-4 px-4 flex justify-between items-center"><span className="text-[11px] font-black uppercase text-[#1B3022] tracking-wider">{cat.category}</span><ChevronDown size={16} className={`text-[#B5935E] transition-transform ${activePriceCat === idx ? 'rotate-180' : ''}`} /></button>
                  {activePriceCat === idx && (<div className="px-4 pb-4 space-y-2">{cat.items.map((it, i) => (<div key={i} className="flex justify-between items-center bg-[#FDFBF7] p-3 rounded-xl border border-gray-100"><span className="text-[9px] font-bold text-gray-400 uppercase pr-4">{it.name}</span><span className="text-xs font-serif italic text-[#1B3022]">{it.price}</span></div>))}</div>)}
                </div>
              ))}
            </div>
          </section>

          <button onClick={endSession} className="w-full bg-red-50 text-red-400 py-6 rounded-3xl font-black text-[10px] uppercase border border-red-100">End Session</button>
        </div>
      )}

      {/* FIXED NAVIGATION */}
      {step > 0 && (
        <nav className="fixed bottom-8 left-6 right-6 bg-[#1B3022] rounded-[2.5rem] p-2 flex justify-around items-center z-50 shadow-2xl border border-white/5">
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
