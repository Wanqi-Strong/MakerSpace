import { Link } from "react-router-dom";
import "./noPage.css";

function NoPage(){
    return(
        <div className="container flex flex_ver flex_center_all">
            <div className="title">Oops!</div>
            <div>You got lost in the 404 black hole :P</div>
            <div>
                <Link to={'/login'}>Back to home</Link>
            </div>
        </div>
    );
}
export default NoPage;