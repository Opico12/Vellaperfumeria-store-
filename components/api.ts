
import { CartItem, Product } from './types';
import { allProducts } from './products';

// =============================================================================
// CONFIGURACIÓN DE API (DATOS REALES)
// =============================================================================
const WC_URL = 'https://vellaperfumeria.com';

// -----------------------------------------------------------------------------
// 🔐 CLAVES DE API INTEGRADAS
// -----------------------------------------------------------------------------
const CONSUMER_KEY = 'ck_b6e13280a1bc56be65cb8850411dd38e13301dc0';
const CONSUMER_SECRET = 'cs_aa462cd190155c76aa1f8e13d578da5938a9b80c';
// -----------------------------------------------------------------------------

const getAuthHeader = () => {
    if (!CONSUMER_KEY || !CONSUMER_SECRET) return {};
    const hash = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    return {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
    };
};

export const fetchServerCart = async (sessionId: string): Promise<CartItem[]> => {
    
    // 2. Si las claves están vacías, usamos simulación
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
        console.warn("⚠️ Faltan las API Keys. Usando modo simulación.");
        return getMockCart();
    }

    // 3. CONEXIÓN REAL A TU SERVIDOR
    console.log(`🔌 Conectando a ${WC_URL} para recuperar el pedido ${sessionId}...`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos de espera

    try {
        const response = await fetch(`${WC_URL}/wp-json/wc/v3/orders/${sessionId}`, {
            method: 'GET',
            headers: getAuthHeader(),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const orderData = await response.json();
        const items = mapOrderToCartItems(orderData);
        
        // Si el pedido no tiene items (o devuelve vacío), devolvemos el mock para que el usuario vea algo
        if (items.length === 0) {
             console.log("⚠️ El pedido real está vacío. Mostrando productos sugeridos.");
             return getMockCart();
        }
        
        return items;

    } catch (error) {
        console.error("❌ Error de conexión con Vellaperfumeria.com:", error);
        console.log("⚠️ Activando modo de respaldo para visualizar el carrito.");
        // SIEMPRE devolvemos el carrito simulado si falla la conexión para que el usuario pueda PROBAR la interfaz
        return getMockCart();
    }
};

// Convierte los datos crudos de WooCommerce al formato de nuestra App
const mapOrderToCartItems = (orderData: any): CartItem[] => {
    if (!orderData || !orderData.line_items) return [];

    return orderData.line_items.map((item: any) => {
        // Intentamos encontrar el producto en nuestra base de datos local para tener mejores imágenes
        const localProduct = allProducts.find(p => p.id === item.product_id);
        
        const productData: Product = localProduct || {
            id: item.product_id,
            name: item.name,
            brand: "Vellaperfumeria",
            price: parseFloat(item.price),
            // Si no tenemos imagen local, usamos la que viene del servidor o un placeholder
            imageUrl: item.image?.src || "https://vellaperfumeria.com/wp-content/uploads/woocommerce-placeholder.png",
            description: "Producto sincronizado desde la tienda.",
            stock: 99,
            category: 'personal-care'
        };

        const variantData: Record<string, string> = {};
        if (item.meta_data && Array.isArray(item.meta_data)) {
            item.meta_data.forEach((meta: any) => {
                // Filtramos metadatos internos de WooCommerce (los que empiezan por _)
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

// Datos de prueba por si falla la conexión
const getMockCart = (): CartItem[] => {
    const perfumeProduct = allProducts.find(p => p.id === 46801); // Divine Dark Velvet
    const makeupProduct = allProducts.find(p => p.id === 44917);  // Perlas Giordani

    const mockCart: CartItem[] = [];

    if (perfumeProduct) {
        mockCart.push({
            id: `sim-perfume-1`,
            product: perfumeProduct,
            quantity: 1,
            selectedVariant: null
        });
    }
    if (makeupProduct) {
        mockCart.push({
            id: `sim-makeup-2`,
            product: makeupProduct,
            quantity: 1,
            selectedVariant: { "Tono": "Luminous Peach" }
        });
    }
    return mockCart;
};
