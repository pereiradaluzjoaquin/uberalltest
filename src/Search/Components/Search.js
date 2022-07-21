import React from "react";
import { useEffect, useState } from 'react';
import { getCountryNames, getLastSearches, checkStatusForSpecificDirectory, getCountriesAndDirectories, getDirectoyLogos } from "../Api/api";


export const Search = () => {
    const [countryNames, setCountryNames] = useState([]);
    const [countriesAndDirectories, setCountriesAndDirectories] = useState({});
    const [directoryLogos, setDirectoryLogos] = useState({});
    const [countryName, setCountryName] = useState("DE");
    const [companyName, setCompanyName] = useState("");
    const [street, setStreet] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [statusList, setStatusList] = useState([]);
    useEffect(() => {
        getCountryNames().then((data) => setCountryNames(Object.entries(data)));
        getCountriesAndDirectories().then((data) => setCountriesAndDirectories(data));
        getDirectoyLogos().then((data) => setDirectoryLogos(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (companyName === "" || street === "" || zipCode === "") { 
            alert("Please fill in all fields"); 
            return false;
        }
        setStatusList([]);
        getLastSearches(companyName, street, zipCode, countryName).then(data => {
            const getDirectoriesByCountry = countriesAndDirectories[countryName];
            for (let i = 0; i < getDirectoriesByCountry.length; i++) {
                const directory = getDirectoriesByCountry[i];
                checkStatusForSpecificDirectory(data.searchData.id, data.searchData.token, directory).then(status => {
                    setStatusList((prevStatusList) => [...prevStatusList, status.result]);
                });
            }

        });
    }
    return (
        <div className="container mt-5">
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-sm-12 col-md-2 mb-3">
                    <select data-testid="CountryNames" class="form-select form-select-md" aria-label="Default select example" value={countryName} onChange={e => setCountryName(e.target.value)}>
                        {countryNames.map(([key, value]) => <option value={key}>{value}</option>)}
                    </select>
                </div>
                <div className="col-sm-12 col-md-3 mb-3">
                    <input type="text" value={companyName} class="form-control" placeholder="Company Name" aria-label="Company Name" onChange={e => setCompanyName(e.target.value)} />
                </div>
                <div className="col-sm-12 col-md-3 mb-3">
                    <input type="text" value={street} class="form-control" placeholder="Street and Number" aria-label="Street and Number" onChange={e => setStreet(e.target.value)} />
                </div>
                <div className="col-sm-12 col-md-2 mb-3">
                    <input type="number" min="0" value={zipCode} class="form-control" placeholder="Zip/PostCode" aria-label="Zip Code" onChange={e => setZipCode(e.target.value)} />
                </div>
                <div className="col-sm-12 col-md-2   mb-3">
                    <button type="submit" class="btn btn-primary">CHECK NOW</button>
                </div>
            </form>
            <h4 className="mt-4">Results</h4>
            <div class="table-responsive mt-4">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Directory</th>
                            <th scope="col">Business Info</th>
                            <th scope="col">Hour</th>
                            <th scope="col">Photos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statusList.map((status, key) => {
                            let directory;
                            if (status.name === null) {
                                directory = <p>Listing not found</p>;
                            } else {
                                directory = <div><p>{status.name}</p><p>{status.streetAndNo}</p><p>{status.phone}</p><p>{status.website}</p></div>;
                            }
                            return (
                                <tr key={key}>
                                    <td><img src={directoryLogos[status.directoryType]} width={"43px"}></img><p>{status.directoryType}</p></td>
                                    <td>{directory}</td>
                                    <td>{status.openingHoursStatus === "PRESENT" ? <i class="bi bi-check-lg" style={{ color: "green" }}></i> : status.openingHoursStatus === "MISSING" ? <i class="bi bi-x-lg" style={{ color: "red" }}></i> : <i class="bi bi-slash-lg" style={{ color: "grey" }}></i>}</td>
                                    <td>{status.photosStatus === "PRESENT" ? <i class="bi bi-check-lg" style={{ color: "green" }}></i> : status.photosStatus === "MISSING" ? <i class="bi bi-x-lg" style={{ color: "red" }}></i> : <i class="bi bi-slash-lg" style={{ color: "grey" }}></i>}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total: {statusList.length}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}