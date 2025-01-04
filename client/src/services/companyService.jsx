import axios  from 'axios';

const API_URL = 'http://localhost:5000/api';

export const postCompanyDetails = async (companyData) => {
    let a=JSON.parse(localStorage.getItem('user'));
    console.log(a.token);
    const response = await axios.post(`${API_URL}/startups/step1`, companyData,
        {
            headers: {
                'x-auth-token':`${a.token}`
            }
        }
    );
    console.log(response);
    return response.data;
};
export const postBankDetails = async (companyData) => {
    let a=JSON.parse(localStorage.getItem('user'));
    const {ifscCode,bankName,accountNumber} = companyData;
    console.log(companyData);
    const response = await axios.post(`${API_URL}/startups/step3`,{ ...companyData,bankAccountDetails:{ifscCode,bankName,accountNumber}},
        {
            headers: {
                'x-auth-token':`${a.token}`
            }
        }
    );
    console.log(response);
    return response.data;
};