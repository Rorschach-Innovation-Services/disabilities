import { useState } from "react";

// Used to store the jwt token and the admin's name
export const useLocalStorage = () => {
  const NAME = "name";
  const TOKEN = "token";
  const EMAIL = "email";
  const ID = "id";
  const ROLE = "role";
  const COMPANY_ID = "companyId";
  const DEPARTMENT_ID = "departmentId";

  const readItem = (key) => () => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return "";
    return storedValue;
  };

  const [name, setName] = useState(readItem(NAME)());
  const [token, setToken] = useState(readItem(TOKEN)());
  const [email, setEmail] = useState(readItem(EMAIL)());
  const [id, setID] = useState(readItem(ID)());
  const [role, setRole] = useState(readItem(ROLE)());
  const [companyId, setCompanyId] = useState(readItem(COMPANY_ID)());
  const [departmentId, setDepartmentId] = useState(readItem(DEPARTMENT_ID)());

  const writeItem = (key, setItem) => (newValue) => {
    localStorage.setItem(key, newValue);
    setItem(newValue);
  };

  const clearItem = (key) => () => {
    localStorage.removeItem(key);
  };

  const clearAll = () => {
    clearItem(NAME)();
    clearItem(ID)();
    clearItem(TOKEN)();
    clearItem(EMAIL)();
    clearItem(ROLE)();
    clearItem(COMPANY_ID)();
    clearItem(DEPARTMENT_ID)();
    clearItem("adminID")();
    clearItem("adminPhoto")();
    clearItem("adminName")();
    setName("");
    setEmail("");
    setID("");
    setToken("");
    setRole("");
    setCompanyId("");
    setDepartmentId("");
  };

  return {
    name,
    token,
    email,
    id,
    role,
    companyId,
    departmentId,
    writeEmail: writeItem(EMAIL, setEmail),
    writeID: writeItem(ID, setID),
    writeName: writeItem(NAME, setName),
    writeToken: writeItem(TOKEN, setToken),
    writeRole: writeItem(ROLE, setRole),
    writeCompanyId: writeItem(COMPANY_ID, setCompanyId),
    writeDepartmentId: writeItem(DEPARTMENT_ID, setDepartmentId),
    clearName: clearItem(NAME),
    clearToken: clearItem(NAME),
    clearEmail: clearItem(EMAIL),
    clearID: clearItem(ID),
    clearAll,
  };
};
