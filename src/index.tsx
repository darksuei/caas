import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// importing contexts
import {LoginContextProvider} from './contexts/loginContext'
import {SidebarContextProvider} from './contexts/sidebarContext'
import {ThemeContextProvider} from './contexts/themeContext'

ReactDOM.render(
  <LoginContextProvider>
    <ThemeContextProvider>
      <SidebarContextProvider>
        <App />
      </SidebarContextProvider>
    </ThemeContextProvider>
  </LoginContextProvider>,
  document.getElementById("root")
);
