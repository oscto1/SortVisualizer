
export function getSortAnimations(array, sortType){
    const animations = [];
    if(array.length <= 1){
        return animations;
    }

    switch(sortType){
        case 1:
            mergeSort(array, animations);
            break;
        case 2:
            quickSort(array, 0, array.length-1, animations);
            break;
        case 3:
            heapSort(array, animations);
            break;
        case 4:
            bubbleSort(array, animations);
            break;
        default:
            console.log("No type of sort specified");
            break;
    }
    
    return animations;
}


// MERGE SORT ALGORITHM
export function mergeSort(array, animations=[]){
    let length = array.length;
    //Base case
    if(length <= 1){
        return;
    }

    if (typeof array[0] !== "object") {
        array = array.map((value, Origindex) => ({ value, Origindex }));
    }

    let middle = length / 2; 
    let leftArray = array.slice(0, middle);
    let rightArray = array.slice(middle, length);

    //recursion
    mergeSort(leftArray, animations);
    mergeSort(rightArray, animations);
    
    //merge

    let i = 0; //left array index
    let j = 0; //right array index
    let k = 0; //merged array index

    while(i < leftArray.length && j < rightArray.length){  
        animations.push([leftArray[i].Origindex * 1, rightArray[j].Origindex * 1]); //new
        animations.push([leftArray[i].Origindex * 1, rightArray[j].Origindex * 1]); //new

        if(leftArray[i].value < rightArray[j].value){   
            animations.push([array[k].Origindex * 1, leftArray[i].value * 1]); //new
            array[k] = leftArray[i];
            i++;
        }else{
            animations.push([array[k].Origindex * 1, rightArray[j].value * 1]);
            array[k] = rightArray[j];
            j++;
        }
        k++; 
    }
    while(i < leftArray.length){

        animations.push([leftArray[i].Origindex * 1, leftArray[i].Origindex * 1]);
        animations.push([leftArray[i].Origindex * 1, leftArray[i].Origindex * 1]);

        animations.push([array[k].Origindex * 1, leftArray[i].value * 1]);
        array[k] = leftArray[i];
        i++;
        k++;
    }
    while(j < rightArray.length){
        //console.log("We got here 2");
        animations.push([rightArray[j].Origindex * 1, rightArray[j].Origindex * 1]);
        animations.push([rightArray[j].Origindex * 1, rightArray[j].Origindex * 1]);
        
        animations.push([array[k].Origindex * 1, rightArray[j].value * 1]);
        //console.log(animations[k]);
        array[k] = rightArray[j];
        j++;
        k++;
    }

    return array;
}



// QUICK SORT ALGORITHM -----------------------------------------------------------------------------------------------------
export function quickSort(array, start, end,  animations = []){

    if(end <= start){
        //console.log("base case reached");
        return;
    }

    //console.log(array);
    let pivot = partition(array, start, end, animations);
    //console.log("Pivot: " + pivot);

    quickSort(array, start, pivot - 1, animations);
    quickSort(array, pivot + 1, end, animations);

    return array;
}

function partition(array, start, end,  animations = []){
    let pivot = array[end];
    let i = start - 1;

    for(let j = start; j <= end - 1; j++){
        animations.push([j * 1, end]);
        animations.push([j * 1, end]);
        if(array[j] < pivot){
            
            i++;
            //console.log("Should swap i:" + array[i] + " - j:" + array[j]);
            animations.push([i, array[j]]);
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            animations[animations.length - 1].push(j, array[j] * 1);
            //animations[animations.length - 1].push(array[j] * 1); //Swap          
        }else{
            animations.push([j, array[j] * 1]);
        }
    }
    

    i++;
    animations.push([i, end]);
    animations.push([i, end]);
    animations.push([i, array[end]]);
    let temp = array[i];
    array[i] = array[end];
    array[end] = temp; 
    animations[animations.length - 1].push(end, temp);
    //console.log(i + ": " + array[i]);
    return i;
}


// HEAP SORT ALGORITHM -----------------------------------------------------------------------------------------------------
export function heapSort(array, animations = []){
    let length = array.length;
    let lastParentNode = Math.floor((length / 2) - 1);
    let lastChild = length - 1;

    while(lastParentNode >= 0){
        heapify(array, length, lastParentNode, animations);
        lastParentNode--;
    }

    while(lastChild >= 0){
        animations.push([0, lastChild]);
        animations.push([0, lastChild]);
        animations.push([0, array[lastChild], lastChild, array[0]]);
        [array[0], array[lastChild]] = [array[lastChild], array[0]];
        //Call in the unsorted part of the array
        heapify(array, lastChild, 0, animations);
        lastChild--;
    }
    return array;
}

function heapify(array, length, parentIndex, animations = []){
    let largest = parentIndex;
    let left = parentIndex * 2 + 1;
    let right = left + 1;
    
    if(left < length && array[left] > array[largest]){
  
        largest = left;     

    }
    if(right < length && array[right] > array[largest]){

        largest = right;
    }

    if(largest !== parentIndex){
        animations.push([largest, parentIndex]);
        animations.push([largest, parentIndex]);
        
        animations.push([parentIndex, array[largest], largest, array[parentIndex]]);
        
        [array[parentIndex], array[largest]] = [array[largest], array[parentIndex]];

        
        
        heapify(array, length, largest, animations);
    }
    return array;
}


// BUBBLE SORT ALGORITHM -----------------------------------------------------------------------------------------------------
export function bubbleSort(array, animations = []){
    let end = array.length;
    for(let i = 1; i < end; i++){
        for(let j = 0; j < end - i; j++){
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if(array[j] > array[j+1]){
                animations.push([j, array[j + 1] , j + 1, array[j]]);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }else{
                animations.push([j, array[j] , j + 1, array[j + 1]]);
            }
        }
    }
    return array;
}

