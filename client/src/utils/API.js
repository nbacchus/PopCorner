const searchShow = (query) => {
  return fetch(`http://api.tvmaze.com/search/shows?q=${query}`)
}

export default searchShow