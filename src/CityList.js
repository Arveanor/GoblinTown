import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export function CityList(props) {
    const [value, setValue] = useState('');
    const cities = props.cities.map(city => <City city={city.cityName} silver={city.silver}/>);

  return (
    <div>
    <Table bordered>
        <thead>
            <tr>
            <th>City Name</th>
            <th>Silver</th>
            <th>Action</th> 
            </tr>
        </thead>
    {cities}
  </Table>
  </div>
  );
}

export function City(props) {
    return (
        <tbody>
        <tr>
            <td>{props.city}</td>
            <td>{props.silver}</td>
            <td>
                <CityActionDropdown city={props.city}/>   
            </td>
        </tr>
      </tbody>
    );
}

export function CityActionDropdown(props)
{
    const [dropdownSelection, setDropdownSelection] = useState("Select Action");
    const handleOnClick = (selection) => setDropdownSelection(selection.target.outerText);
    return (
        <Form.Select aria-label="Default select example" id = {props.city} onChange = {(event) => console.log(event)}>
            <option>Open this select menu</option>
            <option value="1">Build</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select>
    );
}