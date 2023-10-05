import React, { useContext, useRef } from "react";

import LoginContext from "../../contexts/loginContext";
import { images } from "../../constants";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import classes from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";


const LoginBox = () => {
  const loginCtx = useContext(LoginContext);
  const userNameRef = useRef<HTMLInputElement>(null);
  const errorMessageRef = useRef<HTMLSpanElement>(null);
  const navigate = useNavigate();

  let isValid = true;
  
  function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    isValid = userNameRef.current?.value === "caas";
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
    }
  }

  return (
    <div
    className={`${classes.container} ${classes.rtl}`}
  >
    <div className={classes.loginBox}>
      <div className={classes.logo}>
        <img src={images.logo} alt="digikala" />
      </div>
      <h2 className={classes.title}>Login</h2>
      <form onSubmit={loginHandler}>
        <Input
          ref={userNameRef}
          type={"text"}
          id={"Username"}
          placeholder={"caas"}
        />
        <span ref={errorMessageRef} className={classes.errorMessage}>
          {"just dey play"}
        </span>
        <Input
          type={"password"}
          id={"Password"}
          value={"admin"}
          readonly={true}
        />
        <Button type={"submit"} >
          Login
        </Button>
        <Link className={classes.forgat_pass} to="/">
          {"Forget your password?"}
        </Link>
      </form>
    </div>
  </div>
  )
}

export default LoginBox