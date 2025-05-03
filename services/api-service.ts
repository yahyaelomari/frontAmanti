import axios, { type AxiosError, type AxiosRequestConfig } from "axios"
import type { useToast } from "@/hooks/use-toast"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "/api/", // All endpoints start with /api/
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Response type from backend
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  timestamp?: string
}

// Error handling helper
export const handleApiError = (error: unknown, toast: ReturnType<typeof useToast>["toast"]) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<any>>
    const errorMessage = axiosError.response?.data?.message || "An error occurred"
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    })
    return errorMessage
  }

  toast({
    title: "Error",
    description: "An unexpected error occurred",
    variant: "destructive",
  })
  return "An unexpected error occurred"
}

// Account/Profile API calls
export const accountApi = {
  getProfileByEmail: async (email: string) => {
    try {
      const response = await api.get<ApiResponse<any>>(`/accounts/email/${email}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateAccount: async (id: number, data: any) => {
    try {
      const response = await api.put<ApiResponse<any>>(`/accounts/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Drop Point API calls
export const dropPointApi = {
  getStatus: async () => {
    try {
      const response = await api.get<ApiResponse<any>>("/drop-points/my-status")
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateStatus: async (status: { status: string }) => {
    try {
      const response = await api.put<ApiResponse<any>>("/drop-points/my-status", status)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getDropPointById: async (id: number) => {
    try {
      const response = await api.get<ApiResponse<any>>(`/drop-points/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  updateDropPoint: async (id: number, data: any) => {
    try {
      const response = await api.put<ApiResponse<any>>(`/drop-points/${id}`, data)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Shipment API calls
export const shipmentApi = {
  getByOrderId: async (orderId: number) => {
    try {
      const response = await api.get<ApiResponse<any>>(`/shipments/order/${orderId}`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getShipmentHistory: async (orderId: number) => {
    try {
      // Note: This endpoint might need to be implemented on the backend
      const response = await api.get<ApiResponse<any>>(`/shipments/${orderId}/history`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  checkIn: async (orderId: number, photo: File) => {
    try {
      const formData = new FormData()
      formData.append("photo", photo)

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // You can use this to track upload progress
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          console.log(`Upload progress: ${percentCompleted}%`)
        },
      }

      const response = await api.patch<ApiResponse<any>>(`/shipments/${orderId}/check-in`, formData, config)
      return response.data
    } catch (error) {
      throw error
    }
  },

  checkOut: async (orderId: number, verificationCode: string) => {
    try {
      const response = await api.patch<ApiResponse<any>>(
        `/shipments/${orderId}/check-out?verificationCode=${verificationCode}`,
      )
      return response.data
    } catch (error) {
      throw error
    }
  },

  initiateReturn: async (orderId: number, photo: File, reason: string) => {
    try {
      const formData = new FormData()
      formData.append("photo", photo)
      formData.append("reason", reason)

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          console.log(`Upload progress: ${percentCompleted}%`)
        },
      }

      const response = await api.patch<ApiResponse<any>>(`/shipments/${orderId}/initiate-return`, formData, config)
      return response.data
    } catch (error) {
      throw error
    }
  },

  getByStatus: async (status: string) => {
    try {
      const response = await api.get<ApiResponse<any>>(`/shipments/status/${status}`)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Order API calls
export const orderApi = {
  getOrdersByDropPoint: async (dropPointId: number, status?: string, search?: string) => {
    try {
      let url = `/orders/drop-point/${dropPointId}`
      const params = new URLSearchParams()

      if (status && status !== "ALL") {
        params.append("status", status)
      }

      if (search) {
        params.append("search", search)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await api.get<ApiResponse<any>>(url)
      return response.data
    } catch (error) {
      throw error
    }
  },
}

// Storage API calls
export const storageApi = {
  getShipments: async () => {
    try {
      const response = await api.get<ApiResponse<any>>("/storage/shipments")
      return response.data
    } catch (error) {
      throw error
    }
  },
}

export default api
