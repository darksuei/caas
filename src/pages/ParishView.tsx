import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditChurch from "../components/view/ViewParish";
import LoadingSpinner from "../components/UI/loadingSpinner/LoadingSpinner";

const ParishView = () => {
  const params = useParams();
  const { onboardingId } = params;

  console.log(onboardingId);

  // State to store the fetched data, loading state, and error state
  const [churchInfo, setChurchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Update the type of error state

  // Function to fetch data from the API
  // @ts-ignore
  async function fetchParishDetailsById(id) {
    try {
      const response = await fetch(
        `http://projectcaas.ng/api/Parish/GetParishById?id=${id}`
      );
      if (!response.ok) {
        setError("Network Error");
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      setError("Fetching Error");
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
        setLoading(false);
        setError("Failed to fetch data.")
      }
    });
  }, [onboardingId]);

  return (
    <section>
      <h2 className="title">View Details</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {error ? (
            <p>Error: {error}</p>
          ) : (
            churchInfo && <EditChurch datas={churchInfo} />
          )}
        </>
      )}
    </section>
  );
};

export default ParishView;
