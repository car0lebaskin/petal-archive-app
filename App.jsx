import React, { useState } from 'react';
import { 
  Plus, BarChart3, Settings, ChevronRight, MapPin, 
  Calendar, Users, CheckCircle2, Package, TrendingUp, Clock, History, LogOut, ShoppingBag, Trash2
} from 'lucide-react';

const PetalArchiveOS = () => {
  const [view, setView] = useState('input'); 
  const [step, setStep] = useState(0); 
  const [basket, setBasket] = useState([]);
  const [session, setSession] = useState({
    organiser: '', location: '', otherLocation: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [currentItem, setCurrentItem] = useState({
    category: '', series: '', style: '', metal: '', 
    chain: '', otherChain: '', shape: '', otherShape: '', 
    base: '', otherBase: '', colourLetter: '', otherColour: '', 
    price: ''
  });

  const [customer, setCustomer] = useState({
    race: 'C', age: '20-35', gender: 'F', payment: 'TnG'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toCaps = (val) => val.toUpperCase();

  const addToBasket = () => {
    setBasket([...basket, { ...currentItem, id: Date.now() }]);
    setCurrentItem({
      category: '', series: '', style: '', metal: '', 
      chain: '', otherChain: '', shape: '', otherShape: '', 
      base: '', otherBase: '', colourLetter: '', otherColour: '', 
      price: ''
    });
    setStep(1); 
  };

  // --- UI HELPERS ---
  const Label = ({ children }) => <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-3 block">{children}</label>;
  const GridButton = ({ label, active, onClick }) => (
    <button onClick={onClick} className={`py-3.5 px-1 rounded-xl border text-[10px] font-black transition-all duration-200 ${active ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md scale-[0.98]' : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'}`}>
      {label}
    </button>
  );

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-[#1B3022] rounded-full flex items-center justify-center mb-6 shadow-2xl"><CheckCircle2 size={48} className="text-[#B5935E]" /></div>
        <h2 className="text-3xl font-serif italic text-[#1B3022]">Logged</h2>
        <p className="text-[#B5935E] font-bold text-[10px] uppercase tracking-widest mt-2">Archive Updated</p>
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
              <input className="w-full p-4 bg-[#FDFBF7] rounded-2xl border-none outline-none ring-1 ring-gray-100 uppercase text-xs font-bold" placeholder="E.G. CURATE / BAZAAR" value={session.organiser} onChange={e => setSession({...session, organiser: toCaps(e.target.value)})} />
            </div>
            <div>
              <Label>Location</Label>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {['TRX Plaza', 'Waterfront', 'Intermark', 'BSC', 'Campus', 'Publika', 'Others'].map(loc => (
                  <GridButton key={loc} label={loc} active={session.location === loc} onClick={() => setSession({...session, location: loc})} />
                ))}
              </div>
              {session.location === 'Others' && <input className="w-full p-4 bg-[#FDFBF7] rounded-2xl outline-none ring-1 ring-gray-100 text-xs uppercase font-bold" placeholder="SPECIFY LOCATION..." value={session.otherLocation} onChange={e => setSession({...session, otherLocation: toCaps(e.target.value)})} />}
            </div>
            <div>
              <Label>Date</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-[#B5935E]" size={18} />
                <input type="date" className="w-full pl-12 p-4 bg-[#FDFBF7] rounded-2xl outline-none ring-1 ring-gray-100" value={session.date} onChange={e => setSession({...session, date: e.target.value})} />
              </div>
            </div>
            <button onClick={() => setStep(1)} disabled={!session.location} className="w-full bg-[#1B3022] text-white py-5 rounded-2xl font-bold text-lg shadow-lg">Open Tracker</button>
          </div>
        </div>
      )}

      {/* 1. INPUT VIEW */}
      {step > 0 && view === 'input' && (
        <div className="pb-32 animate-in slide-in-from-right duration-300">
