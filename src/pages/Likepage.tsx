import { useState, useEffect } from "react";

const LikePage = () => {
    // 카테고리별 찜한 목록 저장하는 상태 
  const [favorites, setFavorites] = useState<{[key:string]:string[]}>({
    exercise:[],
    food:[],
    study:[]
  });

  useEffect(() => {
    const storedFavorites: { [key: string]: string[] } = {
        exercise: [],
        food: [],
        study: []
      };


    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("heart_")) {
        const isFavorite = JSON.parse(localStorage.getItem(key) || "false");
        if (isFavorite) {
            // 키에서 카테고리 추출 ex) heart_exercise_1 -> exercise
          const parts=key.split("_");
          if(parts.length ===3 ){
            const category =parts[1]; // "exercise" | "food" | "study"
            const mateId = parts[2]; // ID 값 

            if(storedFavorites[category]){
                storedFavorites[category].push(mateId);
            }
          }
        }
      }
    }
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h2>찜한 메이트 목록</h2>
      {Object.entries(favorites).map(([category,mates]) => (
        <div key={category}>
            <h3>{category === "exercise" ? "운동" : category==="food"? "혼밥" :"공부"} 메이트</h3>
            {mates.length ===0? (
                <p>찜한 메이트가 없습니다.</p>   
            ) : (
                <ul>
                    {mates.map((mateId) => (
                        <li key={mateId}>Mate ID : {mateId}</li>
                    ))}
                </ul>
            )}
        </div>
      )) }
    </div>
  );
};

export default LikePage;
