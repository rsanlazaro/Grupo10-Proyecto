import React from "react";

function TableElement(props) {

    let genreList;

    if (props.genre != null){
        genreList = 
        <ul>
            {props.genre.map((element,i) => <li key = {element + i}> {element} </li>)}
        </ul>
    }else {
        genreList = "";
    }

  return (
    <React.Fragment>
      <tr>
        <th>{props.title}</th>
        <th>{props.duration}</th>
        <th>{props.rating}</th>
        <th>
            {genreList}
        </th>
        <th>{props.awards}</th>
      </tr>
    </React.Fragment>
  );
}
export default TableElement;
