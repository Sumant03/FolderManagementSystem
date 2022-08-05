import React from "react";

interface Props{
    image:any
}

export default function Image({ image }:Props) {
  return <img src={image.urls.thumb} alt="" className="single-photo" />;
}