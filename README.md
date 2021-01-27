![poo](./data/header_document_image.png)

# Poonya &middot; [![Version](https://img.shields.io/badge/version-0.5.3-green)](https://github.com/AseWhy/Poonya) [![Bundle size](https://img.shields.io/github/size/AseWhy/Poonya/dist/poonya.browser.var.bundle.min.js)](https://github.com/AseWhy/Poonya/blob/master/dist/poonya.browser.var.bundle.min.js) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AseWhy/Poonya/blob/master/LICENSE) [![CI](https://circleci.com/gh/AseWhy/Poonya.svg?style=shield)](https://app.circleci.com/pipelines/github/AseWhy/Poonya)

Poonya is a text-based preprocessor **with no clear purpose**. You can use *poonya* for your project chatbot, or as a web page generation system.

## Get-started
Punya can be used in both the browser and NodeJS. You can connect *poonya* using:

```
npm install --save github:AseWhy/Poonya
```

after which poonya will be added to packages that you can use in your project.

### NodeJS
For use in NodeJS, punya must first be imported. Here I import specifically the ExcecutionPattern class, which allows you to create only executable poonya blocks.
```js
const { ExcecutionPattern, MessagePattern, ExpressionPattern } = require('poonya');
```

#### How can this be used?

To create an executor object `ExcecutionPattern`, you can do this:

```js
const pattern = new ExcecutionPattern(`
    set poonya = 'greet!';
    
    > poonya;
`);

// Templates are loaded asynchronously
pattern.on('load', async () => {
    // Will write ['greet!']
    console.log(await pattern.result().complete());
})
```

The example code above is an example of creating a template directly from text. It is also possible to create a template from a file:

```js
const pattern = new ExcecutionPattern({ path: __dirname + "/path/to/your/file" });

pattern.on('load', async () => {
    console.log(await pattern.result().complete());
})
```

> If only the path is specified and not passed to input, then * poonya * will try to get this file asynchronously using the standard file system module.

In addition to `ExcecutionPattern`, * poonya * provides two more interaction interfaces:` MessagePattern`, `ExpressionPattern`;

`MessagePattern` can be used to separate * poonya * code from normal text with curly brace parkers:

```js
const pattern = new MessagePattern(`
    For example, this will be displayed as clear text, and will be ignored by the parser

    poonya {
        // And here it is already necessary to follow the poonya syntax

        repeat(0; 10) {
            > 'The message will be repeated more ' + (10 - current) + ' times';
        }
    }
`);

pattern.on('load', async () => {
    console.log(await pattern.result().complete());
})
```

`ExpressionPattern` can be used to create a static expression that needs to be resolved periodically.

```js
const pattern = new ExpressionPattern(`2 + 2 * 2`);

pattern.on('load', async () => {
    // Will write 6
    console.log(await pattern.result().complete());
})
```

#### What can it be used for?

The simplest, but not the only, example is the generation of Web pages.

```js
const pattern = new MessagePattern(`
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>Sample web page</title>
        </head>
        <body>
            <h1>Заголовок</h1>
            <!-- Comment -->

            poonya {
                repeat(0; 5) {
                    > '<p>' + current + ' paragraph</p>';
                }
            }
        </body>
    </html>
`, 'poonya');

pattern.on('load', async () => {
    // This will write:
    //
    // <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    // <html>
    //    <head>
    //        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    //        <title>Sample web page</title>
    //    </head>
    //    <body>
    //        <h1>Заголовок</h1>
    //        <!-- Comment -->
    //
    //        <p>0 paragraph</p><p>1 paragraph</p><p>2 paragraph</p><p>3 paragraph</p><p>4 paragraph</p>
    //    </body>
    // </html>
    console.log(await pattern.result().complete().join(''));
})
```

In this case, the MessagePattern was used which allows not following the poonya syntax outside of the executable blocks.

> You can also change the prefix before {} - parentheses by passing it as the second parameter when creating a template

You can also use `ExpressionPattern` to create static expressions, for example if you need to use a calculator that requires context.

```js
const pattern = new ExpressionPattern('5 > 3 & 3 > 2 & 2 > 1 & a > 5');

pattern.on('load', async () => {
    // The result will be true
    console.log(await pattern.result({ a: 10 }).complete());
})
```

### Browser
Several types of spoilage are available for the browser, the variable `var`,` System`, `define`. They are all provided as poonya bundles in the dist folder. Here I will use the variable poonya as the import method, so poonya will contain everything the same as require ('poonya').

First you need to connect poonya.

```html
<script src='./js/poonya.browser.var.bundle.min.js'></script>
```

Thus, the poonya variable appeared in the global context, which can be used instead of `require('poonya')` in **nodejs**. The browser version is not nearly inferior to the **nodejs** version, except for some points:
* Can't import folders
* For import and include use fetch.

The analogue for the browser, in the import of poonya classes is:

```js
(({ ExcecutionPattern, MessagePattern, ExpressionPattern }) => {
    // Use poonya here...
})(poonya);
```

#### Additional features
Additional features are available for the browser, the type of execution of `script` blocks, where the` "text / poonya" `parameter is passed to type. In this case, after executing the template, the tag will be deleted, and the template output will be inserted in its place. Example:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>HTML Document</title>
        <script src='./js/poonya.browser.var.bundle.min.js'></script>
    </head>
    <body>
        <script type="text/poonya" import='default.html'>
            > html.createElement(html.TAGS.P, 
                'This way you can create a paragraph' + html.createElement(html.TAGS.B, ', and here is bold text.')
                (
                    ->
                        class -> 'element...',
                        id -> 'someid'
                )
            );
        </script>
    </body>
</html>
```

As a result of executing this template, the `script` tag will be replaced with the` p` tag, which will contain the text `Thus, you can create a paragraph` and a` b` tag with the text `, and here we have bold text.`;

You can also use the `import` attributes` handler` and `name`. `import` allows you to specify native libraries for import, in the example above the` default.html` library was imported, but you can specify more than one, separating the libraries you need `|` - with a straight line. `handler` allows you to specify a handler for a code path in a` script`, the default is `exec`, but you can specify` message` to use the `MessagePattern` pattern. `name` can be specified, to listen for a specific window event, for example, when name is equal to` some`, you can listen to the end of parsing the tag with the event `poonya: load: some`.

#### Events
All events in poonya target the window object and are prefixed with poonya. Below is a list of events (may be supplemented):
* poonya:load
* poonya:load:**blockname**
* poonya:error:**blockname**

##### poonya:load
This event is the end of loading all code sections marked as `type='text/poonya'`, it can be listened to in the object `window`.
```js
window.addEventListener('poonya:load', () => {
    console.log('All blocks have been successfully loaded.')
})
```

##### poonya:load:*blockname*
This event is the end of loading a specific block, if you need to perform any actions after the loading of any block is complete, they can be placed in the listener of the global window poonya object: load: **blockname**.
```js
window.addEventListener('poonya:load:some', () => {
    console.log('Some - block has been loaded.')
})
```

##### poonya:error:*blockname*
This is an event that indicates an error in a specific block, you can use it to handle the error that occurred.
```js
window.addEventListener('poonya:error:some', () => {
    console.log('An error occurred in the `some` block')
})
```

## Wiki
See [wiki](https://asewhy.github.io/#!poonya/main-poonya?lang=us) for syntax help