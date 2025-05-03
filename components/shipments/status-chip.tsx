import type React from "react"
import { Chip } from "@mui/material"
import { ShipmentStatus } from "@/types/shipment-types"

interface StatusChipProps {
  status: ShipmentStatus
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  switch (status) {
    case ShipmentStatus.PROCESSING:
      return <Chip label="Processing" color="primary" variant="outlined" />
    case ShipmentStatus.DELIVERING:
      return <Chip label="Delivering" color="warning" variant="outlined" />
    case ShipmentStatus.IN_STOCK:
      return <Chip label="In Stock" color="success" variant="outlined" />
    case ShipmentStatus.COLLECTED:
      return <Chip label="Collected" color="default" variant="outlined" />
    case ShipmentStatus.RETURN_INITIATED:
      return <Chip label="Return Initiated" color="secondary" variant="outlined" />
    case ShipmentStatus.RETURN_COMPLETED:
      return <Chip label="Return Completed" color="info" variant="outlined" />
    case ShipmentStatus.LOST:
      return <Chip label="Lost" color="error" variant="outlined" />
    case ShipmentStatus.CANCELED:
      return <Chip label="Canceled" color="default" variant="outlined" />
    default:
      return <Chip label={status} variant="outlined" />
  }
}

export default StatusChip
