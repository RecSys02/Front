import { PROVINCE_CODE_MAP, PROVINCE_NAME_MAP } from "@/constants/region.type";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toYYYYMMDD = (v: Date | string | null | undefined) => {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) return null;

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export const resolveProvinceCode = (provinceLabel: string | null) => {
  if (!provinceLabel) return null;
  return PROVINCE_CODE_MAP[provinceLabel] ?? null;
};

export const mapProvinceToKorean = (province?: string | null): string => {
  if (!province) return "";

  return PROVINCE_NAME_MAP[province] ?? province;
};
