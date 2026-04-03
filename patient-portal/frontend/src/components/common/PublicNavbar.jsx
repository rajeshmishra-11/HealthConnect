import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, LogIn, UserPlus, Globe, LayoutDashboard, Menu, X } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';

const PublicNavbar = ({ darkMode, setDarkMode }) => {
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <>
            <nav className="public-navbar" style={{
                background: 'var(--bg)',
                opacity: 0.95,
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid var(--border)',
                padding: '20px 48px',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                    <div className="logo-icon" style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        fontSize: '18px', fontWeight: '900', background: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
                    }}>HC</div>
                    <span className="logo-text" style={{ fontSize: '22px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.5px' }}>HealthConnect</span>
                </Link>

                {/* Desktop Links */}
                <div className="nav-links desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <Link to="/#features" className="nav-link-desktop">Features</Link>
                    <Link to="/#services" className="nav-link-desktop">Solutions</Link>
                    <Link to="/about" className="nav-link-desktop">About</Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '20px', paddingLeft: '32px', borderLeft: '1px solid var(--border)' }}>
                        <button
                            onClick={() => setDarkMode && setDarkMode(!darkMode)}
                            style={{
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                width: '40px', height: '40px', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'var(--text-muted)'
                            }}
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {user ? (
                            <Link to="/dashboard" className="btn btn-primary">
                                <LayoutDashboard size={16} strokeWidth={2.5} /> DASHBOARD
                            </Link>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline">SIGN IN</Link>
                                <Link to="/register" className="btn btn-primary">JOIN NOW</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="show-mobile-flex" 
                    onClick={toggleMobileMenu}
                    style={{ 
                        display: 'none', 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--text)',
                        cursor: 'pointer'
                    }}
                >
                    <Menu size={28} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="logo-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>HC</div>
                        <span className="logo-text">HealthConnect</span>
                    </div>
                    <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: 'var(--text)' }}>
                        <X size={28} />
                    </button>
                </div>

                <div className="mobile-nav-links">
                    <Link to="/#features" className="mobile-nav-link" onClick={toggleMobileMenu}>Features</Link>
                    <Link to="/#services" className="mobile-nav-link" onClick={toggleMobileMenu}>Solutions</Link>
                    <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
                </div>

                <div className="mobile-nav-footer">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontWeight: '600', color: 'var(--text)' }}>Theme</span>
                        <button
                            onClick={() => setDarkMode && setDarkMode(!darkMode)}
                            style={{
                                background: 'var(--surface)', border: '1px solid var(--border)',
                                width: '44px', height: '44px', borderRadius: '12px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--text-muted)'
                            }}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                    
                    {user ? (
                        <Link to="/dashboard" className="btn btn-primary btn-full" onClick={toggleMobileMenu}>
                            <LayoutDashboard size={18} /> DASHBOARD
                        </Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline btn-full" onClick={toggleMobileMenu}>SIGN IN</Link>
                            <Link to="/register" className="btn btn-primary btn-full" onClick={toggleMobileMenu}>JOIN NOW</Link>
                        </>
                    )}
                </div>
            </div>

        </>
    );
};

export default PublicNavbar;
