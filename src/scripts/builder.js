const showdown  = require('showdown');
const Mustache = require('mustache');
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
const postTemplate = './src/templates/post_template.mustache';
const homeTemplate = './src/templates/home_template.mustache';
const headerTemplate = fs.readFileSync('./src/templates/header_template.mustache', 'utf8');

fs.readdir(postsFolder, (error, filenames) => {
    let postsMetadata = [];

    filenames.forEach((filename, index) => {
        fs.readFile(`${postsFolder}/${filename}`, 'utf8', (err, content) => {
            const postContent = converter.makeHtml(content);
            const postMetadata = converter.getMetadata();
            const postName = filename.replace('.md', '');
            const { mtime: modified, birthtime: created } = fs.statSync(`${postsFolder}/${filename}`);
            const resultText = Mustache.render(fs.readFileSync(postTemplate, 'utf8'), { postName, postContent }, { header: headerTemplate })

            postMetadata.tags = postMetadata.tags.split(', ');

            const metadata = {
                birthday: moment(created).date(),
                birthmonth: moment(created).month() + 1,
                birthyear: moment(created).year(),
                labelCreated: moment(created).fromNow(),
                labelModified: moment(modified).fromNow(),
                slug: postName,
                ...postMetadata
            }
            const postDestinationFolder = `./${destFolder}/${metadata.birthyear}/${metadata.birthmonth}/${metadata.birthday}`;

            postsMetadata.push(metadata);
            fs.mkdirSync(postDestinationFolder, { recursive: true });
            fs.writeFileSync(`${postDestinationFolder}/${postName}.html`, resultText);

            // I do this here because async stuff
            if (index === filenames.length - 1) buildHomepage(postsMetadata);
        });
    });
});

function buildHomepage(postsMetadata) {
    const renderedHomePage = Mustache.render(fs.readFileSync(homeTemplate, 'utf8'), { posts: postsMetadata, pageHome: true }, { header: headerTemplate });

    fs.writeFileSync('./index.html', renderedHomePage);
}