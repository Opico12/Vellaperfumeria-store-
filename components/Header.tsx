import React, { useState } from 'react';
import type { View } from '../App';
import type { Currency } from './currency';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

const InstagramIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919A118.663 118.663 0 0112 2.163zm0 1.442c-3.143 0-3.509.011-4.72.067-2.694.123-3.997 1.433-4.12 4.12C3.109 9.12 3.098 9.486 3.098 12c0 2.514.011 2.88.067 4.72.123 2.686 1.427 3.996 4.12 4.12 1.21.055 1.577.067 4.72.067 3.143 0 3.509-.011 4.72-.067 2.694-.123 3.997-1.433 4.12-4.12.056-1.84.067-2.206.067-4.72 0-2.514-.011-2.88-.067-4.72-.123-2.686-1.427-3.996-4.12-4.12-1.21-.055-1.577.067-4.72-.067zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm0 1.44a2.31 2.31 0 110 4.62 2.31 2.31 0 010-4.62zM18.88 6.54a1.32 1.32 0 100-2.64 1.32 1.32 0 000 2.64z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);


const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode; }> = ({ onClick, children }) => (
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
        className="block py-3 px-4 text-center text-sm uppercase tracking-wider text-gray-800 hover:bg-gray-100 transition-colors"
    >
        {children}
    </a>
);


const Header: React.FC<{
    onNavigate: (view: View) => void;
    currency: Currency;
    onCurrencyChange: (currency: Currency) => void;
    cartCount: number;
    onCartClick: () => void;
}> = ({ onNavigate, cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (view: View) => {
      onNavigate(view);
      setIsMenuOpen(false);
  }
  
  const navLinks = [
      { view: 'home', label: 'Inicio' },
      { view: 'products', label: 'Tienda' },
      { view: 'ofertas', label: 'Ofertas' },
      { view: 'catalog', label: 'Catálogo' },
      { view: 'blog', label: 'Blog' },
      { view: 'ia', label: 'Asistente IA' },
  ];

  const cartButton = (
    <button onClick={onCartClick} className="relative text-gray-800 hover:text-amber-600 p-2 group" aria-label={`Ver carrito, ${cartCount} artículos`}>
        <CartIcon />
        {cartCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 group-hover:bg-amber-600 transition-colors">
                {cartCount}
            </span>
        )}
    </button>
  );

  return (
    <header className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="bg-[#f3d9ff]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-1 flex justify-end items-center">
                <div className="flex items-center gap-2">
                    <a href="#" aria-label="Facebook" className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                        <FacebookIcon />
                    </a>
                    <a href="#" aria-label="Instagram" className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                        <InstagramIcon />
                    </a>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }} className="block">
                <img src="https://i.imgur.com/5n7z8sM.png" alt="Vellaperfumeria Logo" className="h-20 w-auto" />
            </a>
            <h1 className="text-xl font-light tracking-[0.2em] text-gray-800 mt-2">VELLAPERFUMERIA</h1>
        </div>
      
        <div className="border-t border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Navigation */}
                <nav className="hidden md:flex justify-between items-center h-14">
                    <div className="w-1/4"></div> {/* Spacer */}
                    <ul className="flex justify-center gap-x-8 w-1/2">
                        {navLinks.map(link => (
                            <li key={link.view}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); handleNavClick(link.view as View); }}
                                    className="text-sm uppercase tracking-wider font-medium text-gray-700 hover:text-amber-600 transition-colors hover-underline-effect"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="w-1/4 flex justify-end">
                        {cartButton}
                    </div>
                </nav>

                {/* Mobile Navigation Wrapper */}
                <div className="md:hidden relative">
                    <div className="flex justify-between items-center h-14">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-800"
                            aria-controls="mobile-menu"
                            aria-expanded={isMenuOpen}
                            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        >
                        {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                        </button>
                        
                        {cartButton}
                    </div>

                    {/* Mobile Menu Content with Animation */}
                    <div
                        id="mobile-menu"
                        className={`
                            absolute left-0 w-full bg-white shadow-lg z-20 transition-all duration-300 ease-in-out origin-top
                            ${isMenuOpen ? 'transform scale-y-100 opacity-100' : 'transform scale-y-95 opacity-0 pointer-events-none'}
                        `}
                        aria-hidden={!isMenuOpen}
                    >
                        <ul className="py-2">
                            {navLinks.map(link => (
                                <li key={link.view}><NavLink onClick={() => handleNavClick(link.view as View)}>{link.label}</NavLink></li>
                            ))}
                            <li><NavLink onClick={() => handleNavClick('about')}>Sobre Nosotros</NavLink></li>
                            <li><NavLink onClick={() => handleNavClick('contact')}>Contacto</NavLink></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
};

export default Header;