import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import StatsCard from "../components/common/StatsCard";
import { ClipboardCheck, Clock, XCircle, PackageCheck, ArrowRight } from "lucide-react";

// Mock data for dashboard
const mockStats = {
    verified_today: 12,
    pending: 5,
    rejected: 2,
    total_dispensed: 847,
};

const mockRecentActivity = [
    { rx_code: "RX-A7B3K9M2", patient: "Sarah Jenkins", doctor: "Dr. Robert Aris", medicines: "Amoxicillin 500mg, Ibuprofen", time: "10:45 AM", status: "Dispensed" },
    { rx_code: "RX-B8C4L0N3", patient: "Michael Chen", doctor: "Dr. Elena Gilbert", medicines: "Metformin, Atorvastatin", time: "11:22 AM", status: "Dispensed" },
    { rx_code: "RX-C9D5M1P4", patient: "James Wilson", doctor: "Dr. Sarah Miller", medicines: "Lisinopril, Amlodipine", time: "11:30 AM", status: "Dispensed" },
    { rx_code: "RX-D0E6N2Q5", patient: "Emma Davis", doctor: "Dr. Arun Patel", medicines: "Omeprazole 20mg", time: "12:05 PM", status: "Pending" },
    { rx_code: "RX-E1F7O3R6", patient: "Raj Sharma", doctor: "Dr. Smith", medicines: "Cetirizine, Montelukast", time: "12:30 PM", status: "Pending" },
];

const PharmacyDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-lexend text-foreground">
                        Welcome back, <span className="text-primary">{user?.name || "Pharmacy"}</span>
                    </h1>
                    <p className="text-muted-foreground mt-1">Here's your dispensing overview for today.</p>
                </div>
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Dispensed Today" value={mockStats.verified_today} icon={ClipboardCheck} color="success" subtitle="↑ 15% from yesterday" />
                <StatsCard title="Pending Orders" value={mockStats.pending} icon={Clock} color="warning" subtitle="● On hold" />
                <StatsCard title="Rejected" value={mockStats.rejected} icon={XCircle} color="destructive" subtitle="⚠ Requires action" />
                <StatsCard title="Total Dispensed" value={mockStats.total_dispensed} icon={PackageCheck} color="primary" subtitle="All time" />
            </div>

            {/* CTA - Verify Prescription */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4 shadow-sm">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <ClipboardCheck className="text-primary" size={32} />
                </div>
                <h2 className="text-2xl font-bold font-lexend text-foreground">New Prescription?</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Quickly verify and process medications by scanning the RX QR code or manually entering the reference number.
                </p>
                <button
                    onClick={() => navigate("/verify")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                >
                    <ClipboardCheck size={20} />
                    Verify Prescription
                    <ArrowRight size={16} />
                </button>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
                    <h3 className="text-lg font-bold font-lexend text-foreground">Recent Activity</h3>
                    <button className="text-sm text-primary font-medium hover:underline">View All Records</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">RX Code</th>
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">Patient Name</th>
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">Doctor</th>
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">Medicines</th>
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">Time</th>
                                <th className="text-left py-3 px-6 text-xs text-muted-foreground uppercase tracking-wider font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockRecentActivity.map((item, index) => (
                                <tr key={index} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                                    <td className="py-4 px-6 font-mono text-primary font-bold text-xs">{item.rx_code}</td>
                                    <td className="py-4 px-6 font-semibold text-foreground">{item.patient}</td>
                                    <td className="py-4 px-6 text-muted-foreground">{item.doctor}</td>
                                    <td className="py-4 px-6 text-muted-foreground text-xs">{item.medicines}</td>
                                    <td className="py-4 px-6 text-muted-foreground">{item.time}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.status === "Dispensed"
                                                ? "bg-emerald-500/10 text-emerald-500"
                                                : "bg-amber-500/10 text-amber-500"
                                            }`}>
                                            {item.status === "Dispensed" ? "● " : "○ "}{item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PharmacyDashboard;
