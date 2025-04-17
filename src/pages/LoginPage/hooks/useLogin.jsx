import { useState } from "react";

export function useLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleUser = (value) => {
    setUser(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };

  const fieldsEmpty = () => {
    return user.length === 0 || password.length === 0;
  };

  return { user, password, handleUser, handlePassword, fieldsEmpty };
}
