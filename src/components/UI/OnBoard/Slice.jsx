import FormBackground from "../FormBackground";

function Slice({ title, img, body }) {
    const sliceContent = (
        <>
            <div className="slice-circle">
                {img}
            </div>
            <div className="d-flex flex-column align-items-center">
                {body}
            </div>
        </>
    );

    return (
        <FormBackground 
            title={title} 
            body={sliceContent} 
        />
    );
}

export default Slice;