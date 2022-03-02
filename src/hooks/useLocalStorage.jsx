import { useEffect, useState } from "react";

const useLocalStorage = () => {
  const [stayToken, setStayToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const stayToken = JSON.parse(window.localStorage.getItem("stayToken"));
    const userData = JSON.parse(window.localStorage.getItem("userData"));

    setStayToken(stayToken);
    setAvatar(userData.picture);
    setName(userData.name);
    setEmail(userData.email);
  }, []);

  return { stayToken, avatar, name, email };
};

export default useLocalStorage;
