module.exports = {
  indexPath: process.env.NODE_ENV === 'production' ? '../index.html' : 'index.html',
  publicPath: process.env.NODE_ENV === 'production' ? 'dist' : '',
};
