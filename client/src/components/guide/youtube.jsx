import React from "react";
import './guide.css';
export default function Youtube({width,height,link,title}) {
    return (
        <iframe
            className="guide-video"
            width={width}
            height={height}
            src={link}
            title="YouTube video player"
            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
        </iframe>
)}
