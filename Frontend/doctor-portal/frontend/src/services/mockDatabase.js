const INITIAL_PATIENTS = [
    {
        id: "p1",
        name: "Rahul Sharma",
        healthId: "HID-1234-5678",
        phone: "9876543210",
        age: 32,
        gender: "Male",
        dob: "1992-05-15",
        bloodGroup: "O+",
        address: "123, Green Park, New Delhi",
        emergencyContact: "Anita Sharma (Wife) - 9811002233",
        lastVisit: "2024-02-15"
    },
    {
        id: "p2",
        name: "Anita Desai",
        healthId: "HID-5678-1234",
        phone: "9123456789",
        age: 45,
        gender: "Female",
        dob: "1979-08-22",
        bloodGroup: "A-",
        address: "45, Marine Drive, Mumbai",
        emergencyContact: "Rajesh Desai (Husband) - 9123456780",
        lastVisit: "2024-03-01"
    },
    {
        id: "p3",
        name: "Vivek Roy",
        healthId: "HID-9999-0000",
        phone: "8888877777",
        age: 28,
        gender: "Male",
        dob: "1996-01-10",
        bloodGroup: "B+",
        address: "88, Salt Lake, Kolkata",
        emergencyContact: "Samir Roy (Brother) - 8888877770",
        lastVisit: "2024-02-28"
    },
    {
        id: "p4",
        name: "Meera Iyer",
        healthId: "HID-4444-5555",
        phone: "9988776655",
        age: 35,
        gender: "Female",
        dob: "1989-11-05",
        bloodGroup: "AB+",
        address: "12, Anna Nagar, Chennai",
        emergencyContact: "Venkatesh Iyer (Father) - 9988776650",
        lastVisit: "2024-03-10"
    },
    {
        id: "p5",
        name: "Suresh Pillai",
        healthId: "HID-1111-2222",
        phone: "7766554433",
        age: 52,
        gender: "Male",
        dob: "1972-04-30",
        bloodGroup: "O-",
        address: "7, MG Road, Bangalore",
        emergencyContact: "Maya Pillai (Wife) - 7766554430",
        lastVisit: "2024-01-20"
    },
    {
        id: "p6",
        name: "Priya Malik",
        healthId: "HID-7777-8888",
        phone: "9812345678",
        age: 24,
        gender: "Female",
        dob: "2000-07-14",
        bloodGroup: "B-",
        address: "A-42, Sector 18, Noida",
        emergencyContact: "Karan Malik (Brother) - 9812345670",
        lastVisit: "2024-03-12"
    }
];

const INITIAL_VISITS = [
    {
        id: "v1",
        patientId: "p1",
        date: "2024-02-15",
        doctor: "Dr. Sameer",
        symptoms: "Fever, Cough, Body ache",
        diagnosis: "Moderate Viral Flu",
        vitals: {
            blood_pressure: "120/80",
            temperature: "101.2",
            pulse: "88",
            weight: "72",
            spo2: "97"
        }
    }
];

const INITIAL_PRESCRIPTIONS = [
    {
        id: "rx1",
        patientId: "p1",
        rxCode: "RX-BK92M1A7",
        date: "2024-02-15",
        doctor: "Dr. Sameer",
        medicines: [
            { name: "Paracetamol 650mg", dosage: "1-0-1", duration: "3 days", instructions: "After food" },
            { name: "Amoxicillin 500mg", dosage: "1-1-1", duration: "5 days", instructions: "Complete the course" }
        ],
        notes: "Rest for 3 days. Drink plenty of fluids."
    }
];

class MockDatabase {
    constructor() {
        this.initialize();
    }

    initialize() {
        const patients = localStorage.getItem("hc_patients");
        if (!patients || JSON.parse(patients).length === 0) {
            localStorage.setItem("hc_patients", JSON.stringify(INITIAL_PATIENTS));
        }

        const visits = localStorage.getItem("hc_visits");
        if (!visits || JSON.parse(visits).length === 0) {
            localStorage.setItem("hc_visits", JSON.stringify(INITIAL_VISITS));
        }

        const prescriptions = localStorage.getItem("hc_prescriptions");
        if (!prescriptions || JSON.parse(prescriptions).length === 0) {
            localStorage.setItem("hc_prescriptions", JSON.stringify(INITIAL_PRESCRIPTIONS));
        }
    }

    getPatients() {
        return JSON.parse(localStorage.getItem("hc_patients"));
    }

    getPatientById(id) {
        return this.getPatients().find(p => p.id === id);
    }

    searchPatients(query) {
        const patients = this.getPatients();
        const lowQuery = query.toLowerCase();
        return patients.filter(p =>
            p.healthId.toLowerCase().includes(lowQuery) ||
            p.phone.includes(query) ||
            p.name.toLowerCase().includes(lowQuery)
        );
    }

    getVisitsByPatient(patientId) {
        const visits = JSON.parse(localStorage.getItem("hc_visits"));
        return visits.filter(v => v.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    getPrescriptionsByPatient(patientId) {
        const prescriptions = JSON.parse(localStorage.getItem("hc_prescriptions"));
        return prescriptions.filter(p => p.patientId === patientId).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    addVisit(visit) {
        const visits = JSON.parse(localStorage.getItem("hc_visits"));
        const newVisit = {
            ...visit,
            id: "v" + Date.now(),
            date: new Date().toISOString().split('T')[0]
        };
        visits.push(newVisit);
        localStorage.setItem("hc_visits", JSON.stringify(visits));

        // Update last visit for patient
        const patients = this.getPatients();
        const patientIndex = patients.findIndex(p => p.id === visit.patientId);
        if (patientIndex !== -1) {
            patients[patientIndex].lastVisit = newVisit.date;
            localStorage.setItem("hc_patients", JSON.stringify(patients));
        }

        return newVisit;
    }

    addPrescription(prescription) {
        const prescriptions = JSON.parse(localStorage.getItem("hc_prescriptions"));
        const rxCode = "RX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
        const newPrescription = {
            ...prescription,
            id: "rx" + Date.now(),
            rxCode,
            date: new Date().toISOString().split('T')[0]
        };
        prescriptions.push(newPrescription);
        localStorage.setItem("hc_prescriptions", JSON.stringify(prescriptions));
        return newPrescription;
    }

    resetDatabase() {
        localStorage.removeItem("hc_patients");
        localStorage.removeItem("hc_visits");
        localStorage.removeItem("hc_prescriptions");
        this.initialize();
    }
}

export const mockDb = new MockDatabase();
