"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

export default function SelectMenu({ list = [], placeholder = "Select menu", onChange, className, defaultValue, value }) {
  return <Select onValueChange={(e) => {
    if(typeof onChange === "function") {
      onChange(e)
    }
  }} value={value||undefined}>
    <SelectTrigger className={className}>
      <SelectValue placeholder={placeholder}/>
    </SelectTrigger>
    <SelectContent>
      {list.map((a, i) => {
        if(a?.group) {
          return <SelectGroup key={i}>
            <SelectLabel>{a?.label}</SelectLabel>
            {a?.group?.map((b, c) => (
              <SelectItem key={c} value={b?.value||b?.label}>{b?.label}</SelectItem>
            ))}
          </SelectGroup>
        }
        return <SelectItem key={i} value={a?.value||a?.label}>{a?.label}</SelectItem>
      })}
    </SelectContent>
  </Select>
}