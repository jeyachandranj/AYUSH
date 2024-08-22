import { TextField, Select, MenuItem } from '@mui/material';
import PropTypes from "prop-types";

const CompanyDetailsForm = ({ setActive, details, setDetails }) => {
  const submit = () => {
    setActive(1)
  }

  return (
    <main className="bg-white text-secondary w-[36rem] md:w[48rem] mx-auto p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <section className="flex flex-col gap-1">
          <label htmlFor="companyName" className="font-bold">
            Name:{" "}
          </label>
          <TextField
            id="companyName"
            type="text"
            placeholder="company name"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, companyName: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="entityType" className="font-bold">
            Entity:{" "}
          </label>
          <Select
            id="entityType"
            displayEmpty
            value={details.entityType || ''}
            onChange={(e) => setDetails({ ...details, entityType: e.target.value })}
          >
            <MenuItem value="" disabled>Select option</MenuItem>
            <MenuItem value='private'>Private</MenuItem>
            <MenuItem value='partnership'>Partnership</MenuItem>
          </Select>
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="registrationNumber" className="font-bold">
            Registration Number:{" "}
          </label>
          <TextField
            id="registrationNumber"
            type="number"
            placeholder="registration number"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, registrationNumber: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="contactPerson" className="font-bold">
            Contact Person:{" "}
          </label>
          <TextField
            id="contactPerson"
            type="text"
            placeholder="contact person"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, contactPerson: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="registrationAddress" className="font-bold">
            Address:{" "}
          </label>
          <TextField
            id="registrationAddress"
            placeholder="Enter address"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setDetails({ ...details, registrationAddress: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="manufacturingAddress" className="font-bold">
            Manufacturing Address:{" "}
          </label>
          <TextField
            id="manufacturingAddress"
            placeholder="Enter Manufacturing Address"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e) => setDetails({ ...details, manufacturingAddress: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="productCategory" className="font-bold">
            Product Category:{" "}
          </label>
          <TextField
            id="productCategory"
            type="text"
            placeholder="product category"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, productCategory: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="productionCategory" className="font-bold">
            Production Category:{" "}
          </label>
          <TextField
            id="productionCategory"
            type="text"
            placeholder="production category"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, productionCategory: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="incorporationDate" className="font-bold">
            Incorporation Date:{" "}
          </label>
          <TextField
            id="incorporationDate"
            type="datetime-local"
            placeholder="incorporation date"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, incorporationDate: e.target.value })}
          />
        </section>
      </div>

      <section className="flex justify-center">
        <button
          type="button"
          className="bg-emerald-400 text-primary p-2 px-3 rounded-md cursor-pointer hover:opacity-90"
          onClick={submit}
        >
          SUBMIT
        </button>
      </section>
    </main>
  )
}

CompanyDetailsForm.propTypes = {
  setActive: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  setDetails: PropTypes.func.isRequired
};

export default CompanyDetailsForm;
