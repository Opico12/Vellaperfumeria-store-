
import React from 'react';
import { ProductCard, type Product } from './ProductCard';
import type { Currency } from './currency';
import { allProducts } from './products';
import HeroCarousel from './HeroCarousel';

const ProductListPage: React.FC<{
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
}> = ({ currency, onAddToCart, onProductSelect }) => {
    
    // Select some products for the hero carousel
    const featuredProducts = allProducts.filter(p => p.rating && p.rating >= 5).slice(0, 8);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-black tracking-tight">Nuestra Tienda</h1>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                    Explora nuestra colección de fragancias, maquillaje y cuidado personal.
                </p>
            </div>

            {featuredProducts.length > 0 && 
                <HeroCarousel 
                    products={featuredProducts} 
                    currency={currency} 
                    onProductSelect={onProductSelect} 
                />
            }

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {allProducts.map(product => (
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

export default ProductListPage;
