"use client"

import type React from "react"
import { Grid, TextField, InputAdornment, Card, CardContent } from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { ShipmentStatus } from "@/types/shipment-types"

interface ShipmentFilterProps {
  searchTerm: string
  statusFilter: string
  onSearchChange: (value: string) => void
  onStatusChange: (value: string) => void
}

const ShipmentFilter: React.FC<ShipmentFilterProps> = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by order number or customer name"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Filter by status"
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              <option value="ALL">All Statuses</option>
              {Object.values(ShipmentStatus).map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ShipmentFilter
