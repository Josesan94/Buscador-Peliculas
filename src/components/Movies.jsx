import React from 'react'

const ListOfMovies = ({movies}) => {
    return (
        <ul className='list'>
              {
                movies.map(movie => (
                  <li key={movie.id} className="movie">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title}/>
                  </li>
                ))
              }
            </ul>
    )
}

const NoMovies = () => {
    return (
        <p>No se encontraron peliculas para esta busqueda</p>
    )
}


const Movies = ({movies}) => {
    const hasMovies = movies?.length > 0


  return (
    hasMovies 
    ? <ListOfMovies movies={movies}/>
    : <NoMovies/>
  )
}

export default Movies;