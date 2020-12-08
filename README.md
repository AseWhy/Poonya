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
The expression passed to the constructor will be automatically considered a Poonya expression, it must match its syntax
## Language syntax
### Expression
For expressions, here, perhaps, the standard syntax, almost all operators `+` `-` `*` `/` `<` `>` `>=` `=` `<=` are used. You can also use boolean operators `&` `|` - it don't work on numbers. These are not binary operators, but Boolean equivalent to `||` and `&&` from JavaScript. Expressions are used in many places, they can be passed as an argument to a function, or as an expression to set the value of a variable. For example:

    set s = < expression >;

### Keywords
#### set
The set operator is used to set a new value in the current context. For example, you have a variable x that exists in the previous context, but it gets in the way and you want to use the same variable x but so that the value in the previous context does not change. You can use set for this.

    set s = 'Some value';

    // Here we create's new context
    if(true){
        > s;

        set s = 'Some value#1';

        > s;
    }

The previous example would print `Some value` then` Some value # 1` then again `Some value`. This is because we first set the value of s to be `Some value`, then entered a new context, output s, and in this new context, set it to a new value` Some value # 1`. Moreover, since this is a new context, in the previous context the value of s remained the same, which we are convinced of by repeatedly displaying it below.

> And so, set is needed to create a variable in the current context.
#### while
the while keyword, as elsewhere in general, does what is passed in curly braces {} as long as the condition passed in parentheses is met - (). For example:

    set x = 0;

    while(x < 100){
        x = x + 1;

        > x;
    }

    > 'cool';

Will print a sequence of numbers, from 0 to 100 (not inclusive) and at the end will print 'cool'.
