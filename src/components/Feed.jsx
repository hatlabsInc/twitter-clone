import React from "react";
import NewTweet from "./NewTweet";
import Post from "./Post";
import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"; 
import "./Feed.css";

const Feed = () => {

    const [loading, setLoading] = useState(true);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const getTweets = async () => {
            const tweetsRef = collection(db, 'tweets');
            getDocs(tweetsRef)
            .then((res) => {
                let arr = [];
                res.docs.forEach((doc) => {
                    arr.push({...doc.data(), id: doc.id});
                })
                setTweets(arr);
            })
            .then(() => setLoading(false))
            .catch((err) => alert(err.message));
        }

        getTweets();

    }, [])

    console.log(tweets);

    if (loading) return (
        <div class="d-flex justify-content-center spinner">
        <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
        </div>
        </div> 
    );

    else return ( 
        <div className="feed col-lg-7 col-md-7 col-sm-10 col-xs-10">
            <h5>Home</h5>
            <NewTweet />
            {tweets.map((item) => (
                
                <Post 
                id = {item.id}
                name = {item.name}
                username = {item.username}
                tweet = {item.tweet}
                likes = {item.likes}
                retweets = {item.retweets}
                />
            ))}

        </div>
    )
}

export default Feed;