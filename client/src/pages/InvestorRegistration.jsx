import { useState, useEffect } from "react";
import { getStep } from "../services/registrationService";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/Registration/InvestorRegistration/ProgressBar";
import About from "../components/Registration/InvestorRegistration/About";
import Network from "../components/Registration/InvestorRegistration/Network";
import ContactInfo from "../components/Registration/InvestorRegistration/ContactInfo";
import SelfDeclaration from "../components/Registration/InvestorRegistration/SelfDeclaration";

const InvestorRegistration = () => {
    const [step, setStep] = useState(0);
    const [network,setNetwork] = useState('');
    console.log(network);
    const navigate=useNavigate();
    // useEffect(() => {
    //     const fetchStep = async () => {
    //         const response = await getStep();
            
    //         if(response){
    //             let a=(response[0].progress)
    //             let s= parseInt(a);
    //             if(s==7){
    //                 alert('You are already registered');
    //                 navigate('/');
    //             }
    //             setStep(s);
    //         }
    //     };
        
    //     fetchStep();
    // }, []);
    const renderComponent = () => {
        switch (step) {
            case 0:
                return <Network setStep={setStep} step={step} network={network} setNetwork={setNetwork}/>
            case 1:
                return <About setStep={setStep} step={step} network={network}/>;
            case 2:
                return <ContactInfo setStep={setStep} step={step}/>;
            case 3:
                return <SelfDeclaration setStep={setStep} step={step}/>;
            default:
                return 0; // or some default component or message
        }
    };
    console.log(step)
    return (
        <>
            <section className="d-flex">
                <ProgressBar currentStep={step}  setStep={setStep}/>
                {renderComponent()}
            </section>
        </>
    );

};

export default InvestorRegistration;
