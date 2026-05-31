import { useNavigate } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm";
import { useSigninForm } from "../hooks/useSigninForm";
import { submitSignin } from "../services/SigninService";
import { toast } from "react-toastify";

import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

type Props = {};

export default function Signin({}: Props) {
  const { values, handleChange, reset } = useSigninForm();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getUser } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await submitSignin(values);
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
    <div className='py-32 flex items-center justify-center'>
      <SigninForm
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
