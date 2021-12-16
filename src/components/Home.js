import React from "react";

export default function Home(props) {
  return (
    <>
      <div className="landing-container">
        <div className="left-container">
          <h1 style={{ color: props.mode }}>{props.heading}</h1>
          <p>{props.description}</p>
        </div>
        <div className="right-cotainer">
          <img
            src={props.imgSrc}
            alt="Error loading image"
            srcSet=""
          />
        </div>
      </div>
    </>
  );
}

Home.defaultProps = {
  heading: "Welcome to Leave Tracker App",
  description: `Hello, This is a Leave Tracker App. The app is created with React JS and for store I have used Redux dev toolkit  and it includes unit testing.Created By Kanishk Upadhyay`,
  imgSrc: 'https://image.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg'
};
