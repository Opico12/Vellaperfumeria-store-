import React, { useState, useEffect, useRef } from 'react';
import type { Currency } from './currency';

const PaypalIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={`h-6 w-auto ${className}`} fill="currentColor" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>PayPal</title><path d="M3.36 2.339a.36.36 0 0 0-.36.36v18.618a.36.36 0 0 0 .36.36h11.41a.36.36 0 0 0 .36-.36v-1.79c0-.09-.071-.163-.16-.18l-.02-.003-3.614-.49a.63.63 0 0 1-.57-.75l1.24-7.445a.63.63 0 0 0-.6-7.2H4.49zm12.637.737c-1.332 0-2.38.608-2.88 2.138-.41 1.284-.05 3.153.69 4.88 0 .01.01.01.01.02.73 1.69 1.76 2.47 3.1 2.47 1.62 0 2.52-.94 2.52-2.31 0-1.28-.59-1.99-1.85-1.99-.86 0-1.47.45-1.73.74-.24.27-.36.4-.36.4l-.12-.76c-.01-.06-.01-.13-.02-.18 0-.25.13-.5.36-.67.24-.18.8-.57 1.86-.57 2.2 0 3.86 1.48 3.86 3.96 0 3.23-2.5 4.6-5.18 4.6-2.07 0-3.66-1.06-4.2-2.92-.01-.02-.01-.04-.02-.06-.8-2.03-.48-4.14.38-5.71C9.62 3.249 10.96 2.01 12.6 2.01c1.64 0 2.85.85 3.39 2.12.16-.9-.3-1.8-1.3-1.8z"/></svg>
);

interface ExpressPaymentProps {
    stripe: any;
    total: number;
    currency: Currency;
    onOrderComplete: () => void;
}


const ExpressPayment: React.FC<ExpressPaymentProps> = ({ stripe, total, currency, onOrderComplete }) => {
    const [paymentRequest, setPaymentRequest] = useState<any>(null);
    const prButtonRef = useRef<HTMLDivElement>(null);

    // 1. Create Payment Request as soon as Stripe and total are available
    useEffect(() => {
        if (stripe && total > 0) {
            const pr = stripe.paymentRequest({
                country: 'ES',
                currency: currency.toLowerCase(),
                total: {
                    label: 'Total Vellaperfumeria',
                    amount: Math.round(total * 100), // Stripe expects amount in cents
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });
            setPaymentRequest(pr);
        }
    }, [stripe, total, currency]);

    // 2. Check availability and mount the Stripe Payment Request Button
    useEffect(() => {
        let prButton: any;
        if (paymentRequest && prButtonRef.current) {
            paymentRequest.canMakePayment().then((result: any) => {
                const container = prButtonRef.current;
                if (!container) return;
                
                // Clear any existing button before mounting
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }

                if (result) {
                    const elements = stripe.elements();
                    prButton = elements.create('paymentRequestButton', {
                        paymentRequest,
                        style: {
                            paymentRequestButton: {
                                type: 'buy',
                                height: '48px',
                                theme: 'dark',
                            },
                        },
                    });
                    prButton.mount(container);
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        }
        return () => {
            // Ensure prButton is defined before trying to call destroy
            if (prButton) {
                prButton.destroy();
            }
        };
    }, [paymentRequest, stripe]);

    // 3. Set up the payment handler
    useEffect(() => {
        if (paymentRequest) {
            const handlePayment = async (ev: any) => {
                // This is where you would send ev.paymentMethod.id to your backend
                // to confirm the payment on the server.
                console.log('Generated Stripe PaymentMethod:', ev.paymentMethod);
                
                // For this frontend demo, we'll simulate a successful payment.
                ev.complete('success');
                onOrderComplete();
            };

            paymentRequest.on('paymentmethod', handlePayment);
            
            return () => {
                // The payment request object might not exist on cleanup
                if (paymentRequest) {
                  paymentRequest.off('paymentmethod', handlePayment);
                }
            };
        }
    }, [paymentRequest, onOrderComplete]);


    const handlePayPal = () => {
        alert('Redirigiendo a PayPal para un pago rápido... (Esta es una demostración. No se realizará ninguna acción real).');
        onOrderComplete();
    };

    return (
        <div>
            <div className="flex items-center justify-center mb-4">
                <span className="flex-grow border-t"></span>
                <span className="px-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Pago Express</span>
                <span className="flex-grow border-t"></span>
            </div>
            <div className="grid grid-cols-1 gap-3">
                {/* Stripe's Google Pay/Apple Pay button will be mounted here */}
                <div ref={prButtonRef} className="w-full"></div>
                
                 <button
                    onClick={handlePayPal}
                    className="w-full bg-[#ffc439] text-[#003087] font-bold py-3 px-6 rounded-lg shadow-md hover:bg-[#f2b930] transition-colors duration-300 active:scale-95 flex items-center justify-center"
                    aria-label="Pagar con PayPal"
                >
                    <PaypalIcon className="h-5" />
                </button>
            </div>
        </div>
    );
};

export default ExpressPayment;
