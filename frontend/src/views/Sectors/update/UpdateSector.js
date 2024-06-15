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
    CFormInput,
    CInputGroup,
    CRow
} from '@coreui/react';

const UpdateSector = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [bussinessDisciplines, setBussinessDisciplines] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/sector/getSector/${id}`)
            .then((result) => {
                const imageData = result.data.data;
                setName(imageData.name);
                setBussinessDisciplines(imageData.bussinessDisciplines);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Frontend validation
        if (!name.length > 0 || !bussinessDisciplines.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields required',
            });
            return;
        }

        await axios.put(`${process.env.REACT_APP_API_BASE_URL}/sector/updateSector/${id}`, {
            name,
            bussinessDisciplines
        })
            .then((response) => {
                if (response.data.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: response.data.message,
                    });

                    navigate('/sector/list');
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
                                            <h2 className='text-3xl font-bold text-[#4B0082]'>Update Sector</h2>
                                            <p className="text-small-emphasis">Update your sector and business discipline according to your need.</p>
                                            <p className='font-bold mt-6'>Sector Name:</p>
                                            <CInputGroup className="">
                                                <CFormInput
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Sector Name"

                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4 mt-2">
                                                <p className='font-bold'>Business Disciplines:</p>
                                                <div className="w-full mt-1">
                                                    <TagsInput
                                                        name="bussinessDisciplines"
                                                        id="bussinessDisciplines"
                                                        value={bussinessDisciplines}
                                                        classNames=""
                                                        onChange={(newTags) => setBussinessDisciplines(newTags)}
                                                        placeHolder="Update Business Disciplines" // Set placeholder to empty string
                                                        autoComplete="bussinessDisciplines"
                                                    />
                                                </div>
                                            </CInputGroup>
                                            <CRow className="justify-content-center">
                                                <CCol xs={12} sm={6} className='text-white'>
                                                    <CButton
                                                        className="text-center text-xl rounded-full w-48 h-12 bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0082] hover:text-[#4B0082] hover:bg-white"
                                                        type="submit"
                                                    >
                                                        Update Sector
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

export default UpdateSector;
