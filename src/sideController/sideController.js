import { useEffect, useState } from 'react';
import './sideController.css';

// First we want to set number of how many squares.  2*2, 4*4, 6*6, 8*8, 10*10
// second we want to clients input if he wants play numbers or ABCs



const SideController = ({setInputvalue,onButtonClick}) => {

   

    const handleSubmit =(e)=>{
        e.preventDefault();
        const gridSize = document.getElementById('grid-size').value;
        const choiceType = document.getElementById('choice-type').value;
       
        let submissionData = {gridSize, choiceType};
   
        if(choiceType === 'numbers'){
            submissionData.numbersRange = document.getElementById('number-range').value;
        }else if(choiceType === 'ABCs'){
            submissionData.alphabetRange = document.getElementById('alphabet-range').value;
        }
        setInputvalue(submissionData);
        
    }
    
   const [checkType, setCheckType] =useState('');
   const handleOnchange = (e) =>{
        setCheckType(e.target.value)
   }
//    useEffect(()=>{
//     // console.log(checkType);
//    },[checkType])
    return ( 
        <>
           <div id='contorl-panel'>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label > Choose Grid Size : </label>
                        <select id="grid-size" name="grid-size" >
                            <option value="4">2 x 2</option>
                            <option value="16">4 x 4</option>
                            <option value="36">6 x 6</option>
                            <option value="64">8 x 8</option>
                            <option value="100">10 x 10</option>
                        </select>
                    </section>
                    <section>
                    <label > Choose Type : </label>
                    <select id="choice-type" name="choice-type" onChange={handleOnchange}>
                        <option value="numbers">numbers</option>
                        <option value="ABCs">ABCs</option>
                    </select>
                    </section>

                    { checkType === 'ABCs'|| checkType ==='uppercase' ||checkType ==='lowercase'? 
                    <>
                        <section>
                            <label > Choose alphabet Range: </label>
                            <select id="alphabet-range" name="alphabet-range" onChange={handleOnchange}>
                                <option value="uppercase">A-Z</option>
                                <option value="lowercase">a-z</option>
                            </select>
                        </section>
                    </> : 
                    <>
                    <section>
                        <label > Choose Number Range: </label>
                        <select id="number-range" name="number-range" >
                            <option value="10">0 - 10</option>
                            <option value="20">10 - 20</option>
                            <option value="30">20 - 30</option>
                            <option value="40">30 - 40</option>
                            <option value="50">40 - 50</option>
                            <option value="60">50 - 60</option>
                            <option value="70">60 - 70</option>
                            <option value="80">70 - 80</option>
                            <option value="90">80 - 90</option>
                            <option value="100">90 - 100</option>
                        </select>
                    </section>
                    </> }
                    <section><button type="submit" onClick={onButtonClick}>Submit</button></section>
                </form>
            </div>
           
        </>
     );
}
 
export default SideController;
