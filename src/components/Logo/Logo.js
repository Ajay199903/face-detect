import React from 'react';
import logoPhoto from './Logo.png';
{/* <div>
    Icons made by 
    <a href="https://www.freepik.com" 
    title="Freepik">Freepik</a> from 
    <a href="https://www.flaticon.com/" 
    title="Flaticon">www.flaticon.com</a></div> 
*/}
const Logo = () => {
    return(
        <div style = {{display:'flex', justifyContent:'flex-start',height:'150px',width:'150px'}} 
            className = "bg-light-green br3 pa3 ma2 grow bw2 shadow-5 mw5">
            <div style = {{display:'block', margin:'auto'}}>
                <img alt = "logo" src = {logoPhoto} />
            </div>
        </div>
    );
}

export default Logo;