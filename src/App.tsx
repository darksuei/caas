import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";

// importing pages
const Auth = React.lazy(() => import("./pages/Auth"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Churches = React.lazy(() => import("./pages/Churches"));
const Messages = React.lazy(() => import("./pages/Messages"));
const ChurchEdit = React.lazy(() => import("./pages/ChurchEdit"));
const AddChurch = React.lazy(() => import("./pages/AddChurch"));
const Biometrics = React.lazy(() => import("./pages/Biometrics"));
const AddParish = React.lazy(() => import("./pages/AddParish"));
const AddBiometrics = React.lazy(() => import("./pages/AddBiometrics"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ParishView = React.lazy(() => import("./pages/ParishView"));

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Add event listeners for online and offline events
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOfflineStatus);

    // Remove event listeners when the component unmounts
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOfflineStatus);
    };
  }, []);

  const handleOnlineStatus = () => {
    setIsOnline(true);
    notify("Internet connection is back!", "success");
  };

  const handleOfflineStatus = () => {
    setIsOnline(false);
    notify("Internet connection lost!", "error");
  };
  // @ts-ignore
  const notify = (message, type) => {
    toast(message, {
      type: type === "error" ? "error" : "success",
      position: "top-center",
      autoClose: 3000, // Set the duration for the toast message (3 seconds in this example)
    });
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/onboarding" element={<Churches />} />
              <Route path="/onboarding/addchurch" element={<AddChurch />} />
              <Route path="/onboarding/addparish" element={<AddParish />} />
              <Route
                path="/onboarding/edit/:onboardingId"
                element={<ChurchEdit />}
              />
              <Route
                path="/onboarding/view/:onboardingId"
                element={<ParishView />}
              />
              <Route path="/biometrics" element={<Biometrics />} />
              <Route
                path="/biometrics/addbiometrics"
                element={<AddBiometrics />}
              />
              <Route path="/messages" element={<Messages />} />
            </Route>
          </Route>
          <Route path="/login" element={<Auth type={"login"} />} />
          <Route path="/register" element={<Auth type={"register"} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
