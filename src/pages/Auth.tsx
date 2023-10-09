import React from "react";
import LoginBox from "../components/login/Login";
import SignupBox from "../components/login/Signup";

type Params = {
  type: string;
};

function Login({ type }: Params) {
  return (
    <section>
      {type === "login" && <LoginBox />}
      {type === "register" && <SignupBox />}
    </section>
  );
}

export default Login;
