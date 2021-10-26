import React from "react";
import imagenFondo from "../assets/images/mandalorian.jpg";
import ContentRowMovies from "./ContentRowMovies";
import LastMovieInDb from "./LastMovieInDb";
import GenresInDb from "./GenresInDb";

function ContentRowTop() {
  const items = [
    {
      title: "Productos",
      amount: 21,
      color: "primary",
      icon: "fa-gift",
    },
    {
      title: "Usuarios",
      amount: 10,
      color: "warning",
      icon: "fa-user",
    },
    {
      title: "Categorías",
      amount: 6,
      color: "success",
      icon: "fa-check-square",
    },
  ];

  const genres = [
    {
      name: "Acción",
    },
    {
      name: "Animación",
    },
    {
      name: "Aventura",
    },
    {
      name: "Ciencia Ficción",
    },
    {
      name: "Comedia",
    },
    {
      name: "Drama",
    },
    {
      name: "Fantasía",
    },
    {
      name: "Infantiles",
    },
    {
      name: "Musical",
    },
  ];

  const objects = [
    {
      name: "Termos",
    },
    {
      name: "Rompecabezas",
    },
    {
      name: "Tazas",
    },
    {
      name: "Gorras",
    },
    {
      name: "Llaveros",
    },
  ];

  const lastMovie = 
  {
	  image: imagenFondo,
	  title: "Star Wars - Mandalorian"
	};

  return (
    <React.Fragment>
      {/*<!-- Content Row Top -->*/}
      <div className="container-fluid">
        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>

        {/*<!-- Content Row Movies-->*/}
        <div className="row">
          {items.map((element, i) => {
            return (
              <ContentRowMovies
                key={element.title + i}
                title={element.title}
                amount={element.amount}
                color={element.color}
                icon={element.icon}
              />
            );
          })}

          {/*<!-- Movies in Data Base -->*/}
        </div>
        {/*<!-- End movies in Data Base -->*/}

        {/*<!-- Content Row Last Movie in Data Base -->*/}
        <div className="row">
          {/*<!-- Last Movie in DB -->*/}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Total de productos vendidos
                </h5>
              </div>
            </div>
          </div>
          {/*<!-- End content row last movie in Data Base -->*/}

          {/*<!-- Genres in DB -->*/}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Productos más vendidos
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {objects.map((element, i) => {
                    return (
                      <GenresInDb key={element.name + i} name={element.name} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ContentRowTop;
