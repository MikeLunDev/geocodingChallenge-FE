import React from "react";
import Places from "./components/Places";
import EditPlace from "./components/EditPlace";
import MapWrapped from "./components/Map";
import { BASE_URL } from "./utils/constants";

//create ad HOC component wrapping the map with the API
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [],
      showEdit: {
        markerId: "",
        lat: "",
        lng: "",
        address: ""
      }
    };
  }

  //this function post new coordinates on the db and add them to the local state
  handleCoordinates = async data => {
    const resp = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const { newMarker } = await resp.json();
    this.setState({
      coordinates: [...this.state.coordinates, newMarker]
    });
  };

  //this function delete coordinates based on ID both on the db and on the local state
  handleMarkerDelete = async markerId => {
    try {
      const response = await fetch(`${BASE_URL}/${markerId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "DELETE"
      });
      if (response.ok) {
        const { deletedMarkerId } = await response.json();
        let coordinates = this.state.coordinates.filter(
          current => current._id !== deletedMarkerId
        );
        this.setState({
          coordinates
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //this function get the id of the item to modify and add it to the local state
  handleMarkerEdit = markerId => {
    this.setState({
      showEdit: { ...this.state.showEdit, markerId }
    });
  };
  //this function get the new latitude and longitude and put it on the local state
  handleNewLatLng = latLng => {
    this.setState({
      showEdit: { ...this.state.showEdit, ...latLng }
    });
  };

  //save the edited marker on the db, modify the local state and reset the showedit object
  handleEditSave = async markerId => {
    const { lat, lng, address } = this.state.showEdit;
    try {
      const resp = await fetch(`${BASE_URL}/${markerId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
          address,
          lat,
          lng
        })
      });
      if (resp.ok) {
        const json = await resp.json();
        const newMarkerIndex = this.state.coordinates.findIndex(
          el => el._id === markerId
        );
        newMarkerIndex !== undefined
          ? this.setState({
              coordinates: [
                ...this.state.coordinates.slice(0, newMarkerIndex),
                json.newMarker,
                ...this.state.coordinates.slice(newMarkerIndex + 1)
              ],
              showEdit: { lat: "", lng: "", markerId: "" }
            })
          : this.setState({ showEdit: { lat: "", lng: "", markerId: "" } });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //on the component did mount fetch the db searching for saved markers on the db, and put them on the local state
  componentDidMount = async () => {
    try {
      const resp = await fetch(`${BASE_URL}`);
      if (resp.ok) {
        const json = await resp.json();
        this.setState({ coordinates: json });
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            overflow: "hidden"
          }}
        >
          <div className="row no-gutters w-100 h-100 mx-0 my-0 px-0">
            {/* LEFT COL (MAP) */}
            <div className="col-6">
              <MapWrapped
                //coordinates are passed here
                customMarkers={this.state.coordinates}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: `50%`, width: `80%` }} />}
                containerElement={
                  <div
                    style={{
                      height: `100%`,
                      width: `100%`
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
              />
            </div>
            {/* RIGHT COL (MARKERS) */}
            <div className="col-6" style={{ height: "100vh" }}>
              <div className="container pt-1" style={{ height: "10%" }}>
                <Places passCoordinates={this.handleCoordinates} />
              </div>
              <div
                className="container pt-3"
                style={{
                  overflowY: "scroll",
                  height: "90%",
                  width: "100%"
                }}
              >
                {/* ROW CONTAINING MARKERS */}
                <div className="row w-100 mx-0">
                  {this.state.coordinates.length > 0 &&
                    this.state.coordinates.map((marker, index) => (
                      /* MARKER COL */
                      <div
                        className="col-12 col-md-6 col-xl-4 px-1
                         align-items-end my-1 mb-4"
                        key={index}
                      >
                        <div className="container-fluid px-0 h-100 w-100">
                          <div
                            className="row h-100 w-100 mx-0"
                            style={{ border: "1px solid black" }}
                          >
                            {/* CONDITIONAL RENDER OF THE MARKERS CARD BASED ON SHOWEDIT */}
                            <div className="px-2 py-2 col-12">
                              {this.state.showEdit.markerId !== marker._id ? (
                                <ul className="list-unstyled ">
                                  <li>
                                    <strong>Address:</strong> {marker.address}
                                  </li>
                                  <li>
                                    <strong>Lat:</strong> {marker.lat}
                                  </li>
                                  <li>
                                    <strong>Lng:</strong> {marker.lng}
                                  </li>
                                </ul>
                              ) : (
                                <>
                                  <EditPlace
                                    address={marker.address}
                                    newLatLng={this.handleNewLatLng}
                                  />
                                  <ul className="list-unstyled ">
                                    <li>
                                      <strong>Lat:</strong>{" "}
                                      {this.state.showEdit.lat}
                                    </li>
                                    <li>
                                      <strong>Lng:</strong>{" "}
                                      {this.state.showEdit.lng}
                                    </li>
                                  </ul>
                                </>
                              )}
                            </div>
                            {/* CONDITIONAL RENDERING OF THE BUTTONS OF THE MARKER CARD BASED ON SHOWEDIT */}
                            {this.state.showEdit.markerId !== marker._id ? (
                              <div className="d-flex justify-content-between align-self-end px-1 pb-1 col-12">
                                <input
                                  onClick={() =>
                                    this.handleMarkerEdit(marker._id)
                                  }
                                  type="button"
                                  className="btn btn-outline-primary d-block"
                                  value="Edit"
                                />
                                <input
                                  onClick={() =>
                                    this.handleMarkerDelete(marker._id)
                                  }
                                  type="button"
                                  className="btn btn-outline-danger d-block"
                                  value="Delete"
                                />
                              </div>
                            ) : (
                              <div className="d-flex justify-content-between align-self-end px-1 pb-1 col-12">
                                <input
                                  onClick={() =>
                                    this.handleEditSave(marker._id)
                                  }
                                  type="button"
                                  disabled={
                                    this.state.showEdit.lat !== "" &&
                                    this.state.showEdit.lng !== ""
                                      ? false
                                      : true
                                  }
                                  className="btn btn-outline-primary d-block"
                                  value="Save"
                                />
                                <input
                                  onClick={() =>
                                    this.setState({
                                      showEdit: { markerId: "" }
                                    })
                                  }
                                  type="button"
                                  className="btn btn-outline-danger d-block"
                                  value="Cancel"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/* END OF MARKERS CONTAINER */}
            </div>
            {/* END OF RIGHT PART COL-6 */}
          </div>
          {/* END OF MAIN ROW */}
        </div>
        {/* END OF WHOLE PAGE CONTAINER */}
      </>
    );
  }
}
