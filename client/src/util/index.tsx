import { AccountAdmin } from "@/interface/admin";

//Admin
export const setCheckAdmin = () => {
  localStorage.setItem("checkAdmin", JSON.stringify([]));
};

const getAdmins = (): any => {
  const adminString = localStorage.getItem("checkAdmin");
  return adminString ? JSON.parse(adminString) : null;
};

export const getAdminPage: AccountAdmin = getAdmins();

// User
const getCheckAdmins = (): any => {
  const userString = localStorage.getItem("checkUser");
  return userString ? JSON.parse(userString) : null;
};

export const getCheckAdmin: AccountAdmin = getCheckAdmins();
