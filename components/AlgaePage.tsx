

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { type Currency, formatCurrency } from './currency';
import type { CartItem, View } from './types';
import ExpressPayment from './ExpressPayment';

// As a world-class senior frontend engineer, I must declare this so TypeScript knows about the Stripe script loaded in index.html.
declare global {
    interface Window {
        Stripe: any;
    }
}

// --- ICONS ---
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

// --- REUSABLE INPUT COMPONENT ---
const FloatingLabelInput = ({ id, label, value, onChange, type = 'text', required = false, autoComplete = '' }) => (
    <div className="relative">
        <input
            id={id}
            name={id}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            className="block rounded-md px-3 pt-5 pb-2 w-full text-sm text-gray-900 bg-transparent border border-gray-400 appearance-none focus:outline-none focus:ring-1 focus:ring-brand-primary peer"
            placeholder=" "
        />
        <label
            htmlFor={id}
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-brand-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        >
            {label}
        </label>
    </div>
);


interface CheckoutPageProps {
    cartItems: CartItem[];
    currency: Currency;
    onNavigate: (view: View) => void;
    onOrderComplete: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, currency, onNavigate, onOrderComplete }) => {
    const [stripe, setStripe] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [stripeError, setStripeError] = useState<string | null>(null);
    const [cardElement, setCardElement] = useState<any>(null);
    const cardElementRef = useRef<HTMLDivElement>(null);
    
    const [formState, setFormState] = useState({
        email: 'tmaromero73@gmail.com',
        subscribe: false,
        shipping_firstName: 'Tsmara',
        shipping_lastName: '',
        shipping_address: '28760',
        shipping_apartment: 'D',
        shipping_postcode: '28760',
        shipping_city: 'Madrid',
        shipping_phone: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    useEffect(() => {
        if (window.Stripe) {
            const stripeInstance = window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx'); // Public test key
            setStripe(stripeInstance);
        }
    }, []);

    useEffect(() => {
        if (stripe) {
            const elements = stripe.elements();
            const card = elements.create('card', {
                style: {
                    base: { color: '#32325d', fontFamily: '"Inter", sans-serif', fontSize: '16px', '::placeholder': { color: '#aab7c4' }},
                    invalid: { color: '#fa755a', iconColor: '#fa755a' }
                }
            });
            if (cardElementRef.current) card.mount(cardElementRef.current);
            setCardElement(card);
            return () => card.destroy();
        }
    }, [stripe]);

    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0), [cartItems]);
    const shippingCost = 6.00; // Fixed shipping cost
    const total = subtotal - (subtotal * discount) + shippingCost;

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === 'DESCUENTO10') {
            setDiscount(0.10);
        } else {
            alert('El código del cupón no es válido.');
            setDiscount(0);
        }
    };
    
    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (paymentMethod === 'card' && (!stripe || !cardElement)) {
            setStripeError("El sistema de pago no está listo. Por favor, espere.");
            return;
        }
        setIsProcessing(true);
        setStripeError(null);
        setTimeout(() => {
            onOrderComplete();
        }, 2500);
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
                <button onClick={() => onNavigate('products')} className="mt-6 btn-primary">Ir a la tienda</button>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-5 gap-x-16">
                    {/* Left Column: Forms */}
                    <div className="lg:col-span-3 space-y-10">
                        <ExpressPayment stripe={stripe} total={total} currency={currency} onOrderComplete={onOrderComplete} />

                        <fieldset id="contact-fields" className="space-y-4">
                            <div className="border-b pb-2">
                                <legend className="text-xl font-bold">Información de contacto</legend>
                                <p className="text-sm text-gray-600 mt-1">Usaremos este correo electrónico para enviarte actualizaciones.</p>
                            </div>
                            <FloatingLabelInput id="email" label="Dirección de correo electrónico" type="email" value={formState.email} onChange={handleInputChange} required autoComplete="email"/>
                            <div className="flex items-center">
                                <input type="checkbox" id="subscribe" name="subscribe" checked={formState.subscribe} onChange={handleInputChange} className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"/>
                                <label htmlFor="subscribe" className="ml-3 block text-sm text-gray-900">Quiero recibir correos con descuentos e información</label>
                            </div>
                        </fieldset>

                        <fieldset id="shipping-fields" className="space-y-4">
                             <div className="border-b pb-2">
                                 <legend className="text-xl font-bold">Dirección de envío</legend>
                                 <p className="text-sm text-gray-600 mt-1">Introduce la dirección para la entrega de tu pedido.</p>
                             </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FloatingLabelInput id="shipping_firstName" label="Nombre" value={formState.shipping_firstName} onChange={handleInputChange} required autoComplete="given-name"/>
                                <FloatingLabelInput id="shipping_lastName" label="Apellidos" value={formState.shipping_lastName} onChange={handleInputChange} required autoComplete="family-name"/>
                             </div>
                             <FloatingLabelInput id="shipping_address" label="Dirección" value={formState.shipping_address} onChange={handleInputChange} required autoComplete="address-line1"/>
                             <FloatingLabelInput id="shipping_apartment" label="Apartamento, habitación, etc. (opcional)" value={formState.shipping_apartment} onChange={handleInputChange} autoComplete="address-line2"/>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <FloatingLabelInput id="shipping_postcode" label="Código postal" value={formState.shipping_postcode} onChange={handleInputChange} required autoComplete="postal-code"/>
                                 <FloatingLabelInput id="shipping_city" label="Ciudad" value={formState.shipping_city} onChange={handleInputChange} required autoComplete="address-level2"/>
                             </div>
                             <FloatingLabelInput id="shipping_phone" label="Teléfono (opcional)" value={formState.shipping_phone} onChange={handleInputChange} type="tel" autoComplete="tel"/>
                        </fieldset>

                        <fieldset id="payment-method" className="space-y-4">
                            <div className="border-b pb-2">
                                <legend className="text-xl font-bold">Opciones de pago</legend>
                            </div>
                            <div className="space-y-3">
                                <div className={`border rounded-md transition-all ${paymentMethod === 'card' ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-gray-300'}`}>
                                    <label htmlFor="card" className="p-4 flex items-center cursor-pointer">
                                        <input type="radio" id="card" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-brand-primary border-gray-300 focus:ring-brand-primary" />
                                        <span className="ml-3 font-semibold">Tarjeta</span>
                                    </label>
                                    {paymentMethod === 'card' && (
                                        <div className="border-t p-4 bg-gray-50">
                                            <div ref={cardElementRef} className="p-3 border rounded-md bg-white"></div>
                                            {stripeError && <div className="text-red-600 text-sm mt-2">{stripeError}</div>}
                                        </div>
                                    )}
                                </div>
                                <div className={`border rounded-md transition-all ${paymentMethod === 'cod' ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-gray-300'}`}>
                                    <label htmlFor="cod" className="p-4 flex items-center cursor-pointer">
                                        <input type="radio" id="cod" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-brand-primary border-gray-300 focus:ring-brand-primary" />
                                        <span className="ml-3 font-semibold">Contra reembolso</span>
                                    </label>
                                     {paymentMethod === 'cod' && (
                                        <div className="border-t p-4 bg-gray-50 text-sm text-gray-700">
                                            Paga en efectivo en el momento de la entrega.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-2 lg:sticky top-24 self-start row-start-1 lg:row-start-auto mb-10 lg:mb-0">
                         <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h2 className="text-xl font-bold mb-4 border-b pb-3">Resumen del pedido</h2>
                            <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative">
                                            <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-contain rounded-md border p-1 bg-white" />
                                            <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm leading-tight">{item.product.name}</p>
                                        </div>
                                        <p className="font-semibold text-sm">{formatCurrency(item.product.price * item.quantity, currency)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2 my-4">
                                <input type="text" placeholder="Código de descuento" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm"/>
                                <button type="button" onClick={handleApplyCoupon} className="bg-gray-200 text-black font-semibold px-4 rounded-md hover:bg-gray-300 text-sm">Aplicar</button>
                            </div>

                            <div className="space-y-2 text-base border-t pt-4">
                                <div className="flex justify-between"><span className="text-gray-700">Subtotal</span><span className="font-semibold">{formatCurrency(subtotal, currency)}</span></div>
                                {discount > 0 && (<div className="flex justify-between text-green-600"><span>Descuento ({(discount * 100).toFixed(0)}%)</span><span>-{formatCurrency(subtotal * discount, currency)}</span></div>)}
                                <div className="flex justify-between"><span className="text-gray-700">Envío</span><span className="font-semibold">{formatCurrency(shippingCost, currency)}</span></div>
                                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(total, currency, {decimals: 2})}</span></div>
                            </div>
                            
                            <p className="text-xs text-center text-gray-500 mt-6">Al proceder con tu compra aceptas nuestros Términos y Política de privacidad.</p>

                            <button type="submit" disabled={isProcessing} className="w-full btn-primary mt-4 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-wait">
                                {isProcessing ? (<><SpinnerIcon />Procesando...</>) : ('Realizar el pedido')}
                            </button>
                             <p className="text-xs text-gray-600 mt-3 text-center flex items-center justify-center"><LockIcon /> Pago 100% Seguro</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
