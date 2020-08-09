import React, { useState, useEffect } from 'react'
const App = () => {
  const [paper, setPaper] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=batman}')
  const [loading ,setLoading] = useState(false)
  
  const fetchPaper = ()=>{
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => setPaper(data.hits),setLoading(false))
    .catch(error =>console.log(error)) 
  }

  useEffect(()=>{
    fetchPaper()
  },[url])

  const handleChange = e => {
    setSearchQuery(e.target.value)
  }
  const handleSubmit = e =>{
    e.preventDefault()
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`)
  }
  const searchForm=()=>(
    <form>
    <input value = {searchQuery} onChange={handleChange} />
    <button onClick={handleSubmit}>Search</button>
    </form>
  )
  const showLoading = ()=>(
    loading ? <h2>Loading...</h2> : ''
  )
  const showData = () => (
  paper.map((n,i)=><p key={i}>{n.title}</p>)
  )
  return <div>
    <h3>This is test</h3>
    {searchForm()}
    {showData()}
  </div>
}
export default App;
