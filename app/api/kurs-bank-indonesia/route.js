import { NextResponse } from "next/server"
import { ScrappingInformasiKursBI } from "./ScrapTransaksiBI"
import ExampleData from "./ScrapExampleData"

const dateDefault = {
  from: new Date().getTime() - (1 * 30.4375 * 24 * 60 * 60 * 1000), // Satu Bulan Sebelumnya Dari Hari Ini
  to: new Date().getTime() // Hari Ini
}

export const dynamic = 'force-dynamic'
export const revalidate = 0;

export async function GET(req) {
  // Handle Request URL Search
  const { searchParams } = new URL(req.url)
  const bodyRequest = {
    example_data: searchParams.get("example_data") === "true"?true:false,
    currency: searchParams.get("mataucurrencyang") || "USD",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || ""
  }
  // Hanya mengambil pada spesifik yang udah pernah di fetch
  if(bodyRequest.example_data) {
    // Slowly like real fetch (just example data)
    await new Promise(a => setTimeout(a, 500))
    // Response example
    const exampleRespon = NextResponse.json(ExampleData, {
      status: ExampleData.status
    })
    exampleRespon.headers.set("X-Type-Request", "ExampleData")
    exampleRespon.headers.set("X-Request-Source", "~/app/api/kurs-bank-indonesia/ScrapExampleData.js <import>")
    return exampleRespon
  }
  // Real Data
  const request = await ScrappingInformasiKursBI({
    ke_matauang: bodyRequest.currency || "USD",
    dari_waktu: bodyRequest.from || dateDefault.from,
    ke_waktu: bodyRequest.to || dateDefault.to,
    __system: {
      timeout: 6000
    }
  })
  const buildRequest = NextResponse.json(request, {
    status: request.status
  })
  buildRequest.headers.set("X-Type-Request", "RealData")
  buildRequest.headers.set("X-Request-Source", "https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx")
  return buildRequest
}

export async function POST(req) {
  // Handle Request Body
  let bodyRequest = {}
  try {
    bodyRequest = await req.json()
  } catch(e) {
    console.warn("[bodyRequest]: Not Json Request")
  }
  // Hanya mengambil pada spesifik yang udah pernah di fetch
  if(bodyRequest.example_data) {
    // Slowly like real fetch (just example data)
    await new Promise(a => setTimeout(a, 500))
    // Response example
    const exampleRespon = NextResponse.json(ExampleData, {
      status: ExampleData.status
    })
    exampleRespon.headers.set("X-Type-Request", "ExampleData")
    exampleRespon.headers.set("X-Request-Source", "~/app/api/kurs-bank-indonesia/ScrapExampleData.js <import>")
    return exampleRespon
  }
  // Real Data
  const request = await ScrappingInformasiKursBI({
    ke_matauang: bodyRequest.currency || "USD",
    dari_waktu: bodyRequest.from || dateDefault.from,
    ke_waktu: bodyRequest.to || dateDefault.to,
    __system: {
      timeout: 6000
    }
  })
  const buildRequest = NextResponse.json(request, {
    status: request.status
  })
  buildRequest.headers.set("X-Type-Request", "RealData")
  buildRequest.headers.set("X-Request-Source", "https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx")
  return buildRequest
}