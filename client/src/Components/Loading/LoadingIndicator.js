import react from "react";
import { Spinner } from "react-bootstrap";
const LoadingIndicator = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default LoadingIndicator;
