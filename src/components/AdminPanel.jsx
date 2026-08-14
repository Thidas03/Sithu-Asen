import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Search, FileDown, ShieldAlert, Check, Users, MessageSquare } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  const [rsvps, setRsvps] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, attending, declined
  const [activeTab, setActiveTab] = useState('rsvps'); // rsvps, wishes

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === '2026') {
      setIsAuthenticated(true);
      setError('');
      fetchData();
    } else {
      setError('Invalid passcode. Please try again.');
    }
  };

  const fetchData = async () => {
    try {
      // Fetch RSVPs
      const rsvpRes = await fetch(`/api/rsvps?passcode=2026`);
      if (rsvpRes.ok) {
        const rsvpData = await rsvpRes.json();
        setRsvps(rsvpData);
      }

      // Fetch Wishes
      const wishesRes = await fetch('/api/wishes');
      if (wishesRes.ok) {
        const wishesData = await wishesRes.json();
        setWishes(wishesData);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchData();
    }
  }, [isOpen, isAuthenticated]);

  const handleExportCSV = () => {
    // Column headers
    const headers = ['Name', 'Email', 'Attendance', 'Guests', 'Dietary/Message', 'Date'];
    const rows = rsvps.map(r => [
      r.name,
      r.email,
      r.attendance === 'attending' ? 'Joyfully Accept' : 'Regretfully Decline',
      r.guests,
      `"${(r.dietary || '').replace(/"/g, '""')}"`,
      new Date(r.created_at).toLocaleString()
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Sithumi_Asen_Wedding_RSVPs.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate Stats
  const attendingRsvps = rsvps.filter(r => r.attendance === 'attending');
  const declinedRsvps = rsvps.filter(r => r.attendance === 'declined');
  const totalAttendingGuests = attendingRsvps.reduce((sum, r) => sum + (parseInt(r.guests) || 1), 0);

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.dietary || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'attending') return matchesSearch && r.attendance === 'attending';
    if (filterType === 'declined') return matchesSearch && r.attendance === 'declined';
    return matchesSearch;
  });

  // Filtered Wishes
  const filteredWishes = wishes.filter(w => 
    w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    w.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white/95 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gold/20 shadow-2xl flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-gold/10 bg-beige/10">
          <div className="flex items-center space-x-3">
            <span className="font-serif text-2xl font-light text-luxury-dark tracking-wider">Wedding Management Dashboard</span>
            {isAuthenticated && (
              <span className="bg-gold/15 text-gold text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full border border-gold/20">
                Admin Mode
              </span>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gold/10 text-luxury-charcoal transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-md mx-auto py-16 text-center space-y-6">
              <div className="inline-flex p-4 bg-gold/10 rounded-full text-gold">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl text-luxury-dark font-light">Access Restricted</h3>
                <p className="text-xs text-luxury-charcoal/60 max-w-xs mx-auto uppercase tracking-wider">
                  Please enter the wedding coordinator passcode to manage RSVPs and wishes.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-700 text-xs border border-red-200/50 p-3 rounded-xl font-sans">
                    {error}
                  </div>
                )}
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full text-center px-4 py-3 bg-beige/20 border border-gold/20 rounded-xl focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none transition-all duration-300 font-sans text-sm tracking-widest text-luxury-dark"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-white py-3 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md cursor-pointer"
                >
                  Verify Code
                </button>
              </form>
            </div>
          ) : (
            /* Dashboard Content */
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Total Responses */}
                <div className="bg-beige/10 border border-gold/15 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/60 block mb-1">Total Responses</span>
                    <span className="text-3xl font-light text-luxury-dark">{rsvps.length}</span>
                  </div>
                  <div className="p-3 bg-luxury-dark/5 rounded-xl text-luxury-dark">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                {/* Attending Parties */}
                <div className="bg-beige/10 border border-gold/15 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/60 block mb-1">Attending Parties</span>
                    <span className="text-3xl font-light text-gold font-serif">{attendingRsvps.length}</span>
                  </div>
                  <div className="p-3 bg-gold/15 rounded-xl text-gold">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                {/* Total Attending Guests */}
                <div className="bg-beige/10 border border-gold/15 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/60 block mb-1">Total Attending Guests</span>
                    <span className="text-3xl font-light text-luxury-dark font-serif">{totalAttendingGuests}</span>
                  </div>
                  <div className="p-3 bg-luxury-dark/5 rounded-xl text-luxury-dark">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                {/* Wishes Received */}
                <div className="bg-beige/10 border border-gold/15 p-5 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-luxury-charcoal/60 block mb-1">Wishes Received</span>
                    <span className="text-3xl font-light text-luxury-dark">{wishes.length}</span>
                  </div>
                  <div className="p-3 bg-luxury-dark/5 rounded-xl text-luxury-dark">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Navigation Tabs & Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 pt-4 border-t border-gold/10">
                {/* Tabs */}
                <div className="flex space-x-1 bg-beige/30 p-1 rounded-xl self-start border border-gold/10">
                  <button
                    onClick={() => { setActiveTab('rsvps'); setSearchTerm(''); }}
                    className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 ${
                      activeTab === 'rsvps'
                        ? 'bg-gold-gradient text-white shadow-sm'
                        : 'text-luxury-charcoal/70 hover:text-luxury-dark'
                    }`}
                  >
                    RSVPs ({rsvps.length})
                  </button>
                  <button
                    onClick={() => { setActiveTab('wishes'); setSearchTerm(''); }}
                    className={`px-4 py-2 rounded-lg text-xs uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 ${
                      activeTab === 'wishes'
                        ? 'bg-gold-gradient text-white shadow-sm'
                        : 'text-luxury-charcoal/70 hover:text-luxury-dark'
                    }`}
                  >
                    Wishes ({wishes.length})
                  </button>
                </div>

                {/* Filters and Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1 sm:w-64 min-w-[200px]">
                    <input
                      type="text"
                      placeholder={`Search ${activeTab === 'rsvps' ? 'guests' : 'wishes'}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-beige/10 border border-gold/20 rounded-xl focus:border-gold focus:outline-none transition-colors text-xs text-luxury-dark placeholder-luxury-charcoal/40"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold/60" />
                  </div>

                  {/* Attendance Filter (only for RSVPs) */}
                  {activeTab === 'rsvps' && (
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 bg-beige/10 border border-gold/20 rounded-xl focus:border-gold focus:outline-none text-xs text-luxury-dark"
                    >
                      <option value="all">All Responses</option>
                      <option value="attending">Attending</option>
                      <option value="declined">Declined</option>
                    </select>
                  )}

                  {/* Export Button (only for RSVPs) */}
                  {activeTab === 'rsvps' && (
                    <button
                      onClick={handleExportCSV}
                      disabled={rsvps.length === 0}
                      className="flex items-center space-x-2 bg-white hover:bg-gold/5 border border-gold/30 text-gold px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm hover:shadow"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span className="hidden md:inline">Export CSV</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Table or Wishes List */}
              {activeTab === 'rsvps' ? (
                /* RSVPs Table */
                <div className="border border-gold/15 rounded-2xl overflow-hidden shadow-sm bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-sans">
                      <thead>
                        <tr className="bg-beige/20 text-luxury-dark border-b border-gold/15 text-xs">
                          <th className="px-6 py-4 font-semibold tracking-wider font-serif">Guest Name</th>
                          <th className="px-6 py-4 font-semibold tracking-wider">Email Address</th>
                          <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                          <th className="px-6 py-4 font-semibold tracking-wider text-center">Party Size</th>
                          <th className="px-6 py-4 font-semibold tracking-wider">Dietary/Message</th>
                          <th className="px-6 py-4 font-semibold tracking-wider">Response Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/5 text-xs text-luxury-charcoal">
                        {filteredRsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-beige/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-luxury-dark font-serif text-sm">{rsvp.name}</td>
                            <td className="px-6 py-4 font-sans">{rsvp.email}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase ${
                                rsvp.attendance === 'attending'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-rose-50 text-rose-700 border border-rose-100'
                              }`}>
                                {rsvp.attendance === 'attending' ? 'Attending' : 'Declined'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-sans font-semibold">
                              {rsvp.attendance === 'attending' ? rsvp.guests : '-'}
                            </td>
                            <td className="px-6 py-4 italic font-light max-w-xs truncate" title={rsvp.dietary}>
                              {rsvp.dietary || <span className="text-gray-300">None</span>}
                            </td>
                            <td className="px-6 py-4 text-gray-400 font-sans">
                              {new Date(rsvp.created_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                          </tr>
                        ))}
                        {filteredRsvps.length === 0 && (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-luxury-charcoal/50 italic">
                              No RSVP responses found matching criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Wishes Feed */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWishes.map((wish) => (
                    <div 
                      key={wish.id}
                      className="border border-gold/10 hover:border-gold/20 p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between transition-all duration-300"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-luxury-dark font-medium text-sm">{wish.name}</h4>
                          <span className="text-[10px] text-gray-400 font-sans">
                            {new Date(wish.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-luxury-charcoal/80 italic font-light leading-relaxed">
                          "{wish.message}"
                        </p>
                      </div>
                    </div>
                  ))}
                  {filteredWishes.length === 0 && (
                    <div className="col-span-2 py-12 text-center text-luxury-charcoal/50 italic border border-gold/10 rounded-2xl bg-white">
                      No wishes found matching search term.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
