import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import "./NewTweet.css";

const NewTweet = () => {

    const tweetsRef = collection(db, 'tweets');
    const usersRef = collection(db, 'users');

    const [tweet, setTweet] = useState("");
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        let image = "";
        getDocs(usersRef)
        .then((users) => {
            users.forEach((user) => {
                if (user.data().email == auth.currentUser.email) {
                    image = user.data().image;
                }
            })
            setProfilePic(image);
        })
    }, [])

    const handleTweet = async () => {

        if (tweet == "") {
            alert("Your tweet cannot be empty.");
            return;
        }

        let username = "";
        let name = "";
        let users = await getDocs(usersRef);

        users.forEach((user) => {
            if (user.data().email == auth.currentUser.email) {
                username = user.data().username;
                name = user.data().name;
            }

        })
        

        addDoc(tweetsRef, {
            name: name,
            username: username,
            tweet: tweet,
            likes: 0, 
            retweets: 0
        })
        .then(() => setTweet(""))
    }

    return ( 
        <div className="newTweet">
            
            <form className="form">
                <div className="form-flex">
                <img src={profilePic} alt="Profile"
                onClick={() => console.log(profilePic)}
                ></img>

                <div className="input-wrapper">
                <textarea type="textarea" className="form-control" placeholder="What's happening?" value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                ></textarea>
                <button type="button" className="btn btn-sm" onClick={handleTweet}>Tweet</button>
                </div>

                </div>

            </form>

        </div>
    )
}

export default NewTweet;