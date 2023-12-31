import React, { useContext, useRef } from "react";

import LoginContext from "../../contexts/loginContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginBox = () => {
  const loginCtx = useContext(LoginContext);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  let isValid = true;

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    const { data, status } = await axios.post(
      `http://localhost:5000/api/user`,
      formData
    );
    console.log(data);
    if (status !== 201 && status !== 200) {
      toast.error(data.message);
    } else {
      toast.success(data);
      loginCtx.toggleLogin();
      navigate("/");
    }

    /*isValid = userNameRef.current?.value === "caas";
    if (userNameRef.current) {
      if (isValid) {
        loginCtx.toggleLogin();
        navigate("/");
      } else {
        userNameRef.current.focus();
        errorMessageRef.current?.setAttribute(
          "style",
          "display: inline-block;opacity: 1"
        );
      }
    } */
  }

  return (
    <div className={`${classes.container} ${classes.rtl}`}>
      <div className={classes.loginBox}>
        <div className={classes.logo}>
          <img src={images.logo} alt="digikala" />
        </div>
        <h2 className={classes.title}>Login</h2>
        <form onSubmit={loginHandler}>
          <Input
            ref={userNameRef}
            type={"email"}
            id={"Email"}
            placeholder={"John@doe.org"}
            name="email"
            isRequired={true}
            setFormData={setFormData}
          />
          <span ref={errorMessageRef} className={classes.errorMessage}>
            {"Enter a valid email"}
          </span>
          <Input
            type={"password"}
            id={"Password"}
            placeholder={"********"}
            name="password"
            isRequired={true}
            setFormData={setFormData}
          />
          <Button type={"submit"}>Login</Button>
          <Link className={classes.forgat_pass} to="/">
            {"Forgot password?"}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginBox;
