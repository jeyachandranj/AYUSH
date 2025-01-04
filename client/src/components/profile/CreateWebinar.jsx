import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
const CreateWebinar = ({id}) => {
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem("data"));

    // Optional: Add a fallback for when data or data.role is undefined
    const role = data?.role;
   // console.log(role)
    const handleWebinar = async () => {
        const data = JSON.parse(localStorage.getItem('data'));
     //   console.log(data);
            const API_URL = `http://localhost:5000/api/mentor/setWebinar/${id}`;
       //     console.log(`Dharun ${id}`);
            let a = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await axios.post(API_URL, {
                    id:id,
                }, {
                    headers: { 'x-auth-token': `${a?.token}` }
                });
                console.log('API response:', response.data);
            } catch (error) {
                console.error('Error making API request:', error);
            }
        
    }
        return (
            <div className="d-flex justify-content-evenly mt-5">
                {role === "mentor" ? (
                    <>
                        <button
                        onClick={() => navigate("/viewMentorship")}
                        className="btn btn-primary btn-lg shadow-lg"
                        style={{
                            backgroundColor: '#007bff', // Bootstrap primary color
                            borderColor: '#007bff',
                            borderRadius: '50px', // Rounded corners
                            padding: '12px 24px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Explore Mentorship Requests
                    </button>
                    <button
                    onClick={() => navigate("/mentor/meeting")}
                    className="btn btn-primary btn-lg shadow-lg"
                    style={{
                        backgroundColor: '#007bff', // Bootstrap primary color
                        borderColor: '#007bff',
                        borderRadius: '50px', // Rounded corners
                        padding: '12px 24px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Create a Webinar Session
                </button>
                    </>
                ) : (
                    <button
                        onClick={async () => {
                            await handleWebinar();
                            console.log(data._id);
                            navigate(`/mentor/meeting/${data?._id}`)
                        }}
                        className="btn btn-primary btn-lg shadow-lg"
                        style={{
                            backgroundColor: '#007bff', // Bootstrap primary color
                            borderColor: '#007bff',
                            borderRadius: '50px', // Rounded corners
                            padding: '12px 24px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                        Ask for 1:1 Mentoring Session
                    </button>
                )}
            </div>
        );
    };

    export default CreateWebinar;
