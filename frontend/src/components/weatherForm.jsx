import React from "react";

import { useNavigate } from "react-router-dom"

//creating a form component
export const WeatherForm = () => {

    const API_URL = "https://cloudiorepo.onrender.com/search";

    const [location, setLocation] = React.useState("");
    const [error, setError] = React.useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(API_URL , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: location })
        })

        const json = await response.json();

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {

            localStorage.setItem("city", location);

            setLocation("")
            console.log("City found", json)


            navigate(`/results?lat=${json.lat}&lng=${json.lng}`);
        }
    }
        
    return (
        <form onSubmit={handleSubmit}>
            <div className="input_submit max-lg:flex max-lg:flex-col max-lg:w-[80vw]">
                <input type="text" 
                placeholder="Enter your city name"
                value={location}
                onChange={(e) => setLocation(e.target.value.at(0).toUpperCase() + e.target.value.slice(1))}
                className="city_input w-100 mb-30 py-3 px-5 rounded-[30px] bg-white text-gray-800 font-medium 
                focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 max-lg:w-full max-lg:rounded-2xl max-lg:mb-10" />
                
                <button 
                type="submit"
                className="submit_btn ml-4 min-w-3xs py-3 px-6 rounded-[30px] bg-purple-500 text-white 
                font-medium hover:bg-purple-600 transition duration-200 hover:cursor-pointer max-lg:w-full max-lg:ml-0">
                Submit
                </button>

                {error && <div className="error-message text-red-500 font-medium">{error}</div> }
            </div>
        </form>
    )
}
