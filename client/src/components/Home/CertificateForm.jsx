import { TextField } from '@mui/material';
import PropTypes from "prop-types";

const CertificateForm = ({ setActive, details, setDetails }) => {
  const submit = () => setActive(2);

  return (
    <main className="bg-white text-secondary w-[36rem] md:w-[48rem] mx-auto p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <section className="flex flex-col gap-1">
          <label htmlFor="gmpCertificate" className="font-bold">
            GMP Certificate:{" "}
          </label>
          <TextField
            id="gmpCertificate"
            type="file"
            inputProps={{ accept: '.pdf' }}
            variant="outlined"
            onChange={(e) => setDetails({ ...details, gmpCertificate: e.target.files[0] })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="coppCertificate" className="font-bold">
            COPP Certificate:{" "}
          </label>
          <TextField
            id="coppCertificate"
            type="file"
            inputProps={{ accept: '.pdf' }}
            variant="outlined"
            onChange={(e) => setDetails({ ...details, coppCertificate: e.target.files[0] })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="ayushLicenseCertificate" className="font-bold">
            AYUSH License Certificate:{" "}
          </label>
          <TextField
            id="ayushLicenseCertificate"
            type="file"
            inputProps={{ accept: '.pdf' }}
            variant="outlined"
            onChange={(e) => setDetails({ ...details, ayushLicenseCertificate: e.target.files[0] })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="manufacturingLicense" className="font-bold">
            Manufacturing License:{" "}
          </label>
          <TextField
            id="manufacturingLicense"
            type="file"
            inputProps={{ accept: '.pdf' }}
            variant="outlined"
            onChange={(e) => setDetails({ ...details, manufacturingLicense: e.target.files[0] })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="companyIncorporationCertificate" className="font-bold">
            Company Incorporation Certificate:{" "}
          </label>
          <TextField
            id="companyIncorporationCertificate"
            type="file"
            inputProps={{ accept: '.pdf' }}
            variant="outlined"
            onChange={(e) => setDetails({ ...details, companyIncorporationCertificate: e.target.files[0] })}
          />
        </section>
      </div>

      <section className="full center">
        <button
          type="button"
          className="bg-emerald-400 text-primary p-2 px-3 rounded-md cursor-pointer hover:opacity-90"
          onClick={submit}
        >
          SUBMIT
        </button>
      </section>
    </main>
  );
}

CertificateForm.propTypes = {
  setActive: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  setDetails: PropTypes.func.isRequired
};

export default CertificateForm;
