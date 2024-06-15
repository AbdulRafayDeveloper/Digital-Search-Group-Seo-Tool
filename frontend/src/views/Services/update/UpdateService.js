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

const UpdateService = () => {
    const { id } = useParams();
    const [sectorName, setSectorName] = useState("");
    const [selectedBussinessDiscipline, setselectedBussinessDiscipline] = useState("");
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/service/getService/${id}`)
            .then((result) => {
                const Data = result.data.data;
                setSectorName(Data.sectorName);
                setselectedBussinessDiscipline(Data.bussinessDiscipline);
                setServices(Data.services);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Frontend validation
        if (!services.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields required',
            });
            return;
        }

        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/service/updateService/${id}`, {
            sectorId: id,
            sectorName: sectorName,
            bussinessDiscipline: selectedBussinessDiscipline,
            services: services
        })
            .then((response) => {
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
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response ? error.response.data.message : 'An error occurred',
                });
            });
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
                                            <h2 className='text-3xl font-bold text-[#4B0082]'>Update Services for Sector( <span className="text-[#FF5733]"> {sectorName} </span>)</h2>
                                            <p className="text-small-emphasis">Update your services according to your need.</p>
                                            <CInputGroup className="mt-7">
                                                <p className='font-bold'>Business Discipline:<span className="text-[#FF5733]"> {selectedBussinessDiscipline} </span></p>
                                            </CInputGroup>
                                            <CInputGroup className="mb-4 mt-2">
                                                <p className='font-bold'>Update Services:</p>
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
                                                        Update Services
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

export default UpdateService;
