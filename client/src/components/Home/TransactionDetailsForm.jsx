import { TextField } from '@mui/material';
import PropTypes from "prop-types";

const TransactionDetailsForm = ({ setDetails, details, onSubmit }) => {
  return (
    <main className="bg-white text-secondary w-[36rem] md:w-[48rem] mx-auto p-4 rounded-md border-2 border-emerald-400 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
        <section className="flex flex-col gap-1">
          <label htmlFor="panCard" className="font-bold">
            PAN Card:{" "}
          </label>
          <TextField
            id="panCard"
            type="text"
            placeholder="PAN Card"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, panCard: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="gstRegistrationNo" className="font-bold">
            GST Registration No:{" "}
          </label>
          <TextField
            id="gstRegistrationNo"
            type="text"
            placeholder="GST Registration No"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, gstRegistrationNo: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="ieCode" className="font-bold">
            IE Code:{" "}
          </label>
          <TextField
            id="ieCode"
            type="text"
            placeholder="IE Code"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, ieCode: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="capitalInvestment" className="font-bold">
            Capital Investment:{" "}
          </label>
          <TextField
            id="capitalInvestment"
            type="number"
            placeholder="Capital Investment"
            variant="outlined"
            onChange={(e) => setDetails({ ...details, capitalInvestment: e.target.value })}
          />
        </section>

        <section className="flex flex-col gap-1">
          <label htmlFor="bankAccountDetails" className="font-bold">
            Bank Account Details:{" "}
          </label>
          <TextField
            id="bankAccountDetails"
            placeholder="Enter Bank Account Details"
            variant="outlined"
            multiline
            rows={4}
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

export default TransactionDetailsForm;
