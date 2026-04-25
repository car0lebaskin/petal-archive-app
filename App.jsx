import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, Calendar, Users, 
  CheckCircle2, Package, TrendingUp, Clock, History, LogOut, 
  ShoppingBag, Trash2, Receipt, BookOpen, ExternalLink, Activity
} from 'lucide-react';

const PetalArchiveOS = () => {
  // --- SESSION & PERSISTENCE ---
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [basket, setBasket] = useState([]);
  const [session, setSession] = useState({ 
    eventName: '', organiser: '', location: '', otherLocation: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  
  const [currentItem, setCurrentItem] = useState({
    category: '', series: '', style: '', metal: '', chain: '', otherChain: '', 
    shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: ''
  });

  const [customer, setCustomer] = useState({ race: 'C', age: '20s', gender: 'F', payment: 'QR' });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('petal_archive_v13_final');
    if (saved) { setSession(JSON.parse(saved)); setStep(1); }
  }, []);

  const startSession = () => {
    localStorage.setItem('petal_archive_v13_final', JSON.stringify(session));
    setStep(1);
  };

  const endSession = () => {
    if(window.confirm('End Bazaar Session? All local data will be reset.')) {
      localStorage.removeItem('petal_archive_v13_final');
      setStep(0); setView('input');
    }
  };

  // --- LOGIC ---
  const toCaps = (val) => val.toUpperCase();
  const addToBasket = () => {
    setBasket([...basket, { ...currentItem, id: Date.now() }]);
    setCurrentItem({ category: '', series: '', style: '', metal: '', chain: '', otherChain: '', shape: '', otherShape: '', base: '', otherBase: '', colourLetter: '', otherColour: '', price: '' });
    setStep(1); 
  };

  // --- PRICE DIRECTORY DATA (From Images) ---
  const priceDirectory = [
    { cat: "Necklaces", items: [
      { n: "Cable/Snake Chain", p: "95" }, { n: "Beaded/Kiss/M-Paperclip", p: "105" }, { n: "3-Pearl/Agate", p: "159" }, { n: "1/2 Pearl", p: "179" }, { n: "Full Pearl", p: "239" }
    ]},
    { cat: "Bracelets", items: [
      { n: "Snake/Box Slider", p: "95" }, { n: "M-Paperclip/Twist", p: "105" }, { n: "CZ/Big Link", p: "115" }, { n: "1/2 Pearl", p: "149" }, { n: "Charm (3 Charms)", p: "169" }
    ]},
    { cat: "Others", items: [
      { n: "Bangle (Twist)", p: "129" }, { n: "Bangle (Curb/Open)", p: "115" }, { n: "Earrings (Hoops)", p: "95" }, { n: "Earrings (Hook/Stud/Dangle)", p: "89" }, { n: "Rings", p: "89" }
    ]}
  ];

  // --- UI COMPONENTS ---
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2 block">{children}</label>;
  const GridBtn = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`py-3.5 px-1 rounded-xl border text-[10px] font-black transition-all ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'}`}>{label}</button>
  );

  const StatBar = ({ label, pct, color = "bg-[#B5935E]" }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-[8px] font-black uppercase text-gray-400"><span>{label}</span><span>{pct}%</span></div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden"><div className={`h-full ${color}`} style={{ width: `${pct}%` }} /></div>
    </div>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-[#1B3022] rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={40} className="text-[#B5935E]" /></motion.div>
        <h2 className="text-2xl font-serif italic text-[#1B3022]">Archive Updated</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1B3022] font-sans p-4 max-w-md mx-auto overflow-x-hidden pb-32">
      
      <AnimatePresence mode="wait">
        {/* STEP 0: SESSION SETUP */}
        {step === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-6 space-y-6">
            <header className="text-center">
              <h1 className="text-4xl font-serif italic text-[#1B3022]">The Petal Archive</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#B5935E] font-black mt-1">Command Centre</p>
            </header>
            <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-4">
              <div><Label>Event Name</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-xl border-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. TRX WEEKEND BAZAAR" value={session.eventName} onChange={e => setSession({...session, eventName: toCaps(e.target.value)})} /></div>
              <div><Label>Organiser</Label><input className="w-full p-4 bg-[#FDFBF7] rounded-xl border-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. CURATE" value={session.organiser} onChange={e => setSession({...session, organiser: toCaps(e.target.value)})} /></div>
              <div><Label>Location</Label>
                <div className="grid grid-cols-2 gap-2 mb-3">{['TRX Plaza', 'Waterfront', 'Intermark', 'BSC', 'Campus', 'Publika', 'Others'].map(loc => (<GridBtn key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />))}</div>
                {session.location === 'Others' && <input className="w-full p-3 bg-[#FDFBF7] rounded-xl ring-1 ring-gray-100 text-xs uppercase font-bold" placeholder="SPECIFY LOCATION..." value={session.otherLocation} onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})} />}
              </div>
              <div><Label>Date</Label><input type="date" className="w-full p-4 bg-[#FDFBF7] rounded-xl ring-1 ring-gray-100" value={session.date} onChange={e => setSession({...session, date: e.target.value})} /></div>
              <button onClick={startSession} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold shadow-lg mt-2">Open Session</button>
            </div>
          </motion.div>
        )}

        {/* INPUT VIEW */}
        {step > 0 && view === 'input' && (
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
            <div className="bg-[#1B3022] p-4 rounded-2xl flex justify-between items-center shadow-lg">
              <div className="text-white"><p className="text-[10px] font-black uppercase text-[#B5935E] tracking-widest">{session.eventName}</p><p className="text-[11px] font-serif italic">{basket.length} Items in Basket</p></div>
              {basket.length > 0 && <button onClick={() => setStep(3)} className="bg-[#B5935E] text-[#1B3022] px-4 py-2 rounded-xl text-[10px] font-black uppercase">Checkout</button>}
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <section><Label>1. Main Item</Label><div className="grid grid-cols-4 gap-2">{['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'].map(c => (<GridBtn key={c} label={c} active={currentItem.category === c} onClick={() => setCurrentItem({...currentItem, category: c})} />))}</div></section>
                <section><Label>2. Chain Type</Label><div className="grid grid-cols-4 gap-2">{['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (<GridBtn key={ch} label={ch} active={currentItem.chain === ch} onClick={() => setCurrentItem({...currentItem, chain: ch})} />))}</div>{currentItem.chain === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase text-[#B5935E]" placeholder="SPECIFY CHAIN..." onChange={e => setCurrentItem({...currentItem, otherChain: toCaps(e.target.value)})} />}</section>
                <div className="grid grid-cols-2 gap-4">
                  <section><Label>3. Series</Label><div className="grid grid-cols-1 gap-2">{['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None'].map(s => (<GridBtn key={s} label={s} active={currentItem.series === s} onClick={() => setCurrentItem({...currentItem, series: s})} />))}</div></section>
                  <section><Label>4. Style</Label><div className="grid grid-cols-1 gap-2">{['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'Slider', 'None'].map(st => (<GridBtn key={st} label={st} active={currentItem.style === st} onClick={() => setCurrentItem({...currentItem, style: st})} />))}</div></section>
                </div>
                <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-black text-sm shadow-xl">NEXT DETAILS</button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <section><Label>Metal</Label><div className="grid grid-cols-4 gap-2">{['STU', 'STG', 'STR', 'Brass'].map(m => (<GridBtn key={m} label={m} active={currentItem.metal === m} onClick={() => setCurrentItem({...currentItem, metal: m})} />))}</div></section>
                <section><Label>Shape</Label><div className="grid grid-cols-3 gap-2">{['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'].map(sh => (<GridBtn key={sh} label={sh} active={currentItem.shape === sh} onClick={() => setCurrentItem({...currentItem, shape: sh})} />))}</div>{currentItem.shape === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase" placeholder="SPECIFY SHAPE..." onChange={e => setCurrentItem({...currentItem, otherShape: toCaps(e.target.value)})} />}</section>
                <section><Label>Base</Label><div className="grid grid-cols-3 gap-2">{['MOP', 'Black', 'White', 'Clear', 'Others'].map(b => (<GridBtn key={b} label={b} active={currentItem.base === b} onClick={() => setCurrentItem({...currentItem, base: b})} />))}</div>{currentItem.base === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase" placeholder="SPECIFY BASE..." onChange={e => setCurrentItem({...currentItem, otherBase: toCaps(e.target.value)})} />}</section>
                <section><Label>Colour / Letter</Label><div className="grid grid-cols-3 gap-2">{['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'].map(col => (<GridBtn key={col} label={col} active={currentItem.colourLetter === col} onClick={() => setCurrentItem({...currentItem, colourLetter: col})} />))}</div>{currentItem.colourLetter === 'Others' && <input className="w-full mt-3 p-4 bg-white border border-gray-100 rounded-xl outline-none text-[10px] font-black uppercase" placeholder="SPECIFY COLOUR/LETTER..." onChange={e => setCurrentItem({...currentItem, otherColour: toCaps(e.target.value)})} />}</section>
                <section><Label>Price (RM)</Label><input type="number" className="w-full p-4 bg-white border border-gray-100 rounded-2xl outline-none text-2xl font-serif" placeholder="0" value={currentItem.price} onChange={e => setCurrentItem({...currentItem, price: e.target.value})} /></section>
                <div className="flex gap-4"><button onClick={() => setStep(1)} className="flex-1 py-4 text-gray-400 font-bold text-[10px] uppercase">Back</button><button onClick={addToBasket} disabled={!currentItem.price} className="flex-[2] bg-[#B5935E] text-[#1B3022] py-4 rounded-2xl font-black text-sm shadow-xl">ADD TO BASKET</button></div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[3rem] border border-gray-100 text-center shadow-sm">
                  <Label>Grand Total</Label>
                  <div className="text-6xl font-serif text-[#1B3022] mb-6">RM {basket.reduce((acc, item) => acc + Number(item.price || 0), 0)}</div>
                  <div className="grid grid-cols-3 gap-2">{['Cash', 'Card', 'QR'].map(p => (<button key={p} onClick={() => setCustomer({...customer, payment: p})} className={`py-3 text-[10px] font-black rounded-xl border ${customer.payment === p ? 'bg-[#1B3022] text-white border-[#1B3022]' : 'bg-gray-50 text-gray-300 border-transparent'}`}>{p}</button>))}</div>
                </div>
                <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-4">
                  <Label>Customer Profile</Label>
                  <div className="flex gap-2">{['F', 'M'].map(g => (<button key={g} onClick={() => setCustomer({...customer, gender: g})} className={`py-3 rounded-xl border text-[10px] font-black ${customer.gender === g ? 'bg-[#1B3022] text-white' : 'bg-gray-50'}`}>{g === 'F' ? 'FEMALE' : 'MALE'}</button>))}</div>
                  <div className="grid grid-cols-4 gap-2">{['C', 'M', 'I', 'O'].map(r => (<button key={r} onClick={() => setCustomer({...customer, race: r})} className={`py-2 rounded-lg border text-[10px] font-black ${customer.race === r ? 'bg-[#B5935E] text-white' : 'bg-gray-50'}`}>{r}</button>))}</div>
                  <div className="grid grid-cols-5 gap-2">{['10s', '20s', '30s', '40s', '50s'].map(a => (<button key={a} onClick={() => setCustomer({...customer, age: a})} className={`py-2 rounded-lg border text-[10px] font-black ${customer.age === a ? 'bg-[#B5935E] text-white' : 'bg-gray-50'}`}>{a}</button>))}</div>
                </section>
                <button onClick={() => { setShowSuccess(true); setBasket([]); setStep(1); setTimeout(() => setShowSuccess(false), 1500); }} className="w-full bg-[#1B3022] text-white py-7 rounded-3xl font-black text-xl shadow-2xl tracking-widest uppercase">LOG TRANSACTION</button>
              </div>
            )}
          </motion.div>
        )}

        {/* SESSION INSIGHTS */}
        {view === 'dashboard' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Session Insights</h2><p className="text-[9px] text-[#B5935E] font-black uppercase tracking-[0.4em] mt-1">Today at {session.location}</p></header>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1B3022] p-6 rounded-[2.5rem] text-white shadow-xl"><p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">Revenue</p><h3 className="text-3xl font-serif italic mt-1">RM 1,240</h3></div>
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm"><p className="text-[9px] font-bold text-[#B5935E] uppercase tracking-widest">Sold</p><h3 className="text-3xl font-serif italic text-[#1B3022] mt-1">18 pcs</h3></div>
            </div>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm space-y-4">
              <Label>Customer Profile (Daily)</Label>
              <div className="grid grid-cols-2 gap-4">
                <StatBar label="Chinese" pct={75} />
                <StatBar label="20s Range" pct={60} color="bg-[#1B3022]" />
              </div>
            </section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-50 shadow-sm">
              <Label>Peak Selling Period</Label>
              <div className="flex items-end gap-1 h-16 pt-2">
                {[10, 25, 45, 100, 90, 60, 30].map((h, i) => (<div key={i} className="flex-1 bg-[#1B3022] rounded-t-sm" style={{ height: `${h}%` }} />))}
              </div>
              <p className="text-[7px] text-gray-300 font-black mt-2 text-center uppercase tracking-widest">12PM — 4PM (Peak Rush)</p>
            </section>
          </motion.div>
        )}

        {/* BUSINESS INTELLIGENCE */}
        {view === 'history' && step > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Business Intelligence</h2></header>
            <section className="bg-[#1B3022] p-8 rounded-[3rem] text-white shadow-xl">
              <div className="flex justify-between items-center mb-4"><Label><span className="text-[#B5935E]">Location Rivalry</span></Label><Activity size={16} className="text-[#B5935E]"/></div>
              <div className="space-y-4">
                 <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-[10px] uppercase font-bold text-white/50">TRX Plaza</span><span className="font-serif italic text-[#B5935E]">RM 4,200</span></div>
                 <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-[10px] uppercase font-bold text-white/50">Waterfront</span><span className="font-serif italic text-[#B5935E]">RM 3,100</span></div>
              </div>
            </section>
            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <Label>Monthly Revenue</Label>
              <div className="flex items-end gap-1 h-32 pt-4">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-[#1B3022] rounded-t-sm" style={{ height: `${(i+1)*8}%` }} />
                    <span className="text-[7px] font-black text-gray-300">{m}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* COMMAND CENTRE (Settings) */}
        {view === 'settings' && step > 0 && (
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-6 pb-32">
            <header className="text-center py-6"><h2 className="text-3xl font-serif italic text-[#1B3022]">Command Centre</h2></header>
            
            <section className="bg-[#1B3022] p-8 rounded-[3rem] text-white shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-[#B5935E]"><Receipt size={18}/><Label><span className="text-[#B5935E]">Expense Tracker</span></Label></div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl"><span className="text-[10px] font-black uppercase opacity-50">Today's Cost</span><span className="text-lg font-serif">RM 450.00</span></div>
              <button className="w-full py-3 bg-[#B5935E] text-[#1B3022] rounded-xl text-[10px] font-black uppercase tracking-widest">Add New Expense</button>
            </section>

            <section className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-6"><BookOpen size={18} className="text-[#B5935E]"/><Label>Price Directory</Label></div>
              <div className="space-y-4">
                {priceDirectory.map((group, i) => (
                  <div key={i} className="space-y-2">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[#B5935E]">{group.cat}</p>
                    {group.items.map((item, j) => (
                      <div key={j} className="flex justify-between text-[10px] border-b border-gray-50 pb-1">
                        <span className="font-bold text-gray-400 uppercase tracking-tighter">{item.n}</span>
                        <span className="font-serif italic text-[#1B3022]">RM {item.p}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <a href="#" className="flex items-center justify-center gap-2 w-full p-4 bg-[#E8EEE9] rounded-2xl text-[10px] font-black uppercase tracking-widest">
              <ExternalLink size={14}/> Access Master Sheets
            </a>

            <button onClick={endSession} className="w-full bg-red-50 text-red-400 py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center gap-2"><LogOut size={14}/> Close Bazaar Session</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVIGATION */}
      {step > 0 && (
        <nav className="fixed bottom-8 left-6 right-6 bg-[#1B3022] rounded-[2.5rem] p-2 flex justify-around items-center z-50 shadow-2xl">
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
 
