import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return (
        <div className=''>
            <p className='f3'>
                {'Upload Images and this app will detect the faces.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa1 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-red' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;