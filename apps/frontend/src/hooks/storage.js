import { useState } from "react";

// Used to store the jwt token and the admin's name
export const useLocalStorage = () => {
  const NAME = "name";
  const TOKEN = "token";
  const EMAIL = "email";
  const ID = "id";

  const readItem = (key) => () => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) return "";
    return storedValue;
  };

  const [name, setName] = useState(readItem(NAME)());
  const [token, setToken] = useState(readItem(TOKEN)());
  const [email, setEmail] = useState(readItem(EMAIL)());
  const [id, setID] = useState(readItem(ID)());

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
    clearItem("adminID")();
    clearItem("adminPhoto")();
    clearItem("adminName")();
    setName("");
    setEmail("");
    setID("");
    setToken("");
  };

  return {
    name,
    token,
    email,
    id,
    writeEmail: writeItem(EMAIL, setEmail),
    writeID: writeItem(ID, setID),
    writeName: writeItem(NAME, setName),
    writeToken: writeItem(TOKEN, setToken),
    clearName: clearItem(NAME),
    clearToken: clearItem(NAME),
    clearEmail: clearItem(EMAIL),
    clearID: clearItem(ID),
    clearAll,
  };
};
