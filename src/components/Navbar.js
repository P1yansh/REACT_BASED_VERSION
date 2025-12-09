import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <strong className="h4 mb-0 fw-bold">UrbanBite</strong>
                    <span className="small-text">Tiffin Services</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/menu">Weekly Menu</NavLink></li>
                        <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                         <li className="nav-item"><NavLink className="nav-link" to="/reviews">Reviews</NavLink>
  </li>
                        <li className="nav-item"><NavLink className="nav-link btn btn-warning text-dark ms-2 fw-bold" to="/checkout">Subscribe</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;