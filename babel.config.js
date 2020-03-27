module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    ['prismjs', {
      languages: ['js', 'css', 'html', 'bash', 'markdown'],
      theme: 'okaidia',
      css: true,
    }],
  ],
};
