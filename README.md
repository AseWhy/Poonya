# Poonya
JavaScript library that allows you to create and execute po templates, thereby formatting text. In other words, this is a template engine

![poo](./data/header_document_image.png)

## How to use it in your project?
To do this, you need to connect Poonya
```js
const poonya = require('poonya');
```
After that, you can create a text template, in a string way, or specify the path to the file
```js
const Pattern = new poonya.ExcecutionPattern('set poonya = `greet!`;> poonya;');

// It write ['greet!']
console.log(Pattern.result());
```
Also, if the base is text, then you can use MessagePattern
```js
const Pattern = new poonya.MessagePattern('greet!');

// It write ['greet!']
console.log(Pattern.result());
```
In this case, the code for Poonya should be written in {} - curly braces
Also, Poonya can read expressions, you should use ExpressionPattern for this
```js
const Pattern = new poonya.ExpressionPattern('5 > 3 & 3 > 2 & 2 > 1');

// It write true
console.log(Pattern.result());
```

The expression passed to the constructor will be automatically considered a Poonya expression, it must match its syntax.
###
See the [wiki](https://github.com/AseWhy/Poonya/wiki) for syntax help