import React from "react";
import { Follow, Tweet } from "react-twitter-widgets";
import "./Widgets.css";

const Widgets = () => {
    return ( 
        <div className="widgets d-none d-lg-flex col-lg-3 col-md-3">
            <div className="whoToFollow">
                <Follow username="supratikch" options={{size: "large"}} />
                <Tweet tweetId="841418541026877441" />
            </div>
        </div>
    )
}

export default Widgets;