import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

export function camelToFlat(camel: string) {
  return camel.replace(/([A-Z])/g, " $1").toLowerCase();
}
