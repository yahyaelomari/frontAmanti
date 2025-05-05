"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  LocalShipping as ShipmentsIcon,
  Replay as ReturnsIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Person as ProfileIcon,
  Payments as PaymentsIcon,
} from "@mui/icons-material"

const drawerWidth = 240

const menuItems = [
  { name: "Dashboard", href: "/", icon: DashboardIcon },
  { name: "Shipments", href: "/shipments", icon: ShipmentsIcon },
  { name: "Returns", href: "/returns", icon: ReturnsIcon },
  { name: "Analytics", href: "/analytics", icon: AnalyticsIcon },
  { name: "Payments", href: "/payment", icon: PaymentsIcon },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
      <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
            display: { xs: "none", sm: "block" },
          }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="h6" noWrap component="div">
            Drop Point
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
                <ListItem key={item.name} disablePadding>
                  <Link href={item.href} style={{ textDecoration: "none", width: "100%", color: "inherit" }}>
                    <ListItemButton selected={isActive}>
                      <ListItemIcon>
                        <Icon color={isActive ? "primary" : "inherit"} />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </Link>
                </ListItem>
            )
          })}
        </List>
      </Drawer>
  )
}
