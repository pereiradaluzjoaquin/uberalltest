import React from "react";
import axios from "axios";  

const public_key = "GNpPyrkYiTS5BV4F8XckW3kYurprwSk7cRG3Z4jOtrTTBceyfPveAOvDFk3mYY0ofundf";

export const getLastSearches = async (companyName, street, zip, countryName) => {
  const response = await axios.post("https://sandbox.uberall.com/api/search?public_key="+public_key+ "&name="+companyName+"&street="+street+"&zip="+zip+"&country="+countryName);
  return response.data.response;
}

export const checkStatusForSpecificDirectory = async (id, token, directory) => {
  const response = await axios.get("https://sandbox.uberall.com/api/search/" + id + "?public_key="+public_key+"&directory="+directory+"&token="+token);
  return response.data.response;
}
export const getCountryNames = async () => {
  const response = await axios.get("country_names.json");
  console.log(response.data);
  return response.data;
}

export const getCountriesAndDirectories = async () => {
  const response = await axios.get("countries_and_directories.json");
  return response.data;
}

export const getDirectoyLogos = async () => {
  const response = await axios.get("directory_logos.json");
  return response.data;
}

