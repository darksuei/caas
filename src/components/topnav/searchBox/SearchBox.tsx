import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

import classes from "./SearchBox.module.scss";

function SearchBox() {
  const { t } = useTranslation();

  return (
    <div className={classes.searchBox}>
      <Icon
        icon="fluent:search-28-filled"
        width="14"
        style={{ fontWeight: "bold" }}
      />
      <input
        type="search"
        placeholder={"Search"}
        name="search"
        className={classes.searchBox_input}
      />
    </div>
  );
}

export default SearchBox;
