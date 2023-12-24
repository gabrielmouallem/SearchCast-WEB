"use client";

const getItem = (key: string) =>
  typeof document === "undefined"
    ? ""
    : document.cookie.split("; ").reduce((total, currentCookie) => {
        const item = currentCookie.split("=");
        const storedKey = item[0];
        const storedValue = item[1];

        return key === storedKey ? decodeURIComponent(storedValue) : total;
      }, "");

const setItem = (key: string, value: string, numberOfDays: number) => {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000
  );

  if (document && typeof document !== "undefined") {
    document.cookie = `${key}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  }
};

export const CookiesService = {
  getItem,
  setItem,
};
