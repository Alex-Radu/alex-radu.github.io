<template>
  <div class="post-card">
    <span class="created-label">🕐 {{ labelCreated }}</span>
    <div class="post-img-wrapper">
      <img v-bind:src="img">
    </div>
    <h1><slot name="header">Post header</slot></h1>
    <p><slot name="description">Post description</slot></p>
    <router-link class="tag" v-for="tag in tags" :key="tag" to="/">{{ tag }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'PostCard',
  props: {
    img: String,
    labelCreated: String,
    tags: Array,
  },
};
</script>

<style lang="scss">
.post-card {
  background: white;
  border-radius: .5rem;
  box-shadow:
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  // overflow: hidden;
  position: relative;
  width: 300px;

  span.created-label {
    background-color: #247BA0;
    border-radius: .5rem;
    color: #FFE066;
    font-size: 1.2rem;
    font-weight: bold;
    left: 1rem;
    opacity: .85;
    padding: .2rem 1rem;
    position: absolute;
    top: .5rem;
  }

  a.tag {
    background-color: #247BA0;
    color: #FFE066;
    font-weight: bold;
    padding: .3rem 2rem;
    position: absolute;
    right: -1.2rem;

    &:after {
      position: absolute;
      content: '';
      top: 100%;
      right: 0;
      border-style: solid;
      border-width: 0 0 1.2rem 1.2rem;
      border-color: transparent;
      border-left-color: rgba(36, 123, 160, .8);
    }
  }

  @for $i from 1 through 5 {
    a.tag:nth-of-type(#{$i}) {
      top: calc(#{$i} * 3.3rem - 2.8rem);
    }
  }

  .post-img-wrapper {
    border-radius: .5rem .5rem 0 0;
    overflow: hidden;

    img {
      border-radius: .5rem .5rem 0 0;
      display: block;
      height: 300px;
    }
  }

  h1 {
    background-color: #FFE066;
    color: #247BA0;
    margin: 0;
    padding: 1.5rem;
  }

  p {
    background-color: #F7FFF7;
    border-radius: 0 0 .5rem .5rem;
    color: #50514F;
    font-size: 1.6rem;
    margin: 0;
    padding: 1.5rem;
  }
}
</style>
