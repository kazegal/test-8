import {Link, NavLink} from "react-router-dom";


const Toolbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Quotes Central</Link>
                <div className="">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Quotes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/add-quote">Submit new quote</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;