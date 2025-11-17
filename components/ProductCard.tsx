import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

// --- ICONS ---
const QuickBuyIcon = () => (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const HeartIcon: React.FC<{isFilled: boolean}> = ({ isFilled }) => (
    <svg className="h-6 w-6" fill={isFilled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={`w-4 h-4 ${className}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const GooglePayIcon = () => (
    <svg className="w-8 h-auto mr-1" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.33398 8.87988V11.1064H7.31152V12.3086H4.33398V15.1504H8.38184V16.3525H3.13184V7.67773H8.38184V8.87988H4.33398Z" fill="white"/>
        <path d="M12.2045 10.9756C12.6537 10.9756 13.0649 11.0537 13.4379 11.2099C13.811 11.3662 14.1137 11.5898 14.3451 11.8808C14.5859 12.1621 14.7064 12.5019 14.7064 12.8994C14.7064 13.2187 14.6383 13.5048 14.5023 13.7578C14.3663 14.0107 14.1674 14.2392 13.9057 14.4423C13.644 14.6455 13.332 14.8144 12.9691 14.9492C12.6062 15.0839 12.2142 15.1513 11.7933 15.1513H10.222V16.3535H9.01989V7.67871H11.9564C12.4437 7.67871 12.8822 7.74609 13.2718 7.87988C13.6615 8.01367 13.9808 8.21484 14.2298 8.48339C14.4789 8.75195 14.6035 9.07421 14.6035 9.44921C14.6035 9.87304 14.474 10.2294 14.2142 10.5185C13.9545 10.8076 13.6225 10.9414 13.2181 11.0078L13.1517 11.0185L14.9125 15.0283C15.0775 15.4257 15.2289 15.707 15.3675 15.871C15.5062 16.0351 15.6517 16.1601 15.8031 16.2451L15.4603 16.7119L13.5209 10.9756H12.2045ZM10.222 10.0224V13.9492H11.7162C12.0648 13.9492 12.3568 13.8828 12.5921 13.749C12.8275 13.6152 13.0013 13.4326 13.1136 13.1992C13.2259 12.9658 13.2821 12.7031 13.2821 12.4101C13.2821 12.1269 13.2259 11.8759 13.1136 11.6562C13.0013 11.4365 12.8246 11.2607 12.5833 11.1289C12.3421 10.997 12.0462 10.9316 11.6966 10.9316H10.222V10.0224Z" fill="white"/>
        <path d="M16.9238 7.67871H18.1259V13.7021L21.7343 7.67871H23.0898L19.4521 13.4541L23.2382 16.3535H21.8212L18.1259 13.9756V16.3535H16.9238V7.67871Z" fill="white"/>
        <path d="M25.1094 7.67773H30.4199V8.87988H26.3115V11.2373H29.8311V12.4395H26.3115V15.1504H30.4199V16.3525H25.1094V7.67773Z" fill="white"/>
    </svg>
);


export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
}> = ({ product, currency, onAddToCart, onProductSelect, onQuickView, onCartClick }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const isDiscounted = product.regularPrice && product.regularPrice > product.price;

    const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onAddToCart(product, null, null);
        onCartClick();
    };

    const handleQuickBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onAddToCart(product, e.currentTarget, null);
    };

    const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsWishlisted(prev => !prev);
    };

    const renderStars = () => {
        if (!product.rating) return null;
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        return (
            <div className="flex items-center" title={`${product.rating}/5 ★`}>
                {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="text-amber-400" />)}
                {halfStar && <StarIcon key="half" className="text-amber-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />}
                {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="text-gray-300" />)}
            </div>
        );
    };

    return (
        <div 
            className="bg-white rounded-lg flex flex-col group border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full"
            onClick={() => onProductSelect(product)}
        >
            <div className="relative cursor-pointer overflow-hidden rounded-t-lg">
                <img src={product.imageUrl} alt={product.name} className="w-full aspect-square object-contain p-2 transition-transform duration-300 group-hover:scale-105" />

                {/* Hover Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={handleQuickBuy}
                        className="bg-white/80 backdrop-blur-sm p-2.5 rounded-full text-black hover:bg-white shadow-md transition-all transform hover:scale-110"
                        aria-label={`Compra rápida de ${product.name}`}
                    >
                        <QuickBuyIcon />
                    </button>
                    <button
                        onClick={handleToggleWishlist}
                        className={`p-2.5 rounded-full text-black shadow-md transition-all transform hover:scale-110 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 backdrop-blur-sm hover:bg-white'}`}
                        aria-label="Añadir a favoritos"
                    >
                        <HeartIcon isFilled={isWishlisted} />
                    </button>
                </div>
            </div>

            <div className="p-3 text-left flex flex-col flex-grow">
                {product.rating && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                        {renderStars()}
                        <span>({product.reviewCount})</span>
                    </div>
                )}
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.brand}</span>
                <h3 className="text-sm font-semibold text-brand-primary mt-1 flex-grow cursor-pointer h-10">
                    {product.name}
                </h3>
                
                {product.variants?.Tono && (
                    <div className="flex items-center gap-1 mt-2 h-5">
                        {product.variants.Tono.slice(0, 6).map(v => (
                            <span key={v.value} className="block w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: v.colorCode }} title={v.value}></span>
                        ))}
                        {product.variants.Tono.length > 6 && <span className="text-xs text-gray-500 font-semibold">+{product.variants.Tono.length - 6}</span>}
                    </div>
                )}
                
                <div className="mt-3 flex items-baseline justify-start gap-2">
                    <p className={`text-lg font-bold ${isDiscounted ? 'text-red-600' : 'text-brand-primary'}`}>{formatCurrency(product.price, currency)}</p>
                    {isDiscounted && (
                        <p className="text-sm text-gray-400 line-through">{formatCurrency(product.regularPrice!, currency)}</p>
                    )}
                </div>
                
                <div className="mt-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button
                        ref={btnRef}
                        onClick={(e) => { e.stopPropagation(); onAddToCart(product, btnRef.current, null); }}
                        className="w-full bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        aria-label={`Añadir ${product.name} al carrito`}
                    >
                        Añadir al carrito
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-black text-white font-semibold py-1.5 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm flex items-center justify-center"
                        aria-label={`Pagar ${product.name} con Google Pay`}
                    >
                        Pagar con <GooglePayIcon /> 
                    </button>
                </div>
            </div>
        </div>
    );
};