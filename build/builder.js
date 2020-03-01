const showdown  = require('showdown');
const doT = require('dot');
const fs = require('fs');
const moment = require('moment');

showdown.setFlavor('github');
showdown.setOption('noHeaderId', true);
showdown.setOption('metadata', true);

const bindings = {
    type: 'output',
    regex: new RegExp('<h1(.*)>(.*)</h1>', 'g'),
    replace: '<div class="heading-wrapper"><h1 $1>$2</h1></div>'
};

const converter = new showdown.Converter({
    extensions: [bindings]
});

const postsFolder = './_posts';
const destFolder = './posts';
const postTemplate = './build/post_template.dot';
const homeTemplate = './build/home_template.dot';

fs.readdir(postsFolder, (error, filenames) => {
    let postsMetadata = [];

    filenames.forEach((filename, index) => {
        fs.readFile(`${postsFolder}/${filename}`, 'utf8', (err, content) => {
            const postContent = converter.makeHtml(content);
            const postMetadata = converter.getMetadata();
            const postName = filename.replace('.md', '');
            const { mtime: modified, birthtime: created } = fs.statSync(`${postsFolder}/${filename}`);
            const tempFn = doT.template(fs.readFileSync(postTemplate));
            const resultText = tempFn({
                postName,
                postContent,
            });
            const metadata = {
                birthday: moment(created).date(),
                birthmonth: moment(created).month() + 1,
                birthyear: moment(created).year(),
                labelCreated: moment(created).fromNow(),
                labelModified: moment(modified).fromNow(),
                name: postName,
                ...postMetadata
            }
            const postDestinationFolder = `./${destFolder}/${metadata.birthyear}/${metadata.birthmonth}/${metadata.birthday}`;

            postsMetadata.push(metadata);
            fs.mkdirSync(postDestinationFolder, { recursive: true });
            fs.writeFileSync(`${postDestinationFolder}/${postName}.html`, resultText);

            if (index === filenames.length - 1) buildHomepage(postsMetadata);
        });
    });
});

function buildHomepage(postsMetadata) {
    const homePage = doT.template(fs.readFileSync(homeTemplate));
    const renderedHomePage = homePage({ posts: postsMetadata });

    fs.writeFileSync('./index.html', renderedHomePage);
}