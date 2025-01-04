import { Link } from "react-router-dom";

const CompanyCard = (props) => {
  return (
    <div className="card shadow-lg mb-4 bg-light border-0">
      <div className="card-body p-4">
        <h2 className="card-title fs-4 fw-bold text-primary">{props.name}</h2>
        <h3 className="card-subtitle fs-5 mb-3 text-muted">{props.typeOfEntity}</h3>
        <p className="card-text fs-6 mb-2 text-secondary">
          <strong>Registered Address:</strong> {props.Address[0].addressLine}
        </p>
        <p className="card-text fs-6 text-secondary">
          <strong>Category:</strong> {props.sector}
        </p>
        <Link to={`/startupView/${props._id}`}>
          <button className="btn btn-primary btn-lg w-100 py-2 mt-3">Verify</button>
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
