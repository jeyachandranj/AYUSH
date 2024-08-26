import PropTypes from "prop-types";
import { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  const notify = (message, type = "success") => {
    const id = Date.now();
    const newAlert = { id, message, type };
    setAlerts([...alerts, newAlert]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.id !== id));
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alerts, notify }}>
      {children}
    </AlertContext.Provider>

  )
}

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export {
  AlertContext,
  AlertProvider
}
