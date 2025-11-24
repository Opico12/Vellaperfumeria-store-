
import { CartItem, Product } from './types';
import { allProducts } from './products';

// =============================================================================
// CONFIGURACIÓN DE LA API DE WOOCOMMERCE
// =============================================================================
// INSTRUCCIONES:
// 1. Ve a WooCommerce > Ajustes > Avanzado > API REST.
// 2. Copia tu "Clave de cliente" (Consumer Key) y "Clave secreta" (Consumer Secret).
// 3. Pégalas abajo dentro de las comillas.
// =============================================================================

const WC_URL = 'https://vellaperfumeria.com';
const CONSUMER_KEY = '';    // PEGAR AQUI TU CLAVE (ej: ck_1234...)
const CONSUMER_SECRET = ''; // PEGAR AQUI TU SECRETO (ej: cs_abcd...)

/**
 * Genera la cabecera de autorización para WooCommerce
 */
const getAuthHeader = () => {
    // Si no hay claves configuradas, no enviamos cabecera (evita errores en dev)
    if (!9a85cbfcf61c6c53834158b6386896c2 || 9a85cbfcf61c6c53834158b6386896c2!) return {};
    
    // Autenticación Básica Base64 estándar para WooCommerce
    // Nota: btoa crea una cadena codificada en Base64
    const hash = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
    return {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/json'
    };
};

/**
 * Recupera un carrito (o pedido pendiente) del servidor usando las claves API.
 * @param sessionId Puede ser el ID de un pedido (Order ID) o una sesión.
 */
export const fetchServerCart = async (sessionId: string): Promise<CartItem[]> => {
    console.log(`Intentando sincronizar con WooCommerce. ID: ${sessionId}`);

    // 1. MODO SIMULACIÓN (Si no has puesto las claves aún, esto mantiene la demo funcionando con el ID específico)
    if ((!CONSUMER_KEY || !CONSUMER_SECRET) && sessionId === '12470fe406d4') {
        console.warn("Usando modo simulación (Claves API no configuradas).");
        return getMockCart();
    }

    // 2. MODO REAL (Conexión a API)
    if (CONSUMER_KEY && CONSUMER_SECRET) {
        try {
            // Intentamos obtener el pedido por ID (asumiendo que 'v' es un Order ID)
            // Nota: La URL exacta puede variar dependiendo de tu configuración de enlaces permanentes en WP
            const response = await fetch(`${WC_URL}/wp-json/wc/v3/orders/${sessionId}`, {
                method: 'GET',
                headers: getAuthHeader()
            });

            if (!response.ok) {
                // Si falla (por ejemplo, si 'v' no es un ID numérico válido o no existe), lanzamos error
                throw new Error(`Error API: ${response.status}`);
            }

            const orderData = await response.json();
            return mapOrderToCartItems(orderData);

        } catch (error) {
            console.error("Fallo al conectar con Vellaperfumeria.com:", error);
            // Si falla la conexión real, devolvemos array vacío para no romper la app
            return [];
        }
    }

    return [];
};

/**
 * Convierte la respuesta de un pedido de WooCommerce a items del carrito de React
 */
const mapOrderToCartItems = (orderData: any): CartItem[] => {
    if (!orderData || !orderData.line_items) return [];

    return orderData.line_items.map((item: any) => {
        // Intentamos encontrar el producto en nuestra base de datos local para tener la foto y descripción
        const localProduct = allProducts.find(p => p.id === item.product_id);
        
        // Si no existe localmente, creamos un objeto producto básico con los datos de la API
        const productData: Product = localProduct || {
            id: item.product_id,
            name: item.name,
            brand: "Vellaperfumeria",
            price: parseFloat(item.price),
            imageUrl: item.image?.src || "https://vellaperfumeria.com/wp-content/uploads/woocommerce-placeholder.png", // Fallback image
            description: "Producto importado de tienda.",
            stock: 99,
            category: 'personal-care'
        };

        // Detectar variaciones (meta_data suele contener atributos como "Color", "Talla")
        const variantData: Record<string, string> = {};
        if (item.meta_data && Array.isArray(item.meta_data)) {
            item.meta_data.forEach((meta: any) => {
                // Filtramos meta datos internos (suelen empezar por _) y etiquetas irrelevantes
                if (!meta.key.startsWith('_')) {
                    variantData[meta.key] = meta.value;
                }
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

/**
 * Datos simulados para demostración visual si no hay API Key y se usa el ID de prueba
 */
const getMockCart = (): CartItem[] => {
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
};
