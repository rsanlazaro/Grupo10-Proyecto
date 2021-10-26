import React from "react";
import PropTypes from 'prop-types';

function ContentRowMovies(props) {
  
  return (
    <React.Fragment>
      <div className="col-md-4 mb-4">
        <div className={`card shadow h-100 py-2`}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-uppercase mb-1">
                  {props.title}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {props.amount}
                </div>
              </div>
              <div className="col-auto">
                <i className={`fas ${props.icon} fa-2x text-color`}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

ContentRowMovies.defaultProps = {
    title: "No hay título registrado",
    amount: "No hay cantidad registrada",
    color: "primary",
    icon: "fa-window-close"
}

ContentRowMovies.propTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary','success', 'warning']).isRequired
}

export default ContentRowMovies;
