"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface TimeInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TimeInput({ id, value, onChange, disabled = false }: TimeInputProps) {
  const [hours, setHours] = useState("")
  const [minutes, setMinutes] = useState("")

  // Parse the value into hours and minutes when it changes
  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":")
      setHours(h)
      setMinutes(m)
    }
  }, [value])

  // Update the value when hours or minutes change
  const updateValue = (newHours: string, newMinutes: string) => {
    // Validate hours (0-23)
    let validHours = newHours
    if (newHours !== "") {
      const hoursNum = Number.parseInt(newHours)
      if (isNaN(hoursNum) || hoursNum < 0) {
        validHours = "00"
      } else if (hoursNum > 23) {
        validHours = "23"
      } else {
        validHours = hoursNum.toString().padStart(2, "0")
      }
    }

    // Validate minutes (0-59)
    let validMinutes = newMinutes
    if (newMinutes !== "") {
      const minutesNum = Number.parseInt(newMinutes)
      if (isNaN(minutesNum) || minutesNum < 0) {
        validMinutes = "00"
      } else if (minutesNum > 59) {
        validMinutes = "59"
      } else {
        validMinutes = minutesNum.toString().padStart(2, "0")
      }
    }

    if (validHours && validMinutes) {
      onChange(`${validHours}:${validMinutes}`)
    }
  }

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value
    setHours(newHours)
    updateValue(newHours, minutes)
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value
    setMinutes(newMinutes)
    updateValue(hours, newMinutes)
  }

  return (
    <div className="flex items-center">
      <Input
        id={id ? `${id}-hours` : undefined}
        className="w-16 text-center"
        value={hours}
        onChange={handleHoursChange}
        placeholder="HH"
        maxLength={2}
        disabled={disabled}
      />
      <span className="mx-2">:</span>
      <Input
        id={id ? `${id}-minutes` : undefined}
        className="w-16 text-center"
        value={minutes}
        onChange={handleMinutesChange}
        placeholder="MM"
        maxLength={2}
        disabled={disabled}
      />
    </div>
  )
}
