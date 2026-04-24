import React, { useState } from 'react';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, 
  Calendar, Users, CheckCircle2, Package, TrendingUp 
} from 'lucide-react';

const PetalArchiveOS = () => {
  // --- STATE ---
  const [view, setView] = useState('input'); // 'input' or 'dashboard'
  const [step, setStep] = useState(0); 
  const [session, setSession] = useState({
    organiser: '', location: '', otherLocation: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [sale, setSale] = useState({
    category: '', series: '', style: '', metal: 'STG', 
    chain: '', otherChain: '', shape: '', otherShape: '', 
    base: 'MOP (P)', otherBase: '', colourLetter: '', otherColour: '', 
    price: '', payment: 'TnG',
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
        setSale({...sale, category: '', series: '', style: '', chain: '', otherChain: '', shape: '', otherShape: '', colourLetter: '', otherColour: '', price: ''});
      }, 1200);
    }, 800);
  };

  const toCaps = (val) => val.toUpperCase();

  // --- REUSABLE UI ---
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2 block">{children}</label>;

  const GridButton = ({ label, active, onClick }) => (
    <button 
      onClick={onClick}
      className={`py-3 px-1 rounded-xl border text-[10px] font-bold transition-all
        ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'}`}
    >
      {label}
    </button>
  );

  // --- VIEWS ---

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-[#1B3022] rounded-full flex items-center justify-center mb-4 animate-bounce">
          <CheckCircle2 size={40} className="text-[#B5935E]" />
        </div>
        <h2 className="text-2xl font-serif italic text-[#1B3022]">Archive Updated</h2>
      </div>
    );
  }

  const renderDashboard = () => (
    <div className="animate-in fade-in duration-500 pb-24">
      <header className="text-center py-8">
        <h2 className="text-3xl font-serif italic text-[#1B3022]">Live Insights</h2>
        <p className="text-[9px] text-[#B5935E] font-bold uppercase tracking-[0.3em] mt-1">Real-time Performance</p>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1B3022] p-5 rounded-[2rem] text-white shadow-xl">
          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest">Est. Revenue</p>
          <h3 className="text-2xl font-serif italic mt-1">RM 845</h3>
          <div className="flex items-center gap-1 text-[9px] text-[#B5935E] mt-2 font-bold uppercase">
            <TrendingUp size={12} /> vs Last Event
          </div>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[9px] font-bold text-[#B5935E] uppercase tracking-widest">Pieces Sold</p>
          <h3 className="text-2xl font-serif italic text-[#1B3022] mt-1">12</h3>
          <p className="text-[9px] text-gray-300 font-bold uppercase mt-2">Bazaar Goal: 20</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-6">
        <section>
          <h4 className="text-[10px] font-black text-[#B5935E] uppercase mb-4 flex items-center gap-2"><Package size={14} /> Hot Sellers</h4>
          <div className="space-y-3">
            {['Necklace (CZ)', 'Alphabet Series', 'Earrings'].map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-[#FDFBF7] p-3 rounded-xl border border-gray-50">
                <span className="text-[11px] font-bold text-[#1B3022] uppercase tracking-tighter">{item}</span>
                <span className="text-xs font-serif italic text-[#B5935E]">{8 - (i*2)} sold</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderInputFlow = () => (
    <div className="animate-in slide-in-from-right duration-300 pb-28">
      {/* Tracker Status Header */}
      <div className="flex justify-between items-center mb-6 bg-white/50 p-3 rounded-2xl border border-white">
         <div className="text-[9px] font-black text-[#B5935E] uppercase tracking-tighter">
           {session.organiser} @ {session.location === 'Others' ? session.otherLocation : session.location}
         </div>
         <div className="text-[9px] font-bold text-gray-300">{session.date}</div>
      </div>

      {/* STEP 1: IDENTITY */}
      {step === 1 && (
        <div className="space-y-6">
          <section>
            <Label>1. Main Item</Label>
            <div className="grid grid-cols-4 gap-2">
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
          <button onClick={() => setStep(2)} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold shadow-lg mt-4">Next: Build Details</button>
        </div>
      )}

      {/* STEP 2: BUILD & COLOUR */}
      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
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
              {['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'].map(ch => (
                <GridButton key={ch} label={ch} active={sale.chain === ch} onClick={() => setSale({...sale, chain: ch})} />
              ))}
            </div>
            {sale.chain === 'Others' && (
              <input 
                className="w-full mt-2 p-3 bg-white border border-gray-100 rounded-xl outline-none text-[10px] uppercase font-bold" 
                placeholder="TYPE CHAIN TYPE (ALL CAPS)..." 
                onChange={e => setSale({...sale, otherChain: toCaps(e.target.value)})} 
              />
            )}
          </section>

          <section>
            <Label>Shape & Base</Label>
            <div className="grid grid
