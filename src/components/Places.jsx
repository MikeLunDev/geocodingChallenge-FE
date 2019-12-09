import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

//FUNCTIONAL COMPONENT FOR THE AUTOCOMPLETE 
const Places = (props)=> {
  const [address, setAddress] = React.useState("");
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  //useEffect that looks for coordinates change
  //and if they are not null, create a Marker and pass them to the App.js in the handleCoordinates()
  React.useEffect(() => {
    if (coordinates.lat != null && coordinates.lng != null)
      props.passCoordinates({ ...coordinates, address });
  }, [coordinates]);
  
  //when the user choose a suggestion create the coordinates from that place
  //leveraging on getLatLng and geocodeByAddress, that are built in function to get coordinates 
  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
    setAddress("");
    setCoordinates({ lat: null, lng: null });
  };

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="row">
            <div className="w-100 col-12 position-relative">
              <label>
                <strong>Add a marker:</strong>
              </label>
              <input
                type="text"
                className="w-100 py-1 px-2"
                {...getInputProps({
                  placeholder:
                    "Erkelenzdamm 59 Elisabeth-Hof Portal 2a, 10999 Berlin, Germania"
                })}
              />
              <div
                style={{
                  zIndex: "999",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
                  padding: "0 6px",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                  position: "absolute",
                  top: "68px",
                  left: "13px",
                  right: "13px"
                }}
              >
                {loading ? <div>...loading</div> : null}
                {suggestions.map(suggestion => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    cursor: "pointer"
                  };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default Places