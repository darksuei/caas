import React, { useContext } from "react";
import ThemeContext from "../../../../contexts/themeContext";
import classes from "./ThemeBox.module.scss";
import { Icon } from "@iconify/react";

function ThemeBox() {
  // const [theme, setTheme] = useState("light");
  const themeCtx = useContext(ThemeContext);
  let theme = themeCtx.theme;
  return (
    <>
    
    <div className={classes.themeBox} onClick={() => themeCtx.toggleTheme()}>
      <div
        className={`${classes.toggle} ${
          theme === "dark" ? classes.darkMode : ""
        }`}
      ></div>
    </div>
      {/* <Icon icon="material-symbols:dark-mode-outline" onClick={() => themeCtx.toggleTheme()}/> */}
    </>
  );
}

export default ThemeBox;
