import { cookies } from "next/headers";

const getItem = (key: string): string => {
  const cookieStore = cookies();
  return cookieStore.get(key)?.value || "";
};

const setItem = (key: string, value: string, numberOfDays: number): void => {
  const expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + numberOfDays * 24 * 60 * 60 * 1000,
  );

  cookies().set(key, value, { expires: expirationDate, path: "/" });
};

export const CookiesService = {
  getItem,
  setItem,
};
