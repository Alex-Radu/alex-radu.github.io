---
title: Metadata and refactoring
summary: How I added metadata and changes I made for a better project structure
tags: wip
---
# Metadata and refactoring

## Metadata

Generally, static sites that behave like blogs need a home page that has a list with links towards these posts. These links may contain the post title, maybe a short summary of what the post is about and even tags. For this, you need metadata that can be used when generating pages and provide information that is either too cumbersome to manually fill in, or even impossible. Luckily `showdown` provides support for metadata in the form of **Front Matter**; like so:

```markdown
---
title: This is the title of my post
summary: In this post I talk about interesting things; do read! 😎
tags: interesting, tools
---
```

After I added this block as the first thing in the `.md` files, I added some lines in the `builder.js` file in order to extract this data and use it when rendering the `.html` pages

```js
showdown.setOption('metadata', true);
/* ... */
const metadata = converter.getMetadata();
/*
This is how the object will look like:

metadata = {
    title: 'This is the title of my post',
    summary: 'In this post I talk about interesting things; do read! 😎',
    tags: 'interesting, tools'
}
*/
```

There are a lot of potential features that are achievable with metadata. For example, speaking about the tags I added in the Front Matter, they can be extracted and used on the front page to be displayed as links to a page like `/tags/tag-name.html` where all the posts with the tag **tag-name** can be shown. So potentially, adding a /search-like/ feature to a static website. This is one of the things I did with metadata.

## Refactoring

The more complex the project becomes, the better the structure needs to be so that it is easier to maintain and change things. This means code splitting, renaming and moving files around and also building a more sensible location from where posts will be served. Here are some of the changes in more detail:

### Split styles

It will be easier to changes styles for specific parts of the website if they're not all in one file. With `SCSS` I can have something like below. This way, if I want to change how unordered lists look like when they're part of a post, I can go directly to `post_page.scss` instead of searching through an ever-expanding file.

#### **`index.scss`**
```css
/* importing of other styles */
@import "./home_page.scss";
@import "./post_page.scss";

/* defining variables */
$some-variable: #FFF;
```

### Posts location

I don't like serving posts from the root - e.g. `/some-post.html`, `/another-post.html`, etc. I want something more blog-ish, like this: `/year/month/day/post-title.html`. For this, I am extracting some information about each file:

```js
    const { birthtime } = fs.statSync(file_Path_And_Name);
    const birthday = moment(birthtime).date();
    const birthmonth = moment(birthtime).month() + 1; // because of 0-index
    const birthyear = moment(birthtime).year();

    //and then
    const postDestinationFolder = `./${destFolder}/${birthyear}/${birthmonth}/${birthday}`;
```

And with the help of <a href="https://momentjs.com/" class="trippy" target="_blank">Moment.js</a> which enables some quick and painless date manipulation I can extract the **year**, **month**, **day** and also do some other fancy things, like displaying `X time ago` when given a date. But, if you're not hackin' and slashin' and are more of a purist or are working on performance sensitive applications, you might want to look at this instead - <a href="https://github.com/you-dont-need/You-Dont-Need-Momentjs" class="trippy" target="_blank">You-Dont-Need-Momentjs</a>

This is it for now. See you next time! 😁