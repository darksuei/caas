import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";

function Profile() {
  const { t } = useTranslation();

  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <img src={images.avatar} alt="avatar" />
      </div>
      <div className={classes.profile__info}>
        <span className={classes.profile__role}>{t("Stanley Okoli")}</span>
      </div>
    </div>
  );
}

export default Profile;
