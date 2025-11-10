import React from 'react';
import type { View } from '../App';

// SVG Icons
const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V10a2 2 0 00-2-2h-6z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-700 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.475 5.422 5.571-1.469z" />
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


interface HeroBannerProps {
    onNavigate: (view: View) => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate }) => {
    return (
       <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
             <div className="text-right mb-6">
                <button 
                    onClick={() => onNavigate('products')} 
                    className="bg-[#f3d9ff] text-black font-semibold py-2 px-6 rounded-md shadow-sm hover:bg-[#e9c2ff] transition-colors text-sm"
                >
                    TIENDA
                </button>
            </div>
            <div className="grid md:grid-cols-2 items-center gap-8">
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-medium tracking-wide text-gray-800 mb-6">TIENES TUS BENEFICIOS COMO CLIENTE VIP</h2>
                    <ul className="space-y-6 mb-8 text-gray-700">
                        <li className="flex items-start gap-4">
                            <TruckIcon />
                            <div>
                                <h3 className="font-bold text-base">Envío GRATIS</h3>
                                <p className="text-sm">Como Cliente VIP, consigues siempre envío gratis por pedidos superiores a 35€.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <GiftIcon />
                            <div>
                                <h3 className="font-bold text-base">Programa de Fidelidad</h3>
                                <p className="text-sm">En cada compra, recibirás Puntos Beauty para canjear por una selección de productos gratis.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <HeartIcon />
                            <div>
                                <h3 className="font-bold text-base">Consejo personalizado</h3>
                                <p className="text-sm">Si tienes alguna duda, podrás contactar con un Brand Partner siempre que lo necesites para obtener una recomendación de productos y resolver tus dudas en un tiempo de 24 horas.</p>
                            </div>
                        </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <a
                            href="https://shop.oriflame.com/ES-beautieshopvella/bhXg273Sb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#f3d9ff] text-black font-semibold py-3 px-6 rounded-md shadow-sm hover:bg-[#e9c2ff] transition-colors duration-300 text-center text-sm"
                        >
                            TIENDA ONLINE VELLAPERFUMERIA
                        </a>
                        <a 
                            href="https://wa.me/661202616" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-md shadow-sm hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                        >
                            <WhatsAppIcon />
                            Chat en WhatsApp
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"><FacebookIcon /></a>
                        <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"><InstagramIcon /></a>
                    </div>
                </div>

                <div className="h-full hidden md:block">
                    <img 
                        src="https://i.imgur.com/0sI0tAl.jpeg" 
                        alt="Modelo de belleza" 
                        className="w-full h-full max-h-[550px] object-cover rounded-lg shadow-xl" 
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;