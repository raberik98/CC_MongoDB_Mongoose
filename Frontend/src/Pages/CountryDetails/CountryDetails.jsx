import { useState, useEffect } from "react";
import { getSpecificCountry } from "../../Services/Country.Service";
import { Link, useParams } from "react-router-dom";

import "./CountryDetails.scss"

export default function CountryDetails() {
  const [country, setCountry] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    getSpecificCountry(id)
      .then((data) => {
        setCountry(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <main>
        <section>
            <h1>{( country != null) ? country.name : "Loading..."}</h1>
            <h1>{( country != null && country.ruler) ? country.ruler : "This country is in full anarchy!"}</h1>
            <h4>{( country != null) ? country.callingCode : "Loading..."}</h4>
            <img src={( country != null) ? country.flag.large : null} alt="flag"></img>
            <Link to={"/countries"}>Go back to the previous page!</Link>
        </section>
    </main>
  );
}
