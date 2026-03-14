import React from "react";
import { Trash2, Pill, Clock, Calendar, Info } from "lucide-react";

const MedicineRow = ({ medicine, index, updateMedicine, removeMedicine }) => {
    const handleChange = (field, value) => {
        updateMedicine(index, field, value);
    };

    return (
        <div className="bg-muted/30 p-6 rounded-2xl border border-border relative group animate-in zoom-in-95 duration-200">
            <button
                type="button"
                onClick={() => removeMedicine(index)}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Remove Medicine"
            >
                <Trash2 size={18} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Medicine Name */}
                <div className="lg:col-span-5 space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-1.5">
                        <Pill size={12} className="text-primary" /> Medicine Name
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-semibold"
                        placeholder="e.g. Paracetamol 500mg"
                        value={medicine.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                    />
                </div>

                {/* Dosage */}
                <div className="lg:col-span-3 space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-1.5">
                        <Clock size={12} /> Dosage (M-A-N)
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-center font-mono tracking-widest"
                        placeholder="1-0-1"
                        value={medicine.dosage}
                        onChange={(e) => handleChange("dosage", e.target.value)}
                        required
                    />
                </div>

                {/* Duration */}
                <div className="lg:col-span-4 space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-1.5">
                        <Calendar size={12} /> Duration
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        placeholder="e.g. 5 days"
                        value={medicine.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                        required
                    />
                </div>

                {/* Instructions */}
                <div className="lg:col-span-12 space-y-2">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-1.5">
                        <Info size={12} /> Special Instructions
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none italic"
                        placeholder="e.g. After food, avoid cold drinks"
                        value={medicine.instructions}
                        onChange={(e) => handleChange("instructions", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MedicineRow;
