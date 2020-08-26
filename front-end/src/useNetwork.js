import React, { useState, useEffect } from "react";

const PRODUCT_URL = "";

const useNetwork = () => {
  const [response, updateResponse] = useState("");

  const makePostRequest = (url, params) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    requestOptions.body = JSON.stringify(params);
    fetch(url, requestOptions)
      .then((data) => data.json())
      .then((data) => {
        updateResponse(data);
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return { makePostRequest, response };
};

export default useNetwork;
