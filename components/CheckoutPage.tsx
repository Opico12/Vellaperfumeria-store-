

import React from 'react';
import type { CartItem, View } from './types';

// This is a backup URL in case the cart is empty for any reason.
const CHECKOUT_URL_BASE = 'https://vellaperfumeria.com/checkout/';

interface CheckoutPageProps {
    cartItems: CartItem[];
    onNavigate: (view: View) => void;
}

/**
 * This component embeds the checkout page from the main Vellaperfumeria WordPress site.
 * It provides a more integrated experience for single-item checkouts by constructing
 * a URL that adds the item directly to the checkout session.
 */
const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, onNavigate }) => {
    let checkoutUrl = CHECKOUT_URL_BASE;

    // For a single item cart, we can create a direct link to a pre-filled checkout.
    if (cartItems.length === 1) {
        const item = cartItems[0];
        // This WooCommerce URL pattern adds the item and redirects to the checkout page.
        checkoutUrl = `https://vellaperfumeria.com/checkout/?add-to-cart=${item.product.id}&quantity=${item.quantity}`;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-center sm:text-left">
                 <h1 className="text-3xl font-bold text-brand-primary">Finalizar Compra</h1>
                <button
                    onClick={() => onNavigate('products')}
                    className="font-semibold text-brand-primary hover:text-gray-700 transition-colors flex items-center gap-2 mt-4 sm:mt-0"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Seguir Comprando
                </button>
            </div>
            <p className="text-center text-gray-600 mb-8">Estás completando tu pedido de forma segura en vellaperfumeria.com.</p>
            <div 
                className="w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200"
                style={{ height: '150vh' }} // A generous height to contain the full checkout form
            >
                <iframe
                    src={checkoutUrl}
                    title="Finalizar Compra - Vellaperfumeria"
                    className="w-full h-full"
                    frameBorder="0"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default CheckoutPage;