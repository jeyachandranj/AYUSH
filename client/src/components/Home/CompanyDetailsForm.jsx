import { Input, Select, Textarea } from '@chakra-ui/react'
import PropTypes from "prop-types";

const CompanyDetailsForm = ({ setActive, details, setDetails }) => {
  const submit = () => {
    setActive(1)
  }

  return (
    <main className="bg-white text-secondary w-[48rem] p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <div className="w-full grid grid-cols-2 gap-3">
        <section className="flex flex-col gap-1">
          <label htmlFor="companyName" className="font-bold">
            Name:{" "}
          </label>
          <Input
            id="companyName"
            type="text"
            placeholder="company name"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, companyName: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="entityType" className="font-bold">
            Entity:{" "}
          </label>
          <Select
            id="entityType"
            placeholder='Select option'
            onChange={(e) => setDetails({ ...details, entityType: e.target.value })}
          >
            <option value='private'>Private</option>
            <option value='partnership'>Partnership</option>
          </Select>
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="registrationNumber" className="font-bold">
            Registration Number:{" "}
          </label>
          <Input
            id="registrationNumber"
            type="number"
            placeholder="registration number"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, registrationNumber: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="contactPerson" className="font-bold">
            Contact Person:{" "}
          </label>
          <Input
            id="contactPerson"
            type="text"
            placeholder="contact person"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, contactPerson: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="registrationAddress" className="font-bold">
            Address:{" "}
          </label>
          <Textarea
            id="registrationAddress"
            placeholder="Enter address"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, registrationAddress: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="manufacturingAddress" className="font-bold">
            Manufacturing Address:{" "}
          </label>
          <Textarea
            id="manufacturingAddress"
            placeholder="Enter Manufacturing Address"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, manufacturingAddress: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="productCategory" className="font-bold">
            Product Category:{" "}
          </label>
          <Input
            id="productCategory"
            type="text"
            placeholder="product category"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, productCategory: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="productionCategory" className="font-bold">
            Production Category:{" "}
          </label>
          <Input
            id="productionCategory"
            type="text"
            placeholder="production category"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, productionCategory: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="incorporationDate" className="font-bold">
            Incorporation Date:{" "}
          </label>
          <Input
            id="incorporationDate"
            type="datetime-local"
            placeholder="incorporation date"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
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

export default CompanyDetailsForm