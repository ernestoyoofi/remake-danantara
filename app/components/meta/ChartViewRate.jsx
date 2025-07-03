import { ResponsiveLine } from "@nivo/line"
import React from "react"

export const dataDefaultColor = {
  jual: "#8e6bff",
  beli: "#f09648"
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
      legend: "Harga",
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
      return "#4f4f4f"
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
    enableSlices="x"
    sliceTooltip={({ slice }) => {
      return <div className="w-[180px] bg-gray-50 shadow-md rounded-md overflow-hidden" key={slice.id}>
        <div className="w-full p-2 px-3 bg-amber-400 text-white">
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