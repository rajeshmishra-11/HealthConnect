import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
    Building2, MapPin, Phone, Mail, Clock, Shield, Award,
    Edit3, Save, X, User, Hash, Calendar, Globe, FileText
} from "lucide-react";

// Mock pharmacy profile data
const mockProfile = {
    name: "City Medical Store",
    license_no: "PH-MH-2024-00451",
    registration_date: "2018-06-15",
    owner: "Rajesh Kumar",
    pharmacist_in_charge: "Dr. Meena Sharma (Regd. No: MPC-45892)",
    type: "Retail Pharmacy",
    address: "Shop No. 12, Ground Floor, Sunrise Complex, MG Road, Pune - 411001",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    phone: "+91 20 2567 8901",
    mobile: "+91 98765 43210",
    email: "citymedical@healthconnect.com",
    website: "www.citymedicalstore.in",
    gst_no: "27AABCU9603R1ZM",
    drug_license_no: "MH-20B-123456 / MH-21B-654321",
    operating_hours: "Mon–Sat: 8:00 AM – 10:00 PM | Sun: 9:00 AM – 2:00 PM",
    services: ["Prescription Dispensing", "OTC Medicines", "Health Supplies", "Home Delivery", "Digital RX Verification"],
    stats: {
        total_prescriptions: 12847,
        this_month: 342,
        active_since_days: 2831,
        rating: 4.8,
    },
};

const PharmacyProfile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [profile] = useState(mockProfile);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-lexend text-foreground">Pharmacy Profile</h1>
                    <p className="text-muted-foreground mt-1">Manage your pharmacy information and credentials</p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${isEditing
                            ? "bg-muted text-muted-foreground hover:bg-muted/80"
                            : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                        }`}
                >
                    {isEditing ? <><X size={16} /> Cancel</> : <><Edit3 size={16} /> Edit Profile</>}
                </button>
            </div>

            {/* Profile Hero Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-emerald-500 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card shadow-xl flex items-center justify-center">
                            <Building2 className="text-primary" size={40} />
                        </div>
                    </div>
                </div>
                <div className="pt-16 px-8 pb-8 space-y-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold font-lexend text-foreground">{profile.name}</h2>
                            <p className="text-muted-foreground text-sm">{profile.type} • {profile.city}, {profile.state}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <Shield size={14} className="text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Dispensed", value: profile.stats.total_prescriptions.toLocaleString(), icon: FileText },
                    { label: "This Month", value: profile.stats.this_month, icon: Calendar },
                    { label: "Active Days", value: profile.stats.active_since_days.toLocaleString(), icon: Clock },
                    { label: "Rating", value: `⭐ ${profile.stats.rating}`, icon: Award },
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                        <p className="text-2xl font-bold font-lexend text-foreground">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Business Information */}
                <div className="bg-card border border-border rounded-xl shadow-sm">
                    <div className="p-5 border-b border-border">
                        <h3 className="text-base font-bold font-lexend text-foreground flex items-center gap-2">
                            <Building2 size={18} className="text-primary" />
                            Business Information
                        </h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <ProfileField icon={Hash} label="License No." value={profile.license_no} editing={isEditing} />
                        <ProfileField icon={FileText} label="Drug License" value={profile.drug_license_no} editing={isEditing} />
                        <ProfileField icon={Hash} label="GST No." value={profile.gst_no} editing={isEditing} />
                        <ProfileField icon={User} label="Owner" value={profile.owner} editing={isEditing} />
                        <ProfileField icon={Shield} label="Pharmacist In Charge" value={profile.pharmacist_in_charge} editing={isEditing} />
                        <ProfileField icon={Calendar} label="Registered Since" value={profile.registration_date} editing={isEditing} />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-card border border-border rounded-xl shadow-sm">
                    <div className="p-5 border-b border-border">
                        <h3 className="text-base font-bold font-lexend text-foreground flex items-center gap-2">
                            <Phone size={18} className="text-primary" />
                            Contact Information
                        </h3>
                    </div>
                    <div className="p-5 space-y-4">
                        <ProfileField icon={MapPin} label="Address" value={profile.address} editing={isEditing} />
                        <ProfileField icon={Phone} label="Phone" value={profile.phone} editing={isEditing} />
                        <ProfileField icon={Phone} label="Mobile" value={profile.mobile} editing={isEditing} />
                        <ProfileField icon={Mail} label="Email" value={profile.email} editing={isEditing} />
                        <ProfileField icon={Globe} label="Website" value={profile.website} editing={isEditing} />
                        <ProfileField icon={Clock} label="Operating Hours" value={profile.operating_hours} editing={isEditing} />
                    </div>
                </div>
            </div>

            {/* Services */}
            <div className="bg-card border border-border rounded-xl shadow-sm">
                <div className="p-5 border-b border-border">
                    <h3 className="text-base font-bold font-lexend text-foreground flex items-center gap-2">
                        <Award size={18} className="text-primary" />
                        Services Offered
                    </h3>
                </div>
                <div className="p-5 flex flex-wrap gap-2">
                    {profile.services.map((service, i) => (
                        <span
                            key={i}
                            className="px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-sm font-medium text-foreground hover:bg-primary/10 transition-colors"
                        >
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            {/* Save Button (when editing) */}
            {isEditing && (
                <div className="flex justify-end">
                    <button className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

/* Reusable Profile Field */
const ProfileField = ({ icon: Icon, label, value, editing }) => (
    <div className="flex items-start gap-3">
        <div className="p-1.5 rounded-md bg-secondary shrink-0 mt-0.5">
            <Icon size={14} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
            {editing ? (
                <input
                    type="text"
                    defaultValue={value}
                    className="w-full mt-1 px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
            ) : (
                <p className="text-sm font-medium text-foreground mt-0.5 break-words">{value}</p>
            )}
        </div>
    </div>
);

export default PharmacyProfile;
