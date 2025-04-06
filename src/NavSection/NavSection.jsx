import React from "react";
import './NavSection.css';

export default class NavSection extends React.Component{


    render(){
        return(
            <>
                <nav>
                    <a href="https://oscto1.github.io/">
                        <div  className="back">
                            <i></i>
                            <span id="back">Back</span>
                        </div>
                    </a>

                    <div className="logo">

                    {/* !--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style={{ width: '24px', height: '24px' }}><path fill="#f5ba09" d="M576 0c17.7 0 32 14.3 32 32l0 448c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-448c0-17.7 14.3-32 32-32zM448 96c17.7 0 32 14.3 32 32l0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352c0-17.7 14.3-32 32-32zM352 224l0 256c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32s32 14.3 32 32zM192 288c17.7 0 32 14.3 32 32l0 160c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-160c0-17.7 14.3-32 32-32zM96 416l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>
                    <h1>Sort Algorithm Visualizer</h1>
                    </div>
                    <div></div>
                    {/* <button type="button" onClick={()=>changeName()} className="btn btn-warning btn-circle btn-lg" style={{backgroundImage: `url(${ukFlag})`, backgroundSize: "cover"}} id="englishbtn"></button> */}

                </nav>
            </>
        )
    }
}

// function changeName(){

// }