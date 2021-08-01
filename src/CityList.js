import React from 'react';
import Table from 'react-bootstrap/Table';


export function CityList(props) {
  // I need to have a props array of city objects and then convert them into <tr>'s
  // I can use a map function to wind up with what I think is essentially an array of Components
  // from my given array of js objects, then I can just jsx that map
  // not sure what parent <tags> the map should have though? maybe none?

  const cities = props.cities.map(city => <City city={city.cityName} silver={city.silver}/>);
  //const cities = [<City city="Arkad"/>, <City city="Barthul"/>]
  //console.log(props.cities)

  return (
    <Table bordered>
    <tr>
      <th>City Name</th>
      <th>Silver</th>
    </tr>
    {cities}
  </Table>
  );
}

export function City(props) {
    return (
      <tr>
        <td>{props.city}</td>
        <td>{props.silver}</td>
      </tr>
    );
}