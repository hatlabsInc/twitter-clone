import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("TWITTERCLONE_USER_DATA"));
        if (userdata == null || userdata == undefined) {
            navigate("/");        
        }
    }, [])

    return ( 
        <div className="home">
            <Sidebar />

            <Feed />

            <Widgets />
        </div>
    )
}

export default Home;