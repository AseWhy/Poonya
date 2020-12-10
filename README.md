![poo](./data/header_document_image.png)

<p style="text-align: center;padding: 0 2em;">It is a simple JavaScript library that allows you to create and execute po templates, thereby formatting text. In other words, this is a template engine</p>

## How to use it in your project?
To do this, you need to connect Poonya
```js
const poonya = require('poonya');
```
After that, you can create a text template, in a string way, or specify the path to the file
```js
async function main(){
    const Pattern = new poonya.ExcecutionPattern('set poonya = `greet!`;> poonya;');

    // It write ['greet!']
    console.log(await Pattern.result().complete());
}

main();
```
Also, if the base is text, then you can use MessagePattern
```js
async function main(){
    const Pattern = new poonya.MessagePattern(`
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <title>Пример веб-страницы</title>
            </head>
            <body>
                <h1>Заголовок</h1>
                <!-- Комментарий -->

                poonya {
                    repeat(0; 5) {
                        > '<p>' + current + ' абзац</p>';
                    }
                }
            </body>
        </html>
    `, 'poonya');

    // it's write:
    //
    // <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    // <html>
    //    <head>
    //        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    //        <title>Пример веб-страницы</title>
    //    </head>
    //    <body>
    //        <h1>Заголовок</h1>
    //        <!-- Комментарий -->
    //
    //        <p>0 абзац</p><p>1 абзац</p><p>2 абзац</p><p>3 абзац</p><p>4 абзац</p>
    //    </body>
    // </html>
    console.log(await Pattern.result().complete().join(''));
}

main();
```
In this case, the code for Poonya should be written in {} - curly braces
> Note, you can specify your own prefix for {} - curly braces. If you pass null or undefined, then any parentheses will be accepted
Also, Poonya can read expressions, you should use ExpressionPattern for this
```js
async function main(){
    const Pattern = new poonya.ExpressionPattern('5 > 3 & 3 > 2 & 2 > 1');

    // It write true
    console.log(await Pattern.result().complete());
}

main();
```

The expression passed to the constructor will be automatically considered a Poonya expression, it must match its syntax.
###
See the [wiki](https://github.com/AseWhy/Poonya/wiki) for syntax help