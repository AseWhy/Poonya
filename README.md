![poo](./data/header_document_image.png)

# Poonya &middot; [![Version](https://img.shields.io/badge/version-0.4.8-green)](https://github.com/AseWhy/Poonya) [![Bundle size](https://img.shields.io/github/size/AseWhy/Poonya/dist/poonya.browser.var.bundle.min.js)](https://github.com/AseWhy/Poonya/blob/master/dist/poonya.browser.var.bundle.min.js) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AseWhy/Poonya/blob/master/LICENSE) [![CI](https://circleci.com/gh/AseWhy/Poonya.svg?style=shield)](https://app.circleci.com/pipelines/github/AseWhy/Poonya)

Poonya (пунья) - это текстовый препроцессор, **не ставящий перед собой четкого предназначения**. Вы можете использовать *poonya* для вашего чат-бота проекта, или как систему генерации веб страниц.

## Начиная
Пунью возможно использовать и в браузере и в NodeJS. Вы можете подключить *poonya* используя:

```
npm install --save github:AseWhy/Poonya
```

после чего poonya будет добавлена к пакетам, которые вы можете использовать в вашем проекте.

### NodeJS
Для использования в NodeJS, пунью нужно сначала импортировать. Тут я импортирую конкретно класс ExcecutionPattern, который позволяет создать только исполняемые блоки poonya.
```js
const { ExcecutionPattern, MessagePattern, ExpressionPattern } = require('poonya');
```

#### Как это можно использовать?

Для создания объекта исполнителя `ExcecutionPattern` можно сделать так:

```js
const pattern = new ExcecutionPattern(`
    set poonya = 'greet!';
    
    > poonya;
`);

// Шаблоны загружкаются асинхронно
pattern.on('load', async () => {
    // Выведет ['greet!']
    console.log(await pattern.result().complete());
})
```

Пример кода выше, это пример создания шаблона прямо из текста. Так-же есть возможность создавать шаблон из файла:

```js
const pattern = new ExcecutionPattern({ path: __dirname + "/path/to/your/file" });

pattern.on('load', async () => {
    console.log(await pattern.result().complete());
})
```

> Если указан только путь но не передан input, то *poonya* попытается получить этот файл асинхронно, с помощью стандартного модуля файловой системы.

Помимо `ExcecutionPattern`, *poonya* предоставляет ещё два интерфейса взаимодействия: `MessagePattern`, `ExpressionPattern`;

`MessagePattern` можно использовать для разделения кода *poonya* и обычного текста паркерами с фигурными скобками:

```js
const pattern = new MessagePattern(`
    Например вот это будет выведено как чистый текст, и будет проигноривоно парсером

    poonya {
        // А тут уже необходимо следовать синтаксису poonya

        repeat(0; 10) {
            > 'Сообщение будет повторено ещё ' + (10 - current) + ' раз';
        }
    }
`);

pattern.on('load', async () => {
    console.log(await pattern.result().complete());
})
```

`ExpressionPattern` можно использовать для создания статического выражения, которое необходимо периодически решать.

```js
const pattern = new ExpressionPattern(`2 + 2 * 2`);

pattern.on('load', async () => {
    // Выведет 6
    console.log(await pattern.result().complete());
})
```

#### Для чего это можно использовать?

Самый простой, но не единственный, пример это генерация Web страниц.

```js
const pattern = new MessagePattern(`
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

pattern.on('load', async () => {
    // Это выведет:
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
    console.log(await pattern.result().complete().join(''));
})
```

В этом случае использовался MessagePattern который допускает не следование синтаксису poonya вне исполняемых блоков.

> Вы можете так-же поменять префикс перед {} - круглыми скобками, передав его вторым параметром при создании шаблона

Вы так-же можете использовать `ExpressionPattern` для создания статических выражений, допустим если вам необходимо использовать калькулятор, в котором необходим контекст.

```js
const pattern = new ExpressionPattern('5 > 3 & 3 > 2 & 2 > 1 & a > 5');

pattern.on('load', async () => {
    // Результатом будет true
    console.log(await pattern.result({ a: 10 }).complete());
})
```

### Браузер
Для браузера доступны несколько видов испорта, переменной `var`, `System`, `define`. Все они предоставлены как бандлы poonya в папке dist. Тут я буду использовать переменную poonya как способ импорта, таким образом poonya будет содержать все тоже самое что и ``require('poonya')``.

Для начала необходимо подключить poonya.

```html
<script src='./js/poonya.browser.var.bundle.min.js'></script>
```

Таким образом, в глобальном контексте появилась переменная poonya, которую можно использовать вместо ``require('poonya')`` в **nodejs**. Браузерная версия ни чуть не уступает версии **nodejs**, за исключением некоторых моментов:
* Нельзя импортировать папки
* Для импорта и include используется fetch.

Аналогом для браузера, в импорте классов poonya является:

```js
(({ ExcecutionPattern, MessagePattern, ExpressionPattern }) => {
    // Используйте пунью тут...
})(poonya);
```

#### Дополнительные возможности
Для браузера доступны дополнительные возможности, вида исполнения блоков `script`, где в type передан параметр `"text/poonya"`. При этом, после выполнения шаблона тег будет удален, а на его место вставлен вывод шаблона. Пример:

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
                'Таким образом можно создать абзац' + html.createElement(html.TAGS.B, ', а тут уже жирный текст.')
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

В результате выполнения этого шаблона, тег `script` будет заменен на на тег `p`, в котором будет текст `Таким образом можно создать абзац` и тег `b` с текстом `, а тут уже жирный текст.`;

Вы также можете использовать атрибуты `import` `handler` и `name`. `import` позволяет указать нативные библиотеки для импорта, в примере выше была импортирована библиотека `default.html`, но можно указать и больше одной, разделив нужные вам библиотеки `|` - прямой чертой. `handler` позволяет указать обработчик для учатка кода в `script`, по стандарту используется `exec`, но вы можете указать `message`, для использования шаблона `MessagePattern`. `name` можно указать, для прослушивания конкретного события window, например при name равным `some`, прослушать окончание разбора тега можно событием `poonya:load:some`.

#### События
Все события в poonya нацелены на объект window, и помечены префиксом poonya. Ниже будет приведен список событий (возможно будет дополнен):
* poonya:load
* poonya:load:**blockname**
* poonya:error:**blockname**

##### poonya:load
Это событие окончания загрузки всех участков кода помеченных как `type='text/poonya'`, его можно прослушать в объекте window.
```js
window.addEventListener('poonya:load', () => {
    console.log('All blocks have been successfully loaded.')
})
```

##### poonya:load:*blockname*
Это событие окончания загрузки конкретного блока, если вам необходимо выполнить какие либо действия по завершении загрузки какого либо блока, их можно разместить в слушателе глобального объекта window poonya:load:**blockname**.
```js
window.addEventListener('poonya:load:some', () => {
    console.log('Some - block has been loaded.')
})
```

##### poonya:error:*blockname*
Это событие, которое говорит об ошибке в конкретном блоке, вы можете использовать его для обработки возникшей ошибки.
```js
window.addEventListener('poonya:error:some', () => {
    console.log('An error occurred in the `some` block')
})
```

## Вики
Смотрите [wiki](https://asewhy.github.io/#poonya/main-poonya) для помощи по синтаксису