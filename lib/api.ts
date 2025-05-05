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


export const fetchDropPointProfile = async () => {
    try {
        const response = await api.get('/drop-points/profile');
        return response.data?.data || null;
    } catch (error) {
        console.error('Error fetching drop point profile:', error);
        return null;
    }
};

export const updateDropPointProfile = async (data: any, frontIdCard: File, backIdCard: File) => {
    try {
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(data)], {
            type: 'application/json'
        });

        formData.append('data', jsonBlob);
        formData.append('frontId', frontIdCard);
        formData.append('backId', backIdCard);

        const response = await api.put('/drop-points/profile', formData);
        return response.data;
    } catch (error) {
        console.error('Update error:', error.response?.data || error.message);
        throw error;
    }
};

export const createCheckoutSession = async (dropPointId: number) => {
    try {
        const response = await api.post('/stripe/createCheckoutSession', {
            DropPointId: dropPointId,
            currency: "usd",
            accountSenderId: "1" // Update if needed
        });
        return response.data;
    } catch (error) {
        console.error('Checkout session error:', error);
        throw error;
    }
};