import React, { useState, useEffect, useRef } from 'react';
import type { Currency } from './currency';
import { formatCurrency } from './currency';
import type { Product } from './ProductCard';
import { catalogPages, catalogProducts } from './catalogData';

interface CatalogPageProps {
    currency: Currency;
    onAddToCart: (product: Product) => void;
    onProductSelect: (product: Product) => void;
}

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Hotspot Component
const Hotspot: React.FC<{ position: any; onClick: () => void; }> = ({ position, onClick }) => (
    <button
        style={position}
        onClick={onClick}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center focus:outline-none"
        aria-label="Ver producto"
    >
        <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse-hotspot border-2 border-white shadow-lg"></div>
        <div className="absolute w-4 h-4 bg-white rounded-full"></div>
    </button>
);

// Product Modal Component
const ProductModal: React.FC<{
    product: Product;
    currency: Currency;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
    onProductSelect: (product: Product) => void;
}> = ({ product, currency, onClose, onAddToCart, onProductSelect }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        modalRef.current?.focus();
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto flex flex-col sm:flex-row gap-4 p-4 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={product.imageUrl} alt={product.name} className="w-full sm:w-1/3 h-48 sm:h-auto object-contain rounded-md bg-gray-100" />
                <div className="flex flex-col flex-grow">
                    <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1" aria-label="Cerrar">
                        <CloseIcon />
                    </button>
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                    <p className="text-gray-700 text-sm mb-4 flex-grow">{product.description}</p>
                    <div className="flex items-baseline gap-2 mb-4">
                        <p className="text-2xl font-bold text-black">{formatCurrency(product.price, currency)}</p>
                        {product.regularPrice && (
                            <p className="text-md text-gray-500 line-through">{formatCurrency(product.regularPrice, currency)}</p>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                        <button 
                            onClick={() => onAddToCart(product)} 
                            className="bg-[#EBCFFC] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#e0c2fa] transition-colors w-full"
                        >
                            Añadir al carrito
                        </button>
                        <button 
                            onClick={() => onProductSelect(product)} 
                            className="bg-gray-200 text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors w-full"
                        >
                            Ver detalles
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CatalogPage: React.FC<CatalogPageProps> = ({ currency, onAddToCart, onProductSelect }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [activeHotspotProduct, setActiveHotspotProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const currentPageData = catalogPages[currentPageIndex];

    useEffect(() => {
        const img = new Image();
        img.src = currentPageData.imageUrl;
        img.onload = () => setIsLoading(false);
    }, [currentPageData]);

    useEffect(() => {
        // Preload adjacent images
        if (currentPageIndex > 0) new Image().src = catalogPages[currentPageIndex - 1].imageUrl;
        if (currentPageIndex < catalogPages.length - 1) new Image().src = catalogPages[currentPageIndex + 1].imageUrl;
    }, [currentPageIndex]);

    const handlePageChange = (newIndex: number) => {
        if (newIndex >= 0 && newIndex < catalogPages.length) {
            setIsLoading(true);
            setCurrentPageIndex(newIndex);
        }
    };
    
    const handleHotspotClick = (productId: number) => {
        setActiveHotspotProduct(catalogProducts[productId] || null);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-black tracking-tight mt-2">Catálogo Interactivo</h1>
                <p className="mt-2 text-lg text-gray-600">Haz clic en los puntos sobre los productos para comprarlos.</p>
            </div>

            <div className="relative w-full max-w-2xl mx-auto">
                <div className="relative aspect-[1/1.414] bg-gray-100 rounded-lg shadow-lg overflow-hidden border">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
                            <div className="w-12 h-12 border-4 border-gray-200 border-t-fuchsia-500 rounded-full animate-spin"></div>
                        </div>
                    )}
                    <img
                        src={currentPageData.imageUrl}
                        alt={`Catálogo página ${currentPageData.pageNumber}`}
                        className={`w-full h-full object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                    {!isLoading && currentPageData.hotspots.map((hotspot, index) => (
                        <Hotspot
                            key={index}
                            position={hotspot.position}
                            onClick={() => handleHotspotClick(hotspot.productId)}
                        />
                    ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => handlePageChange(currentPageIndex - 1)}
                        disabled={currentPageIndex === 0}
                        className="bg-fuchsia-500 text-white rounded-full p-2 disabled:opacity-50 transition-opacity hover:bg-fuchsia-600"
                        aria-label="Página anterior"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <span className="font-semibold text-lg">
                        Página {currentPageData.pageNumber} / {catalogPages.length}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPageIndex + 1)}
                        disabled={currentPageIndex === catalogPages.length - 1}
                        className="bg-fuchsia-500 text-white rounded-full p-2 disabled:opacity-50 transition-opacity hover:bg-fuchsia-600"
                        aria-label="Página siguiente"
                    >
                        <ArrowRightIcon />
                    </button>
                </div>
            </div>

            {activeHotspotProduct && (
                <ProductModal
                    product={activeHotspotProduct}
                    currency={currency}
                    onClose={() => setActiveHotspotProduct(null)}
                    onAddToCart={onAddToCart}
                    onProductSelect={onProductSelect}
                />
            )}
            <style>
                {`
                @keyframes pulse-hotspot {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .animate-pulse-hotspot {
                    animation: pulse-hotspot 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
                }
                @keyframes fade-in-scale {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                `}
            </style>
        </div>
    );
};

export default CatalogPage;