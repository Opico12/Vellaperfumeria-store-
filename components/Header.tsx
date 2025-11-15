
import React, { useState, useRef, useEffect } from 'react';
import type { View } from './types';
import type { Currency } from './currency';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const HamburgerIcon = () => (
     <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ThreadsIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8.01 3.51c-1.35 0-2.45 1.1-2.45 2.45v.38c0 .28.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-.38c0-.69.56-1.25 1.25-1.25h.19c.69 0 1.25.56 1.25 1.25v2.87c0 1.35-1.1 2.45-2.45 2.45h-.87c-.28 0-.5.22-.5.5v1.5c0 .28.22.5.5.5h.87c2.21 0 4-1.79 4-4V5.96c0-1.35-1.1-2.45-2.45-2.45h-2.12zm-3.09 3.1h-1.5c-.28 0-.5.22-.5.5v.38c0 1.35 1.1 2.45 2.45 2.45h.19c.69 0 1.25-.56 1.25-1.25V5.96c0-1.35-1.1-2.45-2.45-2.45H3.01c-1.35 0-2.45 1.1-2.45 2.45v2.12c0 2.21 1.79 4 4 4h.87c.28 0 .5-.22.5-.5v-1.5c0-.28-.22-.5-.5-.5h-.87c-.69 0-1.25-.56-1.25-1.25v-.38c0-.28-.22-.5-.5-.5z"/>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

interface HeaderProps {
    onNavigate: (view: View) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currency, onCurrencyChange, cartCount, onCartClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartCountRef = useRef<HTMLSpanElement>(null);
    const prevCartCountRef = useRef<number>(cartCount);

    useEffect(() => {
        // Animate cart count only when items are added, not removed
        if (cartCount > prevCartCountRef.current) {
            cartCountRef.current?.classList.add('animate-pop');
            const timer = setTimeout(() => {
                cartCountRef.current?.classList.remove('animate-pop');
            }, 300); // Duration should match the animation duration
            return () => clearTimeout(timer);
        }
        prevCartCountRef.current = cartCount;
    }, [cartCount]);

    const NavLink: React.FC<{ view: View; children: React.ReactNode }> = ({ view, children }) => (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                onNavigate(view);
                setIsMenuOpen(false); // Close menu on navigation
            }}
            className="text-brand-primary hover:text-brand-purple transition-colors font-semibold py-2 block md:inline-block hover-underline-effect"
        >
            {children}
        </a>
    );

    return (
        <header className="bg-white shadow-lg sticky top-0 z-30 text-brand-primary">
            {/* Top bar */}
            <div className="bg-[var(--color-secondary)] text-brand-primary text-xs">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-1.5">
                    <div className="flex items-center space-x-4">
                        <a href="https://www.threads.com/@beautieshopvella?xmt=AQF0zHNrv2YdoCmolABWd5JZB7EQbzCLyYByCyzn5RIWN3E" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity" aria-label="Threads"><ThreadsIcon /></a>
                        <a href="https://www.facebook.com/vellaperfumeria" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity" aria-label="Facebook"><FacebookIcon /></a>
                    </div>
                    <div>
                        <select
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                            className="bg-transparent border border-gray-300 rounded-md text-brand-primary py-0.5 px-1 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            aria-label="Seleccionar moneda"
                        >
                            <option value="EUR" className="text-black bg-white">EUR €</option>
                            <option value="USD" className="text-black bg-white">USD $</option>
                            <option value="GBP" className="text-black bg-white">GBP £</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Main Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Branding Section */}
                <div className="flex justify-between items-center py-2">
                     {/* Left placeholder for balance */}
                    <div className="flex-1" />

                     {/* Centered Logo and Title */}
                    <div className="flex-shrink-0">
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="flex flex-col items-center" aria-label="Vellaperfumeria - Inicio">
                            <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png?fit=225%2C225&ssl=1" alt="Vellaperfumeria Logo" className="h-36 w-auto" />
                            <h1 className="text-2xl font-bold tracking-wider text-brand-primary -mt-6">
                                Vellaperfumeria
                            </h1>
                        </a>
                    </div>

                    {/* Right side actions (cart, mobile menu) */}
                    <div className="flex-1 flex justify-end items-center space-x-2">
                        <button onClick={onCartClick} className="relative text-brand-primary hover:text-brand-purple p-2" aria-label={`Abrir carrito. Tienes ${cartCount} artículos.`}>
                            <CartIcon />
                            {cartCount > 0 && (
                                <span ref={cartCountRef} className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-brand-purple rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex justify-center space-x-8 items-center border-t border-gray-200 py-3">
                    <NavLink view="home">Inicio</NavLink>
                    <NavLink view="products">Tienda</NavLink>
                    <NavLink view="ofertas">Ofertas</NavLink>
                    <NavLink view="catalog">Catálogo</NavLink>
                    <NavLink view="blog">Blog</NavLink>
                    <NavLink view="ia">Asistente IA</NavLink>
                </nav>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
                        <NavLink view="home">Inicio</NavLink>
                        <NavLink view="products">Tienda</NavLink>
                        <NavLink view="ofertas">Ofertas</NavLink>
                        <NavLink view="catalog">Catálogo</NavLink>
                        <NavLink view="blog">Blog</NavLink>
                        <NavLink view="ia">Asistente IA</NavLink>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
