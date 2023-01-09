/**
 * IIFE Example 
 * An IIFE (Immediately Invoked Function Expression) is a 
 * JavaScript function that runs as soon as it is defined. The name IIFE is promoted by Ben Alman
 * IIFE is used to Avoid polluting the global namespace
 * https://developer.mozilla.org/en-US/docs/Glossary/IIFE

 */

const pizza = (() => {
  console.log('this is a pizza')
})()

/**
 * Factory Function
 */

const personFactory = (name, age) => {
  const sayHello = () => console.log('hello!');
  return { name, age, sayHello };
};

const jeff = personFactory('jeff', 27); 
console.log(jeff.name); // 'jeff'
jeff.sayHello(); // calls the function and logs 'hello!

/**
   * Scopes & closures
   * The concept of closure is the idea that functions retain their scope even if they are passed around and called outside of that scope
   * Scope === variable access
   * context === this ( current reference )
 */

const FactoryFunction = string => {
  const capitalizeString = () => string.toUpperCase();
  const printString = () => console.log(`----${capitalizeString()}----`);
  return { printString };
};

const taco = FactoryFunction('taco');

printString(); // ERROR!!
capitalizeString(); // ERROR!!
taco.capitalizeString(); // ERROR!!
taco.printString(); // this prints "----TACO----"


var targetObj = {};
var targetProxy = new Proxy(targetObj, {
  set: function (target, key, value) {
      console.log(`${key} set to ${value}`);
      target[key] = value;
      return true;
  }
});

targetProxy.hello_world = "new"; // console: 'hello_world set to new'