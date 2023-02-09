

export const searchMovies = async({query}) => {
    if(query === '') return null;


    //con bloque try catch
    try{
        const response = await fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${query}`)
        const json = await response.json();


        const movies =  await json.Search

        return movies?.map(movie => ({
            id: movie.imdbID,
            title:movie.Title,
            year:movie.Year,
            poster:movie.Poster
          }))
    } catch (e) {
        throw new Error ("Error searching movies")
    }

    //acon promise
    // if(query) {
    //     fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${query}`)
    //     .then( res => res.json())
    //     .then((response) => {
    //       setResponseMovies(response)
    //     })
    //     //setResponseMovies(withResults)
    //   }
    //   else {
    //     //setResponseMovies(withoutResults)
    //   }
}