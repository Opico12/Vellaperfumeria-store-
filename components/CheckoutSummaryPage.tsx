
import React, { useMemo, useState } from 'react';
import type { CartItem, View } from './types';
import type { Currency } from './currency';
import { formatCurrency } from './currency';

interface CheckoutSummaryPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onNavigate: (view: View) => void;
}

const FREE_SHIPPING_THRESHOLD = 35;
const DISCOUNT_THRESHOLD = 35; 
const DISCOUNT_PERCENTAGE = 0.15; 
const SHIPPING_COST = 6.00;

const CheckoutSummaryPage: React.FC<CheckoutSummaryPageProps> = ({ 
    cartItems, 
    currency, 
    onUpdateQuantity, 
    onRemoveItem,
    onNavigate
}) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const subtotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }, [cartItems]);

    const discountAmount = useMemo(() => {
        if (subtotal >= DISCOUNT_THRESHOLD) {
            return subtotal * DISCOUNT_PERCENTAGE;
        }
        return 0;
    }, [subtotal]);

    const hasShippingSaver = useMemo(() => {
        return cartItems.some(item => item.product.isShippingSaver);
    }, [cartItems]);

    const shippingCost = useMemo(() => {
        if (hasShippingSaver || subtotal >= FREE_SHIPPING_THRESHOLD) {
            return 0;
        }
        return SHIPPING_COST;
    }, [subtotal, hasShippingSaver]);

    const total = subtotal - discountAmount + shippingCost;
    const amountForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

    const handleDirectCheckout = () => {
        if (cartItems.length === 0) return;
        
        setIsProcessing(true);

        // Use standard WooCommerce add-to-cart URL format with ABSOLUTE PATH to main domain
        const item = cartItems[0];
        let idToAdd = item.product.id;
             
        // Check for variation ID for the first item
        if (item.selectedVariant && item.product.variants) {
            for (const type in item.selectedVariant) {
                const value = item.selectedVariant[type];
                const variantOptions = item.product.variants[type];
                const option = variantOptions?.find(opt => opt.value === value);
                if (option?.variationId) {
                    idToAdd = option.variationId;
                    break;
                }
            }
        }
        
        // Get 'v' param from current URL
        const urlParams = new URLSearchParams(window.location.search);
        const vParam = urlParams.get('v');
            
        // Force redirect to the official checkout page on the MAIN domain
        let redirectUrl = `https://vellaperfumeria.com/carrito/?add-to-cart=${idToAdd}&quantity=${item.quantity}`;
        
        // Append 'v' parameter if it exists
        if (vParam) {
            redirectUrl += `&v=${vParam}`;
        }
        
        window.location.href = redirectUrl;
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="bg-white rounded-3xl p-12 shadow-sm border border-fuchsia-50 max-w-2xl mx-auto">
                    <svg className="w-24 h-24 text-fuchsia-200 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-8 text-lg">Parece que aún no has añadido nada a tu cesta. ¡Explora nuestra tienda para encontrar tus favoritos!</p>
                    <button 
                        onClick={() => onNavigate('products')}
                        className="bg-[var(--color-primary)] text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-fuchsia-200 hover:bg-white hover:text-[var(--color-primary-solid)] border-2 border-[var(--color-primary-solid)] transition-all transform hover:-translate-y-1"
                    >
                        Volver a la tienda
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center md:text-left">Resumen de tu Pedido</h1>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 rounded-xl p-2 border border-gray-200">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                                    </div>
                                    
                                    <div className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.product.name}</h3>
                                                <p className="text-lg font-bold text-[var(--color-primary-solid)]">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                                            {item.selectedVariant && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {Object.entries(item.selectedVariant).map(([key, value]) => (
                                                        <span key={key} className="text-xs font-medium bg-fuchsia-50 text-fuchsia-800 px-2 py-1 rounded-md border border-fuchsia-100">
                                                            {key}: {value}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex justify-between items-end mt-4">
                                            <div className="flex items-center border-2 border-gray-100 rounded-xl bg-white overflow-hidden">
                                                <button 
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 font-bold transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-10 text-center font-semibold text-gray-900">{item.quantity}</span>
                                                <button 
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 font-bold transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => onRemoveItem(item.id)}
                                                className="text-gray-400 hover:text-red-500 text-sm font-medium underline transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white rounded-3xl shadow-lg border border-fuchsia-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen</h2>
                        
                        <div className="space-y-4 mb-6 text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold text-gray-900">{formatCurrency(subtotal, currency)}</span>
                            </div>
                            
                            {discountAmount > 0 ? (
                                <div className="flex justify-between text-fuchsia-600">
                                    <span>Descuento (15%)</span>
                                    <span className="font-semibold">-{formatCurrency(discountAmount, currency)}</span>
                                </div>
                            ) : (
                                <div className="text-sm bg-gray-50 p-2 rounded-lg text-center">
                                    ¡Añade {formatCurrency(DISCOUNT_THRESHOLD - subtotal, currency)} más para obtener un 15% de descuento!
                                </div>
                            )}

                            <div className="flex justify-between">
                                <span>Envío</span>
                                {shippingCost === 0 ? (
                                    <span className="font-semibold text-green-600">GRATIS</span>
                                ) : (
                                    <span className="font-semibold text-gray-900">{formatCurrency(shippingCost, currency)}</span>
                                )}
                            </div>
                            {amountForFreeShipping > 0 && (
                                <div className="text-xs text-center text-gray-500 mt-1">
                                    Faltan {formatCurrency(amountForFreeShipping, currency)} para envío gratis
                                </div>
                            )}
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-3xl font-extrabold text-[var(--color-primary-solid)]">{formatCurrency(total, currency)}</span>
                            </div>
                            <p className="text-xs text-gray-400 text-right mt-1">Impuestos incluidos</p>
                        </div>

                        <button 
                            onClick={handleDirectCheckout}
                            disabled={isProcessing}
                            className="w-full bg-[var(--color-primary)] text-black font-bold py-4 rounded-xl shadow-lg hover:shadow-fuchsia-200 hover:bg-white hover:text-[var(--color-primary-solid)] border-2 border-[var(--color-primary-solid)] transition-all transform hover:-translate-y-1 flex justify-center items-center disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isProcessing ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Procesando...
                                </span>
                            ) : (
                                'FINALIZAR COMPRA'
                            )}
                        </button>
                        
                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-400 mb-2">Pago 100% Seguro</p>
                            <div className="flex justify-center gap-2 grayscale opacity-60">
                                {/* Simple SVG Placeholders for payment icons */}
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                <div className="w-8 h-5 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummaryPage;
