const exerciseProfileQuery = [
    {
      "question": ["[닉네임] 하이!\n너만의 메이트 요정 피기야!",
        "함께할 운동 메이트를 찾고 있네~",
        "메이트 관련 질문에 앞서\n운동 관련 질문 몇가지 준비했어!"],
      "direction": "incoming",
      "options": ["좋아!"],
      "type": "first"
    },
    {
      "question": ["메이트와 어떤 운동을\n함께하고 싶어?"],
      "direction": "incoming",
      "options": ["🎳볼링", "🧗🏻클라이밍", "🏓탁구","🏋🏻헬스", "🏃러닝/조깅", "⚽️축구/풋살", "🏀농구", "🏸테니스 /배드민턴", "기타"],
      "type": "exercise"
    },
    {
        "question": [ "오 오키 👌", "운동은 언제 하고 싶어?"],
        "direction": "incoming",
        "options": ["시간대 설정하기"],
        "type": "date"
    },
    {
        "question": [ "너랑 시간이 맞는\n메이트를 찾아볼게!", "몇 명의 메이트와\n함께 운동하고 싶어?"],
        "direction": "incoming",
        "options": ["메이트 인원 수 설정하기"],
        "type": "peopleNum"
    },
    {
        "question": [ "운동은 어디에서 할 거야?\n외부시설은 직접 입력해줘!"],
        "direction": "incoming",
        "options": ["학교시설", "외부시설"],
        "type": "place"
    },
    {
        "question": ["응 알겠어 😊","이제 [닉네임](이)의 완벽한\n메이트를 찾기 위한 질문을 할게."],
        "direction": "incoming",
        "options": ["좋아!"]
    },
    {
        "question": ["어떤 메이트랑 함께 운동하고 싶어?"],
        "direction": "incoming",
        "options": ["남성", "여성", "상관없어"],
        "type": "gender"
      },
    {
        "question": ["오호 그렇군 ✔️", "어떤 전공의 메이트랑\n운동하고 싶어?"],
        "direction": "incoming",
        "options": ["전공 선택", "상관없어"],
        "type": "major"
    },
    {
      "question": ["원하는 특정 학번이 있어?"],
      "direction": "incoming",
      "options": ["동기", "선배", "후배", "상관없어"],
      "type": "studentNum"
    },
    {
      "question": ["희망하는 메이트 나이가 있다면\n그것도 알려줘~"],
      "direction": "incoming",
      "options": ["메이트 나이 설정하기", "상관없어"],
      "type": "age"
    },
    {
        "question": [ "메이트가 특정 성격이나\n스타일이면 좋을 것 같아?"],
        "direction": "incoming",
        "options": ["응!","상관없어"],
        "type": "mbti"
    },
    {
      "question": [ "그렇다면 함께할 메이트는 어떤 성격일까? 🤔"],
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
      "question": [  "취미는 어땠으면 좋겠어?\n비슷한 메이트가 좋을 것 같아?"],
      "direction": "incoming",
      "options": ["같으면 좋겠어","상관없어"],
      "type": "hobby"
    },
    {
      "question": [ "마지막으로 메이트에게\n하고 싶은 말이 있어?","혹은 메이트가 참고해야하는\n사항이 있으면 입력해줘😊"],
      "direction": "incoming",
      "options": [],
      "type": "ps"
    },
    {
      "question": [ "메이트에게 꼭 전달해줄게~",
        "이제 질문은 끝났어 👏",
         "답변해준 내용을 바탕으로\n한 번 열심히 찾아볼게!",
         "그럼 지금까지\n너의 메이트 요정, 미기였어 🍀",
        "👋"],
      "direction": "incoming",
      "options": [],
      "type": "final"
    },
  ]
  export default exerciseProfileQuery;