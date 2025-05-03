"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import {
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Bar Chart Component
interface BarChartProps {
  data: Array<{ name: string; value: number }>
  xAxisKey: string
  yAxisKey: string
  height?: number
}

export function BarChart({ data, xAxisKey, yAxisKey, height = 300 }: BarChartProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ height }}></div>

  const isDark = theme === "dark"
  const textColor = isDark ? "#e5e7eb" : "#374151"
  const gridColor = isDark ? "#374151" : "#e5e7eb"

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fill: textColor }}
          tickLine={{ stroke: textColor }}
          axisLine={{ stroke: textColor }}
        />
        <YAxis tick={{ fill: textColor }} tickLine={{ stroke: textColor }} axisLine={{ stroke: textColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: gridColor,
            color: textColor,
          }}
        />
        <Bar dataKey={yAxisKey} fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

// Line Chart Component
interface LineChartProps {
  data: Array<Record<string, any>>
  xAxisKey: string
  series: Array<{ key: string; label: string; color?: string }>
  height?: number
  stacked?: boolean
}

export function LineChart({ data, xAxisKey, series, height = 300, stacked = false }: LineChartProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ height }}></div>

  const isDark = theme === "dark"
  const textColor = isDark ? "#e5e7eb" : "#374151"
  const gridColor = isDark ? "#374151" : "#e5e7eb"

  // Default colors if not provided
  const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey={xAxisKey}
          tick={{ fill: textColor }}
          tickLine={{ stroke: textColor }}
          axisLine={{ stroke: textColor }}
        />
        <YAxis tick={{ fill: textColor }} tickLine={{ stroke: textColor }} axisLine={{ stroke: textColor }} />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: gridColor,
            color: textColor,
          }}
        />
        <Legend wrapperStyle={{ color: textColor }} />
        {series.map((s, index) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color || defaultColors[index % defaultColors.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            stackId={stacked ? "stack" : undefined}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

// Pie Chart Component
interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string }>
  height?: number
}

export function PieChart({ data, height = 300 }: PieChartProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ height }}></div>

  const isDark = theme === "dark"
  const textColor = isDark ? "#e5e7eb" : "#374151"

  // Default colors if not provided
  const defaultColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || defaultColors[index % defaultColors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: textColor,
          }}
        />
        <Legend
          wrapperStyle={{ color: textColor }}
          formatter={(value, entry, index) => <span style={{ color: textColor }}>{value}</span>}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
