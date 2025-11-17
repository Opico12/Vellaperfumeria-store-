

import React from 'react';
import type { View, Product } from './types';
import { allProducts } from './products';
import { ProductCard } from './ProductCard';
// Fix: Changed to a default import as HeroCarousel is not a named export.
import HeroBanner from './HeroCarousel';
import type { Currency } from './currency';

const ProductList: React.FC<{
    onNavigate: (view: View) => void;
    onProductSelect: (product: Product) => void;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currency: Currency;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
}> = ({ onNavigate, onProductSelect, onAddToCart, currency, onQuickView, onCartClick }) => {
    const newArrivals = allProducts.slice(0, 4);
    const bestSellers = allProducts.filter(p => p.rating && p.rating >= 5).slice(0, 4);
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
            
            <HeroBanner onProductSelect={onProductSelect} />
            
            <section>
                <h2 className="text-3xl font-extrabold text-black tracking-tight text-center mb-10">Novedades</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {newArrivals.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            currency={currency}
                            onAddToCart={onAddToCart}
                            onProductSelect={onProductSelect}
                            onQuickView={onQuickView}
                            onCartClick={onCartClick}
                        />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-extrabold text-black tracking-tight text-center mb-10">Más Vendidos</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellers.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            currency={currency}
                            onAddToCart={onAddToCart}
                            onProductSelect={onProductSelect}
                            onQuickView={onQuickView}
                            onCartClick={onCartClick}
                        />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button
                        onClick={() => onNavigate('products')}
                        className="btn-primary"
                    >
                        Ver toda la tienda
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductList;
