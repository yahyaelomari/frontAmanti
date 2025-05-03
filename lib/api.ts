// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000, // 10 second timeout
});

// Simple API functions with error handling
export const fetchMyOrders = async () => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data?.data || []; // Return empty array if no data
    } catch (error) {
        console.error('Error fetching orders:', error);
        return []; // Return empty array on error
    }
};

export const fetchMyShipments = async () => {
    try {
        const response = await api.get('/shipments/my-shipments');
        return response.data?.data || []; // Return empty array if no data
    } catch (error) {
        console.error('Error fetching shipments:', error);
        return []; // Return empty array on error
    }
};