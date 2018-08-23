function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

let it = helloWorldGenerator()
console.log(it.next())
console.log(it.next())
console.log(it.next())

for (let val of helloWorldGenerator()) {
  console.log(val)
}
