const showdown  = require('showdown');
const doT = require('dot');
const fs = require('fs');

const postsFolder = './posts';
const postTemplate = './build/post_template.dot';
const homeTemplate = './build/home_template.dot';
const converter = new showdown.Converter();

fs.readdir('./posts', (error, filenames) => {
    filenames.forEach(filename => {
        fs.readFile(`${postsFolder}/${filename}`, 'utf8', (err, content) => {
            const postContent = converter.makeHtml(content);
            const postName = filename.replace('.md', '');
            var tempFn = doT.template(fs.readFileSync(postTemplate));
            var resultText = tempFn({
                postName,
                postContent,
            });

            fs.writeFileSync(`./dist/${postName}.html`, resultText);
        });
    });

    const simpleFileNames = filenames.map(filename => filename.replace('.md', ''));
    const homePage = doT.template(fs.readFileSync(homeTemplate));
    const renderedHomePage = homePage({ pages: simpleFileNames });

    fs.writeFileSync('./index.html', renderedHomePage);
});