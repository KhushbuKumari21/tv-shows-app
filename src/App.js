import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/search/shows?q=all')
      .then(response => {
        setShows(response.data);
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
      });
  }, []);

  return (
    <div>
      <h1>TV Shows</h1>
      <ul>
        {shows.map(show => (
          <li key={show.show.id}>
            <Link to={`/summary/${show.show.id}`}>{show.show.name}</Link>
            <p>{show.show.language}</p>
            <p>{show.show.genres.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Summary({ match }) {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/shows/${match.params.id}`)
      .then(response => {
        setSummary(response.data.summary);
      })
      .catch(error => {
        console.error('Error fetching show summary:', error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>Show Summary</h1>
      <p>{summary}</p>
      <Link to="/booking">Book Ticket</Link>
    </div>
  );
}

function Booking() {
  const [name, setName] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Save name to local storage or perform any other action
  };

  return (
    <div>
      <h1>Booking</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Movie Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/summary/:id" component={Summary} />
      <Route path="/booking" component={Booking} />
    </Router>
  );
}

export default App;
