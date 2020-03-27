<template>
  <a class="unsplash-badge"
    :href="`${link}?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge`"
    target="_blank"
    rel="noopener noreferrer"
    :title="`Download free do whatever you want high-resolution photos from ${author}`">
      <span class="unsplash-logo">
        <svg xmlns="http://www.w3.org/2000/svg"
          style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white"
          viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg>
      </span>
      <span class="unsplash-author">{{ author }}</span>
  </a>
</template>

<script>
export default {
  name: 'UnsplashBadge',
  props: {
    author: String,
    link: String,
  },
};
</script>

<style lang="scss">
.unsplash-badge {
  background-color: black;
  border-radius: 3px;
  color: white;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
  padding: 4px 6px;
  text-decoration: none;

  .unsplash-logo {
    display: inline-block;
    padding: 2px 3px;
  }

  .unsplash-author {
    display: inline-block;
    padding: 2px 3px;
  }
}
</style>
