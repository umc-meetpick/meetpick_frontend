import axiosInstance from "../axiosInstance";

const getContactInfo = async (mappingId: number) => {
  try {
    const { data } = await axiosInstance.get(`/api/members/contact-info/${mappingId}`);
    if (data.isSuccess) {
      return data.result; // { contactType: "string", contactName: "string" }
    } else {
      throw new Error(data.message || "연락처 정보를 불러올 수 없습니다.");
    }
  } catch (error) {
    console.error("❌ 연락처 정보 불러오기 실패:", error);
    throw error;
  }
};

export default getContactInfo;
