import React, { useEffect, useState } from 'react';
import Card from '../UI/card/Card';
import Button from '../UI/button/Button';
import { Icon } from '@iconify/react';
import classes from './add.module.scss';
import { images } from '../../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Biometrics {
  parishId: string;
  name: string;
  productName: symbol;

}

const BiometricsAdd = () => {
  const [data, setData] = useState<Biometrics[]>([]);
  const [biometricsName, setBiometricsName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: Biometrics[] }>(
          'http://projectcaas.ng/api/Parish/GetAllParish'
        );
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!biometricsName || !serialNumber || !deviceId || !selectedItem) {  
       // onclick scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.error('Please fill in all the required fields.');
      return;
    }

    setIsLoading(true);

    try {
        // Fetch all existing biometrics
        const getAllBiometricsEndpoint = 'http://projectcaas.ng/api/Biometrics/GetAllBiometrics';
        const existingBiometricsResponse = await axios.get<{ data: Biometrics[] }>(getAllBiometricsEndpoint);
        const existingBiometrics = existingBiometricsResponse.data.data;

        // Check if biometric already exists
        const biometricAlreadyExists = existingBiometrics.some(
        (biometric) =>
            //@ts-ignore
            biometric.productName === biometricsName &&
            //@ts-ignore
            biometric.serialNumber === serialNumber &&
            //@ts-ignore
            biometric.deviceId === deviceId 
            // biometric.parishId === selectedItem
        );

        if (biometricAlreadyExists) {
            toast.error('Biometric already exists.');
            setIsLoading(false);
            // onclick scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

      const requestBody = new FormData();
      requestBody.append('ProductName', biometricsName);
      requestBody.append('SerialNumber', serialNumber);
      requestBody.append('DeviceId', deviceId);
      requestBody.append('ParishId', selectedItem);

      const endpoint = 'http://projectcaas.ng/api/Biometrics/AddBiometrics';
      const response = await axios.post(endpoint, requestBody);
      console.log(response.data);
      setBiometricsName('');
      setSerialNumber('');
      setDeviceId('');
      toast.success('Biometrics added successfully');
        // onclick scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Axios network error
            toast.error('Network error occurred. Please try again later.');
            } else {
            // Non-network error
            //@ts-ignore
            const errMsg = error.response?.data || 'An error occurred';
            toast.error(errMsg);
            //@ts-ignore
            console.error(error.response?.data);
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsLoading(false);
  };

  // Usage:
  const biometricsNameHandler = handleChange(setBiometricsName);
  const serialNumberHandler = handleChange(setSerialNumber);
  const deviceIdHandler = handleChange(setDeviceId);

  return (
    <div className={classes.add__container}>

        <div className={classes.add__left}>
            <Card>
                <p>Preview Changes</p>

                <div className={classes.card__info}>
                    <div>
                        <div className={classes.title}>Name of Parish</div>
                        <div className={classes.value}>
                            {biometricsName ? biometricsName : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Serial Number</div>
                        <div className={classes.value}>
                            {serialNumber ? serialNumber : 'Undefined'}
                        </div>
                    </div>

                    <div>
                        <div className={classes.title}>Device Id</div>
                        <div className={classes.value}>
                            {deviceId ? deviceId : 'Undefined'}
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
                        {/* <div className={classes.upload_icon}>
                            <Icon icon="akar-icons:cloud-upload" />
                        </div> */}
                        <img
                            className={classes.pic}
                            //@ts-ignore
                            src={images.bio}
                            alt=""
                        />
                    </div>

                    {/* input fileds */}
                    <form
                        onSubmit={(e)=> {
                            e.preventDefault();
                            handleSubmit(e)
                        }}
                    >
                        <div className={classes.form__control}>
                            <label htmlFor="Name">Name of Biometrics</label>
                            <input
                                id="Name of Biometrics"
                                type='text'
                                placeholder='Enter biometrics name'
                                value={biometricsName}
                                onChange={biometricsNameHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Name">Serial Number</label>
                            <input
                                id="Serial Number"
                                type='text'
                                placeholder='Enter serial number'
                                value={serialNumber}
                                onChange={serialNumberHandler}
                            />
                        </div>

                        <div className={classes.form__control}>
                            <label htmlFor="Name">Device Id</label>
                            <input
                                id="Device Id"
                                type='text'
                                placeholder='Enter device id'
                                value={deviceId}
                                onChange={deviceIdHandler}
                            />
                        </div>

                        {/* the value of this category is going to be based on dynamicity */}
                        <div className={classes.form__control}>
                            <label htmlFor="Category">Parish</label>
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
                                        <option key={item.parishId} value={item.parishId}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                        </div>

                        <div className={classes.btn__wrapper}>    
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? <img  src={images.loader} alt="loader" /> : "Upload"}
                            </Button>
                        </div>
                    </form>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default BiometricsAdd