/* eslint-disable */
const showdown = require('showdown');
const Mustache = require('mustache');
const fs = require('fs');
const moment = require('moment');

showdown.setFlavor('github');
showdown.setOption('noHeaderId', true);
showdown.setOption('metadata', true);

const converter = new showdown.Converter();

const postsFolder = './_posts';
const destFolder = './public/posts';

const postsMetadata = {
  posts: [],
  tags: new Set(),
};
const files = fs.readdirSync(postsFolder);

for (const file of files) {
  const fileContent = fs.readFileSync(`${postsFolder}/${file}`, 'utf8');
  const postContent = converter.makeHtml(fileContent);
  const postMetadata = converter.getMetadata();
  const postName = file.replace('.md', '');
  const { mtime: modified, birthtime: created } = fs.statSync(`${postsFolder}/${file}`);

  postMetadata.tags = postMetadata.tags.split(', ');

  const metadata = {
    birthday: moment(created).date(),
    birthmonth: moment(created).month() + 1,
    birthyear: moment(created).year(),
    created,
    labelCreated: moment(created).fromNow(),
    labelModified: moment(modified).fromNow(),
    slug: postName,
    ...postMetadata,
  };
  const postDestinationFolder = `./${destFolder}/${metadata.birthyear}/${metadata.birthmonth}/${metadata.birthday}`;

  postMetadata.tags.forEach((tag) => postsMetadata.tags.add(tag));
  postsMetadata.posts.push(metadata);
  fs.mkdirSync(postDestinationFolder, { recursive: true });
  fs.writeFileSync(`${postDestinationFolder}/${postName}.html`, postContent);
  fs.writeFileSync(`${postDestinationFolder}/${postName}.json`, JSON.stringify(metadata, null, '\t'));
}

postsMetadata.tags = Array.from(postsMetadata.tags);
postsMetadata.posts.sort((post_A, post_B) => {
  if (moment(post_A.created).isBefore(moment(post_B.created))) return 1;
  if (moment(post_B.created).isBefore(moment(post_A.created))) return -1;

  return 0;
});

fs.writeFileSync('./public/site-data.json', JSON.stringify(postsMetadata, null, 2));
/* eslint-enable */
