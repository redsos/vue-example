// Expression bodies
var evens = [1, 4, 9, 16]
var odds = evens.map(v => v + 1)
console.log(odds)

var fives = []
var nums = evens.map((v, i) => v + i)
// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0) {
    fives.push(v)
  }
})
console.log(nums)
console.log(fives)

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f =>
      console.log(this._name + " knows " + f));
  }
};
console.log(bob);

// Lexical arguments
function square() {
  let example = () => {
    let numbers = [];
    for (let number of arguments) {
      numbers.push(number * number);
    }


    return numbers;
  };

  return example();
}

var a = square(2, 4, 7.5, 8, 11.5, 21); // returns: [4, 16, 56.25, 64, 132.25, 441]

console.log(a);