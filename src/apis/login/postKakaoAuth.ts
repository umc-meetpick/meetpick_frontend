import axios from "axios";

export const postKakaoAuth = async (authCode: string) => {
    const tokenUrl = "https://kauth.kakao.com/oauth/token";
    const data = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: "5595f2a84cb895af59630179b5f6d796",
        client_secret: "jKeP5ML0PhLvaadugrqB1gQkLpVLxRU9",
        redirect_uri: "http://3.38.151.77:8080/login/oauth2/code/kakao",
        code: authCode,
    });
    try {
        const response = await axios.post(tokenUrl, data.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        console.log(response.data);
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error response data:", error.response?.data);
          } else {
            console.error("Unexpected error:", error);
          }
    }
};
