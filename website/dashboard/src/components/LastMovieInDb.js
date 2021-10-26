import React from "react";

function LastMovieInDb(props) {
  return (
    <React.Fragment>
      <div className="text-center">
        <img
          className="img-fluid px-3 px-sm-4 mt-3 mb-4"
          style={{ width: 40 + "rem" }}
          src={props.image}
          alt={props.title}
        />
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
        consequatur explicabo officia inventore libero veritatis iure voluptate
        reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem
        culpa citationem ratione aperiam voluptatum non corporis ratione aperiam
        voluptatum quae dolorem culpa ratione aperiam voluptatum?
      </p>
      <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">
        View movie detail
      </a>
    </React.Fragment>
  );
}

export default LastMovieInDb;
