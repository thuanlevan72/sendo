import { AiOutlineArrowUp } from "react-icons/ai"
const GoToTop = () => {
 
    const handleGotoTop=()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
    }
    return (
        <>
        <div className="flex justify-end fixed bottom-24 right-10 z-50">
        <button className=" sticky bottom-24 right-10 z-50 bg-gray-300 rounded text-[24px] text-bold p-2 text-gray-600" onClick={handleGotoTop}><AiOutlineArrowUp/></button>
        </div>
        </>
       
    )
}
export default GoToTop