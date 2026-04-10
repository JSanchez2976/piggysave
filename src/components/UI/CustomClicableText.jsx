function CustomClicableText({className="", onClick=null,text=""}){
    return(
        <p className={className}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
        >
            {text}
        </p>
    )
}

export default CustomClicableText