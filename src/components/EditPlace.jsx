import React, { Component } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

export default class EditPlace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ""
    };
  }

  componentDidMount = () => {
    this.setState({
      address: this.props.address
    });
  };

  handleChange = async el => {
    this.setState({ address: el.target.value });
  };

  handleSearch = async () => {
    const results = await geocodeByAddress(this.state.address);
    const latLng = await getLatLng(results[0]);
    latLng.address = this.state.address;
    this.props.newLatLng(latLng);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="d-inline"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <input
          type="button"
          className="btn btn-primary d-inline py-0"
          value="Search"
          onClick={this.handleSearch}
        />
      </div>
    );
  }
}
