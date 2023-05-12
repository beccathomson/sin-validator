# SIN Validator Notes

## Assumptions

- users can enter SINs with whitespace and we will strip it (otherwise we could have used a maxLength for our input field)
- we want to validate the SIN on Enter or "Validate" click
- only digits are allowed as input


## Approach

- used Create-React-App to get a skeleton app
- added validation code, MaterialUI TextField and Button components
- logged the result of each validation in a history array


## How it works

- run `npm start` to see app run locally

1. updates the input state variable on keydown, on Enter or "Validate" button click we send the input to our validation function
2. validation function checks the (stripped) length is 9, that all characters are numbers, and that the sum is divisible by 10
    1. to get the sum we loop through each digit, adding it to the sum when digit is at an odd index, and doubling it when digit is at an even index. if after doubling our even-indexed digit the result is over 9, we split it into individual digits. First digit will always be 1, and we use % to get the second digit
3. we use our validation result to get the correct string, and create a Result object with fields isValid and resultString. we add this new Result object to the start or our output array
4. finally, we log all our results by mapping the Result objects to divs, choosing the text color based on the isValid field