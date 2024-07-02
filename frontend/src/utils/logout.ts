const logoutUtil = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/user/logout`,
    { credentials: "include" }
  );
  const data = await response.json();
  if (data.success) {
    
  }
  return await data;
};
export default logoutUtil;
