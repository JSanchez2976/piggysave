import Slice from "../../components/UI/Slice"
import Slice1 from "../../assets/Slice1.png"
import Slice2 from "../../assets/Slice2.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OnBoard() {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSlides = 2;
    const navigate = useNavigate("")

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1));
        if (activeIndex >= totalSlides - 1) {
            navigate("/auth")
        }
    };

    const data = activeIndex === 0 ? {
        title:"Welcome to PiggySave",
        imgUrl: Slice1
    } : {
        title: "Are you ready to take control of your finances?",
        imgUrl: Slice2
    }

    return (
        <>
            <Slice img={<img src={data.imgUrl} alt="" className="h-100" />}
                title={data.title}
                body={
                    <>
                        <button className="text-green-dark border-0 bg-transparent"
                            onClick={handleNext}><h2>Next</h2></button>
                        <div className="d-flex d-block justify-content-center mt-3">
                            <button className={`round-button ${activeIndex === 0 ? 'active' : ''}`} />
                            <button className={`round-button ${activeIndex === 1 ? 'active' : ''}`} />
                        </div>
                    </>
                } />
        </>
    )
}

export default OnBoard