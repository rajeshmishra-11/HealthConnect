import React, { useState } from "react";
import { Search, AlertCircle, CheckCircle2, Loader2, RotateCcw } from "lucide-react";
import PrescriptionCard from "../components/common/PrescriptionCard";
import DispenseConfirmModal from "../components/common/DispenseConfirmModal";

// Mock prescription data for testing
const mockPrescriptions = {
    "RX-A7B3K9M2": {
        status: "valid",
        prescription: {
            rx_code: "RX-A7B3K9M2",
            patient: { name: "Aakash Modi", health_id: "HID-A7B3-K9M2" },
            doctor: { name: "Dr. Sharma", specialization: "General Medicine" },
            date: "2026-04-07",
            medicines: [
                { name: "Paracetamol 500mg", dosage: "1 Tablet", duration: "5 Days", instructions: "1-0-1 (After Food)" },
                { name: "Azithromycin 250mg", dosage: "1 Capsule", duration: "3 Days", instructions: "0-0-1 (Night)" },
            ],
            notes: "Complete the full course of antibiotics. Follow up after 5 days if symptoms persist.",
        },
    },
    "RX-B8C4L0N3": {
        status: "dispensed",
        message: "Already dispensed on 2026-03-09",
    },
};

const VerifyPrescription = () => {
    const [rxCode, setRxCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [dispensed, setDispensed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!rxCode.trim()) return;

        setLoading(true);
        setResult(null);
        setError("");
        setDispensed(false);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        const upperCode = rxCode.toUpperCase().trim();
        const mockResult = mockPrescriptions[upperCode];

        if (mockResult) {
            if (mockResult.status === "valid") {
                setResult(mockResult.prescription);
            } else if (mockResult.status === "dispensed") {
                setError(mockResult.message);
            }
        } else {
            setError("Prescription not found. Please check the RX code and try again.");
        }

        setLoading(false);
    };

    const handleDispense = async () => {
        setShowModal(false);
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 600));

        setDispensed(true);
        setLoading(false);
    };

    const handleReset = () => {
        setRxCode("");
        setResult(null);
        setError("");
        setDispensed(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-lexend text-foreground">Verify Prescription</h1>
                <p className="text-muted-foreground mt-1">Enter an RX code to verify and dispense</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleVerify} className="flex gap-3">
                <div className="relative flex-1 group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="RX-A7B3K9M2"
                        className="block w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-card text-foreground font-mono text-lg transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none shadow-sm"
                        value={rxCode}
                        onChange={(e) => setRxCode(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !rxCode.trim()}
                    className="px-8 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all focus:ring-4 focus:ring-primary/20 disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify"}
                </button>
            </form>

            {/* Error State */}
            {error && (
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-destructive/10 shrink-0">
                        <AlertCircle className="text-destructive" size={24} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">Verification Failed</h3>
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline mt-2"
                        >
                            <RotateCcw size={14} />
                            Try Another Code
                        </button>
                    </div>
                </div>
            )}

            {/* Valid Result */}
            {result && !dispensed && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-emerald-500">
                        <CheckCircle2 size={20} />
                        <span className="text-sm font-bold uppercase tracking-wider">✅ Valid Prescription</span>
                    </div>

                    <PrescriptionCard prescription={result} />

                    {/* Dispense Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        disabled={loading}
                        className="w-full py-4 px-6 bg-emerald-500 text-white text-lg font-bold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
                    >
                        <CheckCircle2 size={24} />
                        Dispense Prescription
                    </button>
                </div>
            )}

            {/* Dispensed Success */}
            {dispensed && (
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="text-emerald-500" size={36} />
                    </div>
                    <h3 className="text-2xl font-bold font-lexend text-foreground">Prescription Dispensed!</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        <strong className="text-foreground">{result?.rx_code}</strong> has been marked as dispensed.
                        The patient and doctor portals will reflect this update.
                    </p>
                    <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
                    >
                        <RotateCcw size={18} />
                        Verify Another Prescription
                    </button>
                </div>
            )}

            {/* Dispense Confirm Modal */}
            <DispenseConfirmModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDispense}
                rxCode={result?.rx_code}
                patientName={result?.patient?.name}
            />
        </div>
    );
};

export default VerifyPrescription;
