import React, { useState, useRef, useEffect } from 'react';
import type { Product } from './types';
import { allProducts } from './products';
import type { HotspotData } from './catalogData';
import { formatCurrency, type Currency } from './currency';

const BasketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
);

interface HotspotProps {
    data: HotspotData;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
}

const Hotspot: React.FC<HotspotProps> = ({ data, currency, onAddToCart }) => {
    const [isAdded, setIsAdded] = useState(false);
    const product = allProducts.find(p => p.id === data.productId);
    const btnRef = useRef<HTMLButtonElement>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        // Cleanup timeout on component unmount
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    if (!product) return null;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (isAdded) return; // Prevent multiple clicks while animation is running

        onAddToCart(product, btnRef.current, null);
        setIsAdded(true);
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div
            className="absolute z-10 group"
            style={{ left: `${data.x}%`, top: `${data.y}%` }}
        >
            {/* Tooltip with product name and price */}
            <div className="absolute bottom-full mb-3 w-max max-w-xs left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-center rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap shadow-lg">
                <p className="font-bold text-sm">{product.name}</p>
                <p className="text-xs">{formatCurrency(product.price, currency)}</p>
            </div>

            <button
                ref={btnRef}
                onClick={handleClick}
                style={{ transform: 'translate(-50%, -50%)' }}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-110 ${isAdded ? 'bg-green-500 scale-110' : 'bg-brand-primary bg-opacity-70'}`}
                aria-label={`Añadir ${product.name} al carrito`}
            >
                {isAdded ? (
                    <CheckIcon />
                ) : (
                    <>
                        {/* Pulsing ring */}
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75 group-hover:hidden"></span>
                        
                        {/* The static dot */}
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white group-hover:opacity-0 transition-opacity duration-300"></span>

                        {/* Basket Icon - visible on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <BasketIcon />
                        </div>
                    </>
                )}
            </button>
        </div>
    );
};

export default Hotspot;