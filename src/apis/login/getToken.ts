import axiosInstance from "../axiosInstance";

const getToken = () => {
  axiosInstance
    .get(`/oauth/authorize/kakao`)
    .then(response => {
      console.log("로그인 성공:", response.data);
      localStorage.setItem("access_token", response.data.token);
    })
    .catch(error => {
        if (error.response) {
            // 서버 응답이 있을 경우 처리
            console.error("응답 오류:", error.response);
          } else {
            // 네트워크 오류 등 서버 응답이 없는 경우 처리
            console.error("네트워크 오류:", error.message);
          }
    });
};

export default getToken;
