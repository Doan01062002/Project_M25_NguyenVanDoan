import { AccountAdmin } from "@/interface/admin";

//Admin
export const setCheckAdmin = () => {
  localStorage.setItem("checkAdmin", JSON.stringify([]));
};

const getCheckAdmins = (): any => {
  const userString = localStorage.getItem("checkUser");
  return userString ? JSON.parse(userString) : null;
};

export const getCheckAdmin: AccountAdmin = getCheckAdmins();
