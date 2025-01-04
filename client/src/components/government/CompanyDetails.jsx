import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import { Tabs, Tab, Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyDetails = () => {
    const { startupId } = useParams();
    const [loading, setLoading] = useState(true);
    const [companyData, setCompanyData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const data=JSON.parse(localStorage.getItem('data'));
    const verify=data?.role==='authority'?"Recognize":"Verify and Proceed";
    //console.log(data.role)
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            const a = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:5000/api/government/startups/${startupId}`, {
                headers: { 'x-auth-token': a.token },
            });
            setCompanyData(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const verifyCompany = async () => {
        try {
            const a = JSON.parse(localStorage.getItem('user'));
            const response = await axios.patch(`http://localhost:5000/api/government/startups/verify/${startupId}`, {}, {
                headers: { 'x-auth-token': a.token },
            });
            alert(response.data.msg);
            navigate('/government');
        } catch (error) {
            console.error('Verification error:', error);
        }
    };

    const rejectCompany = async () => {
        try {
            const a = JSON.parse(localStorage.getItem('user'));
            const message = prompt("Reason for rejection");
            const response = await axios.patch(`http://localhost:5000/api/government/startups/reject/${startupId}`, { message }, {
                headers: { 'x-auth-token': a.token },
            });
            alert(response.data.msg);
            navigate('/government');
        } catch (error) {
            console.error('Rejection error:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h1 className="display-4 mb-4">Company Details</h1>

                <Tabs defaultActiveKey="info" id="company-details-tabs" className="mb-3">
                    <Tab eventKey="info" title="Company Info">
                        <Card className="mb-4">
                            <Card.Header as="h5">Company Information</Card.Header>
                            <Card.Body>
                                <table className="table table-border table-hover">
                                    <tbody className='p-5'>
                                        <tr>
                                            <th>Name</th>
                                            <td>{companyData.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Type of Entity</th>
                                            <td>{companyData.typeOfEntity}</td>
                                        </tr>
                                        <tr>
                                            <th>Sector</th>
                                            <td>{companyData.sector}</td>
                                        </tr>
                                        <tr>
                                            <th>CIN Number</th>
                                            <td>{companyData.CINNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Pan Card</th>
                                            <td>{companyData.panCard}</td>
                                        </tr>
                                        <tr>
                                            <th>Capital Investment</th>
                                            <td>{companyData.capitalInvestment}</td>
                                        </tr>
                                        <tr>
                                            <th>Progress</th>
                                            <td>{companyData.progress}</td>
                                        </tr>
                                        <tr>
                                            <th>Status</th>
                                            <td>{companyData.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>


                    </Tab>

                    <Tab eventKey="address" title="Address">
                        <Card className="mb-4">
                            <Card.Header as="h5">Address Details</Card.Header>
                            <Card.Body>
                                {companyData.Address.map((address, index) => (
                                    <Card key={index} className="mb-2">
                                        <Card.Body>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th>Address Line</th>
                                                        <td>{address.addressLine}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>State</th>
                                                        <td>{address.state}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>District</th>
                                                        <td>{address.district}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Pincode</th>
                                                        <td>{address.pincode}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab eventKey="people" title="People">
                        <Card className="mb-4">
                            <Card.Header as="h5">Key Personnel</Card.Header>
                            <Card.Body>
                                {companyData.Person.map((person, index) => (
                                    <Card key={index} className="mb-2">
                                        <Card.Body>
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{person.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Designation</th>
                                                        <td>{person.designation}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Mobile</th>
                                                        <td>{person.mobile}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td>{person.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Postal Address</th>
                                                        <td>{person.postalAddress}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Gender</th>
                                                        <td>{person.gender}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab eventKey="details" title="Details">
                        <Card className="mb-4">
                            <Card.Header as="h5">Additional Details</Card.Header>
                            <Card.Body>
                                {companyData.Details.map((detail, index) => (
                                    <Card key={index} className="mb-3 shadow-sm">
                                        <Card.Body>
                                            <table className="table table-borderless mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th className="w-25 text-start">Question</th>
                                                        <td className="text-break">{detail.question}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25 text-start">Answer</th>
                                                        <td className="text-break">{detail.answer}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>

                        </Card>
                    </Tab>

                    <Tab eventKey="documents" title="Documents">
                        <Card className="mb-4">
                            <Card.Header as="h5">Documents</Card.Header>
                            <Card.Body>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>GMP Certificate Number</th>
                                            <td>{companyData.documents.gmpCertificateNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>COPP Certificate Number</th>
                                            <td>{companyData.documents.coppCertificateNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>AYUSH License Certificate Number</th>
                                            <td>{companyData.documents.ayushLicenseCertificateNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Manufacturing License Number</th>
                                            <td>{companyData.documents.manufacturingLicenseNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>Company Incorporation Certificate Number</th>
                                            <td>{companyData.documents.companyIncorporationCertificateNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>GMP Certificate</th>
                                            <td><a href={companyData.documents.gmpCertificate} target="_blank" rel="noopener noreferrer">View Here</a></td>
                                        </tr>
                                        <tr>
                                            <th>COPP Certificate</th>
                                            <td><a href={companyData.documents.coppCertificate} target="_blank" rel="noopener noreferrer">View Here</a></td>
                                        </tr>
                                        <tr>
                                            <th>AYUSH License Certificate</th>
                                            <td><a href={companyData.documents.ayushLicenseCertificate} target="_blank" rel="noopener noreferrer">View Here</a></td>
                                        </tr>
                                        <tr>
                                            <th>Manufacturing License</th>
                                            <td><a href={companyData.documents.manufacturingLicense} target="_blank" rel="noopener noreferrer">View Here</a></td>
                                        </tr>
                                        <tr>
                                            <th>Company Incorporation Number</th>
                                            <td><a href={companyData.documents.companyIncorporationCertificate} target="_blank" rel="noopener noreferrer">View Here</a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    </Tab>

                    <Tab eventKey="bank" title="Bank Details">
                        <Card className="mb-4">
                            <Card.Header as="h5">Bank Information</Card.Header>
                            <Card.Body>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Bank Name</th>
                                            <td>{companyData.bankDetails.bankName}</td>
                                        </tr>
                                        <tr>
                                            <th>Account Number</th>
                                            <td>{companyData.bankDetails.accountNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>IFSC Code</th>
                                            <td>{companyData.bankDetails.ifscCode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    </Tab>
                </Tabs>

                <div className="d-flex justify-content-center mt-4">
                    <Button variant="success" className="mx-2" onClick={verifyCompany}>{verify}</Button>
                    <Button variant="danger" className="mx-2" onClick={rejectCompany}>Reject</Button>
                    <Button variant="secondary" className="mx-2" onClick={() => setShowModal(true)}>Chat</Button>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chat with Startup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Implement chat functionality here */}
                        <p>Chat functionality coming soon...</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default CompanyDetails;

