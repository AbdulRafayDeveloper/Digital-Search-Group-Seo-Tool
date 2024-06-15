/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faSearch } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';

// Modal Styles
const customStyles = {
    content: {
        top: '55%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
        backgroundColor: 'white',
        zIndex: 1000,
        width: '600px',  // Fixed width
        height: '440px',  // Fixed height
        overflowY: 'auto',  // Allows scrolling if content overflows
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 999,
    },
};

Modal.setAppElement('#root');

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [filteredCustomer, setfilteredCustomer] = useState([]); // Initialize with an empty array
    const perPage = 5;
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (customer) => {
        setSelectedCustomer(customer);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomer(null);
    };

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer/listOfCustomers`);
            if (Array.isArray(response.data.data)) {
                setCustomers(response.data.data);
                setfilteredCustomer(response.data.data);
            } else {
                console.error("API response is not an array:", response.data.data);
            }
        } catch (error) {
            console.error("API error:", error);
        }
    };
    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();

        if (searchText.trim() === '') {
            setfilteredCustomer(customers); // Reset filtered data to all data
        } else {
            const filteredData = customers.filter((item) =>
                Object.values(item).some((value) =>
                    String(value).toLowerCase().includes(searchText)
                )
            );
            setfilteredCustomer(filteredData);
        }

        setCurrentPage(0);
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // Calculate the start and end index for the current page
    const startIndex = currentPage * perPage;
    const endIndex = startIndex + perPage;

    // Slice the category array to display items for the current page
    // const displayedCategory = category.slice(startIndex, endIndex);
    const displayedCustomers = filteredCustomer.slice(startIndex, endIndex)

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this customer permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API_BASE_URL}/customer/deleteCustomer/${id}`)
                    .then((response) => {

                        if (response.status === 200) {
                            // Update the subscription list without refreshing
                            setCustomers((prevCustomers) => prevCustomers.filter((element) => element._id !== id))
                            setfilteredCustomer((prevCustomers) => prevCustomers.filter((element) => element._id !== id));
                        } else {
                            Swal.fire('Error!', 'Customer deletion failed.', 'error');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire('Error!', 'Customer deletion failed.', 'error');
                    });
            }
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <h2 className="text-2xl font-semibold text-[#4B0082]">Customers List</h2>
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
                            <th className="text-center" style={{ width: "5%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Sr#</th>
                            <th className="text-center" style={{ width: "15%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Email</th>
                            <th className="text-center" style={{ width: "15%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Country</th>
                            <th className="text-center" style={{ width: "15%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Website</th>
                            <th className="text-center" style={{ width: "15%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Sector</th>
                            <th className="text-center" style={{ width: "20%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Discipline</th>
                            <th className="text-center" style={{ width: "15%", color: "white", backgroundColor: "#4B0082", transition: 'background-color 0.3s, color 0.3s' }} onMouseEnter={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#4B0082'; }} onMouseLeave={(e) => { e.target.style.backgroundColor = '#4B0082'; e.target.style.color = 'white'; }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedCustomers && displayedCustomers.map((element, index) => (
                            <tr key={element._id}>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center">
                                    {element.customerEmail}
                                </td>
                                <td className="text-center">
                                    {element.country}
                                </td>
                                <td className="text-center">
                                    {element.website}
                                </td>
                                <td className="text-center">
                                    {element.sector}
                                </td>
                                <td className="text-center">
                                    {element.bussinessDiscipline}
                                </td>
                                {/* <td className="text-center">
                                    {element.services.map((service, serviceIndex) => (
                                        <span key={serviceIndex} className="badge me-1" style={{ backgroundColor: "#B22222" }}>
                                            {service}
                                        </span>
                                    ))}
                                </td> */}
                                <td className="text-center">
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        onClick={() => openModal(element)}
                                        className="cursor-pointer text-orange-400 text-lg mx-1"
                                    />
                                    {/* <Link to={`/services/add/${element._id}`}>
                                        <FontAwesomeIcon icon={faWrench} className="cursor-pointer text-blue-500 text-lg mx-1" />
                                    </Link> */}
                                    <Link to={`/customer/keywords/list/${element._id}`}>
                                        <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-green-500 text-lg mx-1" />
                                    </Link>
                                    <span
                                        onClick={() => handleDelete(element._id)}>
                                        <FontAwesomeIcon icon={faTrash} className="cursor-pointer text-red-600 text-lg mx-1" />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Customer Details"
                >
                    {selectedCustomer && (
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-center">Customer Details</h3>
                            <table className="w-full border-collapse border border-slate-900">
                                <tbody>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Sector:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.sector}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Business Discipline:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.bussinessDiscipline}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Services:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.services.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Customer Name:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.customerName}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Customer Email:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.customerEmail}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Website:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.website}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Country:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.country}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>State:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.state}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Radius in meters:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.radius}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Zip Code:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.zipCode}</td>
                                    </tr>
                                    <tr>
                                        <td className='border border-2 border-slate-900'><b>Date Created:</b></td>
                                        <td className='border border-2 border-slate-900'>{selectedCustomer.dateCreated}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={closeModal} className="mt-3 p-2 bg-red-500 text-white rounded">
                                Close
                            </button>
                        </div>
                    )}
                </Modal>

            </div>
            <div className="text-center">
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(customers.length / perPage)}
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

export default CustomersList;