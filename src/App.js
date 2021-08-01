// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { CityList, City } from './CityList';

export default function App() {

  const [count, setCount] = useState(0)
  const [cityName, setCityName] = useState("")
  const [cities, setCities] = useState([])
  const [responseJson, setResponseJson] = useState("")

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
    <CityList cities={cities}/>
      <p> Cities size: {cities.length}</p>
      <NameForm/>
      <Button onClick={() => {fetch('http://localhost:8080/api/cities', requestOptions)
        .then(response => response.json())
        .then(data => setResponseJson(data))
        console.log(responseJson)
      }}>Bootstrap?</Button>
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cities">
            <Cities />
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

function Cities() {
  return <h2>Cities</h2>;
}

function testButton() {
  this.setState("value: <h2>Temporary</h2>")
}

// function CityList(props) {
//   // I need to have a props array of city objects and then convert them into <tr>'s
//   // I can use a map function to wind up with what I think is essentially an array of Components
//   // from my given array of js objects, then I can just jsx that map
//   // not sure what parent <tags> the map should have though? maybe none?

//   const cities = props.cities.map(city => <City city={city.cityName} silver={city.silver}/>);
//   //const cities = [<City city="Arkad"/>, <City city="Barthul"/>]
//   //console.log(props.cities)

//   return (
//     <Table bordered>
//     <tr>
//       <th>City Name</th>
//       <th>Silver</th>
//     </tr>
//     {cities}
//   </Table>
//   );
// }

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