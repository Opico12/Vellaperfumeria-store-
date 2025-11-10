import React from 'react';
import type { View } from '../App';
import type { Currency } from './currency';
import type { Product } from './ProductCard';
import HeroBanner from './HeroBanner';

const ProductList: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onNavigate: (view: View) => void;
}> = ({ onNavigate }) => {

    return (
        <div className="bg-white">
            <HeroBanner onNavigate={onNavigate} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                
                {/* About Us Section */}
                <section className="text-center mb-20">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Acerca de nosotros</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-10">Somos una comunidad de entusiastas de brathparners y te buscamos ati</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">50+</span>
                            <span className="text-gray-500 mt-1">Eventos</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">100+</span>
                            <span className="text-gray-500 mt-1">Miembros</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">20+</span>
                            <span className="text-gray-500 mt-1">Clientes</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-4xl font-bold text-black">5</span>
                            <span className="text-gray-500 mt-1">Años noveage</span>
                        </div>
                    </div>
                </section>

                {/* Next Event Section */}
                <section className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-left">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Próximo evento</h3>
                        <p className="text-gray-600 mb-2">¿Cómo empezar un grupo en vellaperfumeria?</p>
                        <p className="text-gray-600 mb-2">conoce nuestros cosmeticos</p>
                        <p className="text-gray-600 mb-8">28770 Alcobendas</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => onNavigate('catalog')} className="bg-[#f3d9ff] text-black font-semibold py-2 px-6 rounded-md hover:bg-[#e9c2ff] transition-colors">
                                VER CATALOGO
                            </button>
                             <button className="border border-black text-black font-semibold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors">
                                MÁS INFORMACIÓN
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <img src="https://i.imgur.com/J3hL9R7.png" alt="Evento de productos" className="rounded-lg shadow-md w-full" />
                        <button className="absolute bottom-4 right-4 bg-[#f3d9ff] text-black font-semibold py-2 px-6 rounded-md hover:bg-[#e9c2ff] transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductList;
