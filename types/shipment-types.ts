export enum ShipmentStatus {
  PROCESSING = "PROCESSING",
  DELIVERING = "DELIVERING",
  IN_STOCK = "IN_STOCK",
  COLLECTED = "COLLECTED",
  RETURN_INITIATED = "RETURN_INITIATED",
  RETURN_REFUSED = "RETURN_REFUSED",
  RETURN_COMPLETED = "RETURN_COMPLETED",
  LOST = "LOST",
  CANCELED = "CANCELED",
}

export interface Shipment {
  id: number
  status: ShipmentStatus
  checkInTime?: string
  checkOutTime?: string
  arrivalPhotoPath?: string
  deliveryPhotoPath?: string
  returnPhotoPath?: string
  pickupPhotoPath?: string
  incidentReport?: string
  statusChangedBy?: string
  dropPointFees: number
  totalPrice: number
  createdAt: string
  statusUpdatedAt: string
  expectedPickupDate?: string
  returnReason?: string
  qrCodePath?: string
  verificationCode?: string
  customerOrder: CustomerOrder
}

export interface ShipmentHistory {
  id: number
  previousStatus: ShipmentStatus
  newStatus: ShipmentStatus
  changedBy: string
  changedAt: string
  notes?: string
  photoPath?: string
}

export interface CustomerOrder {
  id: number
  ExternalOrderId: string
  label: string
  description?: string
  totalAmount: number
  productCount: number
  qrCodeUrl?: string
  deliveryPhotoPath?: string
  createdAt: string
  updatedAt: string
  statusUpdatedAt: string
  customer: Customer
  payment?: Payment
  ecomStore?: EcomStore
}

export interface Customer {
  id: number
  name: string
  email: string
  phone?: string
}

export interface Payment {
  id: number
  amount: number
  method: string
  status: string
  transactionReference?: string
  date: string
}

export interface EcomStore {
  id: number
  name: string
  description?: string
  imageUrl?: string
  domainName?: string
  url?: string
}

export interface DropPoint {
  id: number
  name: string
  address: string
  capacity: number
  availableSlots: number
}
