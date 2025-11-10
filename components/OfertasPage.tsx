
import React from 'react';
import { ProductCard, type Product } from './ProductCard';
import type { Currency } from './currency';
import { allProducts } from './products';

const ofertasProducts: Product[] = allProducts.filter(p => p.regularPrice && p.regularPrice > p.price);

const OfertasPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
}> = ({ currency, onAddToCart, onProductSelect }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-black tracking-tight">Ofertas Destacadas</h2>
                <p className="mt-2 text-xl text-gray-600 font-semibold">Catálogo Actual</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ofertasProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        currency={currency}
                        onAddToCart={onAddToCart}
                        onProductSelect={onProductSelect}
                    />
                ))}
            </div>
        </div>
    );
};

export default OfertasPage;
