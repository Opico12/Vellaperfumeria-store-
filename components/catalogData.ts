
import type { Product } from './ProductCard';

export interface Hotspot {
    productId: number;
    position: {
        top: string;
        left: string;
    };
}

export interface CatalogPageData {
    pageNumber: number;
    imageUrl: string;
    hotspots: Hotspot[];
}

export const catalogProducts: Record<number, Product> = {
    48075: {
        id: 48075,
        name: "Tarjeta + Muestra Eau de Parfum Divine Dark Velvet",
        brand: "DIVINE",
        price: 0.50,
        imageUrl: "https://i.imgur.com/8x2M6C6.png",
        description: "Prueba la nueva y seductora fragancia Divine Dark Velvet con esta muestra de 2ml.",
        stock: 100,
        category: 'perfume',
    },
    49145: {
        id: 49145,
        name: "Collar Divine Dark Velvet",
        brand: "DIVINE",
        price: 26.99,
        regularPrice: 38.00,
        imageUrl: "https://i.imgur.com/e7pYwWf.png",
        description: "Un llamativo collar con eslabones dorados y brillantes detalles de cristal. El complemento perfecto para tu look de noche. Edición Limitada.",
        stock: 20,
        category: 'accessories',
    },
    46801: {
        id: 46801,
        name: "Eau de Parfum Divine Dark Velvet",
        brand: "DIVINE",
        price: 24.99,
        regularPrice: 42.00,
        imageUrl: "https://i.imgur.com/N1z2x3w.png",
        description: "Una fragancia floral amaderada con una alta concentración aromática. Notas de Ciruela oscura, Rosa Black Baccara y Pachuli.",
        stock: 18,
        category: 'perfume',
    },
    38497: {
        id: 38497,
        name: "Eau de Parfum Divine",
        brand: "DIVINE",
        price: 24.99,
        regularPrice: 42.00,
        imageUrl: "https://i.imgur.com/L4yqY4x.png",
        description: "Radiante fragancia de flores frescas con notas de Violeta, Lirio y Fresia, y un fondo de Madera de Sándalo. Elegante y sofisticado.",
        stock: 25,
        category: 'perfume',
    },
    42041: {
        id: 42041,
        name: "Spray Eau de Parfum Divine - Tamaño Viaje",
        brand: "DIVINE",
        price: 7.99,
        regularPrice: 17.00,
        imageUrl: "https://i.imgur.com/uC58GMA.png",
        description: "Tu fragancia favorita Divine en un práctico formato de viaje de 8ml para que la lleves siempre contigo.",
        stock: 40,
        category: 'perfume',
    },
    47016: {
        id: 47016,
        name: "Crema Corporal Perfumada Divine",
        brand: "DIVINE",
        price: 5.99,
        regularPrice: 15.00,
        imageUrl: "https://i.imgur.com/d9T6d9H.png",
        description: "Hidrata tu piel y perfúmala con el aroma radiante de Divine. Crema corporal de 250ml.",
        stock: 30,
        category: 'personal-care',
    },
    47828: {
        id: 47828,
        name: "Brocha Blush & Glow",
        brand: "GIORDANI GOLD",
        price: 3.49,
        regularPrice: 8.00,
        imageUrl: "https://i.imgur.com/T0bSg0B.png",
        description: "Brocha para colorete y iluminador fabricada con PBT, aluminio y madera. Tamaño: 16cm.",
        stock: 50,
        category: 'accessories',
    },
    46901: {
        id: 46901,
        name: "Perlas con Serum Giordani Gold - Edición Especial",
        brand: "GIORDANI GOLD",
        price: 18.99,
        regularPrice: 32.00,
        imageUrl: "https://i.imgur.com/gS2Y0fT.png",
        description: "Las icónicas Perlas Giordani Gold vuelven en el tono Cherry Touch. Disfruta de una textura aterciopelada y un acabado duradero.",
        stock: 30,
        category: 'makeup',
    },
    47949: {
        id: 47949,
        name: "Máscara 5 en 1 Wonder Lash Prom Queen THE ONE",
        brand: "THE ONE",
        price: 3.99,
        regularPrice: 12.00,
        imageUrl: "https://i.imgur.com/P1F9a1k.png",
        description: "La máscara de pestañas 5 en 1 para un look de reina. Aporta volumen, longitud, curvatura, definición y cuidado. Edición Limitada.",
        stock: 40,
        category: 'makeup',
    },
    153753: {
        id: 153753,
        name: "Lote Essense & Co. Flor de Loto y Madera de Cedro",
        brand: "Essense & Co.",
        price: 19.99,
        imageUrl: "https://i.imgur.com/eGkYg2p.png",
        description: "Lote compuesto por Jabón Líquido y Loción Hidratante para Manos y Cuerpo con Flor de Loto y Madera de Cedro. 300ml cada uno.",
        stock: 20,
        category: 'personal-care',
    }
};

const pagesWithHotspots: CatalogPageData[] = [
    {
        pageNumber: 3,
        imageUrl: 'https://media-es.oriflame.com/2024009/2024009003.jpg',
        hotspots: [
            { productId: 46801, position: { top: '50%', left: '70%' } }, // Eau de Parfum Divine Dark Velvet
            { productId: 49145, position: { top: '62%', left: '32%' } }, // Collar
        ]
    },
    {
        pageNumber: 5,
        imageUrl: 'https://media-es.oriflame.com/2024009/2024009005.jpg',
        hotspots: [
            { productId: 38497, position: { top: '50%', left: '65%' } }, // Eau de Parfum Divine
            { productId: 47016, position: { top: '80%', left: '25%' } }, // Crema Corporal
            { productId: 42041, position: { top: '82%', left: '68%' } }, // Spray Viaje
        ]
    },
    {
        pageNumber: 7,
        imageUrl: 'https://media-es.oriflame.com/2024009/2024009007.jpg',
        hotspots: [
            { productId: 46901, position: { top: '48%', left: '70%' } }, // Perlas Giordani Gold
            { productId: 47828, position: { top: '75%', left: '72%' } }, // Brocha
        ]
    },
    {
        pageNumber: 9,
        imageUrl: 'https://media-es.oriflame.com/2024009/2024009009.jpg',
        hotspots: [
            { productId: 47949, position: { top: '60%', left: '50%' } }, // Máscara 5 en 1
        ]
    }
];

const allPages: CatalogPageData[] = [];
const pagesWithHotspotsMap = new Map(pagesWithHotspots.map(p => [p.pageNumber, p]));

for (let i = 1; i <= 132; i++) {
    if (pagesWithHotspotsMap.has(i)) {
        allPages.push(pagesWithHotspotsMap.get(i)!);
    } else {
        allPages.push({
            pageNumber: i,
            imageUrl: `https://media-es.oriflame.com/2024009/2024009${i.toString().padStart(3, '0')}.jpg`,
            hotspots: []
        });
    }
}

export const catalogPages: CatalogPageData[] = allPages;
