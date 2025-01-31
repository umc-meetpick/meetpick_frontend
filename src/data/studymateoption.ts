const StudyMateList = [
    {
        "id":1,
        "option": "공부 과목",
        "lists": ["전공","교양","자격증"]
    },
    {
        "id":2,
        "option": "성별",
        "lists": ["남성","여성"]
    },
    {
        "id":3,
        "option": "학번",
        "lists": ["동기","선배","후배"]
    },
    {
        "id":4,
        "option": "요일",
        "lists": ["월","화","수","목","금","토","일"]
    },
    {
        "id":5,
        "option": "시간",
        "lists": [
            { "label": "아침", "subOptions": ["5:00", "6:00", "7:00","8:00","9:00","10:00"] },
            { "label": "점심", "subOptions": ["11:00", "12:00", "13:00","14:00","15:00","16:00"] },
            { "label": "저녁", "subOptions": ["17:00", "18:00", "19:00","20:00","21:00","22:00"] }
        ]
    },
];

export default StudyMateList;