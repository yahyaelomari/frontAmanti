// src/lib/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

export const fetchMyOrders = async () => {
    try {
        const response = await api.get('/orders/my-orders');
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export const fetchMyShipments = async () => {
    try {
        const response = await api.get('/shipments/my-shipments');
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching shipments:', error);
        return [];
    }
};