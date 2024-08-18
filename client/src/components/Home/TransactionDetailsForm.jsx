import { Input, Textarea } from '@chakra-ui/react'
import PropTypes from "prop-types";

const TransactionDetailsForm = ({ setDetails, details, onSubmit }) => {
  return (
    <main className="bg-white text-secondary w-[48rem] p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <div className="w-full grid grid-cols-2 gap-3">
        <section className="flex flex-col gap-1">
          <label htmlFor="panCard" className="font-bold">
            PAN Card:{" "}
          </label>
          <Input
            id="panCard"
            type="text"
            placeholder="PAN Card"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, panCard: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="gstRegistrationNo" className="font-bold">
            GST Registration No:{" "}
          </label>
          <Input
            id="gstRegistrationNo"
            type="text"
            placeholder="GST Registration No"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, gstRegistrationNo: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="ieCode" className="font-bold">
            IE Code:{" "}
          </label>
          <Input
            id="ieCode"
            type="text"
            placeholder="IE Code"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, ieCode: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="capitalInvestment" className="font-bold">
            Capital Investment:{" "}
          </label>
          <Input
            id="capitalInvestment"
            type="number"
            placeholder="Capital Investment"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, capitalInvestment: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="bankAccountDetails" className="font-bold">
            Bank Account Details:{" "}
          </label>
          <Textarea
            id="bankAccountDetails"
            placeholder="Enter Bank Account Details"
            className="p-2 border-2 border-emerald-400 rounded-md focus:outline-none"
            onChange={(e) => setDetails({ ...details, bankAccountDetails: e.target.value })}
          />
        </section>
      </div>

      <section className="full center">
        <button
          type="button"
          className="bg-emerald-400 text-primary p-2 px-3 rounded-md cursor-pointer hover:opacity-90"
          onClick={onSubmit}
        >
          SUBMIT
        </button>
      </section>
    </main>
  );
}

TransactionDetailsForm.propTypes = {
  setDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TransactionDetailsForm
