import React from "react";
import './guide.css';
import { useNavigate } from "react-router-dom";
import Youtube from "./youtube";
import FAQ from "./faq";
export default function Guide({type}) {
  const data=[
    {
    url:"https://www.youtube.com/embed/677ZtSMr4-4?si=byWynGxbmN6ipqwo",
    list:["Investor Membership","Budget","Pan Card"],
    faqData: [
      { question: "What is the purpose of this project?", answer: "The purpose of this project is to build a comprehensive platform for AYUSH startup registration." },
      { question: "How do I register a startup?", answer: "To register a startup, you need to fill in the necessary forms, upload certificates, and submit the required documents." },
      { question: "What documents are required for registration?", answer: "You need to provide documents like GMP certificate, AYUSH license, company incorporation certificate, etc." },
      { question: "How can I track the status of my registration?", answer: "You can track the status of your registration on the portal under the 'Registration Status' section." },
      { question: "Who can I contact for support?", answer: "For support, you can reach out to our customer service via the 'Contact Us' page." }
    ],
    },
    {
      url:"https://www.youtube.com/embed/6r9E3fQfz0U?si=FzNNKmc4ztGch8Db",
      list:["Mentor Membership","Logo","About Your success story"],
      faqData: [
        { question: "What is the purpose of this project?", answer: "The purpose of this project is to build a comprehensive platform for AYUSH startup registration." },
        { question: "How do I register a startup?", answer: "To register a startup, you need to fill in the necessary forms, upload certificates, and submit the required documents." },
        { question: "What documents are required for registration?", answer: "You need to provide documents like GMP certificate, AYUSH license, company incorporation certificate, etc." },
        { question: "How can I track the status of my registration?", answer: "You can track the status of your registration on the portal under the 'Registration Status' section." },
        { question: "Who can I contact for support?", answer: "For support, you can reach out to our customer service via the 'Contact Us' page." }
      ],
    },
    {
      url:"https://www.youtube.com/embed/6r9E3fQfz0U?si=FzNNKmc4ztGch8Db",
      list:["GMP certificate","MSME certificate","Ayush License","Manufacturing license","Company incoporation certificate"],
      faqData: [
        { question: "What is the purpose of this project?", answer: "The purpose of this project is to build a comprehensive platform for AYUSH startup registration." },
        { question: "How do I register a startup?", answer: "To register a startup, you need to fill in the necessary forms, upload certificates, and submit the required documents." },
        { question: "What documents are required for registration?", answer: "You need to provide documents like GMP certificate, AYUSH license, company incorporation certificate, etc." },
        { question: "How can I track the status of my registration?", answer: "You can track the status of your registration on the portal under the 'Registration Status' section." },
        { question: "Who can I contact for support?", answer: "For support, you can reach out to our customer service via the 'Contact Us' page." }
      ],
    }
  ]
  const navigate=useNavigate();
  const handlePdfDownload = () => {
    const pdfUrl = "https://ayush-2.s3.us-east-1.amazonaws.com/gmpCertificate_2024-09-05.pdf";  // Replace with your PDF file path
    window.open(pdfUrl, "_blank");
  };
  let nav='/register';
  if(type===0) nav='/register/investor';
  else if(type===1) nav='/register/mentor';
  else nav='/register';
  return (
    <div className="guide-container">
      <div className="top-section">
        <div className="guide">
          <Youtube 
            width={"100%"} 
            height={"100%"} 
            link={data[type].url}
          />
        </div>
        <div className="checklist">
          <h3>Important Document Needed to Register</h3>
          <ul>
            {data[type].list.map((key,index)=><li key={index}>{key}</li>)}
          </ul>
        </div>
      </div>
      <button className="pdf-guide" onClick={handlePdfDownload}>Click to Download a Guide book</button>
      <button className="guide-btn" onClick={()=>navigate(nav)}>Next</button>
      <FAQ faqData={data[type].faqData}/>
    </div>
  );
}
