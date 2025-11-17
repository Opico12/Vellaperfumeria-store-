
import React from 'react';
import type { Product } from './types';
import type { Currency } from './currency';
import { ProductCard } from './ProductCard';
import { allProducts } from './products';

const PDF_VIEWER_URL = 'https://vellaperfumeria.com/wp-content/plugins/pdf-viewer-block/inc/pdfjs/web/viewer.html?file=https://vellaperfumeria.com/wp-content/uploads/2025/10/2025015.pdf';

// Products that are likely to be featured in this specific catalog
const featuredProductIds = [38497, 46901, 22442, 105, 204, 12760];
const featuredProducts = allProducts.filter(p => featuredProductIds.includes(p.id));

interface CatalogPageProps {
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
}

const CatalogPage: React.FC<CatalogPageProps> = ({ currency, onAddToCart, onProductSelect, onQuickView, onCartClick }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-black tracking-tight">Catálogo Digital</h1>
                <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                    Explora nuestro catálogo más reciente. Puedes comprar los productos destacados directamente aquí abajo.
                </p>
            </div>

            <div className="relative w-full max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-2xl overflow-hidden border">
                <iframe
                    src={PDF_VIEWER_URL}
                    title="Catálogo Vellaperfumeria"
                    className="w-full"
                    style={{ height: '700px' }}
                    frameBorder="0"
                    allowFullScreen
                />
            </div>

            {featuredProducts.length > 0 && (
                <section className="mt-20">
                    <h2 className="text-3xl font-extrabold text-black tracking-tight text-center mb-10">Compra los Destacados del Catálogo</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                        {featuredProducts.map(product => (
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
            )}
        </div>
    );
};

export default CatalogPage;
