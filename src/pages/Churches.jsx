import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomTable from "../components/tables/customTable/CustomTable";
import { parishHeader } from "../constants/tables";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

const url = "http://projectcaas.ng/api/Parish/GetAllParish";

function Churches() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
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
          setError("Network Error"); // Network error
          setStatus("error");
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Fetching Error"); // Fetching error
          setStatus("error");
        }
      });
  }, []);

  let customerTable;

  if (status === "loading") {
    customerTable = <LoadingSpinner />;
  }

  if (status === "error") {
    customerTable = (
      <p>{error}</p>
    );
  }

  if (status === "fetched" && data) {
    customerTable = (
      <CustomTable dataType="regular" limit={10} headData={parishHeader} bodyData={data} />
    );
  }

  return (
    <section className='church'>
      <div className="flex">
        <h2 className="title">Onboarding</h2>
        <div className="btn__container">
          <Link to={'/onboarding/addchurch'}>
            <button>
              <Icon icon="material-symbols:add-circle-rounded" className='icon'/>
              Add Church
            </button>
          </Link>
          <Link to={'/onboarding/addparish'}>
            <button>
              <Icon icon="material-symbols:add-circle-rounded" className='icon'/>
              Add Parish
            </button>
          </Link>
        </div>
      </div>
      {customerTable}
    </section>
  );
}

export default Churches;
