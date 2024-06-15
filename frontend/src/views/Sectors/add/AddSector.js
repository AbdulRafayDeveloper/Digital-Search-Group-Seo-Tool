/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    CRow,
} from '@coreui/react';

function AddSector() {
    const [name, setName] = useState([]);
    const [bussinessDisciplines, setBussinessDisciplines] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!name.length > 0 || !bussinessDisciplines.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'All fields required',
            });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('bussinessDisciplines', bussinessDisciplines);

        // console.log("name: ", formData.get('name'));
        // console.log("bussinessDisciplines: ", formData.get('bussinessDisciplines'));

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/sector/addSector`, {
                name: name,
                bussinessDisciplines: bussinessDisciplines
            });

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

                if (
                    response.data.status === 400 &&
                    response.data.message === 'This sector already exists'
                ) {
                    navigate('/sector/list');
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
                                        <CForm onSubmit={handleSubmit} encType="multipart/form-data" className='grid gap-2'>
                                            <h2 className='text-3xl font-bold text-[#4B0082]'>Add New Sector</h2>
                                            <CInputGroup className="mb-3 mt-8 rounded-full">
                                                <CFormInput
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className=''
                                                    placeholder="Sector Name"
                                                    autoComplete="Name"
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-3">
                                                <div className="w-full">
                                                    <TagsInput
                                                        name="bussinessDisciplines"
                                                        id="bussinessDisciplines"
                                                        value={bussinessDisciplines}
                                                        classNames=""
                                                        onChange={(newTags) => setBussinessDisciplines(newTags)}
                                                        placeHolder="Add Business Disciplines" // Set placeholder to empty string
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
                                                        Add Sector
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
}

export default AddSector;