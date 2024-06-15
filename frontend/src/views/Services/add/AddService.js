/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { TagsInput } from 'react-tag-input-component';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInputGroup,
    CRow
} from '@coreui/react';

const AddService = () => {
    const { id } = useParams();
    const [sectorName, setSectorName] = useState("");
    const [bussinessDisciplines, setBussinessDisciplines] = useState([]);
    const [selectedBussinessDiscipline, setselectedBussinessDiscipline] = useState("");
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/sector/getSector/${id}`)
            .then((result) => {
                const Data = result.data.data;
                setSectorName(Data.name);
                setBussinessDisciplines(Data.bussinessDisciplines);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!selectedBussinessDiscipline.length > 0 || !services.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields required',
            });
            return;
        }

        console.log("selectedBussinessDiscipline",selectedBussinessDiscipline);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/service/addService`, {
                sectorId: id,
                sectorName: sectorName,
                bussinessDiscipline: selectedBussinessDiscipline,
                services: services
            });

            if (response.data.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                });

                navigate('/services/list');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message,
                });

                if (
                    response.data.status === 400 &&
                    response.data.message === 'Services of this sector and discipline already exist'
                ) {
                    navigate('/services/list');
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

    return (
        <>
            <div className="bg-light my-3 d-flex flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol xs={12} lg={8} md={10}>
                            <CCardGroup>
                                <CCard className="p-4">
                                    <CCardBody>
                                        <CForm onSubmit={handleSubmit} className='grid gap-2'>
                                            <h2 className='text-3xl font-bold text-[#4B0082]'>Add Services for Sector( <span className="text-[#FF5733]"> {sectorName} </span>)</h2>
                                            <CInputGroup className="mt-7">
                                                <p className='font-bold'>Business Discipline:</p>
                                                <p>You can choose The business discipline for which you want to add the services.</p>
                                                <div className="w-full mt-1">
                                                    <select
                                                        className='w-full border border-1 border-gray-200 rounded-lg h-9'
                                                        onChange={(e) => setselectedBussinessDiscipline(e.target.value)}
                                                        value={selectedBussinessDiscipline} // Make sure to set the value attribute to the selected value
                                                    >
                                                        <option selected>Select your choice</option>
                                                        {bussinessDisciplines.map((discipline, index) => (
                                                            <option key={index} value={discipline}>{discipline}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4 mt-2">
                                                <p className='font-bold'>Add New Services:</p>
                                                <div className="w-full mt-1">
                                                    <TagsInput
                                                        name="services"
                                                        id="services"
                                                        value={services}
                                                        classNames=""
                                                        onChange={(newServices) => setServices(newServices)}
                                                        placeHolder="Add new Services" // Set placeholder to empty string
                                                        autoComplete="services"
                                                    />
                                                </div>
                                            </CInputGroup>
                                            <CRow className="justify-content-center">
                                                <CCol xs={12} sm={6} className='text-white'>
                                                    <CButton
                                                        className="text-center text-xl rounded-full w-48 h-12 bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0082] hover:text-[#4B0082] hover:bg-white"
                                                        type="submit"
                                                    >
                                                        Add Services
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    );
};

export default AddService;
