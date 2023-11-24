import React from "react";
import { useNavigate } from "react-router-dom"; 
import './Sidebar.css';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("TWITTERCLONE_USER_DATA");
        navigate("/");
    }

    return ( 
        <div className="sidebar col-lg-2 col-md-2 col-sm-2 col-xs-2">
            <div><i className="fa-brands fa-twitter fa-2x twitter-icon"></i></div>
            <div><i className="fa-solid fa-house fa-2x"></i></div>
            <div><i className="fa-solid fa-hashtag fa-2x"></i></div>
            <div><i className="fa-solid fa-bell fa-2x"></i></div>
            <div><i className="fa-solid fa-user fa-2x"></i></div>
            <div><i className="fa-solid fa-ellipsis fa-2x"></i></div>
            <div><i className="fa-solid fa-feather-pointed fa-2x tweet-icon"></i></div>
            <div className="btn btn-sm"
            onClick={handleLogout}
            >Logout</div>
        </div>
    )
}

export default Sidebar;