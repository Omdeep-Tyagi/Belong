import { Link } from "react-router-dom";
import "./topbar.css";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
 // const user = false;
 
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };



  return (
    <div className="top">
      <div className="topLeft">
        <img src="/images/belong_Logo.png" class="logo_img" alt="" />
        {/* <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i> */}
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
            </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
         <Link className="link" to="/settings"> 
            <img
              className="topImg"
              src={user.profilePic}
              alt="img"
            />
           </Link> 
               ) : ( 
           <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link> 
            </li>
          </ul> 
         )} 
        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
    </div>
  );
}