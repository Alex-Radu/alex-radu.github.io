<template>
  <main class="post-container">
    <img class="post-banner" :src="`/assets/images/${slug}-big.jpg`" />
    <UnsplashBadge :author="metadata.bannerAuthor" :link="metadata.bannerLink"/>
    <article v-html="html"></article>
  </main>
</template>


<script>
import Prism from 'prismjs';
import UnsplashBadge from '@/components/UnsplashBadge.vue';

export default {
  name: 'Post',
  components: {
    UnsplashBadge,
  },
  data() {
    return {
      html: null,
      metadata: {},
      slug: this.$route.params.slug,
    };
  },
  created() {
    console.log(this.$route);
    this.fetchData();
  },
  updated() {
    Prism.highlightAll();
    const postTitle = document.querySelector('.post-container article h1');
    const postTitleHeight = postTitle.offsetHeight;

    postTitle.style.top = `calc(600px - ${postTitleHeight}px - 1rem)`;
  },
  methods: {
    fetchData() {
      const {
        year, month, day, slug,
      } = this.$route.params;

      Promise.all([fetch(`/posts/${year}/${month}/${day}/${slug}.json`), fetch(`/posts/${year}/${month}/${day}/${slug}.html`)])
        .then(([rawJSON, rawHTML]) => Promise.all([rawJSON.json(), rawHTML.text()]))
        .then(([metadata, html]) => {
          this.metadata = metadata;
          this.html = html;
        });
    },
  },
};
</script>

<style lang="scss">
@keyframes colordance {
  0% {
    color: #379683;
  }

  20% {
    color: #05386B;
  }

  40% {
    color: #2ECC40;
  }

  60% {
    color: #FFDC00;
  }

  80% {
    color: #7B2182;
  }

  100% {
    color: #379683;
  }
}

.post-container {
  margin: 0 auto;
  position: relative;
  width: 900px;

  .post-banner {
    display: block;
    height: 600px;
    width: 900px;
  }

  .unsplash-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  h1 {
    background-color: rgba(80, 81, 79, .7);
    color: #FFE066;
    font-size: 4rem;
    left: 0;
    margin: 0;
    padding: .5rem 2rem;
    position: absolute;
    width: 100%;
  }

  article {
    background: #FFFFFF;
    font-size: 1.6rem;
    border-color: #F25F5C;
    border-style: solid;
    border-width: 0 1px 1px;
    padding: 2rem 6rem;
    margin-bottom: 2rem;

    h2 {
      background: rgba(255, 224, 102, .4);
      color: #247BA0;
      margin: 0 -6rem;
      padding: 1rem 2rem;
    }

    p > code,
    li > code {
      background: rgba(224, 224, 224, 0.4);
      color: #F25F5C;
      padding: 0 0.3rem;
    }

    blockquote {
      border-left: 5px solid #F25F5C;
      font-style: italic;
      margin: 1.5rem 0;
      padding: .5rem 1rem;

      &:before,
      &:after {
        color: #F25F5C;
        font-size: 3rem;
        line-height: 0.1rem;
        vertical-align: -1rem;
      }

      &:before {
        content: open-quote;
        margin-right: 0.25rem;
      }

      &:after {
        content: close-quote;
        margin-left: 0.25rem;
      }

      p {
        display: inline;
      }
    }

    pre {
      border-radius: 0;
      margin: 0 -6rem;
      padding: 2rem 6rem;
    }

    pre + h2 {
      margin-top: 2rem;
    }

    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        margin: 0 0 1rem;
        padding: 1rem 1.5rem;
        position: relative;

        &:before {
          background: #F25F5C;
          border-radius: 50%;
          content: ' ';
          display: inline-block;
          height: 1rem;
          left: 0;
          position: absolute;
          top: 1.7rem;
          width: 1rem;
        }
      }
    }

    a.trippy {
      color: #247BA0;
      font-size: 1.6rem;

      &:hover,
      &:focus {
          animation-duration: 1s;
          animation-name: colordance;
          animation-iteration-count: infinite;
      }
    }
  }
}
</style>
