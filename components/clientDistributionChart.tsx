"use client"

import { useEffect, useRef } from "react"
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js"

Chart.register(ArcElement, Tooltip, Legend, DoughnutController)

export function ClientDistributionChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Custom plugin to add text in the center
    const centerTextPlugin = {
      id: "centerText",
      beforeDraw: function (chart: Chart) {
        const { width } = chart
        const { height } = chart
        const ctx = chart.ctx
        ctx.save()
        ctx.font = "bold 30px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText("14", width / 2, height / 2) // Centering the text
        // ctx.fillText("Total Clients", width / 2, height / 1.5) // Centering the text
        ctx.restore()
      },
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"],
        datasets: [
          {
            data: [4, 3, 2, 2, 1, 1, 0.5, 0.5],
            backgroundColor: [
              "#f97316", // Orange
              "#14b8a6", // Teal
              "#0ea5e9", // Sky
              "#1e293b", // Slate
              "#eab308", // Yellow
              "#f59e0b", // Amber
              "#6366f1", // Indigo
              "#ec4899", // Pink
            ],
            borderWidth: 1,
            // borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
      },
      plugins: [centerTextPlugin], // Register the custom plugin
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="relative h-48 w-48">
      <canvas ref={chartRef} />
    </div>
  )
}
