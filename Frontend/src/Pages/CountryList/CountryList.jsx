import { useContext } from "react";
import { globalContext } from "../Layout/Layout";
import { useNavigate } from "react-router-dom";

import "./CountryList.scss"

export default function CountryList() {
  const navigate = useNavigate()
    const { countries } = useContext(globalContext)


  return (
    <main>
      <h1>Country List:</h1>
      {countries != null ? (
        <ul>
          {countries.map((nextCountry) => (
            <li key={nextCountry._id}><div>{nextCountry.name}
             <button className="counry-btn" onClick={() => navigate(`/country/${nextCountry.name}/${nextCountry._id} `)}>See more!</button> 
            </div></li>
          ))}
        </ul>
      ) : (
        <h2>Loading...</h2>
      )}
    </main>
  );
}
