const nickname = localStorage.getItem("nickname");
const studyProfileQuery = [
    {
      "question": [`hello ${nickname}~ 메이트 요정 피기입니다.`,
        "Study 메이트 찾으시는군요.\n빠르게 questions 드릴게요!"],
      "direction": "incoming",
      "options": ["좋아!"],
      "type": "first"
    },
    {
      "question": ["mate와 어떤 공부를\n투게더하고 싶으신가요?",
        "전공/교양 선택시, 구체적인\n[과목명-교수명]을 알려주세요."],
      "direction": "incoming",
      "options": ["전공", "교양", "스터디"],
      "type": "studyType"
    },
    {
        "question": [ "Oh ok~👌","online으로 진행하시나요?\n아님 오프라인?"],
        "direction": "incoming",
        "options": ["온라인","오프라인"],
        "type": "onoff"
    },
    {
        "question": [ "스터디 빈도와 가능한 time\n모두 알려주세요~"],
        "direction": "incoming",
        "options": ["1~2회", "3~4회", "5~6회"],
        "type": "date"
    },
    {
        "question": [ "네 알겠습니다!", "함께하고 싶은 인원수도 알려주세요.", "How many people?"],
        "direction": "incoming",
        "options": ["메이트 인원 수 설정하기"],
        "type": "peopleNum"
    },
    {
        "question": [ "네 알겠습니다.\n생각해두신 place는 있을까요?", "있다면 채팅으로 알려주세요."],
        "direction": "incoming",
        "options": ["있어!","아직"],
        "type": "place"
    },
    {
        "question": ["I got it.","이제 mate 관련 질문 드릴게요.","어떤 mate와 함께\n공부하고 싶으신가요?"],
        "direction": "incoming",
        "options": ["남성", "여성", "상관없어"],
        "type": "gender"
    },
    {
        "question": ["찾으시는 특정 전공의\nmate가 있으실까요?"],
        "direction": "incoming",
        "options": ["전공 선택", "상관없어"],
        "type": "major"
    },
    {
      "question": ["원하는 학번은요?"],
      "direction": "incoming",
      "options": ["동기", "선배", "후배", "상관없어"],
      "type": "studentNum"
    },
    {
      "question": ["희망하는 mate의\nage가 있다면 알려주세요!"],
      "direction": "incoming",
      "options": ["메이트 나이 설정하기", "상관없어"],
      "type": "age"
    },
    {
        "question": [ "원하는 mate의\n특정 성격이 있으실까요?"],
        "direction": "incoming",
        "options": ["있어","상관없어"],
        "type": "mbti"
    },
    {
      "direction": "incoming",
      "options": ["활기찬", "조용한","상관없어"],
      "type": "mbti-EI"
    },
    {
      "direction": "incoming",
      "options": ["현실적", "창의적","상관없어어"],
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
      "question": [  "취미는 비슷하면 좋을까요?\nhobby? same?"],
      "direction": "incoming",
      "options": ["같으면 좋겠어","상관없어"],
      "type": "hobby"
    },
    {
      "question": [ "Lastly, mate에게\n하고 싶은 말이 있을까요?",
        "과목, 장소, 시간에 대한\n구체적인 정보",
        "이외에도 mate가 know해야하는\n사항이 있으면 write please😊"],
      "direction": "incoming",
      "options": [],
      "type": "ps"
    },
    {
      "question": [ "Ok~ questions are finish 👏",
        "답변해주신 내용을 바탕으로\nperfect mate를 find해드릴게요.",
         "그럼 지금까지\nyour mate 요정, 미기였습니다 🍀",
        "👋"],
      "direction": "incoming",
      "options": [],
      "type": "final"
    },
  ]
  export default studyProfileQuery;