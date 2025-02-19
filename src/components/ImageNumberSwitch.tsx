import original from "../../assets/profileImg/original.png"
import hamburger from "../../assets/profileImg/hamburger.png"
import study from "../../assets/profileImg/study.png"
import scarf from "../../assets/profileImg/scarf.png"
import hoodie from "../../assets/profileImg/hoodie.png"
import scholar from "../../assets/profileImg/scholar.png"
import headset from "../../assets/profileImg/headset.png"
import boxing from "../../assets/profileImg/boxing.png"
import witch from "../../assets/profileImg/witch.png"

const ImageNumberSwitch = (num: number) => {
    let imgUrl;
    switch(num){
        case 1:
            imgUrl = original
            break;
        case 2:
            imgUrl = hamburger
            break;
        case 3:
            imgUrl = study
            break;
        case 4:
            imgUrl = scarf
            break;
        case 5:
            imgUrl = hoodie
            break;
        case 6:
            imgUrl = scholar
            break;
        case 7:
            imgUrl = headset
            break;
        case 8:
            imgUrl = boxing
            break;
        case 9:
            imgUrl = witch
            break;
    }
    return imgUrl;

}

export default ImageNumberSwitch;