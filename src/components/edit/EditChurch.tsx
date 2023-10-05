import React from "react";
import Card from "../UI/card/Card";
import { Link } from "react-router-dom";
import { IOveralTable as Props } from "../../interfaces/Itable";
import classes from "./EditChurch.module.scss";
import { Icon } from "@iconify/react";
import Button from "../UI/button/Button";
import Input from "../UI/input/Input";


const EditChurch: React.FC<{ datas?: Props }> = (props) => {

  return (
    <div className={classes.edit__container}>
    
    <div className={classes.edit__left}>
        <Card>
            <div className={classes.img_wrapper}>
                <img
                className={classes.pic}
                //@ts-ignore
                src={props.datas?.parishLogoPath}
                alt="church profile img"
                />
            </div>

            <div className={classes.card__info}>
                <div>
                    <div className={classes.title}>Parish Name</div>
                    <div className={classes.value}>
                        {`${props.datas?.name}`}
                        {/* {props.datas?.name} */}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Category"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.category}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Pastor"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.pastor}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Nearest Bus Stop"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.nearestBusStop}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"State"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.state}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Contact"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.parishPhoneNumber}`}
                        
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Email address"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.email}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Country"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.country}`}
                    </div>
                </div>

                <div>
                    <div className={classes.title}>{"Addres"}</div>
                    <div className={classes.value}>
                        {`${props.datas?.address}`}
                    </div>
                </div>

            </div>
        </Card>
    </div>
    
    
    <div className={classes.edit__right}>
        <Card>
            <div className={classes.card__edit}>
                <h3 className={classes.subTitle}>
                    <Icon icon="fluent:edit-16-regular" width="24" />
                    {'Edit'}
                </h3>
                <div className={classes.img_wrapper}>
                    <div className={classes.upload_icon}>
                        <Icon icon="akar-icons:cloud-upload" />
                    </div>
                    <div className={classes.file_input_control}>
                        <input
                        className={classes.file_input}
                        type="file"
                        id="pic"
                        name="pic"
                        accept="image/png, image/jpeg"
                        />
                    </div>
                    <img
                        className={classes.pic}
                        src={props.datas?.parishLogoPath}
                        alt="church profile img"
                    />
                </div>
                
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                <Input
                    id="Name"
                    type="text"
                    placeholder={props.datas?.name}
                />
                <Input
                    id="Category"
                    type="text"
                    placeholder={props.datas?.category}
                />
                <Input
                    id="Pastor"
                    type="text"
                    placeholder={props.datas?.pastor}
                />
                <Input
                    id="State"
                    type="text"
                    placeholder={props.datas?.state}
                />
                <Input
                    id="Contact"
                    type="number"
                    placeholder={props.datas?.parishPhoneNumber}
                />
                <Input
                    id="Address"
                    type="number"
                    placeholder={props.datas?.address}
                />
                <div className={classes.btn__wrapper}>
                    <Link to="/onboarding">
                        <Button type="submit">{"Upload"}</Button>
                    </Link>
                </div>
                </form>
            </div>
        </Card>
    </div>

    </div>
  )
}

export default EditChurch