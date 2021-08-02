import React, {useState} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';


export function CityList(props) {
  // I need to have a props array of city objects and then convert them into <tr>'s
  // I can use a map function to wind up with what I think is essentially an array of Components
  // from my given array of js objects, then I can just jsx that map
  // not sure what parent <tags> the map should have though? maybe none?

  const cities = props.cities.map(city => <City city={city.cityName} silver={city.silver}/>);

  return (
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
  );
}

export function City(props) {
    return (
        <tbody>
        <tr>
            <td>{props.city}</td>
            <td>{props.silver}</td>
            <td>
                <CityActionDropdown/>   
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
        <DropdownButton id="dropdown-basic-button" title={dropdownSelection}>
        <Dropdown.Item href="#/action-1" onClick={handleOnClick}>Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2" onClick={handleOnClick}>Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3" onClick={handleOnClick}>Something else</Dropdown.Item>
        </DropdownButton>
    );
}