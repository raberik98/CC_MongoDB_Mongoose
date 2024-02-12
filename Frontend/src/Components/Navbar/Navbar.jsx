import "./Navbar.scss"
import { Link } from "react-router-dom"

export default function Navbar() {
    
    return(
        <nav>
            <div className="navbar-link-container">
                <Link className="navbar-link-link" to={"/"}>Home</Link>
            </div>
            <div className="navbar-link-container">
                <Link className="navbar-link-link" to={"/countries"}>Countries</Link>
            </div>
        </nav>
    )
}