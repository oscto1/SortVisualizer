import React from "react";
import 'react-range-slider-input/dist/style.css';
import "./SortingVisualizer.css";
import { getSortAnimations, mergeSort, quickSort, heapSort, bubbleSort} from "./SortingAlgorithms";
import RangeSlider from 'react-range-slider-input';


export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
            speed: [-50, -1],
            barCount: [0, 175],
            isPlaying: false,
        };

        this.timeoutIDs = [];
        
    }
    

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for (let i = 0; i < this.state.barCount[1]; i++){
            array.push(randomIntFromInterval(7,1000));
        }
        this.setState({array});
        let bars = document.getElementsByClassName("arrayBar");
        for(var i = 0; i < bars.length; i++){
            bars[i].style.backgroundColor="#f5ba09";
            //bars[i].style.width=100/(this.state.barCount[1]) + "%";
            console.log(100/this.state.barCount[1]);
        }
        let playButton = document.getElementById("playButton");
        playButton.removeAttribute('disabled');
    }

    animate(animations, speed, isPlaying){
        this.timeoutIDs = [];

        const arrayBars = document.getElementsByClassName('arrayBar');
        console.log(animations);
        
        for(let i=0; i<animations.length; i++){
            let isColorChange = i % 3 !== 2;
            if(isColorChange){;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? 'red' : '#f5ba09';
                const timeoutId = setTimeout(() => {
                    if(!isPlaying()) return;

                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;    
                  }, i * Math.abs(speed[1]));
                this.timeoutIDs.push(timeoutId);
            }else {    
                const timeoutId = setTimeout(() => {
                    if(!isPlaying()) return;

                    if(animations[i].length === 2){
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
    
                        barOneStyle.height = `${newHeight/10}%`;
                        // arrayBars[barOneIdx].innerHTML = `${newHeight}`;
                    }else{
                        const [barOneIdx, newHeight1, barTwoIdx, newHeight2] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
    
                        //  barOneStyle.height = `${newHeight*10}%`;
                        barOneStyle.height = `${newHeight1/10}%`;
                        barTwoStyle.height = `${newHeight2/10}%`;
                        // arrayBars[barOneIdx].innerHTML = `${newHeight}`;
                    }

                    if (i === animations.length - 1) {
                        this.setState({ isPlaying: false });
                        const playButton = document.getElementById("playButton");
                        if (playButton) playButton.innerText = "Play";
                        document.getElementById('generateArrButton').removeAttribute('disabled');
                    }
                }, i * Math.abs(speed[1]));
                this.timeoutIDs.push(timeoutId);
            }
        }

        
    };

    handleBarsChange(newNumBars){
        this.setState((prevState) => {
            const newArray = [...prevState.array];

            if(newNumBars > newArray.length){
                const barsToAdd = newNumBars - newArray.length;
                for(let i=0; i<barsToAdd; i++){
                    newArray.push(randomIntFromInterval(7,1000));
                }  
            }else if(newNumBars < this.state.array.length){
                newArray.length = newNumBars;
            }

            return {
                barCount: [0, newNumBars],
                array: newArray,
            }
        }, () => {
            //console.log("Updated bar count: " + newNumBars);
        })    
    }

    handleSpeedChange(newSpeed){
        this.setState((prevState) => ({
            speed: newSpeed
        }));
        //console.log(this.state.speed);
    }

    playAnimation(){
        const algSelected = document.getElementById('algorithmTypeSelect').value;
        console.log(algSelected);
        let playButton = document.getElementById("playButton");

        if(this.state.isPlaying){

            this.setState({isPlaying: false}, ()=>{
                playButton.innerText = "Play";
                document.getElementById('generateArrButton').removeAttribute('disabled');
                this.timeoutIDs.forEach(id => {clearTimeout(id)});
                this.timeoutIDs = [];
                this.resetArray();
            });
            
            return;
        }
       
        this.setState({isPlaying: true}, ()=>{
            playButton.innerText = "Stop";
            playButton.setAttribute('playing', true);
            document.getElementById('generateArrButton').setAttribute('disabled', true);
            //playButton.setAttribute('disabled');
            switch(algSelected){
                case "merge":
                    this.mergeSortL();
                    break;
                case "quick":
                    this.quickSortL();
                    break;
                case "heap":
                    this.heapSortL();
                    break;
                case "bubble":
                    this.bubbleSortL();
                    break;
                default:
                    console.log("No algorithm type selected");
                    break;
            
            }
        })  
        
        
    }
    
    mergeSortL(){
        const animations = getSortAnimations(this.state.array, 1);
        this.animate(animations, this.state.speed, ()=>this.state.isPlaying);
    }

    quickSortL(){
        const animations = getSortAnimations(this.state.array, 2);
        this.animate(animations, this.state.speed, ()=>this.state.isPlaying);
    }

    heapSortL(){
        const animations = getSortAnimations(this.state.array, 3);
        this.animate(animations, this.state.speed, ()=>this.state.isPlaying);
    }

    bubbleSortL(){
        const animations = getSortAnimations(this.state.array, 4);
        this.animate(animations, this.state.speed, ()=>this.state.isPlaying);
    }


    // Test sort algorithms comparing the results to javascript sort function
    testSortAlg(algType){
        

        for(let i=0; i<50; i++){
            const array = [];
            const tempArray = [];
            for (let i=0; i<100; i++){
                array.push(randomIntFromInterval(-1000,1000));
                tempArray.push(array[i]);
            }
            let javascriptSortArr = tempArray.slice().sort((a, b) => a - b);

            

            switch(algType){
                case 1:
                    //loop to extract only the values.
                    let mergeArray = JSON.parse(JSON.stringify(mergeSort(array)));
                    for(let i=0; i<mergeArray.length; i++){
                        mergeArray[i] = mergeArray[i].value;
                    }
                    console.log("Test MERGE SORT algorithm: " + areEqualArr(javascriptSortArr, mergeArray)); 
                    break;
                case 2:
                    console.log("Test QUICK SORT algorithm: " + areEqualArr(javascriptSortArr, quickSort(array, 0, array.length-1)));
                    break;
                case 3:
                    console.log("Test HEAP SORT algorithm: " + areEqualArr(javascriptSortArr, heapSort(array)));
                    break;
                case 4:
                    console.log("Test BUBBLE SORT algorithm: " + areEqualArr(javascriptSortArr, bubbleSort(array)));
                    break;
                default:
                    console.log("No type of algorithm selected.");
                    break;
            }
                       
        }
    }

    render(){
        const {array} = this.state;

        return (
            <>
                <div className="mainContainer">
                    <div className="arrayContainer">
                        {array.map((value, idx) => (
                            //<div className="arrayBar" style={{height: value*10 + "%"}} key={idx}>{value}</div>
                            <div className="arrayBar" style={{height: value/10 + "%"}} key={idx}></div>
                        ))}
                    </div>
                    <div className="controls">
                        
                            <button onClick={() => {this.resetArray()}} id="generateArrButton" className="controlArr but">Generate new array</button>
                            <select name="algorithmType" id="algorithmTypeSelect" className="controlArr">
                                <option value="merge">Merge Sort</option>
                                <option value="quick">Quick Sort</option>
                                <option value="heap">Heap Sort</option>
                                <option value="bubble">Bubble Sort</option>
                            </select>
                            <button onClick={() => {this.playAnimation()}} id="playButton" className="controlArr but">Play</button>

                            <div>
                                <RangeSlider min={49} max={301} value={this.state.barCount} thumbsDisabled={[true, false]} rangeSlideDisabled={true} onInput={([_, newValue])=>this.handleBarsChange(newValue)} id="arrayCountSlider" className="controlArr"/>
                                <span>Items: {this.state.barCount[1]}</span>   
                            </div>
                            <div>
                                <RangeSlider min={-50} max={-1} value={this.state.speed} thumbsDisabled={[true, false]} rangeSlideDisabled={true} onInput={(value) => this.handleSpeedChange(value)} id='speedSlider' className="controlArr"/>
                                <span>Speed: {Math.abs(this.state.speed[1])}ms</span>
                            </div>
                            
    
                        
                        
                    </div>
                </div>
                
            </>
            
        );
    }
}


function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

function areEqualArr(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
    return true;
}

