import apiClient from "./api-client"
import type { ShipmentStatus } from "@/types/shipment-types"

export interface ShipmentFilter {
  status?: ShipmentStatus
  search?: string
}

const shipmentService = {
  getShipments: async (filter?: ShipmentFilter) => {
    return apiClient.get("/shipments", { params: filter })
  },

  getShipmentById: async (id: number) => {
    return apiClient.get(`/shipments/${id}`)
  },

  checkInShipment: async (id: number, photo: File) => {
    const formData = new FormData()
    formData.append("photo", photo)

    return apiClient.patch(`/shipments/${id}/check-in`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  checkOutShipment: async (id: number, verificationCode: string) => {
    return apiClient.patch(`/shipments/${id}/check-out`, { verificationCode })
  },

  updateShipmentStatus: async (id: number, status: ShipmentStatus) => {
    return apiClient.patch(`/shipments/${id}/status`, { status })
  },

  getShipmentHistory: async (id: number) => {
    return apiClient.get(`/shipments/${id}/history`)
  },
}

export default shipmentService
