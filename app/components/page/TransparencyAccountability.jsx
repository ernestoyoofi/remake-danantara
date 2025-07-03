"use client";
import BannerTransparancyAccountability from "../content/BannerTransparancyAccountability"
import ListAnggotaDanantara from "../content/ListAnggotaDanantara"
import KursBankIndonesia from "../content/KursBankIndonesia"
import TransparancyHistoryReport from "../content/TransparancyHistoryReport"

export default function TransparencyAccountability() {
  return <>
    <BannerTransparancyAccountability />
    <ListAnggotaDanantara />
    <KursBankIndonesia />
    <TransparancyHistoryReport />
  </>
}