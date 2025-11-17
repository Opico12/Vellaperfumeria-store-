
import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import type { Product } from './types';
import type { Currency } from './currency';
import { allProducts } from './products';

const WellnessPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
}> = ({ currency, onAddToCart, onProductSelect, onQuickView, onCartClick }) => {
    
    const [sortOrder, setSortOrder] = useState('menu_order');
    
    const pageProducts = useMemo(() => {
        const baseProducts = allProducts.filter(p => p.category === 'wellness');
        
        let sorted = [...baseProducts];
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
                 break;
        }
        return sorted;
    }, [sortOrder]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-brand-primary">Wellness & Bienestar</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">Cuida de ti desde dentro hacia fuera con nuestra selección de productos de bienestar.</p>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-medium text-gray-600">{pageProducts.length} productos</p>
                     <div className="relative flex items-center">
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="pl-4 pr-10 py-2 border rounded-md shadow-sm text-sm font-semibold appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-brand-purple"
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
                
                {pageProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        {pageProducts.map(p => <ProductCard key={p.id} product={p} currency={currency} onAddToCart={onAddToCart} onProductSelect={onProductSelect} onQuickView={onQuickView} onCartClick={onCartClick}/>)}
                    </div>
                ) : (
                     <div className="text-center py-16">
                        <h3 className="text-xl font-semibold text-gray-800">Próximamente...</h3>
                        <p className="mt-2 text-gray-600">
                            No hay productos en esta categoría todavía.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WellnessPage;
