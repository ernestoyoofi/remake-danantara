const axios = require("axios").default
const cheerio = require("cheerio")

const enableDebuggingLog = false

async function AxiosRequest(url, options = {}) {
  try {
    const optionaxios = {
      ...options,
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        // 'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'id,en-US;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        // 'Content-Length': '41207',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'DNT': '1',
        'Host': 'www.bi.go.id',
        'Origin': 'https://www.bi.go.id',
        'Pragma': 'no-cache',
        'Referer': 'https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        ...(options.headers || {})
      },
      url: String(url)
    }
    if(enableDebuggingLog) {
      console.log("[Request]:", optionaxios)
    }
    const requestdata = await axios.request(optionaxios)
    return {
      isError: false,
      status: requestdata.status,
      headers: requestdata.headers,
      data: requestdata.data,
    }
  } catch(e) {
    if(enableDebuggingLog) {
      console.error("[Request Axios Bad]:", e.stack)
    }
    const response = (e?.response)
    if(!!response) {
      return {
        isError: true,
        typeError: "response_server",
        status: response.status,
        headers: response.headers,
        data: response.data,
      }
    }
    return {
      isError: true,
      typeError: "connection_or_logic",
      message: e.message
    }
  }
}

function formatDateToDDMonYYYY(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const day = date.getDate().toString().padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}
function formatDateToJsDate(datestr) {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ].map(a => a.toLowerCase())
  const [date, month, year] = String(datestr).trim().split(" ")
  const getMonthArr = (months.indexOf(String(month).toLowerCase())+1)
  const getMonthReq = String(getMonthArr||"1").padStart(2, '0')
  const getDateReq = String(date||"1").padStart(2, '0')
  const getYearReq = String(year||"")
  const dateReturn = new Date(`${getYearReq} ${getMonthReq} ${getDateReq}`)
  return dateReturn
}

function ConvertDateRequest(date) {
  return formatDateToDDMonYYYY(new Date(date||undefined))
  // const optionsAPI = {
  //   day: "2-digit",
  //   mounth: "short",
  //   year: "numeric"
  // }
  // const convertStr = new Date(date||undefined)
  //   ?.toLocaleDateString('en-US', optionsAPI)
  //   ?.replace(/\//g, '-')
  // return String(convertStr||"unvalid-date")
}

function isDateWithinSixMonths(startDate, dateToCheck) {
  if(!(startDate instanceof Date) || !(dateToCheck instanceof Date)) {
    console.error("Parameter harus berupa objek Date.")
    return false
  }
  const sixMonthsLater = new Date(startDate)
  sixMonthsLater.setMonth(startDate.getMonth() + 6)
  startDate.setHours(0, 0, 0, 0)
  dateToCheck.setHours(0, 0, 0, 0)
  sixMonthsLater.setHours(0, 0, 0, 0)
  return dateToCheck >= startDate && dateToCheck < sixMonthsLater
}

// LIST MATA UANG
// Src: https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx
const allowRequestCurrency = ["USD","CNY","EUR","GBP","AUD"]

async function ScrappingInformasiKursBI({ ke_matauang, dari_waktu, ke_waktu, __system = {} } = {}) {
  const startRequestTime = new Date().getTime()
  const requestForm = {
    matauang: String(ke_matauang||"USD").toUpperCase().slice(0, 3), // Default USD
    from: ConvertDateRequest(dari_waktu||new Date().toISOString()), // Mulai Waktu
    to: ConvertDateRequest(ke_waktu||new Date().toISOString()),     // Akhir Waktu
  }
  // Validasi waktu - Bukan waktu
  if(requestForm.from === "unvalid-date" || requestForm.to === "unvalid-date") {
    return {
      status: 400,
      suspect: `Form \"dari_waktu\" and \"ke_waktu\" is unknowing format`,
      message: "Waktu tidak valid, antara bagian \"dari_waktu\" atau \"ke_waktu\" mengalami format yang salah!"
    }
  }
  // Validasi waktu - Melewati waktu sekarang
  if((new Date(ke_waktu).getTime() - 1000) > new Date().getTime()) {
    return {
      status: 400,
      suspect: `Form \"ke_waktu\" is out from limit`,
      message: "Tujuan waktu melewati batas waktu sekarang, tidak valid!"
    }
  }
  // Validasi waktu - Melewati waktu sekarang
  if((new Date(dari_waktu).getTime() - 1000) > new Date().getTime()) {
    return {
      status: 400,
      suspect: `Form \"dari_waktu\" is out from limit`,
      message: "Mulai waktu melewati batas waktu sekarang, tidak valid!"
    }
  }
  // Validasi waktu - Melewati waktu sekarang
  if((new Date(ke_waktu).getTime() - 1000) > new Date().getTime()) {
    return {
      status: 400,
      suspect: `Form \"ke_waktu\" is out from limit`,
      message: "Mulai waktu melewati batas waktu sekarang, tidak valid!"
    }
  }
  // Validasi waktu - Terbalik
  if(new Date(dari_waktu).getTime() > new Date(ke_waktu).getTime()) {
    return {
      status: 400,
      suspect: `Form \"dari_waktu\" and \"ke_waktu\" is upside down`,
      message: "Mulai waktu hingga akhir waktu terbalik"
    }
  }
  // Validasi waktu - Melewati 6 bulan (tidak disarankan pada limit) (Disabled)
  // if(!isDateWithinSixMonths(new Date(dari_waktu), new Date(ke_waktu))) {
  //   return {
  //     status: 400,
  //     suspect: `Form \"dari_waktu\" and \"ke_waktu\" is out from six months`,
  //     message: "Mulai waktu hingga akhir waktu melebihi 6 bulan"
  //   }
  // }
  // Validasi Matauang - Hanya bisa di list
  if(!allowRequestCurrency.includes(requestForm.matauang)) {
    return {
      status: 400,
      suspect: `Form \"ke_matauang\" is unlist request currency`,
      message: "Mata uang yang dituju tidak disarankan!"
    }
  }
  // Get Aspx Request
  const startGetToken = new Date().getTime()
  const getToken = await AxiosRequest("https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx", {
    timeout: __system?.timeout||undefined
  })
  if(getToken.isError) {
    return {
      status: getToken.typeError === "connection_or_logic"?500:400,
      suspect: null,
      message: "Gagal mengolah data karena respon error"
    }
  }
  // Cheerio Get Token
  const readHTML = String(getToken.data).replace(/\r\n/g, '\n')
  const tk = cheerio.load(readHTML)
  let tokenField = {}
  tk("#aspnetForm input").each((i, el) => {
    const nameInput = tk(el).attr("name")
    const valueInput = tk(el).attr("value")
    if(Object.keys(tokenField).pop() !== "__EVENTVALIDATION") {
      tokenField[nameInput] = valueInput||""
    }
  })
  const fieldStg = tk("#RibbonContainer_activeTabId")
  tokenField[fieldStg.attr("name")] = ""
  let tokenFieldTwo = {}
  tk("#tableData .row select").each((i, el) => {
    const nameInput = tk(el).attr("name")
    const valueInput = tk(el).attr("value")
    if(!nameInput) {
      return;
    }
    if(
      String(nameInput).endsWith("btnSearch2")
      || String(nameInput).endsWith("ButtonExport")
    ) {
      return;
    }
    // Set Matauang
    if(String(nameInput).endsWith("matauang1")) {
      // Adding 2 spaces for request (Idk for validation on goverment website)
      tokenFieldTwo[nameInput] = String(requestForm.matauang).trim()+"  "
      return;
    }
    // Set From
    if(String(nameInput).endsWith("txtFrom")) {
      tokenFieldTwo[nameInput] = String(requestForm.from).trim()
      return;
    }
    // Set To
    if(String(nameInput).endsWith("txtTo")) {
      tokenFieldTwo[nameInput] = String(requestForm.to).trim()
      return;
    }
    tokenFieldTwo[nameInput] = valueInput||""
  })
  tk("#tableData .row input").each((i, el) => {
    const nameInput = tk(el).attr("name")
    const valueInput = tk(el).attr("value")
    if(!nameInput) {
      return;
    }
    if(
      String(nameInput).endsWith("btnSearch2")
      || String(nameInput).endsWith("ButtonExport")
    ) {
      return;
    }
    // Set Matauang
    if(String(nameInput).endsWith("matauang1")) {
      // Adding 2 spaces for request (Idk for validation on goverment website)
      tokenFieldTwo[nameInput] = String(requestForm.matauang).trim()+"  "
      return;
    }
    // Set From
    if(String(nameInput).endsWith("txtFrom")) {
      tokenFieldTwo[nameInput] = String(requestForm.from).trim()
      return;
    }
    // Set To
    if(String(nameInput).endsWith("txtTo")) {
      tokenFieldTwo[nameInput] = String(requestForm.to).trim()
      return;
    }
    tokenFieldTwo[nameInput] = valueInput||""
  })
  // HiddenSourceID
  const nameInputCase = String(Object.keys(tokenFieldTwo)[0])?.split("$")?.slice(0, 4)?.join("$")
  tk("input").each((i, el) => {
    const nameInput = tk(el).attr("name")
    if(nameInput?.endsWith("btnSearch1")) {
      tokenFieldTwo[nameInputCase+"$hidSourceID"] = tk(el).attr("id")||""
    }
  })
  const hiddenFieldCount = tk("#HiddenFieldCount")
  tokenFieldTwo[hiddenFieldCount.attr("name")] = hiddenFieldCount.attr("value")||""
  console.log(`[GetToken]: Finis at ${(new Date().getTime() - startGetToken)/1000}s`)
  // console.log({
  //   ...tokenField,
  //   ...tokenFieldTwo,
  // })
  const mergeToken = {
    ...tokenField,
    ...tokenFieldTwo,
  }
  const cookieArray = Array.isArray(getToken.headers['set-cookie'])? getToken.headers['set-cookie']:[]
  const dataRequestForm = new URLSearchParams(mergeToken).toString()
  const getData = await AxiosRequest("https://www.bi.go.id/id/statistik/informasi-kurs/transaksi-bi/Default.aspx", {
    timeout: __system?.timeout||undefined,
    method: "POST",
    data: dataRequestForm,
    headers: {
      'Content-Length': String(dataRequestForm.length),
      'Cookie': cookieArray.map(a => a.split(";")[0]).join("; "),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if(getData.isError) {
    return {
      status: getData.typeError === "connection_or_logic"?500:400,
      suspect: null,
      message: "Gagal mengolah data karena error respon pada permintaan data"
    }
  }
  const dataContext = String(getData.data)
  const $ = cheerio.load(dataContext)
  let listRate = []
  $("table.table.table-striped tr").each((i, el) => {
    const getBuy = String($("td", el).eq(2).text()||"").trim()?.split(',')[0].split(".").join("")
    const getSell = String($("td", el).eq(1).text()||"").trim()?.split(',')[0].split(".").join("")
    const getDateTable = String($("td", el).eq(3).text()||"").trim()
    const formatCurrency = {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }
    const dataObjectfiy = {
      buy_num: Number(getBuy),
      buy: String(new Intl.NumberFormat("id-ID", formatCurrency).format(Number(getBuy))).replace(/ /g, " ").replace(/Rp/g, "Rp."),
      sell_num: Number(getSell),
      sell: String(new Intl.NumberFormat("id-ID", formatCurrency).format(Number(getSell))).replace(/ /g, " ").replace(/Rp/g, "Rp."),
      date: formatDateToJsDate(getDateTable)
    }
    if(!!getDateTable?.trim()) {
      listRate.push(dataObjectfiy)
    }
  })
  return {
    status: 200,
    request: {
      from_cache: false,
      finis_time_second: (new Date().getTime() - startRequestTime)/1000,
    },
    data: {
      currency: {
        from: "IDR",
        to: requestForm.matauang,
        value: 1.00
      },
      date: {
        from: new Date(dari_waktu),
        to: new Date(ke_waktu),
      },
      rate: listRate
    }
  }
}

module.exports = {
  ScrappingInformasiKursBI
}

// // # JUST USE EXAMPLE DATA
// ScrappingInformasiKursBI({
//   ke_matauang: "USD",
//   dari_waktu: new Date("2025-07-01").getTime() - (1 * 30.4375 * 24 * 60 * 60 * 1000),
//   ke_waktu: new Date("2025-07-02").getTime()
// }).then(a => {
//   const dataJson = JSON.stringify(a,null,2)
//   require("fs").writeFileSync("./example.js", `module.exports = ${dataJson}`)
// })