import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditChurch from "../components/edit/EditChurch";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

const ChurchEdit = () => {
  const params = useParams();
  const { onboardingId } = params;
  console.log(onboardingId);

  // State to store the fetched data and loading state
  const [churchInfo, setChurchInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from the API
  //@ts-ignore
  async function fetchParishDetailsById(id) {
    try {
      const response = await fetch(
        `http://projectcaas.ng/api/Parish/GetParishById?id=${id}`
      );
      if (!response.ok) {
        console.log("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useEffect(() => {
    // Fetch the data when the component mounts
    fetchParishDetailsById(onboardingId).then((data) => {
      if (data) {
        // Update the state with the fetched data and set loading to false
        setChurchInfo(data);
        setLoading(false);
      } else {
        console.log("Failed to fetch data.");
        setLoading(false); // Set loading to false even if the API call fails
      }
    });
  }, [onboardingId]);

  return (
    <section>
      {/* <h2 className="title">Edit {churchInfo ? churchInfo.name : ""}</h2> */}
      <h2 className="title">Edit</h2>
      {loading ? (
        // Render the LoaderSpinner when loading is true
        <LoadingSpinner />
      ) : (
        // Render EditChurch when loading is false and churchInfo is available
        churchInfo && <EditChurch datas={churchInfo} />
      )}
    </section>
  );
};

export default ChurchEdit;
