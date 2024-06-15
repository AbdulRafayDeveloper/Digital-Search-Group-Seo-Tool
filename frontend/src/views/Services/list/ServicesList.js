/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

const ServicesList = () => {
    const [services, setServices] = useState([]);
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const [filteredService, setfilteredService] = useState([]); // Initialize with an empty array
    const perPage = 5; // Number of items per page

    // Fetch images when the component mounts
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/service/listOfServices`);
            if (Array.isArray(response.data.data)) {
                setServices(response.data.data);
                setfilteredService(response.data.data);
            } else {
                console.error("API response is not an array:", response.data.data);
            }
        } catch (error) {
            console.error("API error:", error);
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);

    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();

        if (searchText.trim() === '') {
            setfilteredService(services); // Reset filtered data to all data
        } else {
            const filteredData = services.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchText)
                )
            );
            setfilteredService(filteredData);
        }

        setCurrentPage(0);
    };


    // Function to handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Calculate the start and end index for the current page
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;

    // Slice the images array to display items for the current page
    const displayedServices = filteredService.slice(startIndex, endIndex)

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this record permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            console.log("Id: " + id);
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/service/deleteService/${id}`);
                    if (response.status === 200) {
                        // Remove the deleted sector from the services state
                        const updatedServices = services.filter((element) => element._id !== id);
                        setServices(updatedServices);
                        setServices((prevServices) => prevServices.filter((element) => element._id !== id));
                        setfilteredService((prevFilteredServices) => prevFilteredServices.filter((element) => element._id !== id));
                    } else {
                        Swal.fire('Error!', 'Deletion failed.', 'error');
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire('Error!', 'Deletion failed.', 'error');
                }
            }
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h2 className="text-2xl font-semibold text-[#4B0082]">Services List</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search Results"
                            onChange={handleFilter}
                            className="form-control rounded-pill w-76 h-8"
                        />
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-[#4B0082] text-white">
                            <th className="text-center" style={{ width: "8%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Sr#</th>
                            <th className="text-center" style={{ width: "19%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Sector Name</th>
                            <th className="text-center" style={{ width: "19%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Business Discipline</th>
                            <th className="text-center" style={{ width: "35%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Services</th>
                            <th className="text-center" style={{ width: "19%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedServices.map((element, index) => (
                            <tr key={element._id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">
                                    {element.sectorName}
                                </td>
                                <td className="text-center">
                                    {element.bussinessDiscipline}
                                </td>
                                <td className="text-center">
                                    {element.services.map((service, serviceIndex) => (
                                        <span key={serviceIndex} className="badge me-1" style={{ backgroundColor: "#B22222" }}>
                                            {service}
                                        </span>
                                    ))}
                                </td>
                                <td className="text-center">
                                    <Link to={`/services/update/${element._id}`}>
                                        <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-green-500 text-lg mx-1" />
                                    </Link>
                                    <span
                                        onClick={() => handleDelete(element._id)}>
                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-500 text-lg mx-1" />
                                    </span>
                                    {/* <Link
                                        to={`/service/add${element._id}`}
                                        className="text-center rounded-full px-3 py-1 mx-1 text-white focus:text-white active:text-white bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0081] hover:bg-[#4B0051]"
                                        style={{ color: 'white' }}
                                    >
                                        Select Services
                                    </Link> */}
                                    {/* <Link
                                        to={`/sector/update/${element._id}`}
                                        className="text-center rounded-full px-3 py-1 mx-1 text-white focus:text-white active:text-white bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0081] hover:bg-[#4B0051]"
                                        style={{ color: 'white' }}
                                    >
                                        Update
                                    </Link> */}

                                    {/* <button
                                        onClick={() => handleDelete(element._id)}
                                        className="text-center rounded-full px-3 py-1 mx-1 text-white focus:text-white active:text-white bg-[#4B0082] font-bold hover:border hover:border-2 hover:border-[#4B0081] hover:bg-[#4B0051]"
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-center">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(services.length / perPage)}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination justify-content-center'}
                    activeClassName={'active'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    nextClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                />
            </div>
        </div>
    );
};

export default ServicesList;