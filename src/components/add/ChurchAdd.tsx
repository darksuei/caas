import axios from 'axios'

// ============== using thesame styles as EditChurch.tsx because the layout are similar {so other devs wont get confused with the class names not corresponding}
import classes from './add.module.scss'

import { Icon } from "@iconify/react";
import Card from "../UI/card/Card";
import { useRef, useState } from "react";
import Alert from '../alert/Alert';
import { toast } from 'react-toastify';


const ChurchAdd = () => {
    // set the states
    const [imageUrl, setImageUrl] = useState('')
    const [churchName, setChurchName] = useState('');
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

    const churchNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChurchName(e.target.value);
    }

    const handleSubmit = async () => {

        // onclick scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
            
            const endpoint = 'http://projectcaas.ng/api/Church/GetAllChurch';

            // Perform form validation
            if (churchName.trim() === '') {
                toast.error("Church name is required!")
                return; // Stop further execution
            }

            // Validate the image url
            // @ts-ignore
            const isImageUrlValid = validateImageUrl(imageUrl.name)
            if (!isImageUrlValid) {
                toast.error("Invalid image URL")
                return; // Stop further execution
            }
    
            // Check if the name already exists
            const response = await axios.get(endpoint);
            const churches = response.data.data;
            // @ts-ignore
            const nameExists = churches.some(church => church.name === churchName);
    
            if (nameExists) {
                toast.warn("Church name already exists")
                return; // Stop further execution
            }
    
            // If the name does not exist, proceed with form submission
            const requestBody = new FormData();
            requestBody.append('ChurchLogo', imageUrl);
            requestBody.append('Name', churchName);
    
            const addChurchEndpoint = 'http://projectcaas.ng/api/Church/AddChurch';
            const addChurchResponse = await axios.post(addChurchEndpoint, requestBody);
            console.log(addChurchResponse.data);
            
            // Display the success alert
            toast.success("Church added sucessfully")
            setChurchName('');
            setImageUrl('')

        } catch (error) {
            //@ts-ignore
            const errMsg = error.message;
            console.log(error);
            // Display the error alert
            toast.error(errMsg)
        }
    };
    

    // function for show alert if it's a success or a fail
    const showAlert = (show=false, type='',msg='') => {
        setAlert({show,type,msg})
    }

    // function to validate image url
    // @ts-ignore
    const validateImageUrl = (url) => {
        // Regular expression to validate URL format
        // const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        const urlPattern = /\.(jpeg|jpg|png|gif)$/i;
        return urlPattern.test(url);
    };

    // function for btn onclick open the input file
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // @ts-ignore
        fileInputRef.current.click();
    };
    return (
    <>
        {/* //@ts-ignore */}
        {alert && <Alert {...alert} removeAlert={showAlert}/>}

        <div className={classes.add__container}>
        <div className={classes.add__left}>
            <Card>
                <p>Preview Changes</p>
                <div className={`${classes.upload_circle_temp}`}>
                    <Icon icon="akar-icons:cloud-upload" />
                    <img
                        className={classes.pic}
                        // @ts-ignore
                        src={imageUrl ? URL.createObjectURL(imageUrl) : "" } 
                        alt=""
                    />
                </div>
                
                <div className={classes.card__info}>
                    <div>
                        <div className={classes.title}>Name of Church</div>
                        <div className={classes.value}>
                            {churchName ? churchName : 'Undefined'}
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        <div className={classes.add__right}>
            <Card>
                <div className={classes.card__edit}>
                    <h3 className={classes.subTitle}>
                        <Icon icon="fluent:edit-16-regular" width="24" />
                        {'Commit'}
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
                                // @ts-ignore
                                onChange={(e)=> setImageUrl(e.target.files[0])}
                            />
                        </div>
                        <img
                            className={classes.pic}
                            // @ts-ignore
                            src={imageUrl ? URL.createObjectURL(imageUrl) : "" } 
                            alt=""
                        />
                    </div>

                    <form
                        onSubmit={(e)=> {
                            e.preventDefault();
                            handleSubmit()
                        }}
                    >
                        <div className={classes.form__control}>
                            <label htmlFor="Name">Name of Church</label>
                            <input
                                id="Name of Church"
                                type='text'
                                placeholder='Enter church name'
                                value={churchName}
                                onChange={churchNameHandler}
                            />
                        </div>
                        
                        <div className={classes.file_input_control}>
                            <input
                                className={classes.file_input_elon}
                                type="file"
                                id="pic_elon"
                                name="pic"
                                ref={fileInputRef}
                                accept="image/png, image/jpeg"
                                // @ts-ignore
                                onChange={(e)=> setImageUrl(e.target.files[0])}
                            />
                        </div>
                        <div className={classes.btn__wrapper} style={{marginTop: '-1rem'}}>
                            <button className={classes.outline} type='button' onClick={handleButtonClick}>
                                {'Upload church logo'}
                            </button>
                        </div>
                        <div className={classes.btn__wrapper}>
                            <button className={classes.button} type='submit'>
                                {'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
        </div>
    </>
  )
}

export default ChurchAdd