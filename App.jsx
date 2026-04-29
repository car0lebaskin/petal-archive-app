import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  BarChart3,
  Settings,
  CheckCircle2,
  Clock,
  History,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Activity,
  Loader2,
  RefreshCcw,
  Trash2
} from 'lucide-react';

const API_URL = "https://script.google.com/macros/s/AKfycby0J-XRdWfiG_gWmbo0ZWWYq9U21oKraAmGltJLyYfYkKK3WE0IRAxM9NujToig725I/exec";
const MASTER_SHEET_URL = "https://docs.google.com/spreadsheets/d/1h_fWIhLKMdXzduULMeH0OG56y1PdaG2G4WmZppyk7YI/edit?gid=0#gid=0";

const STORAGE_KEY = 'petal_archive_v18';
const EVENT_HISTORY_KEY = 'petal_archive_event_history_v1';
const ORGANISER_HISTORY_KEY = 'petal_archive_organiser_history_v1';

const EMPTY_ITEM = {
  category: '',
  chain: '',
  style: '',
  shape: '',
  series: '',
  metal: '',
  base: '',
  colourLetter: '',
  price: '',
  otherChain: '',
  otherStyle: '',
  otherShape: '',
  otherSeries: '',
  otherBase: '',
  otherColour: ''
};

const LOCATION_OPTIONS = ['163 Mall', 'Waterfront', 'Intermark', 'BSC', 'The Campus', 'Publika', 'Others'];
const MAIN_ITEMS = ['Necklace', 'Bracelet', 'Ring', 'Earring', 'Bangle', 'Charm', 'Pendant', 'Chain'];
const CHAIN_TYPES = ['Cable', 'Snake', 'Paperclip', 'M-Paper', 'Kiss', 'Bead', 'None', 'Others'];
const STYLE_OPTIONS = ['Signet', 'Adjustable', 'Hoop', 'Hook', 'Stud', 'Dangle', 'None', 'Others'];
const SHAPE_OPTIONS = ['Round', 'Oval', 'Rectangle', 'Heart', 'Octagon', 'Others'];
const SERIES_OPTIONS = ['Alphabet', 'Plain', 'CZ', 'Pebble', 'Locket', 'None', 'Others'];
const METAL_OPTIONS = ['STU', 'STG', 'STR', 'Brass'];
const BASE_OPTIONS = ['MOP', 'Black', 'White', 'Clear', 'Others'];
const COLOUR_OPTIONS = ['Red', 'Blue', 'Yellow', 'Purple', 'Pink', 'Clover', 'White', 'Multi', 'Others'];

const RACE_COLORS = {
  C: '#1B3022',
  M: '#B5935E',
  I: '#D8A7B1',
  O: '#7E9181'
};

const AGE_COLORS = {
  '10s': '#E8EEE9',
  '20s': '#C9D7C0',
  '30s': '#B5935E',
  '40s': '#8C6A3F',
  '50s': '#1B3022'
};

const PRICE_DIRECTORY = [
  {
    c: "Necklaces",
    i: [
      { n: "Cable / Snake Chain", p: "95" },
      { n: "M-Paperclip / Paperclip", p: "105" },
      { n: "3-Pearl / 3-Agate", p: "159" },
      { n: "Full Pearl", p: "239" }
    ]
  },
  {
    c: "Bracelets",
    i: [
      { n: "Snake / Box Chain", p: "95" },
      { n: "M-Paper / Twist", p: "105" },
      { n: "Charm Bracelet (3)", p: "169" }
    ]
  },
  {
    c: "Bangles & Rings",
    i: [
      { n: "Bangle (Twist)", p: "129" },
      { n: "Rings", p: "89" }
    ]
  }
];

const toCaps = (val = '') => String(val).toUpperCase();
const safeNumber = value => Number(value) || 0;

const getDateKey = timestamp => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'UNKNOWN';
  return date.toISOString().split('T')[0];
};

const getHourKey = timestamp => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return 'UNKNOWN';
  return `${date.toISOString().split('T')[0]}-${date.getHours()}`;
};

const Label = ({ children }) => (
  <label className="text-[10px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2 block">
    {children}
  </label>
);

const GridBtn = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`py-4 px-1 rounded-xl border text-[10px] font-black transition-all ${
      active
        ? 'bg-[#1B3022] text-white border-[#1B3022] shadow-md'
        : 'bg-white text-[#1B3022] border-gray-100 shadow-sm'
    }`}
  >
    {label}
  </button>
);

const OtherInput = ({ value, onChange }) => (
  <div className="mt-3">
    <p className="text-[9px] font-black text-[#B5935E] uppercase tracking-[0.2em] mb-2">
      PLEASE SPECIFY
    </p>
    <input
      className="w-full p-3 bg-white rounded-xl ring-1 ring-gray-100 text-xs uppercase font-bold outline-none"
      placeholder="PLEASE SPECIFY"
      value={value}
      onChange={e => onChange(toCaps(e.target.value))}
    />
  </div>
);

const MetricCard = ({ label, value, sub }) => (
  <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm">
    <p className="text-[8px] font-black text-[#B5935E] uppercase tracking-widest mb-2">{label}</p>
    <h3 className="text-2xl font-serif italic text-[#1B3022]">{value}</h3>
    {sub && <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{sub}</p>}
  </div>
);

const BarRow = ({ label, count, total, color }) => {
  const percentage = total ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-[10px] font-black uppercase mb-1">
        <span>{label}</span>
        <span>{count} / {percentage}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

const HistoryInput = ({
  label,
  placeholder,
  value,
  onChange,
  history,
  datalistId,
  onPick
}) => (
  <div>
    <Label>{label}</Label>
    <input
      list={datalistId}
      className="w-full p-4 bg-[#FDFBF7] rounded-xl outline-none ring-1 ring-gray-100 uppercase text-xs font-bold"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(toCaps(e.target.value))}
    />

    <datalist id={datalistId}>
      {history.map(item => (
        <option key={item} value={item} />
      ))}
    </datalist>

    {history.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-3">
        {history.slice(0, 4).map(item => (
          <button
            key={item}
            type="button"
            onClick={() => onPick(item)}
            className="px-3 py-2 rounded-full bg-[#E8EEE9] text-[#1B3022] text-[9px] font-black uppercase"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
);

const PetalArchiveOS = () => {
  const [view, setView] = useState('input');
  const [step, setStep] = useState(0);
  const [basket, setBasket] = useState([]);
  const [liveData, setLiveData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openPriceCat, setOpenPriceCat] = useState(null);
  const [eventHistory, setEventHistory] = useState([]);
  const [organiserHistory, setOrganiserHistory] = useState([]);

  const [session, setSession] = useState({
    eventName: '',
    organiser: '',
    location: '',
    otherLocation: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [currentItem, setCurrentItem] = useState(EMPTY_ITEM);

  const [customer, setCustomer] = useState({
    race: 'C',
    age: '20s',
    gender: 'F',
    payment: 'QR'
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setSession(JSON.parse(saved));
        setStep(1);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    try {
      setEventHistory(JSON.parse(localStorage.getItem(EVENT_HISTORY_KEY)) || []);
      setOrganiserHistory(JSON.parse(localStorage.getItem(ORGANISER_HISTORY_KEY)) || []);
    } catch {
      localStorage.removeItem(EVENT_HISTORY_KEY);
      localStorage.removeItem(ORGANISER_HISTORY_KEY);
    }
  }, []);

  const fetchLiveData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setLiveData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Sync Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (view !== 'dashboard' && view !== 'history') return;
    fetchLiveData();
  }, [view]);

  const stats = useMemo(() => {
    const categories = {};
    const chains = {};
    const colours = {};
    const series = {};
    const locationRevenue = {};
    const monthlyRevenue = new Array(12).fill(0);
    const raceCounts = { C: 0, M: 0, I: 0, O: 0 };
    const ageCounts = { '10s': 0, '20s': 0, '30s': 0, '40s': 0, '50s': 0 };
    const genderCounts = { F: 0, M: 0 };
    const paymentCounts = { Cash: 0, Card: 0, QR: 0 };
    const rushHours = new Array(24).fill(0);
    const transactionIds = new Set();

    const locationMap = {};
    const segmentRevenue = {};

    let totalRevenue = 0;

    liveData.forEach((row, index) => {
      const price = safeNumber(row.price);
      const location = row.location || 'UNKNOWN';
      const transactionId = row.transactionId || `${row.timestamp || 'NO_TIME'}-${index}`;
      const hourKey = getHourKey(row.timestamp);
      const dateKey = row.date || getDateKey(row.timestamp);

      totalRevenue += price;
      transactionIds.add(transactionId);

      categories[row.category || 'UNKNOWN'] = (categories[row.category || 'UNKNOWN'] || 0) + 1;
      chains[row.chain || 'UNKNOWN'] = (chains[row.chain || 'UNKNOWN'] || 0) + 1;
      colours[row.colourLetter || row.colour || 'UNKNOWN'] = (colours[row.colourLetter || row.colour || 'UNKNOWN'] || 0) + 1;
      series[row.series || 'UNKNOWN'] = (series[row.series || 'UNKNOWN'] || 0) + 1;

      locationRevenue[location] = (locationRevenue[location] || 0) + price;

      if (!locationMap[location]) {
        locationMap[location] = {
          location,
          revenue: 0,
          pieces: 0,
          transactions: new Set(),
          activeHours: new Set(),
          sessions: new Set()
        };
      }

      locationMap[location].revenue += price;
      locationMap[location].pieces += 1;
      locationMap[location].transactions.add(transactionId);
      if (hourKey !== 'UNKNOWN') locationMap[location].activeHours.add(hourKey);
      if (dateKey !== 'UNKNOWN') locationMap[location].sessions.add(dateKey);

      const date = new Date(row.timestamp);

      if (!Number.isNaN(date.getTime())) {
        monthlyRevenue[date.getMonth()] += price;
        rushHours[date.getHours()] += 1;
      }

      if (row.customer) {
        const parts = row.customer.split(' | ');
        const race = parts[0];
        const age = parts[1];
        const gender = parts[2];

        if (race) raceCounts[race] = (raceCounts[race] || 0) + 1;
        if (age) ageCounts[age] = (ageCounts[age] || 0) + 1;
        if (gender) genderCounts[gender] = (genderCounts[gender] || 0) + 1;

        const segmentKey = [age, gender, race].filter(Boolean).join(' ');
        if (segmentKey) {
          segmentRevenue[segmentKey] = (segmentRevenue[segmentKey] || 0) + price;
        }
      }

      if (row.payment) {
        paymentCounts[row.payment] = (paymentCounts[row.payment] || 0) + 1;
      }
    });

    const totalTransactions = transactionIds.size || 0;
    const averageOrderValue = totalTransactions ? totalRevenue / totalTransactions : 0;
    const itemsPer
