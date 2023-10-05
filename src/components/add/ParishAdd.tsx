import classes from './add.module.scss'

import { Icon } from "@iconify/react";
import Button from "../UI/button/Button";
import Card from "../UI/card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from '../alert/Alert';
import { toast } from "react-toastify";

interface Church {
    churchId: string;
    name: string;
}  

interface State {
    id: string;
    name: string;
}


const ParishAdd = () => {
    
    // set the states
    const [data, setData] = useState<Church[]>([]); // for the api get request
    const [stateData, setStateData] = useState<State[]>([]) // for the state api

    const [imageUrl, setImageUrl] = useState('')
    const [parishName, setParishName] = useState('');
    const [pastorName, setPastorName] = useState('')
    const [category, setCategory] = useState('');
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('09019953850');
    const [parishPhoneNumber, setParishPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [parishAddress, setParishAddress] = useState('');

    const [selectedItem, setSelectedItem] = useState<string>('');
    const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

    // Check if the country is "Nigeria"
    // const isNigeria = country == 'nigeria' ;
    const isNigeria = country.toLowerCase() === 'nigeria';


    // i simplified the previous code into the below "the just setting an onchange event and adding the value to the respective useStates"
    const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
          setter(e.target.value);
        };
    };

    //for the select
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedItem(event.target.value);
    };
    
    // Usage:
    const parisshNameHandler = handleChange(setParishName);
    const pastorNameHandler = handleChange(setPastorName)
    const emailHandler = handleChange(setEmail);
    // const phoneHandler = handleChange(setPhone);
    const ParishPhoneNumberHandler = handleChange(setParishPhoneNumber);
    const countryHandler = handleChange(setCountry);
    const stateHandler = handleChange(setState);
    const cityHandler = handleChange(setCity);
    const passwordHandler = handleChange(setPassword);
    const confirmPasswordHandler = handleChange(setConfirmPassword);
    const ParishAddressHandler = handleChange(setParishAddress);


    // fetch the church data from an api for the select menu
    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
          try {
            const response = await axios.get<{ data: Church[] }>('http://projectcaas.ng/api/Church/GetAllChurch')
            setData(response.data.data);
          } catch (error) {
            toast.warn("Error fetching church data")
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

    // fetch the state data from an api for the select menu
    useEffect(() => {
        // Fetch data from API
        const fetchStateData = async () => {
          try {
            const response = await axios.get<{ stateData: State[] }>('http://projectcaas.ng/api/Church/GetAllChurch')
            // setData(response.data.stateData);
            setStateData(response.data.stateData);
          } catch (error) {
            toast.warn("Error fetching state data")
            console.error('Error fetching data:', error);
          }
        };
    
        fetchStateData();
    }, []);

    // post request to submit the form data to an api using a post request
    const handleSubmit = async () => {
        // onclick scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        try {
            // Perform form validation
            if (imageUrl === '') {
                toast.error("Parish logo is required")
                return;
            }

            if (parishName.trim() === '') {
                toast.error("Parish name is required")
                return; // Stop further execution
            }
            
            if (pastorName.trim() === '') {
                toast.error("Pastor name is required")
                return; // Stop further execution
            }

            if (selectedItem.trim() === "") {
                toast.error("Please select Church")
                return; // Stop further execution
            }
            
            if (email.trim() === '') {
                toast.error("Email is required")
                return; // Stop further execution
            }

            if (!isValidEmail(email)) {
                toast.warning("Please enter a valid email address")
                return;
            }

            if (parishPhoneNumber.trim() === '') {
                toast.error("Mobile number is required")
                return; // Stop further execution
            }
            
            if (!isValidMobileNumber(parishPhoneNumber)) {
                toast.warning("Please enter a valid mobile number")
                return;
            }
            
            if (state.trim() === '') {
                toast.error("State is required")
                return;
            }

            if (country.trim() === '') {
                toast.error("Country is required")
                return;
            }

            if (city.trim() === '') {
                toast.error("City is required")
                return;
            }

            if (password.trim() === '') {
                toast.error("Password is required")
                return; // Stop further execution
            }
            
            if (password.length < 6) {
                toast.warn("Password must be at least 6 characters")
                return; // Stop further execution
            }

            if (confirmPassword.trim() === '') {
                toast.warn("Confirm Password is required")
                return; // Stop further execution
            }
            
            if (password !== confirmPassword) {
                toast.warn("Password and Confirm Password do not match")
                return; // Stop further execution
            }

            if (!isValidPassword(password)) {
                toast.warn("Password must contain at least one uppercase letter and symbols")
                return; // Stop further execution
            }            

            if (parishAddress.trim() === '') {
                toast.error("Address is required")
                return // Stop further execution
            }

            const requestBody = new FormData()
            requestBody.append('Name', parishName)
            requestBody.append("PastorName", pastorName)
            //@ts-ignore
            requestBody.append('ParishLogo', imageUrl)
            requestBody.append('ChurchId', selectedItem)
            requestBody.append('Email', email)
            requestBody.append('PhoneNumber', parishPhoneNumber)
            requestBody.append('Address', parishAddress)
            requestBody.append('Password', password)
            requestBody.append('Country', country)
            requestBody.append('State', state)
            requestBody.append('City', city)

            // procced with form submision
            const endpoint = 'http://projectcaas.ng/api/Account/register';
            const response  = await axios.post(endpoint, requestBody)
            console.log(response.data);
            console.log(requestBody.append.name);

            // Display the success alert
            toast.success("Parish added succesfuly")

            // Clear form fields
            setImageUrl('')
            setParishName('')
            setPastorName('')
            setEmail('')
            setParishPhoneNumber('')
            setState('')
            setPassword('')
            setConfirmPassword('')
            setParishAddress('')
            setCity("")
            setCountry('')
            
        } catch (error) {
            //@ts-ignore
            const errMsg = error.response.data;
            //@ts-ignore
            console.log(error.response.data);

            // Display the error alert
            toast.error(errMsg)
            // showAlert(true, 'danger', 'An error occured');
        }
    }
    // Helper function for show alert if it's a success or a fail
    const showAlert = (show=false, type='',msg='') => {
        setAlert({show,type,msg})
    }

    // Helper function to validate email format
    // @ts-ignore
    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to validate mobile number format
    // @ts-ignore
    function isValidMobileNumber(phone) {
        // Regular expression for mobile number validation
        const mobileNumberRegex = /^\d{11}$/;
        return mobileNumberRegex.test(phone);
    }

    // Helper function to validate password
    // @ts-ignore
    function isValidPassword(password) {
        // Regular expression for password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&-_*()])[a-zA-Z0-9!@#$%^&-_*()]{8,}$/;
        return passwordRegex.test(password);
    }

    return (
        <div className={classes.add__container}>
            
            <div className={classes.add__left}>
                <Card>
                    <p>Preview Changes</p>

                    <div className={`${classes.upload_circle_temp}`}>
                        <Icon icon="akar-icons:cloud-upload" />
                        
                        <img 
                            className={classes.pic}
                            //@ts-ignore
                            src={imageUrl ? URL.createObjectURL(imageUrl): ""}  
                            alt="" 
                        />
                    </div>
                    
                    <div className={classes.card__info}>
                    <div>
                        <div className={classes.title}>Name of Parish</div>
                        <div className={classes.value}>
                            {parishName ? parishName : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Name of Pastor</div>
                        <div className={classes.value}>
                            {pastorName ? pastorName : 'Undefined'}    
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Email Address</div>
                        <div className={classes.value}>
                            {email ? email : 'Undefined'}
                        </div>
                    </div>
                    <div>
                        <div className={classes.title}>Parish Phone Number</div>
                        <div className={classes.value}>
                            {parishPhoneNumber ? parishPhoneNumber : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Country</div>
                        <div className={classes.value}>
                            {country ? country : 'Undefined'}
                        </div>
                    </div>

                    {isNigeria && (   
                        <div>
                            <div className={classes.title}>State</div>
                            <div className={classes.value}>
                                {state ? state : 'Undefined'}
                            </div>
                        </div>
                    )}

                    <div>
                        <div className={classes.title}>City</div>
                        <div className={classes.value}>
                            {city ? city : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Password</div>
                        <div className={classes.value}>
                            {password ? password : 'Undefined'}
                        </div>
                    </div>
                    <div>
                        <div className={classes.title}>Confirm Password</div>
                        <div className={classes.value}>
                            {confirmPassword ? confirmPassword : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Parish Address</div>
                        <div className={classes.value}>
                            {parishAddress ? parishAddress : 'Undefined'}
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
                                //@ts-ignore
                                src={imageUrl ? URL.createObjectURL(imageUrl): ""}
                                alt=""
                            />
                        </div>
                        {/* input fileds */}
                        <form
                            onSubmit={(e)=> {
                                e.preventDefault();
                                handleSubmit()
                            }}
                        >

                        <div className={classes.form__control}>
                            <label htmlFor="Name">Name of Parish</label>
                            <input
                                id="Name of Parish"
                                type='text'
                                placeholder='Enter parish name'
                                value={parishName}
                                onChange={parisshNameHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Name">Name of Pastor</label>
                            <input
                                id="Name of Pastor"
                                type='text'
                                placeholder='Enter Pastor name'
                                value={pastorName}
                                onChange={pastorNameHandler}
                            />
                        </div>

                        {/* the value of this category is going to be based on dynamicity */}
                        <div className={classes.form__control}>
                            <label htmlFor="Category">Church</label>
                                <select
                                    value={selectedItem}
                                    onChange={handleSelect}
                                    style={{
                                        padding: '1rem 1.5rem',
                                        border: '1px solid gainsboro',
                                        outline: 'gray',
                                        textTransform: 'capitalize',
                                        backgroundColor: 'transparent',
                                        borderRadius: '10px',
                                        minWidth: '300px',
                                        boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.05)',
                                        //@ts-ignore
                                        '@media screen and (max-width: 300px)': {
                                        minWidth: 'auto',
                                    },
                                }}
                                >
                                    <option value={''}>Select Value</option>
                                    {data.map((item)=>(
                                        <option key={item.churchId} value={item.churchId}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Pastor">Email Address</label>
                            <input
                                id="Email Address"
                                type='text'
                                placeholder='Enter email address '
                                value={email}
                                onChange={emailHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Contact">Parish Phone Number</label>
                            <input
                                id="Parish Phone Number"
                                type='number'
                                placeholder='Enter church contact info '
                                value={parishPhoneNumber}
                                onChange={ParishPhoneNumberHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Contact">Country</label>
                            <input
                                id="Country"
                                type='text'
                                placeholder='Enter your Country'
                                value={country}
                                onChange={countryHandler}
                            />
                        </div>
                        {/* if the value of country is Nigeria then show input else, hide state input */}
                        {isNigeria && (
                            <div className={classes.form__control}>
                                <label htmlFor="Contact">State</label>

                                <select
                                    value={selectedItem}
                                    onChange={handleSelect}
                                    style={{
                                        padding: '1rem 1.5rem',
                                        border: '1px solid gainsboro',
                                        outline: 'gray',
                                        textTransform: 'capitalize',
                                        backgroundColor: 'transparent',
                                        borderRadius: '10px',
                                        minWidth: '300px',
                                        boxShadow: '0 0 12px 0 rgba(0, 0, 0, 0.05)',
                                        //@ts-ignore
                                        '@media screen and (max-width: 300px)': {
                                        minWidth: 'auto',
                                    },
                                }}
                                >
                                    <option value={''}>Select Value</option>
                                    {/* {stateData.map((item)=>(
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))} */}
                                    {/* setting this tempoarilyy because i am getting a 405 method not allowed */}
                                        <option  value={"Lagos"}>
                                            {"Lagos"}
                                        </option>
                                </select>
                                
                                {/* <input
                                    id="State"
                                    type='text'
                                    placeholder='Enter your state'
                                    value={state}
                                    onChange={stateHandler}
                                /> */}
                            </div>
                        )}
                        
                        <div className={classes.form__control}>
                            <label htmlFor="Contact">City</label>
                            <input
                                id="City"
                                type='text'
                                placeholder='Enter your City'
                                value={city}
                                onChange={cityHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Contact">Password</label>
                            <input
                                id="Password"
                                type='password'
                                placeholder='Enter your password'
                                value={password}
                                onChange={passwordHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Contact">Confirm Password</label>
                            <input
                                id="Confirm Password"
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={confirmPasswordHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Contact">Address</label>
                            <input
                                id="Address"
                                type='text'
                                placeholder='Enter your parish Address'
                                value={parishAddress}
                                onChange={ParishAddressHandler}
                            />
                        </div>

                        <div className={classes.btn__wrapper}>    
                        <Button type="submit">
                            Upload
                        </Button>
                        </div>

                        </form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ParishAdd