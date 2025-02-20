import axiosInstance from "../axiosInstance";

export const getUniversities = async (universityName:string) => {
    if(!universityName) return []; // 입력이 없으면 요청을 안 보냄
    try {
        const response = await axiosInstance.get(`/api/university/list/${universityName}`);
        console.log("API 응답 데이터:", response.data); // 응답 데이터 확인용 로그 추가 
        return response.data.result; // API 응답의 'result' 배열 반환 
    } catch (error) {
        console.error("Error fetching universities :", error);
        return []; // 오류 발생 시 빈 배열 반환 
    }
};
