const nickname = localStorage.getItem("nickname");
const foodProfileQuery = [
    {
      "question": [`${nickname}님 안녕하세요!\n당신만의 메이트 요정 피기예요!`,
        "🍚혼밥에서 구제해줄\n메이트를 찾고 계신가요?",
        `${nickname}님의 완벽한 메이트를\n찾기 위해 몇가지 질문을 준비했어요!`],
      "direction": "incoming",
      "options": ["좋아!"]
    },
    {
      "question": ["어떤 메이트분과 함께\n식사하고 싶으신가요?"],
      "direction": "incoming",
      "options": ["남성", "여성", "상관없어"],
      "type": "gender"
    },
    {
        "question": ["오호 그렇군요 ✔️", "어떤 전공의 메이트 분을\n찾고 계신가요?"],
        "direction": "incoming",
        "options": ["전공 선택", "상관없어"],
        "type": "major"
    },
    {
      "question": ["원하시는 학번의\n메이트가 있으실까요?"],
      "direction": "incoming",
      "options": ["동기", "선배", "후배", "상관없어"],
      "type": "studentNum"
    },
    {
      "question": ["희망하는 메이트의 나이가\n있으면 알려주세요!"],
      "direction": "incoming",
      "options": ["메이트 나이 설정하기", "상관없어"],
      "type": "age"
    },
    {
      "question": [ "메이트가 특정 성격이나\n스타일이면 좋을 것 같나요?"],
      "direction": "incoming",
      "options": ["응!","상관없어"],
      "type": "mbti"
    },
    {
      "question": [ "함께할 메이트분은\n어떤 성격이실까요? 🤔"],
      "direction": "incoming",
      "options": ["활기찬", "조용한","상관없어"],
      "type": "mbti-EI"
    },
    {
      "direction": "incoming",
      "options": ["현실적", "창의적","상관없어"],
      "type": "mbti-SN"
    },
    {
      "direction": "incoming",
      "options": ["객관적", "공감 만땅","상관없어"],
      "type": "mbti-TF"
    },
    {
      "direction": "incoming",
      "options": ["체계적", "유동적","상관없어"],
      "type": "mbti-JP"
    },
    {
      "question": [ "아하! 알겠습니다", `그럼, 취미가 ${nickname}님과\n비슷한 메이트를 원하세요?`],
      "direction": "incoming",
      "options": ["같으면 좋겠어","상관없어"],
      "type": "hobby"
    },
    {
      "question": [ "네 알겠습니다! 😊", "메이트와 함께하고 싶은\n요일과 시간대를 모두 선택해주세요!"],
      "direction": "incoming",
      "options": ["시간대 설정하기"],
      "type": "date"
    },
    {
      "question": [ `[${nickname}님과 시간이 맞는\n메이트를 찾아드릴게요`, "메이트와 어떤 음식을\n드시고 싶으세요?"],
      "direction": "incoming",
      "options": ["한식", "양식", "일식", "중식", "베트남식", "기타"],
      "type": "menu"
    },
    {
      "question": [ "헉 맛있겠다 ..🤤", "질문의 끝이 보여요!", "몇 명의 메이트와\n함께하고 싶나요?"],
      "direction": "incoming",
      "options": ["메이트 인원 수 설정하기"],
      "type": "peopleNum"
    },
    {
      "question": [ "마지막으로 메이트에게\n하고 싶은 말 있으실까요?",
        "사용자님이 특별히 원하는\n메뉴나 식당  ",
        "혹은 메이트가 참고해야하는\n 사항이 있으면 작성해주세요☺️"],
      "direction": "incoming",
      "options": [],
      "type": "ps"
    },
    {
      "question": [ "질문이 끝났어요!\n여기까지 답해주셔서 감사해요👍🏻",
         "답변해주신 내용을 바탕으로\n메이트를 찾아드릴게요.",
         "그럼 지금까지\n메이트 요정, 미기였습니다🍀",
        "👋"],
      "direction": "incoming",
      "options": [],
      "type": "final"
    },
  ]
  export default foodProfileQuery;