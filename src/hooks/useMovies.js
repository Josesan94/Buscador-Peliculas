
import { useState, useRef } from 'react'
import { searchMovies } from '../services/movies'



const useMovies = ({query, sort}) => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const previousSearch = useRef({query}) // referencia que persiste entre renderizados

    const getMovies =async () => {
      if (query === previousSearch.current) return;
      try {
        setLoading(true)
        setError(null)
        previousSearch.current = query
        const NewMovies = await searchMovies({query})
        setMovies(NewMovies)
      } catch(e) {
        setError(e.message)
      } finally {
        //se carga despues del try o del catch
        setLoading(false)
      }
      
    }

    //ordenamos alfabeticamente por titutlo
    const sortedMovies = sort ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies

  return { movies: sortedMovies, getMovies, loading, sortedMovies}
}

export default useMovies;