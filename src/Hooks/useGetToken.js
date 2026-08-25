const useGetToken = () => {
  const getToken = () => {
    let token = "";
    let name = "token=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        token = c.substring(name.length, c.length);
      }
    }

    return token;
  };
  return { getToken };
};

export default useGetToken;
