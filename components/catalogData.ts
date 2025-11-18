import type { Product } from './types';
import { allProducts } from './products';

export interface HotspotData {
    x: number; // percentage from left
    y: number; // percentage from top
    productId: number;
}

export interface CatalogPageData {
    id: number;
    imageUrl: string;
    hotspots: HotspotData[];
}

const newBaseUrl = 'https://cdn.ipaper.io/iPaper/Papers/0ae94f9f-dbf1-41ce-8890-85ef3c56310d/Pages/';


export const catalogData: CatalogPageData[] = [
    {
        id: 1,
        imageUrl: `${newBaseUrl}1/Zoom.jpg`,
        hotspots: [],
    },
    {
        id: 2,
        imageUrl: `${newBaseUrl}2/Zoom.jpg`,
        hotspots: [
             { x: 35, y: 60, productId: 43244 }, // Maquillaje Eternal Glow
             { x: 80, y: 40, productId: 43237 }, // Corrector y Serum Potenciador
        ],
    },
    {
        id: 3,
        imageUrl: `${newBaseUrl}3/Zoom.jpg`,
        hotspots: [
            { x: 30, y: 60, productId: 46901 }, // Perlas con Serum Giordani Gold
        ],
    },
    {
        id: 4,
        imageUrl: `${newBaseUrl}4/Zoom.jpg`,
        hotspots: [],
    },
    {
        id: 5,
        imageUrl: `${newBaseUrl}5/Zoom.jpg`,
        hotspots: [
            { x: 30, y: 50, productId: 38497 }, // Eau de Parfum Divine
        ],
    },
    {
        id: 6,
        imageUrl: `${newBaseUrl}6/Zoom.jpg`,
        hotspots: [
            { x: 30, y: 50, productId: 46801 }, // Eau de Parfum Divine Dark Velvet
        ],
    },
    {
        id: 7,
        imageUrl: `${newBaseUrl}7/Zoom.jpg`,
        hotspots: [],
    },
     {
        id: 8,
        imageUrl: `${newBaseUrl}45/Zoom.jpg`,
        hotspots: [
            { x: 50, y: 50, productId: 29696 }, // WellnessPack Mujer Wellosophy
        ],
    },
];
