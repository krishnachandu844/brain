import { useState } from "react";

export function useSignupForm() {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = () => setValues({ email: "", username: "", password: "" });

  return { values, handleChange, reset };
}
