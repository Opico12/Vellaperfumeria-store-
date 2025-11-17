
import React from 'react';

const CHECKOUT_URL = 'https://vellaperfumeria.com/checkout/';

/**
 * This component embeds the checkout page from the main Vellaperfumeria WordPress site.
 * It relies on the cart being populated on the main site's session, which is handled
 * when items are added to the cart in this application via a hidden iframe.
 */
const CheckoutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-brand-primary mb-8 text-center">Finalizar Compra</h1>
            <div 
                className="w-full bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200"
                style={{ height: '150vh' }} // A generous height to contain the full checkout form
            >
                <iframe
                    src={CHECKOUT_URL}
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
