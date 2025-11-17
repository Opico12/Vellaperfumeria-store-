
import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const FilterIcon = () => (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0113 18v-2.586l-4-4V7.414L3.707 6.707A1 1 0 013 6V4z" />
    </svg>
);

const SortIcon = () => (
    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
);

const subCategories = [
    { name: "Bases de maquillaje", active: true },
    { name: "Cremas BB y CC", active: false },
    { name: "Colorete", active: false },
    { name: "Bronceador", active: false },
    { name: "Corrector", active: false },
    { name: "Desmaquillante facial", active: false },
    { name: "Iluminadores", active: false },
    { name: "Paletas de maquillaje", active: false },
    { name: "Polvo", active: false },
    { name: "Imprimación", active: false },
];


const MakeupPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
}> = ({ currency, onAddToCart, onProductSelect, onQuickView, onCartClick }) => {
    
    const [sortOrder, setSortOrder] = useState('menu_order');

    const pageProducts = useMemo(() => {
        const productIds = [46906, 42236, 43244, 32922, 46332, 42102, 39292, 42125, 47551];
        const products = productIds.map(id => allProducts.find(p => p.id === id)).filter((p): p is Product => p !== undefined);

        let sorted = [...products];
        // Note: The original page likely has complex sorting. This is a simplified version.
        switch (sortOrder) {
            case 'popularity':
                sorted.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
                break;
            case 'rating':
                sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'price':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'menu_order':
            default:
                 return products; // Keep original order
        }
        return sorted;
    }, [sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="bg-brand-bg-subtle">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-brand-primary">Bases de maquillaje por acabado y tipo de piel</h1>
                </div>

                {/* Sub-category Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-6 overflow-x-auto pb-2 -mb-px">
                        {subCategories.map(cat => (
                            <a 
                                key={cat.name} 
                                href="#"
                                onClick={e => e.preventDefault()}
                                className={`whitespace-nowrap py-3 px-1 text-sm font-semibold transition-colors border-b-2 ${
                                    cat.active ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-brand-primary hover:border-gray-300'
                                }`}
                            >
                                {cat.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center px-4 py-2 bg-white rounded-md border shadow-sm text-sm font-semibold">
                            <FilterIcon /> Filtrar
                        </button>
                        <div className="relative">
                            <SortIcon />
                            <select
                                value={sortOrder}
                                onChange={handleSortChange}
                                className="pl-8 pr-4 py-2 border rounded-md shadow-sm text-sm font-semibold appearance-none bg-white"
                                aria-label="Ordenar productos"
                            >
                                <option value="menu_order">Recomendado</option>
                                <option value="popularity">Popularidad</option>
                                <option value="rating">Valoración</option>
                                <option value="price">Precio: bajo a alto</option>
                                <option value="price-desc">Precio: alto a bajo</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{pageProducts.length} productos</p>
                </div>
                
                {/* Product Grid - Custom Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {pageProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} currency={currency} onAddToCart={onAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} onCartClick={onCartClick}/>)}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {pageProducts.slice(4, 8).map(p => <ProductCard key={p.id} product={p} currency={currency} onAddToCart={onAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} onCartClick={onCartClick}/>)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 items-stretch">
                    <a href="#" onClick={e => e.preventDefault()} className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 text-center group transition-transform transform hover:scale-105">
                        <p className="text-xl font-bold">Experimenta con maquillaje virtual en tiempo real</p>
                        <span className="mt-4 text-sm font-semibold text-brand-primary group-hover:underline">PROBAR AHORA &rarr;</span>
                    </a>
                    <a href="#" onClick={e => e.preventDefault()} className="bg-white rounded-lg shadow-md overflow-hidden group">
                        <video autoPlay playsInline muted loop className="w-full h-full object-cover">
                            <source src="https://media-cdn.oriflame.com/static-media-web/0fa45d91-4c57-41ab-957e-9404e87544d8?mimeType=video%2fmp4" type="video/mp4" />
                        </video>
                    </a>
                    {pageProducts[8] && <ProductCard product={pageProducts[8]} currency={currency} onAddToCart={onAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} onCartClick={onCartClick}/>}
                </div>

                <div className="text-center py-4 border-t border-gray-200 mt-8">
                     <p className="text-sm text-gray-700">Mostrando {pageProducts.length} de {pageProducts.length} productos</p>
                </div>

                {/* Final Promo Section */}
                <div className="mt-12">
                     <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2 items-center">
                        <div className="p-10 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-brand-primary mb-4">Encuentra tu mejor look con el Virtual Makeup Lab</h2>
                             <a href="#" onClick={e => e.preventDefault()} className="inline-block bg-white text-brand-primary font-semibold py-3 px-6 rounded-lg border-2 border-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                                PRUEBA EL MAQUILLAJE VIRTUAL
                            </a>
                        </div>
                         <div className="h-64 md:h-full">
                            <img 
                                src="https://media-cdn.oriflame.com/contentImage?externalMediaId=46f4ec6d-5dde-4133-bc55-80a01feb8f60&name=OneMediaOverlayText_New1170x700&inputFormat=jpg" 
                                alt="Modelo usando maquillaje virtual"
                                className="w-full h-full object-cover"
                            />
                        </div>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default MakeupPage;
