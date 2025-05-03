import apiClient from "./api-client"

const returnService = {
  getReturnableShipments: async (search?: string) => {
    return apiClient.get("/returns/returnable", { params: { search } })
  },

  initiateReturn: async (shipmentId: number, photo: File, reason: string) => {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("reason", reason)

    return apiClient.post(`/returns/initiate/${shipmentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  getReturnById: async (id: number) => {
    return apiClient.get(`/returns/${id}`)
  },
}

export default returnService
