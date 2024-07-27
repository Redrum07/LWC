

/* 
We're building a Cricket app !

Suppose we get data from a web service about a certain game (below). 
In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the wicketkeeper and the others are field players. 
For India (team 1) create one variable ('Ind') with the wicketkeeper name, 
and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, India (team 1) used 3 substitute players. So create a new array ('players1Final') 
containing all the original team1 players plus 'Sandeep', 'John' and 'Sunil'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. The team with the lower odd is more likely to win. 
Print to the console which team is more likely to win, 
WITHOUT using an if/else statement or the ternary operator.
7. Loop over the game.Century array and print each player name to the 
console, along with the Century number (Example: "Century 1: Kohli")
8. Use a loop to calculate the average odd and log it to the console 

GOOD LUCK 😀
*/
const game = {
  team1: "India",
  team2: "Australia",
  players: [
    [
      "Dhoni",
      "Sharma",
      "Kohli",
      "Rahul",
      "Jadeja",
      "Pandey",
      "Ashwin",
      "Chahal",
      "Khan",
      "Bhumra",
      "Shami",
    ],
    [
      "Wade",
      "Cummins",
      "Green",
      "Maxwell",
      "Finch",
      "Hazelwood",
      "Marsh",
      "Stoinis",
      "Richardson",
      "Starc",
      "Warner",
    ],
  ],
  Century: ["Kohli", "Sharma", "Warner", "Maxwell"],
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

/**1. Create one player array for each team (variables 'players1' and 'players2') */

for (let [players1 , players2] of Object.entries(game['players'])){
    console.log(players1 , players2);
}

let [players1 , players2] = game.players;
console.log(players1, players2)



/*2. The first player in any player array is the wicketkeeper and the others are field players. 
For India (team 1) create one variable ('Ind') with the wicketkeeper name, 
and one array ('fieldPlayers') with all the remaining 10 field players*/
let [ind , ...fieldPlayers] = players1;
console.log(ind, fieldPlayers)

/**3. Create an array 'allPlayers' containing all players of both teams (22 players)
 */
let allPlayer = [...players1, ...players2]
console.log(allPlayer);

/**4. During the game, India (team 1) used 3 substitute players. So create a new array ('players1Final') 
containing all the original team1 players plus 'Sandeep', 'John' and 'Sunil' */

let players1Final = [...players1, 'Sandeep' , 'John' , 'Sunil']
console.log(players1Final);

/** 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
*/
let { team1 , x:draw , team2} = game.odds;
console.log(team1 ,draw , team2);

/**6. The team with the lower odd is more likely to win. 
Print to the console which team is more likely to win, 
WITHOUT using an if/else statement or the ternary operator. */

team1 < team2 && console.log(team1) 
team2 < team1 && console.log(team2);
/**7. Loop over the game.Century array and print each player name to the 
console, along with the Century number (Example: "Century 1: Kohli") */

for( let key in game.Century){
    
    console.log(`Century  ${key} : ${game.Century[key]}`)
}

for ( let [index , value] of game.Century.entries()){
    console.log(`Century ${index+1} : ${value}`);
}


/**8. Use a loop to calculate the average odd and log it to the console  */
let sum = 0;
let counter = 0
for (let key of Object.values(game.odds)){
    sum += key;
    counter += 1;
}
console.log(Math.round(sum/counter));
 

/*
Write a function that takes a string as input and returns a new string with the first letter of each word capitalized.

Example:
Input: "hello world"
Output: "Hello World

Problem 2:
Write a function that takes a string as input and returns the reverse of the string, maintaining the case of each character.

Example:
Input: "Hello World"
Output: "dlroW olleH"

Write a function that takes a string as input and returns the number of occurrences of each character in the string as an object.

Example:
Input: "hello"
Output: { h: 1, e: 1, l: 2, o: 1 }

Write a function that generate the username of the user based on Firstname, Middlename and Lastname
Input - ankit Dilipji Jain
Output - ADJ

Write a function that takes an array of numbers as input and returns a new array with all the even numbers removed.

Example:
Input: [1, 2, 3, 4, 5, 6]
Output: [1, 3, 5]

Problem :
Write a function that takes an array of strings as input and returns a new array with only the strings that have a 
length greater than or equal to 5.

Example:
Input: ["apple", "banana", "grape", "orange", "kiwi"]
Output: ["apple", "banana", "orange"]

Write a function that takes an array of numbers as input and returns a new array with only the unique elements (remove duplicates).

Example:
Input: [1, 2, 2, 3, 4, 4, 5]
Output: [1, 2, 3, 4, 5]
*/
let input = "nandhini devi ganesan"
/*Write a function that takes a string as input and returns a new string with the first letter of each word capitalized.

Example:
Input: "hello world"
Output: "Hello World" */

function capitalize(input){
  
  const arr = input.split(' ');
  const capitalizedString = arr.map((x) => x.charAt(0).toUpperCase() + x.slice(1));

  return capitalizedString.join(' ');
}

console.log('capitalize' , capitalize(input));


/**Problem 2:
Write a function that takes a string as input and returns the reverse of the string, maintaining the case of each character. */


let arr = input.split('');
let reverse = '';
for(let i=arr.length-1; i>=0; i--){
  reverse += arr[i];
}

console.log('reverse : ' , reverse);

/**Write a function that takes a string as input and returns the number of occurrences of each character in the string as an object.

Example:
Input: "hello"
Output: { h: 1, e: 1, l: 2, o: 1 }
 */
let obj = {};
function occurrences(input){
  
  for(let i=0; i<input.length; i++){
    
    if(input.charAt(i) in obj){
        obj[input.charAt(i)] += 1;
    }
    else{
        obj[input.charAt(i)] = 1;
    }
  }

  return obj;
}
console.log('occurrences' , occurrences("nandhini devi ganesan"))

/**Write a function that generate the username of the user based on Firstname, Middlename and Lastname
Input - ankit Dilipji Jain
Output - ADJ */

function generateUsername(input){
  
  const arr = input.split(' ');
  console.log(arr);
  const str = arr.map((x) => x.charAt(0).toUpperCase());
  userName = str.join('');
  return userName;
  
}
console.log('UserName: ' , generateUsername('ankit Dilipji Jain'));
/**Write a function that takes an array of numbers as input and returns a new array with all the even numbers removed.

Example:
Input: [1, 2, 3, 4, 5, 6]
Output: [1, 3, 5] */

function oddArray(arr){

  const oddArr = arr.filter((num) => num%2!=0 );
  return oddArr;
}

console.log('odd Array',oddArray([1, 2, 3, 4, 5, 6]) );
/**Problem :
Write a function that takes an array of strings as input and returns a new array with only the strings that have a 
length greater than or equal to 5.

Example:
Input: ["apple", "banana", "grape", "orange", "kiwi"]
Output: ["apple", "banana", "orange"] */

function fiterArr(fruits){

  const newFR = fruits.filter((fruit) => fruit.length >= 5);

  return newFR;
}

console.log('filter :' , fiterArr(["apple", "banana", "grape", "orange", "kiwi"]));

/**Write a function that takes an array of numbers as input and returns a new array with only the unique elements (remove duplicates).

Example:
Input: [1, 2, 2, 3, 4, 4, 5]
Output: [1, 2, 3, 4, 5]
*/ 

function unique(arr){

  let a = new Set(arr);
  return a;

}

console.log('unique num' , unique([1, 2, 2, 3, 4, 4, 5]))


 let count1 = 0;
 let count2 = 0;

 function intervalFunc(){

  count1++;
  console.log(`Interval tick ${count1}`);
  if(count1 ===5)   clearInterval(internvalId);

 }

 function timeoutFunc(){
  count2++;
  console.log(`Timeout tick : ${count2}`);
  if(count2 === 3) clearTimeout(timeoutId);
 }


 let internvalId = setInterval(intervalFunc, 1000);
let timeoutId = setTimeout(timeoutFunc , 1000);


console.log('start');


function generatePromise(message){
  return new Promise((resolve, reject ) => {
    if(!message){
      reject("No message");
    }
    else{
      setTimeout(() =>{
        console.log(message);
        resolve();
      },5000);
    }
    
  });

  
  
  
}


// How to call the promise 
generatePromise().then(()=> 
{console.log(" ist Promise resolved Successfully");
  generatePromise("second call ");
}).then(() => 
console.log('second promise resolved successfullly'))
.catch((result)=>console.log('Promise rejected ',result));


/// async function 
async function generateDifferentPromises(){
 
  try{
    await generatePromise('First call ');
    await generatePromise("second call ");
  }
  catch(error){
    console.log(error);
  }
}

generateDifferentPromises();

async function loadRandUsers(){
  let response = await fetch('https://api.thecatapi.com/v1/images/search');
  let data = await response.json();
  console.log('Data' , data[0].url);
  let imgUrl = data[0].url;
  let imgTag  = document.querySelector(".catImage");
  imgTag.src = imgUrl;
}

loadRandUsers();