import { useEffect, useState } from 'react';
import Game from './Game';
import SideController from './sideController/sideController';



const MatchGame = () => {
    
   const [inputValue, setInputvalue] = useState({ gridSize:'', choiceType:'',numbersRange:'numbers',alphabetRange:'alphabet',clickOkbuttonReflash:false});

   const toggleClick = ()=>{
    setInputvalue(prevState =>({
        ...prevState,
        clickOkbuttonReflash: !prevState.clickOkbuttonReflash
    }));
   }

    // useEffect( ()=>{
    //     console.log(inputValue);
    // },[inputValue])

    return ( 
        <>
          <SideController setInputvalue={setInputvalue} onButtonClick={toggleClick}/>

          {inputValue.gridSize !== ''?  <Game   clientGridSize={inputValue.gridSize} 
                                                clientChooseType={inputValue.choiceType} 
                                                clientnumbersRange={inputValue.numbersRange} 
                                                clientalphabetRange={inputValue.alphabetRange}
                                                clickOkbuttonReflash={inputValue.clickOkbuttonReflash}/>
                                        :<h1 style={{color:'white'}}>Please select your preferred gameplay option.</h1>}
        </>
     );
}
 
export default MatchGame;