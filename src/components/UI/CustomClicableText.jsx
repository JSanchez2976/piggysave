function CustomClicableText({className="", onClick=null,text=""}){
    return(
        <p className={className}
        style={{ cursor: 'pointer' ,
            margin: 0
        }}
        onClick={onClick}
        >
            {text}
        </p>
    )
}

export default CustomClicableText