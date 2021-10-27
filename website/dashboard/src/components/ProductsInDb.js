import React from "react";
import "../assets/css/myStyle.css";

function GenresInDb(props) {
  return (
    <React.Fragment>
      <div className="col-lg-6 mb-4">
        <div className="card bg-pink text-white shadow">
          <div className="card-body">{props.name}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GenresInDb;
