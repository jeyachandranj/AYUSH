import axios  from 'axios';

const API_URL = 'http://localhost:5000/api/investor/putInvestorData/';

export const putInvestorDetails = async (data) => {
    let a=JSON.parse(localStorage.getItem('user'));
    let d=JSON.parse(localStorage.getItem('data'));
    console.log(data);
    const response = await axios.post(`${API_URL}`,
        {
            step:data.step,
            data:{...data,userId:d._id}
        },
        {
            headers: {
                'x-auth-token':`${a?.token}`
            }
        }
    );
    console.log(response);
    return response.data;
};
/*
export const getStep = async () => {
    let a=JSON.parse(localStorage.getItem('user'));
    //console.log(a);
    const response = await axios.get(`${API_URL}/`,
        {
            headers: {
                'x-auth-token':`${a.token}`
            }
        }
    );

    console.log(response);
    return response.data;
};
*/