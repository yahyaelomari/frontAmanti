"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { AppBar, Toolbar, IconButton, Switch, FormControlLabel, Box, Menu, MenuItem, Tooltip } from "@mui/material"
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, AccountCircle } from "@mui/icons-material"

interface HeaderProps {
  toggleTheme: () => void
  mode: "light" | "dark"
}

export function Header({ toggleTheme, mode }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleStatus = () => {
    setIsOpen(!isOpen)
  }

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar>
        <FormControlLabel
          control={<Switch checked={isOpen} onChange={toggleStatus} color="primary" />}
          label={isOpen ? "Open" : "Closed"}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <div>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem component={Link} href="/settings">
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>Sign out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
