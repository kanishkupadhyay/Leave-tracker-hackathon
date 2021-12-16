import React from "react";

export default function Error(props) {
  return (
    <>
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">{props.headingText}</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">{props.subText}</h3>
                  <p>{props.tagline}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
Error.defaultProps = {
  headingText:'404',
  subText: `Look like you're lost`,
  tagline:'the page you are looking for not avaible!'
}