import React, { useEffect, useState } from "react";

import { Layout } from "@/components";
import css from "../styles/Forms.module.css";
import { useRouter } from "next/router";
import { useAuth } from "@/lib";

const userSVG = (
  <svg viewBox="0 0 288 330" xmlns="http://www.w3.org/2000/svg">
    <path d="M218.489 74.481C218.489 33.603 184.888 0.000976562 144.009 0.000976562C103.131 0.000976562 69.5289 34.161 69.5289 75.04C69.5289 115.918 103.131 149.52 144.009 149.52C184.887 149.52 218.489 115.36 218.489 74.481Z" />
    <path d="M143.449 329.281C198.33 329.281 248.728 308.563 287.369 274.961L287.36 272.16C287.36 245.839 279.521 220.64 264.962 199.359C251.525 180.32 233.603 165.199 212.884 155.679C194.403 171.359 170.325 180.878 144.005 180.878C117.685 180.878 93.6063 171.359 75.1263 155.679C54.4073 165.199 36.4893 180.32 23.0483 199.359C8.49011 221.199 0.650299 245.84 0.650299 272.16V275.52C39.8503 310.238 89.6913 329.281 142.89 329.84V329.281H143.449Z" />
  </svg>
);

const Register = () => {
  const router = useRouter();
  const {
    register,
    registerState: { loading },
  } = useAuth();
  const [error, setError] = useState("");
  const [isDataValid, setIsDataValid] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmation: "",
  });

  useEffect(() => {
    const isFormFilled = !!data.email && !!data.password && !!data.confirmation;
    const isConfirmationMatchingPassword = data.password === data.confirmation;

    setError(
      isFormFilled && !isConfirmationMatchingPassword
        ? "Password and Confirmation must match"
        : ""
    );

    setIsDataValid(isFormFilled && isConfirmationMatchingPassword);
  }, [data, error]);

  const handleChange = ({ target }: any) => {
    const name = target.name;
    const value = target.value;
    setData({ ...data, [name]: value });
    console.log({ data, error });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await register(data.email, data.password);
    router.push("/");
  };

  return (
    <Layout>
      <div className={css.icon}>{userSVG}</div>
      <h1 className={css.title}>Registration</h1>
      <p className={css.subtitle}>Enter credentials to register</p>
      {error && <p className={css.error}>{error}</p>}
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          name="email"
          className={css.email}
          type="email"
          placeholder="email"
          onChange={handleChange}
          value={data.email}
        />
        <input
          name="password"
          className={css.password}
          type="password"
          placeholder="password"
          onChange={handleChange}
          value={data.password}
        />
        <input
          name="confirmation"
          className={css.password}
          type="password"
          placeholder="password confirmation"
          onChange={handleChange}
          value={data.confirmation}
        />
        <input
          className={css.submit}
          type="submit"
          value={loading ? "Loading" : "Register"}
          disabled={!isDataValid || loading}
        />
      </form>
    </Layout>
  );
};

export default Register;
