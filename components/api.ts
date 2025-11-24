
import { CartItem } from './types';
import { allProducts } from './products';

// Configuración de la API (Para el futuro cuando conectes con WordPress real)
const API_CONFIG = {
    baseUrl: 'https://vellaperfumeria.com/wp-json/wc/v3', // Ejemplo
    consumerKey: 'ck_...', // Se rellenaría en el futuro
    consumerSecret: 'cs_...' // Se rellenaría en el futuro
};

/**
 * Simula una petición al servidor para recuperar un carrito guardado
 * basado en el ID de sesión (?v=...)
 */
export const fetchServerCart = async (sessionId: string): Promise<CartItem[]> => {
    console.log(`Conectando con API para sesión: ${sessionId}...`);
    
    // Simulamos latencia de red (como una API real)
    await new Promise(resolve => setTimeout(resolve, 800));

    // LÓGICA DE RESPUESTA SIMULADA (MOCK)
    // Esto hace que el enlace específico que proporcionaste funcione visualmente
    if (sessionId === '12470fe406d4') {
        const oliaProduct = allProducts.find(p => p.id === 90001); // Garnier Olia
        const shampooProduct = allProducts.find(p => p.id === 44961); // Duologi

        const mockCart: CartItem[] = [];

        if (oliaProduct) {
            mockCart.push({
                id: `server-${oliaProduct.id}-1`,
                product: oliaProduct,
                quantity: 2,
                selectedVariant: { "Tono": "Rojo Intenso 6.60" }
            });
        }

        if (shampooProduct) {
             mockCart.push({
                id: `server-${shampooProduct.id}-2`,
                product: shampooProduct,
                quantity: 1,
                selectedVariant: null
            });
        }

        return mockCart;
    }

    // Si conectáramos con la API Real de WooCommerce, aquí iría el fetch:
    /*
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}/cart?session=${sessionId}`, {
            headers: {
                'Authorization': 'Basic ' + btoa(API_CONFIG.consumerKey + ':' + API_CONFIG.consumerSecret)
            }
        });
        const data = await response.json();
        // Mapear data de WooCommerce a CartItem[] de React
        return mapWooToReact(data);
    } catch (error) {
        console.error("Error API:", error);
        return [];
    }
    */

    // Por defecto devuelve array vacío si no encuentra sesión
    return [];
};

/**
 * Función auxiliar para sincronizar cambios locales con el servidor
 */
export const syncCartWithServer = async (cart: CartItem[], sessionId: string) => {
    // Aquí iría la lógica para enviar (POST/PUT) el carrito actualizado al servidor
    console.log("Sincronizando carrito con servidor...", cart.length, "items");
    return true;
};
