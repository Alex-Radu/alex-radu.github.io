<template>
  <div id="app">
    <nav>
      <div>
        <img src="/assets/images/avatar.png" class="avatar">
        <router-link to="/" exact>Home</router-link>
      </div>
    </nav>
    <router-view class="site-content"/>
  </div>
</template>

<style lang="scss">
nav {
  background-color: #EBEBEB;
  border-bottom: 1px solid rgb(214, 214, 214);
  box-shadow: 0px 1px 4px -2px #9E9E9E;
  color: #EDF5E1;
  font-weight: bold;
  margin-top: -9rem;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 1;

  div {
    display: flex;
    margin: 0 auto;
    width: 1280px;

    img {
      align-self: center;
      border: 3px solid #247BA0;
      border-radius: 50%;
      height: 5rem;
      width: 5rem;
    }

    a {
      align-self: center;
      border-color: transparent;
      border-radius: .5rem;
      border-style: solid;
      border-width: 2px;
      color: #247BA0;
      font-size: 2rem;
      padding: .5rem 2rem;
      text-decoration: none;

      &:first-of-type {
        margin-left: 1.5rem;
      }

      &.router-link-active {
        background-color: #FFE066;
        border-color: #247BA0;
      }
    }
  }
}

.site-content {
  margin: 0 auto;
  width: 1280px;
}
</style>
