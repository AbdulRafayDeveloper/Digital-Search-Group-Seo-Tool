/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  FaArrowRight
} from "react-icons/fa";
import Button from "./button";
import {
  // CitySelect,
  CountrySelect,
  StateSelect,
  // LanguageSelect,
} from "react-country-state-city";
import "./../../../node_modules/react-country-state-city/dist/react-country-state-city.css";

const KeyWordGenerator = () => {
  // Values for Api: selectedSector,selectedBussinessDiscipline, selectedServices,name,email,website,country,state,radius,zipCode
  const [countryid, setCountryid] = useState(0);
  // const [stateid, setstateid] = useState(0);
  // states for backend data //
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");

  const [bussinessDisciplines, setBussinessDisciplines] = useState([]);
  const [selectedBussinessDiscipline, setSelectedBussinessDiscipline] = useState("");

  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [radius, setRadius] = useState("");
  const [keywordsArray, setKeywordsArray] = useState([]);

  // SaveData Api Call
  const SaveData = async (e) => {
    e.preventDefault();

    if (website) {
      const websitePattern = /^(ftp|http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/;
      const isValid = websitePattern.test(website); // Validate website
      console.log("isValid: ", isValid);
      if (!isValid) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Website URL Pattern Must be correct",
        });
        return;
      }
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer/addCustomer`, {
        sector: selectedSector,
        bussinessDiscipline: selectedBussinessDiscipline,
        services: selectedServices,
        name: name,
        email: email,
        website: website,
        country: country,
        state: state,
        radius: radius,
        zipCode: zipCode,
        keywords: keywordsArray
      });

      if (response.data.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data.message,
        });

        window.location.href = "/";
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message,
        });

        if (
          response.data.status === 400 &&
          response.data.message === 'This sector already exists'
        ) {
          window.location.href = "/";
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data.message : 'An error occurred',
      });
    }
  };

  // states for backend data //
  const [showSelectedServices, setShowSelectedServices] = useState(false);

  // Add state to manage the notification for invalid input
  const [invalidRadiusInput, setInvalidRadiusInput] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showStepMap, setShowStepMap] = useState(true);
  const [showLocationInputs, setShowLocationInputs] = useState(false); // Added state for showing location inputs

  const steps = [
    {},
    { name: "Name", value: name, setValue: setName },
    { name: "Email", value: email, setValue: setEmail },
    { name: "Website URL", value: website, setValue: setWebsite },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessPopup(false);
      setShowNotification(false);
      setInvalidRadiusInput(false);
    }, 1500);

    return () => clearTimeout(timeout); // Cleanup function to clear the timeout on component unmount
  }, [showSuccessPopup, showNotification, invalidRadiusInput]);

  useEffect(() => {
    if (currentStep !== -1) {
      const filledSteps = [
        name,
        email,
        website,
        country,
        state,
        zipCode,
        radius,
      ].filter((step) => step !== "").length;
      const totalSteps = 7; // Updated total steps count
      setProgress((filledSteps / totalSteps) * 80);
    }
  }, [name, email, website, country, state, zipCode, radius, currentStep]);

  ////////////// Correct Code ////////////////////

  // Function to validate email format and return a Boolean
  // const validateEmail = (email) => {
  //   const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  //   const isValid = emailPattern.test(email);

  //   return isValid;
  // };

  // // Function to handle navigation between steps
  // const handleNextStep = () => {
  //   let isValid = true;

  //   // Ensure previous steps are filled
  //   for (let i = 1; i < currentStep; i++) {
  //     if (steps[i].value.trim() === "") {
  //       isValid = false;
  //       break;
  //     }
  //   }

  //   if (isValid) {
  //     const currentStepValue = steps[currentStep].value;

  //     if (currentStepValue.trim() === "") {
  //       setShowNotification(true);
  //     } else {
  //       // Additional validation
  //       let emailValid = true;

  //       if (currentStep === 2) {
  //         emailValid = validateEmail(currentStepValue);

  //         if (!emailValid) {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Error',
  //             text: 'Invalid email format',
  //           });
  //           return;
  //         }
  //       }

  //       if (emailValid) {
  //         setShowNotification(false);
  //         setCurrentStep(currentStep + 1); // Move to next step
  //       } else {
  //         setShowNotification(true);
  //       }
  //     }
  //   } else {
  //     setShowNotification(true);
  //   }
  // };

  ////////////// Correct Code End ////////////////////

  // Function to validate email format and return a Boolean
  const validateEmail = (email) => {
    const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const isValid = emailPattern.test(email);
    return isValid;
  };

  const handleNextStep = () => {
    console.log("handleNextStep called with currentStep:", currentStep);

    let isValid = true;

    // Ensure previous steps are filled
    for (let i = 1; i <= currentStep; i++) {
      if (steps[i].value.trim() === "") {
        isValid = false;
        console.log("Previous step is empty, breaking loop");
        break;
      }
    }

    if (isValid) {
      const currentStepValue = steps[currentStep].value;

      if (currentStepValue.trim() === "") {
        setShowNotification(true);
        return; // Exit early to avoid incrementing step
      }

      // Validate email if current step is 2
      if (currentStep === 2) {
        if (!validateEmail(currentStepValue)) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid email format',
          });
          return; // Exit early to avoid incrementing step
        }
      }

      // If all validations pass, increment the current step
      setCurrentStep(currentStep + 1); // Move to the next step
      setShowNotification(false); // Hide the notification
    } else {
      setShowNotification(true);
    }
  };

  // Function to handle location input and show location options
  const handleLocation = () => {
    setShowStepMap(false);
    setShowLocationInputs(true);
  };

  // const handleSectorChange = (value) => {
  //   console.log("handleSectorChange", handleSectorChange);
  //   const sector = value;
  //   setShowSelectedServices(false);
  //   setShowLocationInputs(false);
  //   setSelectedBussinessDiscipline(false);
  //   setSelectedSector(sector);
  // };

  const handleSectorChange = (value) => {
    setSelectedSector(value); // Set to the provided value (should be a string)
  };

  const handleBusinessDisciplineChange = (value) => {
    const type = value;
    setSelectedBussinessDiscipline(type);
    setSelectedServices([]);
    setShowSelectedServices(false);
    setShowLocationInputs(false);

    setName("");
    setEmail("");
    setWebsite("");
    setCountry("");
    setState("");
    setZipCode("");
    setRadius("");
    setCurrentStep(-1);
    setShowStepMap(true);
    setProgress(0);
  };

  // Function to handle radius change
  const handleRadiusChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input is a valid number and within the range of -0 to 100
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100) {
      setRadius(inputValue);
      setInvalidRadiusInput(false); // Clear the invalid input notification if input is valid
    } else {
      setRadius(""); // Clear radius if input is not a number or not within range
      setInvalidRadiusInput(true); // Set state to show notification for invalid input
    }
  };

  const handleServiceCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const serviceName = event.target.value;
    if (isChecked) {
      setSelectedServices([...selectedServices, serviceName]);
    } else {
      setSelectedServices(
        selectedServices.filter((service) => service !== serviceName && service !== "" && service !== ",")
      );
    }
    setProgress((selectedServices.length + 1) * 20);
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/sector/listOfSectorsName`)
      .then((result) => {
        const sectorData = result.data.data;
        setSectors(sectorData);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  const getBusinessDisciplines = async (e) => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/sector/listOfBusinessDisciplines/${e}`)
      .then((result) => {
        const sectorData = result.data.data;
        setBussinessDisciplines(sectorData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getServices = async (e) => {
    const bussinessDiscipline = e;

    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/service/ServicesForSelectedBusinessDiscipline`, {
      sectorName: selectedSector,
      bussinessDiscipline: bussinessDiscipline,
    }).then((result) => {
      const servicesData = result.data.data;
      setServices(servicesData);
    })
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckData = async (e) => {
    // // Values for Api: selectedSector,selectedBussinessDiscipline, selectedServices
    // console.log("selectedSector: ", selectedSector)
    // console.log("selectedBussinessDiscipline: ", selectedBussinessDiscipline)
    // console.log("selectedServices: ", selectedServices)
    // console.log("name: ", name)
    // console.log("email: ", email)
    // console.log("website: ", website)
    // console.log("radius: ", radius)
    // console.log("zipCode: ", zipCode)
    // console.log("country: ", country)
    // console.log("state: ", state)
  };

  useEffect(() => {
    if (state) {
      getKeywords(selectedServices, country, state);
    }
  }, [selectedServices,country,state]); // Triggered on state change

  const getKeywords = async (selectedServices, country, state) => {
    const results = [];

    console.log("country: ", country);
    console.log("state: ", state);

    if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
      console.warn("Selected services parameter is undefined or empty.");
      return results;
    }

    const createSlug = (text) => {
      return text.trim().toLowerCase().replace(/\s+/g, '-');
    };

    const generateLink = (text, location) => {
      return `<li><a href="/${createSlug(text)}/" title="${text}">${location}</a></li>`;
    };

    selectedServices.forEach((service) => {
      if (country) {
        results.push({
          keyword: `${country} ${service}`,
          location: country,
          link: generateLink(`${country} ${service}`, country),
        });

        results.push({
          keyword: `${service} ${country}`,
          location: country,
          link: generateLink(`${service} ${country}`, country),
        });

        results.push({
          keyword: `${service} in ${country}`,
          location: country,
          link: generateLink(`${service} in ${country}`, country),
        });
      }

      if (state) {
        results.push({
          keyword: `${state} ${service}`,
          location: state,
          link: generateLink(`${state} ${service}`, state),
        });

        results.push({
          keyword: `${service} ${state}`,
          location: state,
          link: generateLink(`${service} ${state}`, state),
        });

        results.push({
          keyword: `${service} in ${state}`,
          location: state,
          link: generateLink(`${service} in ${state}`, state),
        });
      }
    });

    setKeywordsArray(results);
    return results;
  };

  return (
    <>
      <div className="rounded-lg p-6 w-full md:max-w-4xl">
        {currentStep !== -1 && (
          <div className="flex items-center justify-center mb-2">
            <div className="w-full bg-white rounded-full">
              <div
                className="h-3 bg-gradient-to-r from-yellow-600 to-indigo-600 rounded-full"
                style={{ width: `${progress + 20}%` }}
              ></div>
            </div>
          </div>
        )}
        <h1 className="lg:text-4xl text-3xl  font-bold text-white mb-4">
          Choose Sector
        </h1>
        <select
          className="border border-purple-200 rounded text-gray-700 font-bold bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full mb-4 text-xl"
          value={selectedSector}
          onChange={(e) => {
            getBusinessDisciplines(e.target.value);
            handleSectorChange(e.target.value);
          }}

        >
          <option value="">Select Sector</option>
          {sectors.map((sectorName, index) => (
            <option
              key={index}
              value={sectorName}
              className="text-purple-800 font-semibold"
            >
              {sectorName}
            </option>
          ))}
        </select>

        {selectedSector && (
          <div>
            <h1 className="lg:text-4xl text-3xl  font-bold text-white mb-4">
              Choose Business discipline
            </h1>
            <select
              className="border border-purple-200 rounded text-gray-700 font-bold bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full mb-4 text-xl"
              value={selectedBussinessDiscipline}
              onChange={(e) => {
                handleBusinessDisciplineChange(e.target.value);
                getServices(e.target.value);
              }}
            >
              <option value="">Select Business discipline</option>
              {bussinessDisciplines && bussinessDisciplines.map((disciplines, index) => (
                <option
                  key={index}
                  value={disciplines}
                  className="text-purple-800 font-semibold"
                >
                  {disciplines}
                </option>
              ))}
            </select>

            {selectedBussinessDiscipline && (
              <div>
                <div className="grid lg:grid-cols-3 grid-cols-2 pt-3 gap-2">
                  {services && services.map((service, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 w-5 h-5"
                        value={service} // Set the value to the individual service
                        checked={selectedServices.includes(service)}
                        onChange={handleServiceCheckboxChange}
                      />
                      <span className="text-[#c0ba64] font-semibold text-xl">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  className="text-white justify-end flex bg-gradient-to-r from-[#8253ff] to-[#6a98ff]  hover:to-[#6d4bd6] focus:ring-4 focus:ring-opacity-0 focus:outline-none outline-none border-none shadow-lg hover:shadow-purple-300/40 dark:shadow-lg font-medium rounded-bl-xl rounded-tr-xl text-lg px-5 py-3 text-center items-center my-3"
                  onClick={() => {
                    setShowSelectedServices(true);
                    setName("");
                    setCurrentStep(1);
                  }}
                >
                  Select Service Types
                  <FaArrowRight className="inline-block ml-2" />
                </button>
              </div>
            )}

            {showSelectedServices && selectedServices.length > 0 && (
              <div>
                <h2 className=" text-3xl  font-bold text-white mt-4">
                  Selected Services
                </h2>
                <ul className="list-disc list-inside grid lg:grid-cols-3 grid-cols-2 gap-3">
                  {selectedServices.map((service, index) => (
                    <li
                      key={index}
                      className="text-[#c0ba64] font-semibold text-xl pt-3"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {showStepMap &&
          steps.map((step, index) => (
            <div key={index} className={currentStep === index ? "" : "hidden"}>
              <h2 className="md:text-3xl text-2xl font-serif font-bold text-white my-3">
                {step.name}
              </h2>
              <input
                type="text"
                required
                className="border border-purple-200 rounded bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full mb-3"
                placeholder={`Enter your ${step.name}`}
                value={step.value}
                onChange={(e) => { step.setValue(e.target.value); CheckData(); }}
              />

              {index === steps.length - 1 ? (
                <Button name="Set Location" onClick={handleLocation} />
              ) : (
                <Button name="Next" onClick={handleNextStep} />
              )}
            </div>
          ))}

        {showLocationInputs && (
          <>
            <h2 className="md:text-3xl text-2xl font-serif font-bold text-white my-3">
              Location
            </h2>
            <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 my-4 ">
              <CountrySelect
                className="rounded text-gray-700 font-bold bg-white px-3 py-2 w-full mb-4 text-xl"
                placeHolder="Select Country"
                onChange={(e) => {
                  setCountryid(e.id);
                  setCountry(e.name);
                }}
                value={country}
              />
              <StateSelect
                className="rounded text-gray-700 font-bold bg-white px-3 py-2 w-full mb-4 text-xl"
                countryid={countryid}
                value={state}
                placeHolder="Select State"
                onChange={(e) => { setState(e.name); CheckData(); }}
              />
            </div>
            <div className="flex w-full max-md:flex-col max-md:gap-3 gap-5">
              <div className="w-full">
                <h2 className="xl:text-3xl max-xsm:text-[24px]  text-2xl font-serif font-bold text-white my-3">
                  Enter Area You Cover ({radius} miles)
                </h2>
                <div className="relative mb-6">
                  <input
                    id="labels-range-input"
                    type="range"
                    min={0}
                    max={100}
                    value={radius}
                    onChange={handleRadiusChange}
                    className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span className="text-sm text-yellow-500 dark:text-yellow-400 absolute start-0 -bottom-6">
                    0 miles
                  </span>
                  <span className="text-sm text-yellow-500 dark:text-yellow-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    30 miles
                  </span>
                  <span className="text-sm text-yellow-500 dark:text-yellow-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    65 miles
                  </span>
                  <span className="text-sm text-yellow-500 dark:text-yellow-400 absolute end-0 -bottom-6">
                    100 miles
                  </span>
                </div>
              </div>
              <span className="w-fit max-md:w-full">
                <h2 className="md:text-3xl text-2xl font-serif font-bold text-white my-3">
                  Zip Code{" "}
                </h2>
                <input
                  type="text"
                  className="border border-purple-200 rounded bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full mb-4 text-xl"
                  placeholder="Enter Zip Code"
                  value={zipCode}
                  onChange={(e) => { setZipCode(e.target.value); CheckData() }}
                />
              </span>
            </div>
            <div className="flex flex-row space-x-4">
              <Button type="submit" name="Submit" className="inline-flex" onClick={SaveData}>Submit</Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default KeyWordGenerator;