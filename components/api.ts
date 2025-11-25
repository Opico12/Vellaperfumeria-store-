
import { CartItem, Product } from './types';
import { allProducts } from './products';

// =============================================================================
// 1. TUS CLAVES DE WOOCOMMERCE (PÉGALAS DENTRO DE LAS COMILLAS)
// =============================================================================
const WC_URL = 'https://vellaperfumeria.com';

// ⚠️ IMPORTANTE: Pega aquí tus claves con cuidado. No borres las comillas simples ''.
const CONSUMER_KEY = '';    // Pega tu Consumer Key aquí
const CONSUMER_SECRET = ''; // Pega tu Consumer Secret aquí

// =============================================================================
// LÓGICA DE CONEXIÓN
// =============================================================================

const getAuthHeader = () => {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) return {};
    const hash = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    return {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
    };
};

export const fetchServerCart = async (sessionId: string): Promise<CartItem[]> => {
    
    // Si es el ID de prueba, devolvemos simulación directamente
    if (sessionId === '12470fe406d4' && (!CONSUMER_KEY || !CONSUMER_SECRET)) {
        return getMockCart();
    }

    if (CONSUMER_KEY && CONSUMER_SECRET) {
        console.log(`🔌 Conectando a ${WC_URL}...`);
        
        // 🛡️ TIMEOUT DE SEGURIDAD:
        // Si el servidor tarda más de 3 segundos (por error CORS o lentitud),
        // cancelamos la petición para que la web no se quede en blanco.
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        try {
            const response = await fetch(`${WC_URL}/wp-json/wc/v3/orders/${sessionId}`, {
                method: 'GET',
                headers: getAuthHeader(),
                signal: controller.signal // Vinculamos el timeout
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
                console.warn("⚠️ Fallo en la conexión API. Usando modo respaldo.");
                return getMockCart(); 
            }

            const orderData = await response.json();
            return mapOrderToCartItems(orderData);

        } catch (error: any) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                console.error("⏱️ La conexión tardó demasiado. Cancelando.");
            } else {
                console.error("❌ Error de conexión (Probablemente CORS o Claves mal puestas).");
            }
            // SI FALLA, CARGAMOS LA SIMULACIÓN PARA QUE VEAS ALGO
            return getMockCart();
        }
    } else {
        // Si no hay claves, devolvemos simulación
        return getMockCart();
    }
};

const mapOrderToCartItems = (orderData: any): CartItem[] => {
    if (!orderData || !orderData.line_items) return [];

    return orderData.line_items.map((item: any) => {
        const localProduct = allProducts.find(p => p.id === item.product_id);
        const productData: Product = localProduct || {
            id: item.product_id,
            name: item.name,
            brand: "Vellaperfumeria",
            price: parseFloat(item.price),
            imageUrl: item.image?.src || "https://vellaperfumeria.com/wp-content/uploads/woocommerce-placeholder.png",
            description: "Producto sincronizado.",
            stock: 99,
            category: 'personal-care'
        };

        const variantData: Record<string, string> = {};
        if (item.meta_data && Array.isArray(item.meta_data)) {
            item.meta_data.forEach((meta: any) => {
                if (!meta.key.startsWith('_')) variantData[meta.key] = meta.value;
            });
        }

        return {
            id: `wc-${item.id}`,
            product: productData,
            quantity: item.quantity,
            selectedVariant: Object.keys(variantData).length > 0 ? variantData : null
        };
    });
};

const getMockCart = (): CartItem[] => {
    // Productos de prueba garantizados si falla la API
    const oliaProduct = allProducts.find(p => p.id === 90001);
    const shampooProduct = allProducts.find(p => p.id === 44961);
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
};
