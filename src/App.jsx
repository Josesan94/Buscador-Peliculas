import { useRef, useState, useEffect } from 'react'
import useMovies from './hooks/useMovies'
import './App.css'
import Movies from './components/Movies'

function useSearch () {
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true);


  useEffect(() => {
    //inicializamos la referencia para que la primera vez que se inicie el componente no me 
    // muestre el error
    if(isFirstInput.current) {
      isFirstInput.current = query === ''
      return;
    }
    //agrego validaciones regex
    if( query === '') {
      setError("no se puede introducir un nombre vacio")
      return;
    }

      setError(null)
    }, [query])

    return { query, error, setQuery }
}

function App() {
  const [sort, setSort] = useState(false)
  const {query, error, setQuery} = useSearch()
  const {movies: mappedMovies, getMovies, loading} = useMovies({query, sort})

  // const inputRef = useRef(); // <----- NO ABUSAR DE ESTO

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies()
  }

const handleChange = (event) => {
  setQuery(event.target.value)
}


const handleSort = () => {
  setSort(!sort)
}

  // Manejo de form de forma NO CONTROLADA
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const fields = Object.fromEntries(new window.FormData(event.target))
 
  //   console.log(fields)

  // }

  return (
    <div className='page' >
      <header>
        <h1> Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label> Movie name</label>
        <input name="query"  placeholder='Avengers' value={query} onChange={handleChange}/>
        <input type="checkbox" onChange={handleSort} />
        <button type="submit" >Buscar</button>
      </form>
      {error && <p style={{color:"red"}}>No se puede buscar una pelicula vacia</p>}
      </header>
      <main>
        {
          loading ? (
            <p>Cargando...</p>
          ) : (
            <Movies movies={mappedMovies}/>
          )
        }
      </main>
    </div>
  )
}

export default App
