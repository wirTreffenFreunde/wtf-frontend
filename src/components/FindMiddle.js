import { useState } from "react";

import { getCenterOfBounds } from "geolib";
import axios from "axios";

const keyAPI = process.env.REACT_APP_API_KEY

function FindMiddle() {
    // input fields for everyone
    const [peopleAddresses, setPeopleAddresses] = useState({
        person1: "",
        person2: "",
        person3: "",
        person4: "",
        person5: "",
    });
    // middle point
    const [middlePoint, setMiddlePoint] = useState("");

    // saving all the input fields
    const handleChangeMiddle = (e) => {
        setPeopleAddresses({
            ...peopleAddresses,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitMiddle = async (e) => {
        e.preventDefault();
        console.log(peopleAddresses);
        const geoPeopleAddresses = []; // array for co-ordinates
        for (const person in peopleAddresses) {
            if (peopleAddresses[person]) {
                // parsing all the input fields to co-ordinates
                const geoPosition = await axios(
                    `https://geocode.search.hereapi.com/v1/geocode?q=${peopleAddresses[person]}&apiKey=${keyAPI}`
                );
                let lat = geoPosition.data.items[0].position.lat;
                let lng = geoPosition.data.items[0].position.lng;
                geoPeopleAddresses.push({ latitude: lat, longitude: lng });
            }
        }
        console.log(geoPeopleAddresses);

        const geoMiddle = getCenterOfBounds(geoPeopleAddresses); // geolib function to find center of all the points
        // converting back co-ordinates to the address
        const middleAddress = await axios(
            `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=${keyAPI}&pos=${geoMiddle.latitude},${geoMiddle.longitude},0&mode=retrieveAll&prox=${geoMiddle.latitude},${geoMiddle.longitude},50`
        );

        setMiddlePoint(
            middleAddress.data.Response.View[0].Result[0].Location.Address.Label // Saving the label (city, country and so on)
        );
    };

    return (
        <div className="FindMiddle">
            <h2>Find middle point for 5 people</h2>
            <div>
                <form onSubmit={handleSubmitMiddle}>
                    <div>
                        <label htmlFor="person1">1: </label>
                        <input
                            type="text"
                            name="person1"
                            onChange={handleChangeMiddle}
                        />
                    </div>

                    <div>
                        <label htmlFor="person2">2: </label>
                        <input
                            type="text"
                            name="person2"
                            onChange={handleChangeMiddle}
                        />
                    </div>

                    <div>
                        <label htmlFor="person3">3: </label>
                        <input
                            type="text"
                            name="person3"
                            onChange={handleChangeMiddle}
                        />
                    </div>

                    <div>
                        <label htmlFor="person4">4: </label>
                        <input
                            type="text"
                            name="person4"
                            onChange={handleChangeMiddle}
                        />
                    </div>

                    <div>
                        <label htmlFor="person5">5: </label>
                        <input
                            type="text"
                            name="person5"
                            onChange={handleChangeMiddle}
                        />
                    </div>

                    <button>Find middle</button>

                    {middlePoint && <p>{middlePoint}</p>}
                </form>
            </div>
        </div>
    );
}
export default FindMiddle;
