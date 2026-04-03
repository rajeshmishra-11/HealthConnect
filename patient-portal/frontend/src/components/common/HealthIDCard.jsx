import React from 'react';

const HealthIDCard = React.forwardRef(({ user, profile }, ref) => {
    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'P';

    return (
        <div ref={ref} style={{
            width: '1000px', // High resolution for capture
            background: 'white',
            fontFamily: "'Outfit', sans-serif",
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            position: 'absolute',
            left: '-5000px', // Off-screen for capture
            top: 0,
            opacity: 1,
            pointerEvents: 'none',
            zIndex: -1 // Hide behind main content if any overlap
        }}>
            {/* Front Side */}
            <div id="card-front" style={{
                width: '960px',
                height: '600px',
                borderRadius: '40px',
                background: '#fff',
                border: '1px solid #ddd',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header Strip */}
                <div style={{
                    background: '#d93025', 
                    padding: '24px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    color: 'white'
                }}>
                    <div style={{ 
                        width: '70px', height: '70px', background: 'white', 
                        borderRadius: '12px', display: 'flex', 
                        alignItems: 'center', justifyContent: 'center',
                        color: '#d93025', fontSize: '32px', fontWeight: '900'
                    }}>✚</div>
                    <div>
                        <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '1px' }}>GOVERNMENT OF HEALTHCONNECT</div>
                        <div style={{ fontSize: '18px', fontWeight: '700', opacity: 0.9 }}>UNIVERSAL MEDICAL IDENTITY SYSTEM</div>
                    </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, padding: '40px', display: 'flex', gap: '40px' }}>
                    {/* Left: Photo */}
                    <div style={{ flexShrink: 0 }}>
                        <div style={{
                            width: '240px',
                            height: '300px',
                            background: '#f8f9fa',
                            borderRadius: '20px',
                            border: '4px solid #eee',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                             <div style={{ fontSize: '80px', fontWeight: '900', color: '#ccc' }}>{initials}</div>
                        </div>
                        <div style={{
                            marginTop: '24px',
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#666',
                            fontWeight: '700'
                        }}>CLINICAL PHOTO ID</div>
                    </div>

                    {/* Right: Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontSize: '14px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Universal Health ID (UHID)</div>
                            <div style={{ fontSize: '36px', fontWeight: '900', color: '#1a73e8', letterSpacing: '1px' }}>{user?.health_id}</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Full Name</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#202124' }}>{user?.name?.toUpperCase()}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Date of Birth</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#202124' }}>{profile?.dob || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Mobile Number</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#202124' }}>{profile?.phone || user?.phone || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Blood Group</div>
                                <div style={{ fontSize: '20px', fontWeight: '900', color: '#d93025' }}>{profile?.blood_group || 'N/A'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Government ID</div>
                                <div style={{ fontSize: '20px', fontWeight: '800', color: '#202124' }}>{user?.govt_id || 'HID-XXXX-XXXX'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#888', fontWeight: '800', textTransform: 'uppercase' }}>Verified Status</div>
                                <div style={{ fontSize: '16px', fontWeight: '900', color: '#1e8e3e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    ✓ REGISTERED PATIENT
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Strip */}
                <div style={{ 
                    background: '#f8f9fa', 
                    borderTop: '1px solid #eee', 
                    padding: '20px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                         <div style={{ color: '#d93025', fontSize: '24px' }}>♥</div>
                         <span style={{ fontSize: '14px', fontWeight: '800', color: '#5f6368' }}>NATIONAL HEALTH REPOSITORY SYSTEM</span>
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#9aa0a6' }}>ISSUE DATE: {new Date().toLocaleDateString()}</div>
                </div>
            </div>

            {/* Back Side */}
            <div id="card-back" style={{
                width: '960px',
                height: '600px',
                borderRadius: '40px',
                background: '#fff',
                border: '1px solid #ddd',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: '60px'
            }}>
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#5f6368', textTransform: 'uppercase', marginBottom: '12px' }}>Permanent Address</div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#202124', lineHeight: '1.6', maxWidth: '700px' }}>
                        {profile?.address ? `${profile.address}, ${profile.city}, ${profile.state} - ${profile.pincode}` : 'Address information not provided. Please update your clinical profile.'}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: 'auto' }}>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '800', color: '#5f6368', textTransform: 'uppercase', marginBottom: '12px' }}>Emergency Contact</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: '900', color: '#d93025' }}>
                            ☏ {profile?.emergency_contact || 'N/A'}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ borderBottom: '2px solid #202124', width: '300px', marginLeft: 'auto', marginBottom: '12px', height: '60px' }}></div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#202124', textTransform: 'uppercase' }}>ID Holder Signature</div>
                    </div>
                </div>

                <div style={{
                    marginTop: '60px',
                    padding: '30px',
                    borderRadius: '20px',
                    background: '#fce8e6',
                    border: '1px solid #f28b82',
                    fontSize: '18px',
                    color: '#c5221f',
                    lineHeight: '1.5',
                    fontWeight: '600'
                }}>
                    <strong>Disclaimer:</strong> This UHID card is a digital medical record identification. It is valid across all HealthConnect partner hospitals and pharmacies. Carry this card for instant data access.
                </div>

                <div style={{ marginTop: 'auto', textAlign: 'center', fontSize: '14px', color: '#9aa0a6', fontWeight: '700' }}>
                    If found, please return to any partner hospital or drop in nearest mailbox.
                    <br />
                    Powered by ATOM Health Infrastructure (NIC Certified)
                </div>
            </div>
        </div>
    );
});

export default HealthIDCard;
