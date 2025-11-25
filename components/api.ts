
import { CartItem, Product } from './types';
import { allProducts } from './products';

// =============================================================================
// CONFIGURACIÓN DE API (DATOS REALES)
// =============================================================================
const WC_URL = 'https://vellaperfumeria.com';

// -----------------------------------------------------------------------------
// 🔐 PEGA TUS CLAVES AQUÍ ABAJO
// -----------------------------------------------------------------------------
// Instrucciones:
// 1. Ve a tu WordPress > WooCommerce > Ajustes > Avanzado > REST API.
// 2. Copia la 'Consumer Key' (empieza por ck_) y pégala en la primera línea.
// 3. Copia la 'Consumer Secret' (empieza por cs_) y pégala en la segunda línea.
// -----------------------------------------------------------------------------

const CONSUMER_KEY = '';    // <--- 1.  "ck_b6e13280a1bc56be65cb8850411dd38e13301dc0" DENTRO DE LAS COMILLAS
const CONSUMER_SECRET = ''; // <--- 2.  "cs_aa462cd190155c76aa1f8e13d578da5938a9b80c" DENTRO DE LAS COMILLAS

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
    
    // 1. Si el usuario está usando el enlace de prueba del diseño, usamos la simulación
    // para asegurar que ve la página bonita sin errores de servidor.
    if (sessionId === '12470fe406d4' && (!CONSUMER_KEY || !CONSUMER_SECRET)) {
        console.log("🚀 Modo Diseño: Cargando simulación visual (Faltan claves)...");
        return getMockCart();
    }

    // 2. Si las claves están vacías, no podemos conectar, usamos simulación
    if (!CONSUMER_KEY || !CONSUMER_SECRET) {
        console.warn("⚠️ Faltan las API Keys en components/api.ts. Usando modo simulación.");
        return getMockCart();
    }

    // 3. CONEXIÓN REAL A TU SERVIDOR
    // Si llegamos aquí, es porque hay claves y un ID real.
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
            // Si el error es 401/403, suele ser problema de CORS o Claves
            if (response.status === 401 || response.status === 403) {
                 console.error("⛔ Error de Permisos (401/403). Revisa el plugin WP CORS y que las claves sean correctas.");
                 alert("Error de conexión: Tus claves API parecen incorrectas o el plugin CORS no está activo en WordPress.");
            }
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const orderData = await response.json();
        return mapOrderToCartItems(orderData);

    } catch (error) {
        console.error("❌ Error de conexión con Vellaperfumeria.com:", error);
        
        // Si es el ID de prueba y falla la conexión real (por CORS), cargamos simulación para no bloquear
        if (sessionId === '12470fe406d4') {
             console.log("⚠️ Falló la conexión real para el test, mostrando simulación.");
             return getMockCart();
        }

        return [];
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
    // Usamos productos reales del catálogo
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
