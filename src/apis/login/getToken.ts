const getToken = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("access_token", token);

      window.history.replaceState({}, document.title, window.location.pathname);
      return token; // 토큰을 반환하도록 변경
    } 

    return token || localStorage.getItem("access_token");  // 기존 토큰 반환
  };

export default getToken;
