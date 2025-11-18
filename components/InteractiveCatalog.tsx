import React from 'react';
import type { Product } from './types';
import type { Currency } from './currency';
import Hotspot from './Hotspot';
import { catalogData } from './catalogData';

interface InteractiveCatalogProps {
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    currentPageIndex: number;
}

const InteractiveCatalog: React.FC<InteractiveCatalogProps> = ({ currency, onAddToCart, currentPageIndex }) => {
    const currentPage = catalogData[currentPageIndex];

    return (
        <div className="relative w-full h-full">
            {/* Pages */}
            {catalogData.map((page, index) => (
                <div
                    key={page.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === currentPageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    <img src={page.imageUrl} alt={`Página ${page.id} del catálogo`} className="w-full h-full object-contain" />
                </div>
            ))}

            {/* Hotspots for the current page */}
            {currentPage && (
                 <div className="absolute inset-0">
                    {currentPage.hotspots.map((hotspot, index) => (
                        <Hotspot
                            key={`${currentPage.id}-${index}`}
                            data={hotspot}
                            currency={currency}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InteractiveCatalog;