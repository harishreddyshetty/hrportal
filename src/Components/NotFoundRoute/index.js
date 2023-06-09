import Header from "../Header";
import { useNavigate } from "react-router-dom";
import "./index.css";

const NotFoundRoute = () => {
    
    const navigate = useNavigate();

    const onClickGoToHome = () =>{
            navigate("/")
    }
    
    return(
  <>
    <Header />

    <div className="d-flex flex-column justify-content-center align-items-center">
      <img
        className="not-found-img"
        alt="not-found-404"
        src="https://img.freepik.com/free-vector/404-error-with-portals-concept-illustration_114360-7970.jpg?w=740&t=st=1685690412~exp=1685691012~hmac=4b9e9c656c55d40038665c640e7a0b264b34b13003c1848129e47a2d03b0d0be"
      />

      <h2>Page Not Found</h2>
      <p className="text-center">
        We are sorry the page you requested coudnt be found.
      </p>

      <button onClick={onClickGoToHome} className="btn btn-primary" type="button">Go to Home</button>
    </div>
  </>
)};

export default NotFoundRoute;
