import { useState } from "react";

export function useSigninForm() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = () => setValues({ username: "", password: "" });

  return { values, handleChange, reset };
}
