import React from "react";
import TableElement from "./TableElement";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./FooterTable.css";

function FooterTable() {

    const movies = [
        {
            title: 'Billy Elliot',
            duration: 123,
            rating: 5,
            genre: ['Drama','Comedia'],
            awards: 2
        },
        {
            title: 'Alicia en el país de las maravillas',
            duration: 142,
            rating: 4.8,
            genre: ['Drama','Acción','Comedia'],
            awards: 3
        }
    ];

  return (
    <React.Fragment>
      <div className="margin-center">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Duración</th>
              <th>Rating</th>
              <th>Género</th>
              <th>Premios</th>
            </tr>
          </thead>
          <tbody>
          {movies.map((element, i) => {
            return (
              <TableElement
                key={element.title + i}
                title={element.title}
                duration={element.duration}
                rating={element.rating}
                genre={element.genre}
                awards={element.awards}
              />
            );
          })}
          </tbody>
          <tfoot>
            <tr>
              <th>Título</th>
              <th>Duración</th>
              <th>Rating</th>
              <th>Género</th>
              <th>Premios</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </React.Fragment>
  );
}
export default FooterTable;
