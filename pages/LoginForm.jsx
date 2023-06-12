import React, { useState } from "react";
import Input from "../components/Input";
import { ValidateForm } from "../utils/ValidateForm";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";



const LoginForm = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [responseError, setResponseError] = useState("");
  console.log(errors);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      error: errors.username,
    },
    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Password",
      label: "Password",
      error: errors.password,
    },
  ];

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      setValues({ ...values, [e.target.name]: e.target.checked });
      
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = ValidateForm(values);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("/api/login", values);
        setResponseError(null);
        console.log(response.data);
        router.push("/dashboard");
      } catch (error) {
        const response = error.response.data.error;
        setResponseError(response);
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form onSubmit={onSubmit} className={styles.form}>
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            ></Input>
          ))}
          <p className={styles.p}>{responseError}</p>
          <div className={styles.checkbox_container}>
            <label htmlFor="checkbox" className={styles.rememberMe}>
              Remember me
            </label>
            <input
              type="checkbox"
              name="rememberMe"
              id="checkbox"
              className={styles.checkbox}
              checked={values.rememberMe}
              onChange={onChange}
            />
          </div>
          <button className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
