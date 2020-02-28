# Basic SSG (Static Site Generator)

## Intro
The plan here is for me to write blog posts in **Markdown** and have some code in place that converts it to **HTML** and makes it accessible via a link from the `index.html` page. While the plan is to develop this into something smarter and fancier, for this first step, something simple will suffice.

## Get set
The first thing I need is a Markdown to HTML converter written in Javascript; for this I chose <a href="https://github.com/showdownjs/showdown" target="_blank">Showdown</a> for the simple reason of being the first result on Google and having lots of stars on GitHub.

Next I will need a template engine. The reason here is because Markdown, converted to HTML, is a collection of tags, but not an HTML page; it doesn't have all the `<html>`, `<head>`, `<body>`, etc. tags that are needed in a page. So I want to write a template for an HTML page and in it, fill in just the content that comes from the Markdown file. I chose <a href="https://github.com/olado/doT" target="_blank">doT</a> because it looked (and is) simple and I already had used Moustache and wanted to try something else.

## Go
A very basic template might look like this:

#### **`template.dot`**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{=it.name}}</title>
  </head>
  <body>
    {{=it.content}}
  </body>
</html>
```

I have the required **HTML** tags and for the time being, I'm expecting to fill in the `<title>` tag with the file name and the `<body>` tag with everything generated from the Markdown file.

And now for the bit that brings it all together:

#### **`builder.js`**
```js
const showdown  = require('showdown');
const doT = require('dot');
const fs = require('fs');

const pageTemplate = './template.dot';
const converter = new showdown.Converter();

/* Read the contents of the folder where I keep all the .md files */
fs.readdir('./posts', (error, filenames) => {
    filenames.forEach(filename => {
        /* Then read the contents of each file */
        fs.readFile(`${postsFolder}/${filename}`, 'utf8', (err, content) => {
            const content = converter.makeHtml(content); // convert from Markdown -> HTML
            const name = filename.replace('.md', ''); // extract the file name without the extension
            const tempFn = doT.template(fs.readFileSync(pageTemplate)); // create a doT template from the template file
            const pageContent = tempFn({
                name,
                content,
            }); // render the template with the required information

            fs.writeFileSync(`./${name}.html`, pageContent); // finally, save as a new HTML file
        });
    });
});
```

So now, if I have an initial `test.md` file that contains "`# This is a heading`", after I run

```
node ./builder.js
```

I should see a new `test.html` file that contains this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test</title>
  </head>
  <body>
    <h1 id="thisisaheading">This is a heading</h1>
  </body>
</html>
```

## The cherry on top

Because I also want to update the *main* page of the website with links to all of the posts, I need a template for this page and to also add a few more lines of code in the `builder.js` file.

#### **`main_template.dot`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>This is the homepage</h1>
    <ul>
    {{~ it.pages :page}}
        <li>
            <a href="/{{=page}}.html">{{=page}}</a>
        </li>
    {{~}}
    </ul>
</body>
</html>
```

And inside the callback for the `fs.readdir` call, at the end, I'll add this:

```js
const simpleFileNames = filenames.map(filename => filename.replace('.md', ''));
const homePage = doT.template(fs.readFileSync('./main_template.dot'));
const renderedHomePage = homePage({ pages: simpleFileNames });

fs.writeFileSync('./index.html', renderedHomePage);
```

Now, when I run the script again, I will have an `index.html` file that contains this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
  </head>
  <body>
    <h1>This is the homepage</h1>
    <ul>
      <li><a href="/test.html">test</a></li>
    </ul>
  </body>
</html>
```

This is it for now. See you next time! 😁