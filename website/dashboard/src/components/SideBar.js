import React from 'react';
import image from '../assets/images/logo.png';
import "../assets/css/myStyle.css";

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav sidebar-logo sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center padding-logo" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="logo-dash" src={image} alt="Digital House"/>
                    </div>
                </a>
            </ul>
            {/*<!-- End of Sidebar -->*/}
            
        </React.Fragment>
    )
}
export default SideBar;