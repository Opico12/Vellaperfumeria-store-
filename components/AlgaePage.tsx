
import React, { useState } from 'react';
import { type Currency, formatCurrency } from './currency';

// Define the shape of a shipping option
interface ShippingOption {
    id: number;
    name: string;
    time: string;
    cost: number;
}

// Define the available shipping options (cost is in EUR)
const shippingOptions: ShippingOption[] = [
    { id: 1, name: 'Precio fijo', time: '5-7 días laborables', cost: 6.00 },
    { id: 2, name: 'Envío Express', time: '1-2 días laborables', cost: 9.50 },
    { id: 3, name: 'Recogida en Tienda', time: 'Disponible en 24h', cost: 0.00 },
];

const subtotal = 5.93; // Price in EUR


const AlgaePage: React.FC<{ currency: Currency }> = ({ currency }) => {
    // State to track the selected shipping option
    const [selectedShippingId, setSelectedShippingId] = useState<number>(shippingOptions[0].id);

    // Find the currently selected shipping option object
    const selectedShippingOption = shippingOptions.find(option => option.id === selectedShippingId) || shippingOptions[0];

    // Calculate the total price in EUR
    const total = subtotal + selectedShippingOption.cost;

    return (
        <div
            className="min-h-screen bg-cover bg-center md:bg-right"
            style={{ backgroundImage: "url('https://i.imgur.com/rLdEZt4.jpg')" }}
        >
            <div className="grid md:grid-cols-2">
                <div className="bg-white/95 backdrop-blur-sm">
                     <div className="max-w-2xl mx-auto p-8 md:p-12 lg:p-16 min-h-screen overflow-y-auto">
                        {/* Checkout Form -- This is a static representation */}
                        <section>
                            <h2 className="text-3xl font-bold text-center mb-8">Finaliza tu compra</h2>
                            <div className="grid md:grid-cols-1 gap-12">
                                {/* Left Side: Forms */}
                                <div>
                                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Información de contacto</h3>
                                    <p className="text-sm text-gray-700 mb-2">Usaremos este correo para enviarte detalles de tu pedido.</p>
                                    <input type="email" id="checkout_email" defaultValue="tmaromero73@gmail.com" className="w-full px-3 py-2 border rounded-md mb-4" />
                                    <div className="flex items-center">
                                        <input type="checkbox" id="newsletter" className="h-4 w-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500" />
                                        <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-900">Quiero recibir emails con descuentos e información.</label>
                                    </div>

                                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Dirección de envío</h3>
                                    <div className="space-y-2 text-sm p-4 border rounded-md bg-gray-50">
                                        <p>Tsmara Moreno</p>
                                        <p>28760D28760 Madrid, Madrid, España</p>
                                        <p>+34661202616</p>
                                    </div>
                                    <button className="text-sm text-black hover:underline mt-2">Editar</button>
                                    
                                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Dirección de facturación</h3>
                                    <div className="border rounded-md p-4 bg-gray-50">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="same-address" defaultChecked className="h-4 w-4 text-fuchsia-600 border-gray-300 rounded focus:ring-fuchsia-500" />
                                            <label htmlFor="same-address" className="ml-2 block text-sm text-gray-900">Usar la misma dirección para facturación</label>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Opciones de envío</h3>
                                    <div className="space-y-3">
                                        {shippingOptions.map((option) => (
                                            <label
                                                key={option.id}
                                                htmlFor={`shipping-${option.id}`}
                                                className={`border rounded-md p-4 flex justify-between items-center cursor-pointer transition-all ${selectedShippingId === option.id ? 'border-fuchsia-500 ring-2 ring-fuchsia-200' : 'border-gray-200'}`}
                                            >
                                                <div>
                                                    <span className="font-semibold">{option.name}</span>
                                                    <p className="text-sm text-gray-700">{option.time}</p>
                                                </div>
                                                <span className="font-semibold">{formatCurrency(option.cost, currency, { decimals: 2 })}</span>
                                                <input
                                                    type="radio"
                                                    id={`shipping-${option.id}`}
                                                    name="shipping"
                                                    value={option.id}
                                                    checked={selectedShippingId === option.id}
                                                    onChange={() => setSelectedShippingId(option.id)}
                                                    className="hidden"
                                                />
                                            </label>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Opciones de pago</h3>
                                    <div className="space-y-3">
                                        <div className="border rounded-md p-4">
                                            <input type="radio" id="cod" name="payment" className="h-4 w-4 text-fuchsia-600 border-gray-300 focus:ring-fuchsia-500" />
                                            <label htmlFor="cod" className="ml-3">Contra reembolso</label>
                                            <p className="text-sm text-gray-700 ml-7">Paga en efectivo en el momento de la entrega.</p>
                                        </div>
                                        <div className="border rounded-md p-4">
                                            <input type="radio" id="card" name="payment" className="h-4 w-4 text-fuchsia-600 border-gray-300 focus:ring-fuchsia-500" />
                                            <label htmlFor="card" className="ml-3">Tarjeta</label>
                                            <div className="flex items-center gap-2 ml-7 mt-2">
                                                <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6"/>
                                                <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6"/>
                                                <img src="https://img.icons8.com/color/48/000000/amex.png" alt="American Express" className="h-6"/>
                                                <span className="text-xs font-semibold">+4</span>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Nota del pedido (opcional)</h3>
                                    <textarea placeholder="Añade una nota a tu pedido" rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>

                                    <p className="text-xs text-gray-700 mt-4">
                                        Al continuar, aceptas nuestros <a href="#" target="_blank" rel="noopener noreferrer" className="text-fuchsia-600 hover:text-fuchsia-700 hover-underline-effect">Términos y condiciones</a> y <a href="#" target="_blank" rel="noopener noreferrer" className="text-fuchsia-600 hover:text-fuchsia-700 hover-underline-effect">Política de privacidad</a>.
                                    </p>

                                </div>
                                {/* Right Side: Order Summary */}
                                <div className="bg-gray-50 p-6 rounded-lg border">
                                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Resumen del pedido</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Subtotal</span>
                                            <span className="font-semibold">{formatCurrency(subtotal, currency)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Envío</span>
                                            <span className="font-semibold">{formatCurrency(selectedShippingOption.cost, currency)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-700">Impuestos</span>
                                            <span>Calculados al finalizar</span>
                                        </div>
                                        <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{formatCurrency(total, currency)}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-[#EBCFFC] text-black font-bold py-3 rounded-lg mt-6 hover:bg-[#e0c2fa] transition-colors">
                                        Realizar Pedido
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* This empty div acts as the right column on medium screens and up, showing the background image */}
                <div className="hidden md:block"></div>
            </div>
        </div>
    );
};

export default AlgaePage;
