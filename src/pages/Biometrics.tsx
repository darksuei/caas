import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'
import { biometricsHeader } from "../constants/tables";
import axios from 'axios';
import LoadingSpinner from '../components/UI/loadingSpinner/LoadingSpinner';
import CustomTable from '../components/tables/customTable/CustomTable';


const url = "http://projectcaas.ng/api/Biometrics/GetAllBiometrics"


const AddBiometrics = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setData(response.data.data);
        setStatus("fetched");
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data); // Server error response data
          setStatus("error");
        } else if (error.request) {
          // The request was made but no response was received
          setError("Network error")// Network error
          setStatus("error");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Fetching Error"); // Fetching error
          setStatus("error");
        }
      });
  }, []);

  let biometricsTable;

  if (status === "loading") {
    biometricsTable = <LoadingSpinner />;
  }

  if (status === "error") {
    biometricsTable = (
      <p>{error}</p>
    );
  }
  
  if (status === "fetched" && data) {
    biometricsTable = (
      <CustomTable dataType="biometric" limit={10} headData={biometricsHeader} bodyData={data} />
    );
  }


  return (
    // dont mind the class names i am just replicating from the Churches.tsx 
    <section className='churc2'>
      <div className="flex">
        <h2 className="title">Biometrics</h2>
        <div className="btn__container">
          <Link to={'/biometrics/addbiometrics'}>
            <button className='biometrics'>
              <Icon icon="material-symbols:add-circle-rounded" className='icon'/>
              Add Biometrics
            </button>
          </Link>
        </div>
      </div>
      {biometricsTable}
    </section>
  )
}

export default AddBiometrics