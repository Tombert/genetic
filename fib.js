
let randomLetter = () =>{
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ !@#$%^&*()1234567890:{}[].,/'"
    return alphabet[Math.ceil(Math.random() * alphabet.length) - 1];
}
let randomString = (length) => {

    let acc = [];
    for (var i = 0; i < length; i+=1) {
        let letter = randomLetter();
        acc.push(letter);
    }
    return acc.join("");
}
let breedParents = (mom, dad, mutationRate) => {
    let baby = [];
    let mutateNum = Math.ceil (mutationRate * mom[0].length);
    for (let i = 0; i < mom[0].length; i += 1){
        let coinToss = Math.ceil(Math.random() * 2) - 1;
        if (coinToss) {
            baby.push(mom[0][i]);
        }
        else {
           baby.push(dad[0][i])
        }
    }
    for(let i = 0; i < mutateNum; i += 1){
        let randomIndex = Math.ceil(Math.random() * mom[0].length) - 1;
        let letter = randomLetter();
        baby[randomIndex] = letter;
    }

    return [baby.join(''), 0];

}

let getLitter = (size, mom, dad, mutationRate) =>{
  let litter = [];
  let littersize = size;
  for (let i = 0; i < littersize; i += 1){
      let baby = breedParents(mom, dad, mutationRate);
      litter.push(baby);
  }
  return litter;
}



let genetic = (inputString) => {

    var mom = [randomString(inputString.length),0];
    var dad = [randomString(inputString.length), 0];
    for (let i = 0; i < 10000; i += 1){

    let litter = getLitter(20, mom, dad, .05);
    let scoredLitter = litter.map((baby) =>{
        let score = 0;
        for (let i = 0; i < baby[0].length; i += 1){
            let babyChar = baby[0][i];
            let inputChar = inputString[i];
            if (babyChar === inputChar) {
                score += 1;
            }
         }
         return [baby[0], score];
    }).sort((a,b) =>{
      let scoreA = a[1];
      let scoreB = b[1];
      return scoreA < scoreB;
    })
    mom = scoredLitter[0];
    dad = scoredLitter[1];
    console.log ("Current mom: ", mom[0], "Score:", mom[1]);
    console.log('Current dad', dad[0], "Score:", dad[1]);
    if(inputString == dad[0] || inputString == mom[0]) return 0;
}
}
