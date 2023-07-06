import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import Sidebar from "../sidebar/Sidebar";
import user from "../../assets/images/user/user-1.jpg";
import user1 from "../../assets/user.png";
import {
  useAddProfileImageMutation,
  useGetProfileImageQuery,
  useGetProfileQuery,
  useGetQRCodeQuery,
  useGetNotificationQuery,
} from "../../services/signUpApi";
import ProfileDetails from "./profiledetails/ProfileDetails";
import StudentNotification from "../studentNotification/StudentNotification";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [UID, setUID] = useState("");
  const [name, setName] = useState("");
  const [qRCode, setQRCode] = useState("");
  const [value, setValue] = useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isSuccess } = useGetProfileQuery();
  // console.log(data);

  useEffect(() => {
    if (data && isSuccess) {
      setUID(data.UID);
      setName(data.name);
    }
  }, [data, isSuccess]);

  const { data: userData, isSuccess: userIsSuccess } = useGetQRCodeQuery();
  const [addProfileImage] = useAddProfileImageMutation();

  // console.log(userData[0].qRCode)
  useEffect(() => {
    if (userData && userIsSuccess) {
      setQRCode(userData[0].qRCode);
    }
  }, [userData, userIsSuccess]);

  const handleProfileChange = async (event) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", event.target.files[0]);

      const res = await addProfileImage(formData);
      console.log(res);
      alert("Profile Image added successfully !");
    } catch (error) {
      console.log(error);
    }
  };

  const { data: profileData, isSuccess: profileIsSuccess } =
    useGetProfileImageQuery();
  console.log("image", profileData);

  useEffect(() => {
    if (profileData && profileIsSuccess && profileData.length > 0) {
      const firstProfileImage = profileData[0]?.profileImage;
      if (firstProfileImage) {
        setProfileImage(firstProfileImage);
      }
    }
  }, [profileData, profileIsSuccess]);
  console.log(profileImage);

  console.log(qRCode);

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("fileInput").click();
  };
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <>
      <Sidebar />
      <div
        className="flex flex-col justify-between min-h-screen"
        style={{ marginLeft: "248px" }}
      >
        <div>
          {/* <!-- BEGIN: Header --> */}
          {/* <!-- BEGIN: Header --> */}
          <div className="z-[9]" id="app_header">
            <div className="app-header z-[999] bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-700">
              <div className="flex justify-between items-center h-full">
                <div className="flex items-center md:space-x-4 space-x-4 rtl:space-x-reverse vertical-box">
                  <a
                    href="#"
                    className="mobile-logo xl:hidden inline-block"
                  ></a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden xl:hidden md:inline-block">
                    {/* <iconify-icon
                      className="leading-none bg-transparent relative text-xl top-[2px] text-slate-900 dark:text-white"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon> */}
                    {/* <MenuIcon /> */}
                  </button>
                  <button className="sidebarOpenButton text-xl text-slate-900 dark:text-white !ml-0 hidden rtl:rotate-180">
                    <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
                  </button>
                  <button
                    className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <SearchIcon />
                    <span className="xl:inline-block hidden">Search...</span>
                  </button>
                </div>
                {/* <!-- end vertcial --> */}
                <div className="items-center space-x-4 rtl:space-x-reverse horizental-box">
                  <a href="index.html" className="leading-0">
                    <span className="xl:inline-block hidden">
                      <img
                        src="assets/images/logo/logo.svg"
                        className="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-white.svg"
                        className="white_logo"
                        alt="logo"
                      />
                    </span>
                    <span className="xl:hidden inline-block">
                      <img
                        src="assets/images/logo/logo-c.svg"
                        className="black_logo "
                        alt="logo"
                      />
                      <img
                        src="assets/images/logo/logo-c-white.svg"
                        className="white_logo "
                        alt="logo"
                      />
                    </span>
                  </a>
                  <button className="smallDeviceMenuController open-sdiebar-controller hidden md:inline-block xl:hidden">
                    <iconify-icon
                      className="leading-none bg-transparent relative text-xl top-[2px] text-slate-900 dark:text-white"
                      icon="heroicons-outline:menu-alt-3"
                    ></iconify-icon>
                  </button>
                  <button
                    className="items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 focus:outline-none focus:shadow-none px-1 space-x-3
        rtl:space-x-reverse search-modal inline-flex xl:hidden"
                    data-bs-toggle="modal"
                    data-bs-target="#searchModal"
                  >
                    <SearchIcon />
                    <span className="xl:inline-block hidden">Search...</span>
                  </button>
                </div>
                {/* <!-- end horizental --> */}

                {/* <!-- end top menu --> */}
                <StudentNotification />
                {/* <!-- end nav tools --> */}
              </div>
            </div>
          </div>

          {/* <!-- BEGIN: Search Modal --> */}
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto inset-0 bg-slate-900/40 backdrop-filter backdrop-blur-sm backdrop-brightness-10"
            id="searchModal"
            tabIndex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none top-1/4">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white dark:bg-slate-900 bg-clip-padding rounded-md outline-none text-current">
                <form>
                  <div className="relative">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-full text-xl dark:text-slate-300 flex items-center justify-center">
                      <SearchIcon />
                    </button>
                    <input
                      type="text"
                      className="form-control !py-[14px] !pl-10"
                      placeholder="Search"
                      autoFocus
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <!-- END: Search Modal --> */}
          {/* <!-- END: Header --> */}
          {/* <!-- END: Header --> */}
          <div
            className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px]"
            id="content_wrapper"
            style={{ backgroundColor: "#F1F5F9" }}
          >
            <div className="page-content">
              <div id="content_layout">
                <div className="space-y-5 profile-page">
                  <div
                    className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0
                space-y-6 justify-between items-end relative z-[1]"
                  >
                    <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg flex justify-end">
                      <img
                        src={qRCode}
                        alt="qrCode-image"
                        className="bg-white"
                        style={{
                          margin: "30px",
                        }}
                      />
                    </div>

                    <div className="profile-box flex-none md:text-start text-center">
                      <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                        <div className="flex-none">
                          <div
                            className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4
                                ring-slate-100 relative"
                          >
                            <img
                              src={user}
                              alt="profile-image"
                              className="w-full h-full object-cover rounded-full"
                            />
                            <input
                              type="file"
                              id="fileInput"
                              accept="image/*"
                              style={{ display: "none" }}
                              onChange={handleProfileChange}
                            />
                            <p
                              className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center
                                    justify-center md:top-[140px] top-[100px]"
                              onClick={handleImageSubmit}
                            >
                              {/* <iconify-icon icon="heroicons:pencil-square"></iconify-icon> */}
                              <CreateRoundedIcon />
                            </p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                            {name}
                          </div>
                          <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                            Front End Developer
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end profile box --> */}
                    <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                      <div className="flex-1 ">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 ">
                          Current Course
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300 ">
                          B.tech
                        </div>
                      </div>
                      {/* <!-- end single --> */}
                      <div className="flex-1">
                        <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                          UID
                        </div>
                        <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                          {UID}
                        </div>
                      </div>
                    </div>

                    {/* <img src={qrCode} alt="qrCode-image" style={{width:'100px' ,height:'100px',marginTop:'auto'}} /> */}
                    {/* <!-- profile info-500 --> */}
                  </div>
                  {/* <div className="grid grid-cols-12 gap-6">
                    <div className="lg:col-span-4 col-span-12">
                      <div className="card h-full">
                        <header className="card-header">
                          <h4 className="card-title">Info</h4>
                        </header>
                        <div className="card-body p-6">
                          <ul className="list space-y-8">
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:envelope"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  EMAIL
                                </div>
                                <a
                                  href="mailto:someone@example.com"
                                  className="text-base text-slate-600 dark:text-slate-50"
                                >
                                  info-{email}
                                </a>
                              </div>
                            </li>
                      
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:phone-arrow-up-right"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  PHONE
                                </div>
                                <a
                                  href="#"
                                  className="text-base text-slate-600 dark:text-slate-50"
                                >
                                  +91{mobileNumber}
                                </a>
                              </div>
                            </li>
                    
                            <li className="flex space-x-3 rtl:space-x-reverse">
                              <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                <iconify-icon icon="heroicons:map"></iconify-icon>
                              </div>
                              <div className="flex-1">
                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                  LOCATION
                                </div>
                                <div className="text-base text-slate-600 dark:text-slate-50">
                                  #K-60, GF, RHS, JUNGPURA EXT.,
                                  <br />
                                  NEW DELHI - 110014
                                </div>
                              </div>
                            </li>
                         
                          </ul>
                        </div>
                      </div>
                    </div>
                 
                  </div> */}
                </div>
                {/* <div
                  class="content-wrapper transition-all duration-150 xl:ltr:ml-[248px]"
                  id="content_wrapper"
                  style={{ backgroundColor: "#F1F5F9" }}
                >
                  <div class="page-content">
                    <div id="content_layout">
                   
                    </div>
                  </div>
                </div> */}
                {/* form Start */}
                <div className="card xl:col-span-2 mt-5">
                  <div className="card-body flex flex-col p-6">
                    {/* <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                      <div className="flex-1">
                        <div className="card-title text-slate-900 dark:text-white">
                          Profile
                        </div>
                      </div>
                    </header> */}
                    <div>
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            aria-label="scrollable auto tabs example"
                            sx={{
                              "& .MuiTabs-indicator": {
                                bgcolor:
                                  value === 0
                                    ? "#EC6E46"
                                    : value === 1
                                    ? "#EC6E46"
                                    : value === 2
                                    ? "#EC6E46"
                                    : "#000",
                              },
                            }}
                          >
                            <Tab
                              label="Info"
                              style={{
                                color: value === 0 ? "#EC6E46" : "#000",
                              }}
                            />
                            <Tab
                              label="Profile Details"
                              style={{
                                color: value === 1 ? "#EC6E46" : "#000",
                              }}
                            />
                          </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}></TabPanel>
                        <TabPanel value={value} index={1}>
                          <ProfileDetails />
                        </TabPanel>
                      </>
                    </div>
                  </div>
                </div>
                {/* Form End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
