function CustomButton({onClick=null, type="button",className="",text=""}) {
    return (
        <button
        onClick={onClick}
        type={type}
        className={`${className} cust-button`}
        >
            {text}
        </button>
    )
}


export default CustomButton