const fs = require('fs');

const gender = ['male', 'female'];
const maleNames = ['John', 'Tom', 'Freddy', 'Luke', 'Peter', 'Jonatan', 'Stephen'];
const femaleNames = ['Amanda', 'Jessica', 'Natalie', 'Stephanie', 'Ruth', 'Ashley'];
const lastNames = ['Wick', 'Johnson', 'Parker', 'Skywalker', 'Simpson', 'Andersen'];

const randomChoice = (arr) => {
  return arr[Math.floor(arr.length * Math.random())];
}

const people = [];

let i = 0;

while (i < 20) {
  const personGender = randomChoice(gender);
  const personFirstName = personGender === 'male' ? randomChoice(maleNames) : randomChoice(femaleNames);

  const person = {
    gender: personGender,
    firstName: personFirstName,
    lastName: randomChoice(lastNames),
    age: Math.floor(Math.random() * 100),
  };

  people.push(person);
  i++;
}

// for (i = 1; i <= 20; i++) {
//   const personGender = randomChoice(gender);
//   const personFirstName = personGender === 'male' ? randomChoice(maleNames) : randomChoice(femaleNames);

//   const person = {
//     gender: personGender,
//     firstName: personFirstName,
//     lastName: randomChoice(lastNames),
//     age: Math.floor(Math.random() * 100),
//   };

//   people.push(person);
// }

const data = JSON.stringify(people);

fs.writeFile('people.json', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});