import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Edit2, 
  Trash2, 
  Plus, 
  Filter, 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Building2,
  MapPin,
  ExternalLink
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Table from '../components/Table';
import AddPharmacyModal from '../components/AddPharmacyModal';
import api from '../services/api';
import { cn } from '../lib/utils';

const ManagePharmacies = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPharmacy, setEditingPharmacy] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPharmacies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pharmacies/');
      setPharmacies(response.data.map(ph => ({
        ...ph,
        location: ph.city || 'Unknown',
        status: 'Active',
        avatar: ph.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
      })));
    } catch (error) {
      console.error("Failed to fetch pharmacies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPharmacies();
  }, []);

  const handleAddPharmacy = (newPharmacy) => {
    setPharmacies(prev => [newPharmacy, ...prev]);
  };

  const handleEditPharmacy = (updatedPharmacy) => {
    setPharmacies(prev => prev.map(ph => ph.id === updatedPharmacy.id ? updatedPharmacy : ph));
  };

  const handleDeletePharmacy = async (id) => {
    if (window.confirm("Are you sure you want to delete this pharmacy?")) {
      try {
        await api.delete(`/pharmacies/${id}`);
        setPharmacies(prev => prev.filter(ph => ph.id !== id));
      } catch (error) {
        alert("Failed to delete pharmacy: " + error.message);
      }
    }
  };

  const openEditModal = (pharmacy) => {
    setEditingPharmacy(pharmacy);
    setIsModalOpen(true);
  };

  const closePortalModal = () => {
    setIsModalOpen(false);
    setEditingPharmacy(null);
  };

  const filteredPharmacies = pharmacies.filter(ph => 
    ph.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ph.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ph.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: "Pharmacy Info",
      render: (row) => (
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-lexend font-bold text-sm border border-emerald-500/20 shadow-sm transition-transform duration-300 group-hover:scale-110">
            {row.avatar}
          </div>
          <div>
            <p className="font-bold text-foreground transition-colors duration-200 group-hover:text-primary">{row.name}</p>
            <p className="text-xs text-muted-foreground font-medium">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Location & License",
      render: (row) => (
        <div className="space-y-1">
          <p className="font-bold text-foreground/80 flex items-center gap-1.5">
            <MapPin size={12} className="text-primary" />
            {row.location}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
            LIC: {row.license_no || 'N/A'}
          </div>
        </div>
      )
    },
    {
      header: "Status",
      render: (row) => (
        <span className={cn(
          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
          row.status === 'Active' 
            ? 'bg-success/10 text-success border-success/20' 
            : 'bg-warning/10 text-warning border-warning/20'
        )}>
          {row.status}
        </span>
      )
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex justify-end gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 lg:translate-x-2 group-hover:translate-x-0">
          <button 
             className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
             title="View Portal"
          >
            <ExternalLink size={16} />
          </button>
          <button 
            onClick={() => openEditModal(row)}
            className="p-2.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDeletePharmacy(row.id)}
            className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-lexend font-black text-foreground tracking-tight underline decoration-emerald-500 decoration-8 underline-offset-[10px]">Pharmacy Network</h1>
          <p className="text-muted-foreground font-medium pt-2">Monitor and manage authorized retail pharmacy partners in real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" icon={RefreshCw} onClick={fetchPharmacies} loading={loading}>Sync Network</Button>
          <Button icon={Plus} onClick={() => setIsModalOpen(true)}>Onboard Partner</Button>
        </div>
      </div>

      {/* Filter and Search Card */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-2">
          <div className="flex-1 max-w-2xl">
            <Input 
              icon={Search} 
              placeholder="Search by pharmacy name, license, or location..." 
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" icon={Filter} size="sm" className="font-bold">Filter Partners</Button>
            <div className="w-px h-6 bg-border mx-2"></div>
            <button className="p-2.5 text-muted-foreground hover:bg-accent rounded-xl transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        <div className="mt-10 -mx-6 border-t border-border/50">
          {loading ? (
             <div className="py-20 flex flex-col items-center justify-center gap-4">
                <RefreshCw size={40} className="text-emerald-500 animate-spin opacity-20" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest animate-pulse">Syncing with Unified Network...</p>
             </div>
          ) : (
            <Table columns={columns} data={filteredPharmacies} />
          )}
        </div>

        {/* Pagination placeholder */}
        {!loading && (
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-medium">
                Showing <span className="font-black text-foreground underline decoration-emerald-500 decoration-2 underline-offset-4">1 to {filteredPharmacies.length}</span> of {pharmacies.length} partner units
            </p>
            <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:bg-accent rounded-xl disabled:opacity-20 transition-all" disabled>
                <ChevronLeft size={22} />
                </button>
                <div className="flex items-center p-1 bg-secondary rounded-xl">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/20 text-sm">1</button>
                </div>
                <button className="p-2 text-muted-foreground hover:bg-accent rounded-xl transition-all" disabled>
                <ChevronRight size={22} />
                </button>
            </div>
            </div>
        )}
      </Card>

      <AddPharmacyModal 
        isOpen={isModalOpen} 
        onClose={closePortalModal} 
        onAdd={handleAddPharmacy} 
        onEdit={handleEditPharmacy}
        initialData={editingPharmacy}
      />
    </div>
  );
};

export default ManagePharmacies;
