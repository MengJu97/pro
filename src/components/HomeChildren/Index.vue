<template>
  <div class="index">
    <van-nav-bar
        title="首页"
        placeholder
        fixed
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in bannerList" :key="index">
        <img :src="item" alt="">
      </van-swipe-item>
    </van-swipe>
    <!--菜单宫格-->
    <van-grid :column-num="4">
      <van-grid-item v-for="(item,index) in menuList" :key="index">
        <van-icon :name="item.icon" :color="item.color"/>
        <p>{{ item.title }}</p>
      </van-grid-item>
    </van-grid>
    <!-- 分类   -->

    <!--商品列表-->
    <van-card
        :price="item.currentPrice"
        :title="item.productName"
        :thumb="item.imgUrl"
        :origin-price="item.originalPrice"
        v-for="(item,index) in list"
        :key="item.productId"
        @click="toDetail(item.productId)"
    />
  </div>
</template>

<script>
import {getBanner} from "@/utils/api";
import qs from 'qs'
import {mapState} from 'vuex'

export default {
  name: "Index",
  data() {
    return {
      bannerList: [],
      menuList: [
        {
          title: '每日福利',
          icon: 'new',
          color: '#ff8618'
        },
        {
          title: '热销榜',
          icon: 'fire',
          color: '#fd6267'
        },
        {
          title: '皮噜甄选',
          icon: 'gift',
          color: '#feb30b'
        },
        {
          title: '会员中心',
          icon: 'vip-card',
          color: '#a67bf4'
        }
      ],
      count: 10,
      page: 1
    }
  },
  methods: {
    //获取首页轮播图
    async methodGetBanner() {
      const result = await getBanner();
      //返回成功的（resolve）的
      this.bannerList = result.result.list;
    },
    toDetail(id) {
      this.$router.push('/detail/' + id);
    }
  },
  mounted() {
    this.methodGetBanner();
    this.$store.dispatch('getRecommendList', qs.stringify({
      count: this.count,
      page: this.page
    }))
  },
  computed: {
    ...mapState({
      list: state => state.recommendList
    })
  }
}
</script>

<style scoped lang="stylus">
* {
  margin 0
  padding 0
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
}
</style>