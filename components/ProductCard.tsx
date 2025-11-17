
import React, { useRef, useState } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { Product } from './types';

const HeartIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const GooglePayIcon = () => (
    <svg className="w-8 h-auto mr-1" viewBox="0 0 52 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.33398 8.87988V11.1064H7.31152V12.3086H4.33398V15.1504H8.38184V16.3525H3.13184V7.67773H8.38184V8.87988H4.33398Z" fill="white"/>
        <path d="M12.2045 10.9756C12.6537 10.9756 13.0649 11.0537 13.4379 11.2099C13.811 11.3662 14.1137 11.5898 14.3451 11.8808C14.5859 12.1621 14.7064 12.5019 14.7064 12.8994C14.7064 13.2187 14.6383 13.5048 14.5023 13.7578C14.3663 14.0107 14.1674 14.2392 13.9057 14.4423C13.644 14.6455 13.332 14.8144 12.9691 14.9492C12.6062 15.0839 12.2142 15.1513 11.7933 15.1513H10.222V16.3535H9.01989V7.67871H11.9564C12.4437 7.67871 12.8822 7.74609 13.2718 7.87988C13.6615 8.01367 13.9808 8.21484 14.2298 8.48339C14.4789 8.75195 14.6035 9.07421 14.6035 9.44921C14.6035 9.87304 14.474 10.2294 14.2142 10.5185C13.9545 10.8076 13.6225 10.9414 13.2181 11.0078L13.1517 11.0185L14.9125 15.0283C15.0775 15.4257 15.2289 15.707 15.3675 15.871C15.5062 16.0351 15.6517 16.1601 15.8031 16.2451L15.4603 16.7119L13.5209 10.9756H12.2045ZM10.222 10.0224V13.9492H11.7162C12.0648 13.9492 12.3568 13.8828 12.5921 13.749C12.8275 13.6152 13.0013 13.4326 13.1136 13.1992C13.2259 12.9658 13.2821 12.7031 13.2821 12.4101C13.2821 12.1269 13.2259 11.8759 13.1136 11.6562C13.0013 11.4365 12.8246 11.2607 12.5833 11.1289C12.3421 10.997 12.0462 10.9316 11.6966 10.9316H10.222V10.0224Z" fill="white"/>
        <path d="M16.9238 7.67871H18.1259V13.7021L21.7343 7.67871H23.0898L19.4521 13.4541L23.2382 16.3535H21.8212L18.1259 13.9756V16.3535H16.9238V7.67871Z" fill="white"/>
        <path d="M25.1094 7.67773H30.4199V8.87988H26.3115V11.2373H29.8311V12.4395H26.3115V15.1504H30.4199V16.3525H25.1094V7.67773Z" fill="white"/>
        <path d="M49.4996 11.3965C49.4996 10.4072 49.2555 9.56641 48.7672 8.87402C48.2789 8.18164 47.6344 7.66602 46.8336 7.32715C46.0426 6.98828 45.1613 6.81836 44.1891 6.81836C43.2169 6.81836 42.3329 6.98828 41.5392 7.32715C40.7455 7.66602 40.1012 8.18164 39.6129 8.87402C39.1246 9.56641 38.8805 10.4072 38.8805 11.3965C38.8805 12.3857 39.1246 13.2266 39.6129 13.9189C40.1012 14.6113 40.7455 15.127 41.5392 15.4658C42.3329 15.8047 43.2169 15.9746 44.1891 15.9746C45.1613 15.9746 46.0426 15.8047 46.8336 15.4658C47.6344 15.127 48.2789 14.6113 48.7672 13.9189C49.2555 13.2266 49.4996 12.3857 49.4996 11.3965ZM40.1774 11.3965C40.1774 10.6816 40.3541 10.082 40.7076 9.59766C41.0611 9.11328 41.5392 8.78223 42.1422 8.60449C42.7452 8.42676 43.4361 8.33789 44.2145 8.33789C44.9928 8.33789 45.6837 8.42676 46.2867 8.60449C46.8898 8.78223 47.3678 9.11328 47.7213 9.59766C48.0748 10.082 48.2516 10.6816 48.2516 11.3965C48.2516 12.1113 48.0748 12.708 47.7213 13.1865C47.3678 13.665 46.8898 13.9932 46.2867 14.1709C45.6837 14.3486 44.9928 14.4375 44.2145 14.4375C43.4361 14.4375 42.7452 14.3486 42.1422 14.1709C41.5392 13.9932 41.0611 13.665 40.7076 13.1865C40.3541 12.708 40.1774 12.1113 40.1774 11.3965Z" fill="#5F6368"/>
        <path d="M37.3398 12.2852V7.125H36.3164V6.81836H34.4062V7.125H33.3828V12.2852C33.3828 13.8887 34.0273 14.6904 35.3164 14.6904C35.7949 14.6904 36.2158 14.5957 36.5781 14.4062L36.8154 15.6025C36.377 15.8203 35.8564 15.9297 35.2539 15.9297C33.2441 15.9297 32.2402 14.6602 32.2402 12.2852V7.125H31.2168V6.81836H29.3066V7.125H28.2832V15.5459H29.4287V12.5918H30.1387L31.2168 15.5459H32.3916L31.3135 12.5918H31.1113V7.61621H32.2402V11.416C32.2402 12.0195 32.3154 12.5176 32.4658 12.9102L32.2109 12.8203C32.1211 13.3184 32.1865 13.8828 32.4043 14.5137C32.6221 15.1445 32.9648 15.6504 33.4316 16.0312C33.8984 16.4121 34.4756 16.6816 35.1621 16.8398C35.8486 16.998 36.627 17.0781 37.4971 17.0781H37.8037V12.2852H37.3398Z" fill="#EA4335"/>
        <path d="M49.4996 11.3965C49.4996 10.4072 49.2555 9.56641 48.7672 8.87402C48.2789 8.18164 47.6344 7.66602 46.8336 7.32715C46.0426 6.98828 45.1613 6.81836 44.1891 6.81836C43.2169 6.81836 42.3329 6.98828 41.5392 7.32715C40.7455 7.66602 40.1012 8.18164 39.6129 8.87402C39.1246 9.56641 38.8805 10.4072 38.8805 11.3965C38.8805 12.3857 39.1246 13.2266 39.6129 13.9189C40.1012 14.6113 40.7455 15.127 41.5392 15.4658C42.3329 15.8047 43.2169 15.9746 44.1891 15.9746C45.1613 15.9746 46.0426 15.8047 46.8336 15.4658C47.6344 15.127 48.2789 14.6113 48.7672 13.9189C49.2555 13.2266 49.4996 12.3857 49.4996 11.3965Z" fill="#FBBC04"/>
        <path d="M37.3398 12.2852V7.125H36.3164V6.81836H34.4062V7.125H33.3828V12.2852C33.3828 13.8887 34.0273 14.6904 35.3164 14.6904C35.7949 14.6904 36.2158 14.5957 36.5781 14.4062L36.8154 15.6025C36.377 15.8203 35.8564 15.9297 35.2539 15.9297C33.2441 15.9297 32.2402 14.6602 32.2402 12.2852V7.125H31.2168V6.81836H29.3066V7.125H28.2832V15.5459H29.4287V12.5918H30.1387L31.2168 15.5459H32.3916L31.3135 12.5918H31.1113V7.61621H32.2402V11.416C32.2402 12.0195 32.3154 12.5176 32.4658 12.9102L32.2109 12.8203C32.1211 13.3184 32.1865 13.8828 32.4043 14.5137C32.6221 15.1445 32.9648 15.6504 33.4316 16.0312C33.8984 16.4121 34.4756 16.6816 35.1621 16.8398C35.8486 16.998 36.627 17.0781 37.4971 17.0781H37.8037V12.2852H37.3398Z" fill="#4285F4"/>
    </svg>
);

export const ProductCard: React.FC<{
    product: Product;
    currency: Currency;
    onAddToCart: (product: Product, buttonElement: HTMLButtonElement | null, selectedVariant: Record<string, string> | null) => void;
    onProductSelect: (product: Product) => void;
    onQuickView: (product: Product) => void;
    onCartClick: () => void;
    isFeatured?: boolean;
}> = ({ product, currency, onAddToCart, onProductSelect, onQuickView, onCartClick, isFeatured = false }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [isWishlisted, setIsWishlisted] = useState(false);
    
    const isDiscounted = product.regularPrice && product.regularPrice > product.price;
    
    const handleBuyNow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onAddToCart(product, null, null); 
        onCartClick();
    };

    return (
        <div className="bg-white rounded-lg overflow-hidden flex flex-col group border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="relative cursor-pointer" onClick={() => onProductSelect(product)} role="button" aria-label={`Ver detalles de ${product.name}`}>
                <div className="w-full aspect-square flex items-center justify-center p-2 bg-white">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                
                {isDiscounted && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full uppercase tracking-wider">
                        Oferta
                    </div>
                )}
                
                {/* Quick View Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                        }}
                        className="bg-white text-black font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-gray-200 transition-transform transform group-hover:scale-100 scale-90"
                        aria-label={`Vista rápida de ${product.name}`}
                    >
                        Vista Rápida
                    </button>
                </div>
            </div>
            <div className="p-4 text-center flex flex-col flex-grow bg-white">
                <h3 
                    className="text-base font-semibold text-brand-primary mt-1 flex-grow cursor-pointer"
                    onClick={() => onProductSelect(product)}
                >
                    {product.name}
                </h3>
                <div className="mt-2 flex items-baseline justify-center gap-2">
                    <p className={`text-lg font-bold ${isDiscounted ? 'text-red-600' : 'text-brand-primary'}`}>{formatCurrency(product.price, currency)}</p>
                    {isDiscounted && (
                        <p className="text-sm text-gray-400 line-through">{formatCurrency(product.regularPrice!, currency)}</p>
                    )}
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    <button
                        ref={btnRef}
                        onClick={() => onAddToCart(product, btnRef.current, null)}
                        className="w-full bg-brand-primary text-white font-semibold py-2.5 px-4 rounded-md hover:bg-gray-700 transition-colors text-sm"
                        aria-label={`Añadir ${product.name} al carrito`}
                    >
                        Añadir al carrito
                    </button>
                    <button
                        onClick={handleBuyNow}
                        className="w-full bg-black text-white font-semibold py-1.5 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm flex items-center justify-center"
                        aria-label={`Pagar ${product.name} con Google Pay`}
                    >
                        <GooglePayIcon /> Pagar con
                    </button>
                </div>
            </div>
        </div>
    );
};
