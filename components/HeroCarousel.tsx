
import React, { useRef, useState, useEffect } from 'react';
import type { Product } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface HeroCarouselProps {
    products: Product[];
    currency: Currency;
    onProductSelect: (product: Product) => void;
}

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

const HeroCarousel: React.FC<HeroCarouselProps> = ({ products, currency, onProductSelect }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        const currentRef = scrollContainerRef.current;
        if (currentRef) {
            checkScrollButtons();
            currentRef.addEventListener('scroll', checkScrollButtons);
            window.addEventListener('resize', checkScrollButtons);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScrollButtons);
                window.removeEventListener('resize', checkScrollButtons);
            }
        };
    }, [products]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <div className="relative group">
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide space-x-4 py-4"
            >
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="snap-center flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${products.length}`}
                    >
                        <div 
                            onClick={() => onProductSelect(product)}
                            className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col cursor-pointer transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="relative h-64 w-full bg-white flex items-center justify-center p-4">
                                <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain" />
                                {product.tag && (
                                    <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                        {product.tag}
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex-grow flex flex-col">
                                <h3 className="text-base font-bold text-gray-800 flex-grow">{product.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{product.brand}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-xl font-extrabold text-black">{formatCurrency(product.price, currency)}</p>
                                    <button 
                                        className="text-black font-semibold text-sm hover-underline-effect"
                                        aria-label={`Ver detalles de ${product.name}`}
                                    >
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Anterior"
            >
                <ArrowLeftIcon />
            </button>
            <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-4 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Siguiente"
            >
                <ArrowRightIcon />
            </button>
             <style>
                {`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                `}
            </style>
        </div>
    );
};

export default HeroCarousel;
