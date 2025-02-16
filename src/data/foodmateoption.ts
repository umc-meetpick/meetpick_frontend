const FoodMateList = [
    {
        "id":1,
        "option": "성별",
        "lists": ["여성","남성"]
    },
    {
        "id":2,
        "option": "학번",
        "lists": ["동기","선배","후배"]
    },
    {
        "id":3,
        "option": "요일",
        "lists": ["월","화","수","목","금","토","일"]
    },
    {
        "id":4,
        "option": "시간",
        "lists": [
            { "label": "점심", "subOptions": ["11:00", "12:00", "13:00","14:00","15:00","16:00"] },
            { "label": "저녁", "subOptions": ["17:00", "18:00", "19:00","20:00","21:00","22:00"] }
        ]
    },
    {
        "id":5,
        "option": "음식 종류",
        "lists": ["한식","향식","일식","중식","베트남식","기타"]
    },
];

export default FoodMateList;