<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar
        v-model="active"
        safe-area-inset-bottom
        active-color="#ff7e2b"
        inactive-color="#383838"
        route
        placeholder
    >
      <van-tabbar-item v-for="(item,index) in tabBarItem" :icon="item.icon" :key="index" :to="item.to">{{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0,
      tabBarItem: [
        {
          name: '首页',
          icon: 'wap-home',
          to: '/index'
        },
        {
          name: '分类',
          icon: 'apps-o',
          to: '/cat'
        },
        {
          name: '购物车',
          icon: 'shopping-cart',
          to: '/cart'
        },
        {
          name: '我的',
          icon: 'manager',
          to: '/mine'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">

</style>