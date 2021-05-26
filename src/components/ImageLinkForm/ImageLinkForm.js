import React from 'react';
//import "./ImagelinkForm.css";


const ImagelinkForm = ({onSubmit, onInputChange}) =>{
    return(
        <div>
        <p className="f3">
            {"Kiran's FaceAI will detect our or your Picture.Try this one and just mesmerize!"}
        </p>
        {/* <div className="alignCenter"> */}
        <div className="form">
            <input type="text" className="w-40 pa2 center" placeholder="Enter Image URL" onChange={onInputChange} />
            <button className="w-10 grow f4 ph3 pv2 dib white bg-light-blue pointer" onClick={onSubmit} >DETECT</button>
        </div>
        </div>
        // </div>
    )
}
export default ImagelinkForm;
