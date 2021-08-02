import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { CityList, City } from './CityList';

export default function App() {

  const [cities, setCities] = useState([])

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cityName: 'value' })
  };  

  useEffect(() => {
    fetch('http://localhost:8080/api/cities')
    .then(response => response.json())
    .then(data => setCities(data._embedded.cities))
  });

  return (
    <div>
    <Navbar>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/cities">Cities</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <NameForm/>
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cities">
          <CityList cities={cities}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function testButton() {
  this.setState("value: <h2>Temporary</h2>")
}

function NameForm(props) {
  const [value, setValue] = useState('');
  const [silverAmount, setSilverAmount] = useState(0);
  var responseJson;

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cityName: value, silver: silverAmount })
  };

  //myVar = {value};

  const onChange = (event) => { setValue(event.target.value);
    console.log(event.target.value)
  }

  const onSubmit = (event) => {
    fetch('http://localhost:8080/api/cities', requestOptions)
        .then(response => response.json())
        .then(data => responseJson = data)
        .then(() => console.log(responseJson))
    event.preventDefault();
  }

  return (
      <form onSubmit={onSubmit}>
        <label>
          Name:
          <input type="text" value={value} onChange={onChange} />
        </label>
        <label>
          Silver:
          <input type="number" value={silverAmount} onChange={(event) => setSilverAmount(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  );
}