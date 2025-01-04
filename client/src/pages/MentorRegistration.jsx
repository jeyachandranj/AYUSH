import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Network from "../components/Registration/MentorRegistration/Network";
import ProgressBar from "../components/Registration/MentorRegistration/ProgressBar";
import About from "../components/Registration/MentorRegistration/About";
import ContactInfo from "../components/Registration/MentorRegistration/ContactInfo";
import SelfDeclaration from "../components/Registration/MentorRegistration/SelfDeclaration";

const MentorRegistration = () => {
    const [step, setStep] = useState(0);
    const [network,setNetwork] = useState('');
    const navigate=useNavigate();
    // useEffect(() => {
    //     const fetchStep = async () => {
    //         const response = await getStep();
            
    //         if(response){
    //             let s=(response[0].status)
    //             if(s>2){
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
                return <Network setStep={setStep} network={network} setNetwork={setNetwork} step={step}/>
            case 1:
                return <About setStep={setStep} network={network} step={step}/>
            case 2:
                return <ContactInfo setStep={setStep} step={step}/>
            case 3:
                return <SelfDeclaration setStep={setStep} step={step}/>
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

export default MentorRegistration;
