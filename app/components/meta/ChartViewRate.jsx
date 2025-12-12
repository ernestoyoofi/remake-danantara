import { ResponsiveLine } from "@nivo/line"
import { generateDrinkStats } from "@nivo/generators"
import { Defs, linearGradientDef } from "@nivo/core"
import React from "react"

export const dataDefaultColor = {
  jual: "#9700cf",
  beli: "#1886b5"
}

function findMinBaseValue(allData) {
  let minValue = Infinity
  for(const series of allData) {
    for(const point of series.data) {
      const currentValue = point.y
      if(currentValue < minValue) {
        minValue = currentValue
      }
    }
  }
  if(minValue === Infinity) {
    return 0
  }
  const calculatedValue = minValue - 500
  if(calculatedValue <= 0) {
    return 0
  } else {
    return calculatedValue
  }
}

export default function ChartViewRate({ data = [] }) {
  
  return <ResponsiveLine
    data={data}
    enableGridX={false}
    enableGridY={true}
    margin={{ top: 10, right: 10, bottom: 10, left: 70 }}
    yScale={{
      type: "linear",
      min: 0,
      min: findMinBaseValue(data),
      max: "auto",
      stacked: false,
      reverse: false
    }}
    yFormat=" >-,"
    axisTop={null}
    axisRight={null}
    axisBottom={null}
    axisLeft={{
      tickSize: 2,
      tickPadding: 8,
      legend: "Rupiah (Rp)",
      legendOffset: -62
    }}
    colors={({ id }) => {
      const itemName = String(id).toLowerCase()
      if(itemName.match("beli")) {
        return dataDefaultColor.beli
      }
      if(itemName.match("jual")) {
        return dataDefaultColor.jual
      }
      return "#005082"
    }}
    pointSize={8}
    theme={{
      grid: {
        line: {
          strokeDasharray: "3 3"
        }
      }
    }}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    enableArea={true}
    areaOpacity={0.1}
    enableSlices="x"
    defs={[
      linearGradientDef("gradient_line", [
        { offset: 0, color: "inherit" },
        { offset: 10, color: "inherit", opacity: 0 },
      ])
    ]}
    fill={[{ match: "*", id: "gradient_line" }]}
    sliceTooltip={({ slice }) => {
      return <div className="w-[180px] bg-gray-50 shadow-md shadow-neutral-500/50 rounded-sm overflow-hidden" key={slice.id}>
        <div className="w-full p-2 px-3 bg-blue-600 text-white">
          <b>{`Waktu ${new Date(slice.points[0].data.x).toLocaleString("id-ID", {
            year: "numeric",
            month: "numeric",
            day: "numeric"
          })}`}</b>
        </div>
        <div className="w-full p-2 px-3 pt-1.5">
          {slice.points.map((point,i) => {
            const colorTake = String(point.seriesId||"").toLowerCase()
            let colorSet = "#4f4f4f"
            if(colorTake.match("beli")) {
              colorSet = dataDefaultColor.beli
            }
            if(colorTake.match("jual")) {
              colorSet = dataDefaultColor.jual
            }
            return <p className="text-sm" style={{ color: colorSet }} key={i}>{`${point.seriesId} : Rp. ${point.data.yFormatted}`}</p>
          })}
        </div>
      </div>
    }}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
}