import { useState } from "react"
import { StepViewer, CompanyDetailsForm, TransactionDetailsForm, CertificateForm } from "../components/Home"
import Bot from "../pages/bot"

const Home = () => {
  const [active, setActive] = useState(0);
  const [details, setDetails] = useState({
    "companyName": "",
    "entityType": "",
    "incorporationDate": "",
    "registrationNumber": "",
    "registrationAddress": "",
    "contactPerson": "",
    "manufacturingAddress": "",
    "productCategory": "",
    "productionCategory": "",

    "gmpCertificate": "",
    "coppCertificate": "",
    "ayushLicenseCertificate": "",
    "manufacturingLicense": "",
    "companyIncorporationCertificate": "",

    "panCard": "",
    "gstRegistrationNo": "",
    "ieCode": "",
    "capitalInvestment": "",
    "bankAccountDetails": ""
  })

  const submit = () => console.log("submitted")

  const steps = [
    "Company Details",
    "Certificate Details",
    "Account Details"
  ]

  return (
    <div className="screen bg-primary center flex-col gap-5">
      <section className="w-[36rem] mx-auto">
        <StepViewer
          steps={steps}
          active={active}
        />
      </section>

      {active === 0 ?
        <CompanyDetailsForm setActive={setActive} details={details} setDetails={setDetails} /> :
      active === 1 ?
        <CertificateForm setActive={setActive} details={details} setDetails={setDetails} /> :
        <TransactionDetailsForm details={details} setDetails={setDetails} onSubmit={submit} />
      }
    </div>
  )
}

export default Home
