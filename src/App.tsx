import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';

import './App.css';

function validateSIN(input: string): boolean {
  if (input.length !== 9)
    return false;

  // ensure all numbers
  if (isNaN(parseInt(input)))
    return false;

  return isDivisible(input)
}

function isDivisible(input: string): boolean {
  let sum = 0;

  for (let i=0; i < input.length; i++) {
    console.log(input.charAt(i));
    let digit = parseInt(input.charAt(i));
    if (i % 2 !== 0) { // double every other digit
      digit *= 2
      if (digit > 9) {
        // separate digits if needed
        console.log("separate it: "+digit)
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }
    sum +=digit;
  }

  return sum % 10 === 0;

}


function getResultString(input: string, isValid: boolean) : string {
  if (isValid)
    return `${input} was valid`
  return `${input} was not valid`
}


function App() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<Result[]>([]);

  type Result = {
    isValid: boolean,
    resultString: string,
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEnter();
    }
  };

  const handleEnter = () => {
    const trimmedInput = input.trim()
    const isValid = validateSIN(trimmedInput);
    const newResult = {isValid, resultString: getResultString(input, isValid)}
    setOutput([newResult, ...output]);
  };
  
  return (
    <div className="container">
      <h2>SIN Validator</h2>
      <div>
      <div className="inputArea">
        <TextField
          type="text"
          size="small"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ marginRight: '10px', width: '200px'}}
          />
        <Button variant="contained" onClick={handleEnter}>Validate</Button>
        </div>
        {output.map(result => 
          <div className="result" style={{color: result.isValid ? "darkgreen" : "darkred"}}>
              {result.resultString}
            </div>)
        }
      </div>
    </div>
  );
}

export default App;
