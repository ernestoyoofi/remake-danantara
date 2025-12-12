"use client";
import { useEffect, useState, useRef } from "react"
import ChartViewRate from "../meta/ChartViewRate"
import axios from "axios"
import { toast } from "sonner"
import { DatePicker } from "../ui/DatePicker"
import SelectMenu from "../ui/SelectMenu"
import { Button } from "~/components/ui/button"
import { TrendingDown, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const keymotion = {
  inani: {
    opacity: 0,
    transform: "translateY(-14px) scale(0.99)",
    filter: "blur(7px)"
  },
  outani: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    filter: "blur(0px)"
  },
  spring_smooth: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    duration: 0.2
  },
  viewportnp: { once: true },
  viewport: { once: true, margin: "-32%" }
}


function ChangeNumberToCurrency(number, type = "IDR") {
  try {
    if(isNaN(number)) {
      return "NaN"
    }
    const formatCurrency = {
      style: 'currency',
      currency: type || "IDR",
      minimumFractionDigits: 0
    }
    return String(new Intl.NumberFormat("id-ID", formatCurrency).format(Number(number))).replace(/ /g, " ").replace(/Rp/g, "Rp.")
  } catch(e) {
    return "NaN"
  }
}
function ReverseNum(num) {
  return num.map((a, i) => ({ i, a }))
    .sort((a,b) => b.i - a.i)
    .map(a => a.a)
}
function GetDataGrapicTrend(dataList = [], typeNum = "") {
  const listData = dataList
    .map((a, i) => ({ i, a }))
    .sort((a,b) => b.i - a.i)
    .map(a => a.a)
  const firstData = listData[0]
  const lastData = listData[listData.length - 1]
  if(!firstData[typeNum] || !lastData[typeNum]) {
    return {
      isDown: true,
      range: 0
    }
  }
  const firstNum = firstData[typeNum]
  const lastNum = lastData[typeNum]
  console.log("Tg:", firstData, lastData)
  return {
    isDown: firstNum < lastNum,
    range: String(((firstNum - lastNum)/lastNum)*100).slice(0, 6)
  }
}

export default function KursBankIndonesia() {
  const [loadFirst, setLoadFirst] = useState(true)
  const [typeExample, setTypeExample] = useState(true)
  const [getFromDate, setFromDate] = useState(null)
  const refDateTo = useRef()
  const refCurrecy = useRef()
  const [data, setData] = useState({
    data: {},
    loading: true,
    error: null
  })

  async function ExampleDataLoad() {
    setData({
      ...data,
      loading: true
    })
    try {
      const requestdata = await axios.post("/api/kurs-bank-indonesia", {
        example_data: typeExample,
        currency: refCurrecy.current || "USD",
        from: getFromDate? new Date(getFromDate).toISOString() : undefined,
        to: refDateTo.current? new Date(refDateTo.current).toISOString() : undefined
      })
      const responseData = requestdata.data?.data
      if(!!responseData && typeof responseData === "object") {
        setData({
          data: {
            rate: [
              {
                id: "Kurs Beli",
                data: ReverseNum(responseData.rate).map((a,i) => ({
                  x: a.date, y: a.buy_num
                }))
              },
              {
                id: "Kurs Jual",
                data: ReverseNum(responseData.rate).map((a,i) => ({
                  x: a.date, y: a.sell_num
                }))
              },
            ],
            context: {
              from: ChangeNumberToCurrency(
                responseData.currency.value,
                responseData.currency.to,
              ),
              to: ChangeNumberToCurrency(
                ReverseNum(responseData.rate)?.pop()?.buy_num||NaN,
                "IDR"
              )
            },
            rate_sell: GetDataGrapicTrend(responseData.rate, "sell_num"),
            rate_buy: GetDataGrapicTrend(responseData.rate, "buy_num"),
            currency_a: responseData.currency.from,
            currency_b: responseData.currency.to,
            date_a: responseData.date.from,
            date_b: responseData.date.to,
          },
          loading: false,
          error: null
        })
        return;
      }
      toast.error(`Unknown Error Response`, {
        description: "Tidak dapat diolah dengan logic seperti biasanya"
      })
    } catch(e) {
      const response = e.response
      if(response) {
        toast.error(`Error: ${response.data.message}`, {
          description: response.data.suspect || undefined
        })
        setData({
          ...data,
          error: {
            msg: response.data.message
          },
          loading: false
        })
        return; // Stop
      }
      toast.error("Bad logic or connection", {
        description: "Please check on your connection first, and check to devtools to get the error"
      })
      setData({
        ...data,
        error: {
          msg: "Please check on your connection first, and check to devtools to get the error"
        },
        loading: false
      })
    }
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     ExampleDataLoad()
  //   }, 800)
  // },[])

  return <motion.div
    initial={keymotion.inani}
    whileInView={keymotion.outani}
    viewport={keymotion.viewport}
    transition={keymotion.spring_smooth}
    className="bg-white w-full overflow-hidden py-[100px]"
  >
    <div className="w-full max-w-4xl m-auto">
      <div className="w-full px-3.5">
        <p className="text-sm mb-4.5 text-amber-400">*Kamu dapat interaksi pada ui ini secara real-time dan sample data.</p>
        <h1 className="text-4xl font-bold my-3.5 mb-5">Kurs Indonesia Ke Mata Uang Lain</h1>
        <div className="w-full md:h-[80px] flex items-center flex-wrap p-1.5 rounded-xl bg-neutral-50">
          <div className="w-full md:w-[310px] p-1 px-4 md:border-r max-md:border-b border-neutral-200 max-md:pb-2">
            <h4 className="font-semibold">{`Nilai dari ${data?.data?.currency_b||"Unkw"} ke ${data?.data?.currency_a||"Unkw"}`}</h4>
            <span className="mt-2 text-sm">{`Dari ${data?.data?.context?.from||"NaN"} menjadi ${data?.data?.context?.to||"NaN"}`}</span>
          </div>
          <div className="w-full md:w-[calc(calc(100%-310px)/2)] p-1 px-4 md:border-r max-md:border-b mborder-neutral-200 max-md:py-2">
            <h4 className="font-semibold">{`Kurs Jual ${data?.data?.currency_a||"Unkw"} terharap ${data?.data?.currency_b||"Unkw"}`}</h4>
            <div className="w-full flex items-center mt-1" style={{
              color: data?.data?.rate_sell?.isDown? "red":"#05a107"
            }}>
              <span className="w-[20px] h-[20px] flex items-center justify-center">
                {data?.data?.rate_sell?.isDown?<TrendingDown size={18}/>:<TrendingUp size={18}/>}
              </span>
              <span className="text-sm ml-1.5">{`${data?.data?.rate_sell?.range||0}%`}</span>
            </div>
          </div>
          <div className="w-full md:w-[calc(calc(100%-310px)/2)] p-1 px-4 max-md:pt-2">
            <h4 className="font-semibold">{`Kurs ${data?.data?.currency_a||"Unkw"} terharap ${data?.data?.currency_b||"Unkw"}`}</h4>
            <div className="w-full flex items-center mt-1" style={{
              color: data?.data?.rate_buy?.isDown? "red":"#05a107"
            }}>
              <span className="w-[20px] h-[20px] flex items-center justify-center">
                {data?.data?.rate_buy?.isDown?<TrendingDown size={18}/>:<TrendingUp size={18}/>}
              </span>
              <span className="text-sm ml-1.5">{`${data?.data?.rate_buy?.range||0}%`}</span>
            </div>
          </div>
        </div>
        <p className="px-3.5 font-bold pt-3.5">Penting: Klarifikasi Mengenai Interpretasi Kurs Mata Uang pada Grafik Ini</p>
        <p className="text-sm px-3.5 text-neutral-500 my-3.5">Untuk menghindari potensi misinformasi, harap diperhatikan bahwa persentase yang ditampilkan pada <b>Kurs Jual dan Kurs Beli</b>. Jika angka persentase perubahan nilai menunjukkan penurunan (dengan panah merah ke bawah), itu berarti kurs mata uang asing tersebut naik, dan menandakan Rupiah melemah terhadapnya dan sebaliknya, jika terjadi masalah informasinya, anda dapat berkontribusi atas masalah ini pada <a href="https://github.com/ernestoyoofi/remake-danantara/blob/main/app/components/content/KursBankIndonesia.jsx" className="underline hover:text-blue-500" target="_blank">repository project ini untuk mengganti yang sebenernya</a>, terimakasih atas perhatiannya.</p>
      </div>
      <div className="relative w-full h-[340px] my-4.5">
        {loadFirst&&<div className="absolute w-full h-full bg-neutral-400/40 rounded-md flex flex-col items-center justify-center z-20 backdrop-blur-md bgimage-noise-medium">
          <p className="mb-4 text-sm max-w-2xs text-center">Untuk mengurangi performa yang melunjak, maka dari itu untuk menguranginya hanya dapat melewati tombol ini untuk memuat data awal</p>
          <Button onClick={() => { ExampleDataLoad(); setLoadFirst(false) }} className="cursor-pointer">
            <span className="pointer-events-none">Klik untuk memuat data sample</span>
          </Button>  
        </div>}
        {data?.loading&&<div className="absolute w-full h-[30px] z-10 px-3.5">
          <div className="w-full h-[30px] bg-amber-400 rounded-md text-sm flex justify-center items-center">
            <span className="text-white text-center">Loading...</span>
          </div>
        </div>}
        {data?.data?.rate? <ChartViewRate data={data.data.rate||[]}/>:<>{
          data.loading? <div className="w-full h-[340px] flex justify-center items-center text-neutral-500">
            <p>Loading...</p>
          </div>:<div className="w-full h-[340px] flex justify-center items-center text-neutral-500">
            <p>Data tidak dapat dimuat melalui grafik!</p>
          </div>
        }</>}
      </div>
      {!loadFirst&&<div className="w-full px-3.5">
        <div className="w-full flex flex-wrap justify-start items-center">
          <SelectMenu
            className="w-full sm:w-[230px]"
            defaultValue={"true"}
            value={typeExample?"true":"false"}
            onChange={(e) => { setTypeExample(e === "true") }}
            list={[
              { label: "Contoh/Example (Default)", value: "true" },
              { label: "Nyata/Real", value: "false" },
            ]}
            placeholder="Jenis permintaan data"
          />
          <Button className="cursor-pointer w-full max-sm:mt-2 sm:w-[120px] sm:ml-1.5" onClick={ExampleDataLoad} variant="outline">
            <span className="text-sm font-semibold pointer-events-none">Minta Data</span>
          </Button>
        </div>
        {!typeExample && <div className="w-full flex flex-wrap justify-between md:mt-2">
          <div className="w-full max-sm:mt-2 md:w-[calc(calc(100%/3)_-_0.25rem)]">
            <SelectMenu
              className="w-full"
              defaultValue={typeExample? "true":"false"}
              onChange={(e) => { refCurrecy.current = String(e||"") }}
              list={[
                { label: "United State Dollar", value: "USD" },
                { label: "Yuan Tiongkok", value: "CNY" },
                { label: "Euro", value: "EUR" },
                { label: "Pound Britania", value: "GBP" },
                { label: "Dolar Australia", value: "AUD" },
              ]}
              placeholder="Pilih mata uang"
            />
          </div>
          <div className="w-full max-sm:mt-2 md:w-[calc(calc(100%/3)_-_0.25rem)]">
            <DatePicker
              className="w-full overflow-hidden"
              placeholder="Dari Waktu"
              disable="today"
              onChange={(e) => {
                setFromDate(e)
              }}
            />
          </div>
          <div className="w-full max-sm:mt-2 md:w-[calc(calc(100%/3)_-_0.25rem)]">
            <DatePicker
              className="w-full overflow-hidden"
              placeholder="Ke Waktu"
              disable={getFromDate}
              onChange={(e) => {
                refDateTo.current = e
              }}
            />
          </div>
        </div>}
      </div>}
      <div className="w-full p-2 px-4.5">
        <p className="text-sm">Data dari <a className="text-blue-500 underline" target="_blank" href="https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx">Bank Indonesia</a></p>
      </div>
    </div>
  </motion.div>
}