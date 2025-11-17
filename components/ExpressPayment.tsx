import React, { useState, useEffect, useRef } from 'react';
import type { Currency } from './currency';

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
            </div>
        </div>
    );
};

export default ExpressPayment;