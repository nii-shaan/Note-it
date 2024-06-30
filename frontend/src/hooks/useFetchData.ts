import { useState } from "react";

/**
 * * What this function does?
 * * verifies accessToken if expired requests a new accessToken with refreshToken and fetches the data from the url provided and returns it as normally
 *
 * @param url
 */
const useFetchData = async (url?: string) => {
  const verifyAccessTokenResponse = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/verifyJWT`,
    { credentials: "include" }
  );
  const accessTokenData = await verifyAccessTokenResponse.json();
  const isAccessTokenExpired = accessTokenData.message === "jwt expired";
  console.log(isAccessTokenExpired);
  if (isAccessTokenExpired) {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/refreshtoken`, {
      credentials: "include",
    });
  }
};

export default useFetchData;
