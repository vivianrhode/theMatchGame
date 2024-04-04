import React, { useState, useMemo, useCallback,useEffect} from 'react';
import './Game.css';
        const uppercaseLettersArray = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
        const lowercaseLettersArray = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
function Game({clientGridSize,clientChooseType,clientnumbersRange,clientalphabetRange,clickOkbuttonReflash}) {
    // ----------------如果传过来的是数字-------------------
        const myMaxNumbers = Number(clientnumbersRange); //传过来的最大数字
        const myMinNumbers = myMaxNumbers - 10;//传过来的最小数字
        const myRandomNumbers = myMaxNumbers - myMinNumbers + 1;//传过来的数字范围的个数(包括最小数)
        const halfGridSizeNumber = Number(clientGridSize) / 2;//一半的总格数的数字
        const allNumbers = useMemo(()=>Array.from({length: myRandomNumbers}, (_, index)=>index + myMinNumbers ), [myMinNumbers, myRandomNumbers]) //创建一个从最小值到最大值的数组
         //洗牌算法,将创建从最小值到最大值的数组的顺序打乱.
            const shufflerArray = useCallback((array) => {
                const newArray = [...array];
                for (let i = newArray.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
                }
                return newArray;
            }, []);

          // 因为不确定格子的个数,所以要做判断.如果总格子的一半>用户输入范围的数组长度.我们需要重新定义数组,从而确保数组的长度是等于总格子的一半.
            const checkLength = useCallback((allNumbers, halfGridSizeNumbers)=>{
                if(halfGridSizeNumbers > allNumbers.length){
                    // return generateRandomArray(allNumbers,halfGridSizeNumbers);
                    let newArray = [];
                    while (newArray.length < halfGridSizeNumbers) {
                        const randomIndex = Math.floor(Math.random() * allNumbers.length);
                        newArray.push(allNumbers[randomIndex]);
                    }
                    return newArray;
                }else{
                    return allNumbers.slice(0, halfGridSizeNumber);
                }
            },[halfGridSizeNumber]);

        // 一下函数是对第一个数组进行复制,然后把两个数组融合成新的数组,然后在打乱顺序.
            const fusionTwoArr = useCallback((allNumbers,halfGridSizeNumber) => {
                const newLetterArr = checkLength(allNumbers,  halfGridSizeNumber );
                const addTwoArrTogether = [...newLetterArr, ...newLetterArr]; // 直接复制一次
                return shufflerArray(addTwoArrTogether);
            }, [halfGridSizeNumber, shufflerArray]);
        
            const bestArrays = useMemo(() => {
                if (clientalphabetRange === 'uppercase') {
                    const uppercaseArray = checkLength(uppercaseLettersArray, halfGridSizeNumber);
                    return fusionTwoArr(uppercaseArray );
                } else if (clientalphabetRange === 'lowercase') {
                    const lowercaseArray = checkLength(lowercaseLettersArray, halfGridSizeNumber);
                    return fusionTwoArr(lowercaseArray);
                } else if (clientChooseType === 'numbers') {
                    const numbersArray = checkLength(allNumbers, halfGridSizeNumber);
                    return fusionTwoArr(numbersArray);
                }
            }, [clientalphabetRange, clientChooseType, fusionTwoArr, allNumbers, checkLength, halfGridSizeNumber]);
 
        // ----------------找到相同的,并且让相同项消失-------------------    
        const[lastClick, setLastClick] = useState(null);
        const [hiddenElements, setHiddenElements] = useState({});
        const handleClick = (index, e) => {
                const h2Context = e.target.parentElement.querySelector('h2').innerText;
                const contextContainer = e.target.parentElement;
                const clickElementIndex = contextContainer.parentElement.getAttribute('data-key');
            setHiddenElements(prevState => {
                // 如果已经点击过，且文本相同但不是同一个元素
                if (lastClick && lastClick.h2Context === h2Context && lastClick.clickElementIndex !== clickElementIndex) {
                    return { ...prevState, [clickElementIndex]: true, [lastClick.clickElementIndex]: true };
                } else {
                    // 更新 lastClick 状态
                    setLastClick({ h2Context, clickElementIndex });
                    return prevState;
                }
            });
        };
        useEffect(() => {
            // 初始化 hiddenElements 状态，使其对应于 bestArrays 的每个索引，并将每个元素设置为 false（即不隐藏）
            const initialHiddenElements = bestArrays.reduce((acc, _, index) => {
              acc[index] = false; // 初始化每个元素为不隐藏
              return acc;
            }, {});
          
            setHiddenElements(initialHiddenElements);
          }, [bestArrays,clickOkbuttonReflash]);

        // ----------------根据得到的clientGridSize,来决定游戏的grid-------------------   

        const myGridStyle = Math.sqrt(clientGridSize);
        const mygridWidth = 800/ myGridStyle;
        
    
return (
    <div className="App">
      <header className="App-header">
        <div className="container" >
            
            {bestArrays.map( (bestArray,index) =>(
                    <div className='cellContainer' 
                         key={index} 
                         data-key={index} 
                         onClick={(event) => handleClick(index,event)}
                         style={{width:mygridWidth, height:mygridWidth }}
                    >
                        
                          <div className='contextContainer' style={{ display: hiddenElements[index] ? 'none' : 'block' }}>
                            <div className="number_container"  >
                                <h2>{bestArray}</h2>
                            </div>
                            <div className="color_cover_container"></div>
                            </div>
                        </div>
                )
            )}
        </div>
      </header>
    </div>
  );
}

export default Game;