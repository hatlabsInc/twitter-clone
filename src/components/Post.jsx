import React from "react";
import { useState, useEffect } from "react";
import { updateDoc, doc, collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Post.css";

const Post = (props) => {

    const [likes, setLikes] = useState(props.likes);
    const [retweets, setRetweets] = useState(props.retweets);
    const [profilePic, setProfilePic] = useState("");

    useEffect(() => {
        const usersRef = collection(db, 'users');
        
        let image = "";
        getDocs(usersRef)
        .then((users) => {
            users.forEach((user) => {
                if (user.data().username == props.username) {
                    image = user.data().image;
                }
            })
            setProfilePic(image);
        })
    }, [])

    const handleLike = () => {

        let userid = "";
        const usersRef = collection(db, "users");

        getDocs(usersRef)
        .then((res) => {
            res.docs.forEach((doc) => {
                if(doc.data().email === auth.currentUser.email) {
                    userid = doc.id;
                }
            })
        })
        .then(() => {
            const userDoc = doc(db, "users", userid);
            getDoc(userDoc)
            .then((userDocSnap) => {
                let arr = userDocSnap.data().likedTweets;
                if (arr.includes(props.id)) {
                    alert("You have already liked this tweet.");
                }
                else {
                    updateDoc(userDoc, {"likedTweets": [...arr, props.id]});

                    setLikes((prev) => prev+1);

                    const postDoc = doc(db, "tweets", props.id);
                    updateDoc(postDoc, {likes: likes+1});
                }
            })  
        })
        .catch((err) => alert(err.message));
    }

    const handleRetweet = () => {
        let userid = "";
        const usersRef = collection(db, "users");

        getDocs(usersRef)
        .then((res) => {
            res.docs.forEach((doc) => {
                if(doc.data().email === auth.currentUser.email) {
                    userid = doc.id;
                }
            })
        })
        .then(() => {
            const userDoc = doc(db, "users", userid);
            getDoc(userDoc)
            .then((userDocSnap) => {
                let arr = userDocSnap.data().retweetedTweets;
                if (arr.includes(props.id)) {
                    alert("You have already retweeted this.");
                }
                else {
                    updateDoc(userDoc, {"retweetedTweets": [...arr, props.id]});

                    setRetweets((prev) => prev+1);

                    const postDoc = doc(db, "tweets", props.id);
                    updateDoc(postDoc, {retweets: retweets+1});
                }
            })  
        })
        .catch((err) => alert(err.message));
    }

    return ( 
        <div className="post">
            
            <div className="form-flex">
                <img src={profilePic}></img>

                <div className="post-content">

                    <div className="post-header">
                        <b>{props.name}</b> &nbsp; &nbsp;
                        <p>@{props.username}</p>
                    </div>

                    <p>{props.tweet}</p>

                    <div className="reactions">
                    <span className="like"
                    onClick={handleLike}
                    >
                        <i className="fa-solid fa-heart fa-xs"></i>
                        <small>{likes}</small>
                        </span>
                    <span className="retweet"
                    onClick={handleRetweet}
                    >
                        <i className="fa-solid fa-retweet"></i>
                        <small>{retweets}</small>
                        </span>
                    </div>
                
                </div>

            </div>

        </div>

    )
}

export default Post;