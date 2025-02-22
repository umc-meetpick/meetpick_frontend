import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useContext,useRef, useState } from "react";
import { FoodProfileInfoContext } from "../context/foodProfileInfo";
import majorList from "../assets/majorList";

interface SelectedProps {
    input: string[];
    multi?: boolean;
}

const ProfileSelectedBorder:React.FC<SelectedProps> = ({input, multi}) =>{
    const { selectedMajors, setSelectedMajors, majors, setMajors } = useContext(FoodProfileInfoContext);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState<number | null>(null);
    const handleMajor = (major:string) =>{
        if (multi) {
            if (selectedMajors.includes(major)) {
                setSelectedMajors(selectedMajors.filter((m) => m !== major));
                setMajors(majors.filter((m) =>  m !== major))
                if (major.includes("전체")){
                    majorList.map((college)=>{
                        if (college.title+" 전체" == major){
                            setMajors(majors.filter((m) => !college.items.includes(m)))
                        }
                    })
                    setMajors
                }
            } else {
                setSelectedMajors([...selectedMajors, major]);
            }
        }
    };
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.scrollLeft || 0));
      };
    
      const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || startX === null || !scrollRef.current) return;
        const newScrollLeft = -(e.pageX - startX);
        scrollRef.current.scrollLeft = newScrollLeft;
      };
    
      const handleMouseUp = () => {
        setIsDragging(false);
        setStartX(null);
      };
    
    return(
        <Container
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {input.map((item, index) => {
                const isImage = item.endsWith(".png");
                return isImage ? (
                    <ImgBorder key={index} src={item} alt={`image-${index}`} />
                ) : (
                    <Border key={index} $length={item.length} $multi={multi ?? false}>
                        {multi ? <Blue>{item} <IoClose className="close-icon" onClick={()=>handleMajor(item)}/></Blue> : item}
                    </Border>
                );
            })}
        </Container>
    );
}
export default ProfileSelectedBorder;

const Container = styled.div`
    width:310px;
    height:35px;
    margin:0 auto;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    justify-content: flex-start; 
    margin-bottom: 30px;
    gap:10px;
    font-family: 'Pretendard Variable', sans-serif;
    font-weight:600;
    cursor: pointer;
    &::-webkit-scrollbar {
        display: none;
    }
    &:active {
        cursor: grabbing;
    }
`;
const Border = styled.div<{ $length: number, $multi: boolean }>`
    color:black;
    font-size:13px;
    font-weight:400;
    text-align:center;
    line-height:28px;
    width: ${({ $length }: { $length: number }) => ($length > 0 ? `${$length*13}px` : "30px")};
    height:28px;
    border: ${({$multi})=> $multi ? "1px solid #007AFD" : "1px solid #1B98FF"};
    background-color: ${({$multi})=> $multi ? "#EAF6FF" : "#ECF6FF"};
    border-radius:100px;
    white-space: nowrap;
    padding: 0 10px;
    z-index:5;
`;
const ImgBorder = styled.img`
    width:28px;
    height:28px;
    border: 1px solid #1B98FF;
    border-radius:100px;
`;
const Blue = styled.div`
    color: #007AFD;
    .close-icon{
        size:15px;
        position:relative;
        top:1px;
    }
`;