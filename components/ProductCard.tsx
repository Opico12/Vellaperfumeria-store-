
import React, { useRef, useState, useEffect } from 'react';
import { type Currency, formatCurrency } from './currency';

// FIX: Export VariantOption interface to make it available in other files
// that import the `Product` type. This resolves a TypeScript error where the
// type of product variants was not correctly inferred.
export interface VariantOption {
    value: string;
    colorCode?: string;
    imageUrl?: string;
}

// FIX: Export ProductVariants interface for the same reason as VariantOption.
export interface ProductVariants {
    [key: string]: VariantOption[];
}

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    regularPrice?: number;
    imageUrl: string;
    description: string;
    stock: number;
    category: 'perfume' | 'hair' | 'makeup' | 'skincare' | 'personal-care' | 'men' | 'wellness' | 'accessories';
    subCategory?: 'Giordani Gold' | 'THE ONE' | 'OnColour';
    tag?: 'NOVEDAD' | 'SET';
    statusLabel?: string;
    rating?: number;
    reviewCount?: number;
    variants?: ProductVariants;
    beautyPoints?: number;
    isShippingSaver?: boolean;
}

const HeartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ShoppingBagIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const StarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const TruckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 10-4 0 2 2 0 004 0zM19 17a2 2 0 10-4 0 2 2 0 004 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h2a1 1 0 001-1V7.572a1 1 0 00-.218-.671l-1.5-2.25a1 1 0 00-.868-.451H13v11z" />
    </svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);


const StarRating: React.FC<{ rating: number, reviewCount: number }> = ({ rating, reviewCount }) => {
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;

    return (
        <div className="flex items-center justify-center sm:justify-start">
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="w-4 h-4 text-gray-800" />)}
                {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)}
            </div>
            {reviewCount > 0 && <span className="text-xs text-gray-900 font-medium ml-2">({reviewCount})</span>}
        </div>
    );
};

const getDefaultVariant = (product: Product): Record<string, string> | null => {
    if (!product.variants) return null;
    const defaultVariant: Record<string, string> = {};
    for (const key in product.variants) {
        defaultVariant[key] = product.variants[key][0].value;
    }
    return defaultVariant;
};


export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
}> = ({ product, currency, onAddToCart, onProductSelect }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const isOutOfStock = product.stock === 0;

    const [selectedVariant, setSelectedVariant] = useState<Record<string, string> | null>(getDefaultVariant(product));
    const [cardImageUrl, setCardImageUrl] = useState(product.imageUrl);

    useEffect(() => {
        // Start with the base product image as a default.
        let newImageUrl = product.imageUrl;
    
        // Check if there are color variants and a color is selected.
        if (product.variants?.Color && selectedVariant?.Color) {
            // Find the full data for the selected color variant.
            const selectedColorOption = product.variants.Color.find(
                option => option.value === selectedVariant.Color
            );
    
            // If the selected variant has its own specific image URL, use it.
            if (selectedColorOption && selectedColorOption.imageUrl) {
                newImageUrl = selectedColorOption.imageUrl;
            }
        }
    
        // Update the card's image URL state.
        setCardImageUrl(newImageUrl);
    }, [selectedVariant, product]);

    const handleAddToCartClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (btnRef.current && !isOutOfStock) {
            onAddToCart(product, btnRef.current, selectedVariant);
        }
    };

    const handleVariantChange = (e: React.MouseEvent, type: string, value: string) => {
        e.stopPropagation();
        setSelectedVariant(prev => ({ ...(prev || {}), [type]: value }));
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group text-center sm:text-left hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <button onClick={() => onProductSelect(product)} className="block w-full aspect-square bg-gray-50 p-2 focus:outline-none focus:ring-2 focus:ring-black rounded-t-lg">
                    <img src={cardImageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </button>
                
                {product.tag && (
                    <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded ${product.tag === 'SET' ? 'bg-cyan-500' : 'bg-teal-500'}`}>
                        {product.tag}
                    </span>
                )}
                
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button aria-label="Añadir a la lista de deseos" className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white text-gray-700 hover:text-rose-500 transition-colors">
                        <HeartIcon />
                    </button>
                    <button
                        ref={btnRef}
                        onClick={handleAddToCartClick}
                        disabled={isOutOfStock}
                        aria-label="Añadir al carrito"
                        className="bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md hover:bg-white text-gray-700 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ShoppingBagIcon />
                    </button>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                {product.rating !== undefined && product.reviewCount !== undefined ? (
                    <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                ) : (
                    <div className="h-5" /> // Placeholder to maintain alignment
                )}
                
                <p className="text-black text-xs uppercase font-semibold tracking-wide mt-2">{product.brand}</p>
                 {product.beautyPoints ? (
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-fuchsia-600 font-semibold my-1 h-5">
                        <SparklesIcon className="w-3.5 h-3.5" />
                        <span>+{product.beautyPoints} Puntos Beauty</span>
                    </div>
                ) : (
                    <div className="h-5 my-1" />
                )}

                 <h3 
                    className="text-sm font-semibold text-black cursor-pointer hover:text-gray-700 mt-1 flex-grow"
                    onClick={() => onProductSelect(product)}
                >
                    {product.name}
                </h3>

                {product.variants?.Color && (
                     <div className="flex justify-center sm:justify-start gap-1.5 my-2 h-6">
                        {product.variants.Color.map(option => (
                             <button
                                key={option.value}
                                onClick={(e) => handleVariantChange(e, "Color", option.value)}
                                className={`w-5 h-5 rounded-full border transition-transform transform hover:scale-110 ${selectedVariant?.Color === option.value ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300'}`}
                                style={{ backgroundColor: option.colorCode }}
                                aria-label={`Seleccionar color ${option.value}`}
                            />
                        ))}
                    </div>
                )}
                
                {product.statusLabel ? (
                    <p className="text-xs text-red-500 font-bold my-1 h-4">{product.statusLabel}</p>
                ) : (
                    !product.variants?.Color && <div className="h-6 my-2" /> // Placeholder if no variants
                )}
                
                <div className="mt-auto pt-2">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-x-2">
                        <p className="text-lg font-bold text-black">{formatCurrency(product.price, currency)}</p>
                        {product.regularPrice && (
                            <p className="text-sm text-gray-800 line-through">{formatCurrency(product.regularPrice, currency)}</p>
                        )}
                    </div>
                     {product.isShippingSaver ? (
                        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-teal-600 font-bold mt-2 h-5">
                            <TruckIcon />
                            <span>¡Con envío GRATIS!</span>
                        </div>
                    ) : (
                        <div className="h-5 mt-2" />
                    )}
                </div>
            </div>
        </div>
    );
};
