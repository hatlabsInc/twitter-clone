import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import "./Login.css";

const Login = () => {

    const usersRef = collection(db, 'users');

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        image: "",
        email: "", 
        password: ""
    });

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("TWITTERCLONE_USER_DATA"));
        console.log(userdata)
        if (userdata != null && userdata != undefined) {
            signInWithEmailAndPassword(auth, userdata.currentUserEmail, userdata.currentUserPassword)
            .then((res) => console.log(res))
            .then(()=> navigate("/home"))
            // .then(() => console.log(usersRef))
            .catch ((err) => alert(err.message))
        }
    })

    const handleSignUp = () => {

        if (userData.username === "") {
            alert("Enter a valid username.");
            return;
        }

        if (userData.name === "") {
            alert("Enter a valid name.");
            return;
        }

        createUserWithEmailAndPassword(auth, userData.email, userData.password) 
        .then((res) => console.log(res))
        .then(() => alert("User created."))
        .then(() => {
            addDoc(usersRef, {
                name: userData.name,
                username: userData.username,
                image: userData.image,
                email: userData.email,
                password: userData.password,
                image: userData.image,
                likedTweets: [],
                retweetedTweets: []
            })
        })
        .catch((err) => alert(err.message));
    }

    const handleLogin = () => {

        localStorage.setItem("TWITTERCLONE_USER_DATA", JSON.stringify({
            currentUserEmail: userData.email,
            currentUserPassword: userData.password
        }))

        signInWithEmailAndPassword(auth, userData.email, userData.password)
        .then((res) => console.log(res))
        .then(()=> navigate("/home"))
        // .then(() => console.log(usersRef))
        .catch ((err) => alert(err.message))
    }

    return ( 
        <div className="login">

            <div className="container">
            <input type="text" className="form-control" placeholder="Name (For new users)"
            onChange={(e) => setUserData({
                ...userData,
                name: e.target.value
            })}
            ></input>
            <input type="text" className="form-control" placeholder="Username (For new users)"
            onChange={(e) => setUserData({
                ...userData,
                username: e.target.value
            })}
            ></input>
            <input type="text" className="form-control" placeholder="Profile Picture (Paste online image link)"
            onChange={(e) => setUserData({
                ...userData,
                image: e.target.value
            })}
            ></input>
            <input type="email" className="form-control" placeholder="Email"
            onChange={(e) => setUserData({
                ...userData,
                email: e.target.value
            })}
            ></input>
            <input type="password" className="form-control" placeholder="Password"
            onChange={(e) => setUserData({
                ...userData,
                password: e.target.value
            })}
            ></input>

            <div className="btn-wrapper">
            <button type="button" className="btn btn-md" onClick={handleLogin}>Login</button>
            <button type="button" className="btn btn-md" onClick={handleSignUp}>Sign up</button>
            </div>

            </div>
        </div>
    )
}

export default Login;