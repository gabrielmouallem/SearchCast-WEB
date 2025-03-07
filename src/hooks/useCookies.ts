"use client";
import { CookiesService } from "@/services/client";
import { useState } from "react";

export function useCookies(key: string, defaultValue: string) {
  const getCookie = () => CookiesService.getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());

  // @ts-ignore
  const updateCookie = (value, numberOfDays) => {
    setCookie(value);
    CookiesService.setItem(key, value, numberOfDays);
  };

  return { cookie, updateCookie, getCookie: () => CookiesService.getItem(key) };
}
