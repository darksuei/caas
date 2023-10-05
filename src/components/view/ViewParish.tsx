import React from "react";
import Card from "../UI/card/Card";
import { Link } from "react-router-dom";
import { IOveralTable as Props } from "../../interfaces/Itable";
import classes from "../view/ViewParish.module.scss";
import { Icon } from "@iconify/react";
import LineChart from "../chart/LineChart";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";


const EditChurch: React.FC<{ datas?: Props }> = (props) => {
    
    return(
        <div className={classes.view__container}>
            <div className={classes.view__left}>
                <Card style={{flexDirection: 'column'}}>

                    <Link to={`/onboarding/edit/${props.datas?.parishId}`}>
                        <div className={classes.editButton}>Edit</div>
                    </Link>
                    
                    <div className={classes.userShowTop}>
                        <img src={props.datas?.parishLogoPath} alt="image loading..." className={classes.userShowImg} />

                        <div className={classes.userShowTopTitle}>
                            <span className={classes.userShowUsername}>
                                {`${props.datas?.churchName}`}
                            </span>
                            <span className={classes.userShowUserTitle}>
                            {`${props.datas?.name}`}
                            </span>
                        </div>
                    </div>
                    
                    <div className={classes.userShowBottom}>
                        <span className={classes.fr_mobile_flex}>
                            
                            <span className={classes.userShowTitle}>Contact Details</span>
                            <div className={classes.userShowInfo}>
                                <Icon icon="ic:outline-phone" />
                                <span className={classes.userShowInfoTitle}>{`${props.datas?.parishPhoneNumber || "undefined"}`}</span>
                            </div>

                            <div className={classes.userShowInfo}>
                                <Icon icon="fa:address-card-o" />
                                <span className={classes.userShowInfoTitle}><span className={classes.userShowInfoTitle}>{`${props.datas?.address || "undefined"}`}</span></span>
                            </div>
                            
                            <div className={classes.userShowInfo}>
                                <Icon icon="tabler:mail-pin" />
                                <span className={classes.userShowInfoTitle}><span className={classes.userShowInfoTitle}>{`${props.datas?.parishEmail || "undefined"}`}</span></span>
                            </div>
                            
                            <span className={classes.userShowTitle}>Other Details</span>

                            <div className={classes.userShowInfo}>
                                <Icon icon="fluent:person-12-regular" />
                                <span className={classes.userShowInfoTitle}><span className={classes.userShowInfoTitle}>{`${props.datas?.pastorName || "undefined"}`}</span></span>
                            </div>

                            <div className={classes.userShowInfo}>
                                <Icon icon="gis:search-country" />
                                {/* <Icon icon="mdi:bus-stop" /> */}
                                <span className={classes.userShowInfoTitle}>{`${props.datas?.country || "undefined"}`}</span>
                            </div>

                            <div className={classes.userShowInfo}>
                                {/* <Icon icon="mdi:bus-stop" /> */}
                                <Icon icon="material-symbols:real-estate-agent-outline" />
                                <span className={classes.userShowInfoTitle}>{`${props.datas?.state || "undefined"}`}</span>
                            </div>
                            
                            <div className={classes.userShowInfo}>
                                <Icon icon="mdi:estate" />
                                <span className={classes.userShowInfoTitle}><span className={classes.userShowInfoTitle}>{`${props.datas?.city || "undefined"}`}</span></span>
                            </div>
                        </span>
                    </div>
                </Card>
            </div>
            <div className={classes.view__right}>
            <Card style={{display: "block"}}>
                <LineChart />
            </Card>
            </div>
        </div>
    )
}

export default EditChurch