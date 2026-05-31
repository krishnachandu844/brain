"use client";

import { toast } from "react-toastify";
import SignupForm from "../components/auth/SignupForm";
import { useSignupForm } from "../hooks/useSignupForm";
import { submitSignUp } from "../services/SignupService";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

type Props = {};

export default function Signup({}: Props) {
  const { values, reset, handleChange } = useSignupForm();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuthStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await submitSignUp(values);
      await getUser();
      navigate("/dashboard", { replace: true });
      toast.success(data.message);
      reset();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className='py-28 bg-gray-50 flex items-center justify-center '>
      <SignupForm
        values={values}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        show={show}
        setShow={setShow}
        loading={loading}
      />
    </div>
  );
}
