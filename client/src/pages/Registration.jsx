import { useState, useEffect } from "react";
import { ProgressBar } from "../components/Home";
import AddressDetails from "../components/Registration/AddressDetails";
import EntityDetails from "../components/Registration/EntityDetails";
import InformationRequired from "../components/Registration/InformationRequired";
import FounderDetails from "../components/Registration/FounderDetails";
import AuthorizedDetails from "../components/Registration/AuthorizedDetails";
import CertificateDetails from "../components/Registration/CertificateDetails";
import Final from "../components/Registration/Final";
import { getStep } from "../services/registrationService";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [step, setStep] = useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchStep = async () => {
            const response = await getStep();
            
            if(response){
                let a=(response[0].progress)
                let s= parseInt(a);
                if(s==7){
                    alert('You are already registered');
                    navigate('/');
                }
                setStep(s);
            }
        };
        
        fetchStep();
    }, []);
    const renderComponent = () => {
        switch (step) {
            case 0:
                return <EntityDetails setStep={setStep} step={step}/>;
            case 1:
                return <AddressDetails setStep={setStep} step={step} />;
            case 2:
                return <AuthorizedDetails setStep={setStep}  step={step}/>;
            case 3:
                return <FounderDetails setStep={setStep} step={step}/>
            case 4:
              return <InformationRequired setStep={setStep} step={step}/>;
            case 5:
                return <CertificateDetails setStep={setStep}/>;
            case 6:
                return <Final setStep={setStep} step={step}/>;
            default:
                return 0; // or some default component or message
        }
    };
    return (
        <>
            <section className="d-flex pb-20">
                <ProgressBar currentStep={step}  setStep={setStep}/>
                {renderComponent()}
            </section>
        </>
    );

};

export default Registration;
