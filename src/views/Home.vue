<template>
  <article class="home">
     <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <main v-if="siteData" class="content">
      <PostCard v-for="post in siteData.posts" :key="post.created" :img="`/assets/images/${post.slug}.jpg`" :label-created="post.labelCreated" :tags="post.tags">
        <template v-slot:header>
          <router-link :to="`/posts/${post.birthyear}/${post.birthmonth}/${post.birthday}/${post.slug}`">{{ post.title }}</router-link>
        </template>

        <template v-slot:description>
          {{ post.summary }}
        </template>
      </PostCard>
    </main>
  </article>
</template>

<script>
import PostCard from '@/components/PostCard.vue';

export default {
  name: 'Home',
  components: {
    PostCard,
  },
  data() {
    return {
      loading: false,
      error: null,
      siteData: null,
    };
  },
  created() {
    this.fetchSiteData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchSiteData',
  },
  methods: {
    fetchSiteData() {
      this.error = null;
      this.post = null;
      this.loading = true;
      fetch('/site-data.json')
        .then((raw) => raw.json())
        .then((json) => {
          console.log(json);
          this.loading = false;
          this.siteData = json;
        });
    },
  },
};
</script>

<style lang="scss">

.content {
  align-items: flex-start;
  background-color: #EBEBEB;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 1.6rem;

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
