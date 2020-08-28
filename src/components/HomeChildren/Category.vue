<template>
  <div class="category">
    <van-nav-bar
        title="分类"
        placeholder
        fixed
    />
    <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" :border="false"/>
    <div class="main-area">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item v-for="(item,index) in sidebarList" :key="index" :title="item.title"
                          @click="reRender(item.type)"/>
      </van-sidebar>
      <div class="render-part">
        <!--        <van-grid :column-num="3">-->
        <!--          <van-grid-item v-for="item in returnList" :key="item.productId" icon="photo-o" :text="item.title"/>-->
        <!--        </van-grid>-->
        <div class="block" v-for="item in returnList" :key="item.productId">
          <img :src="item.imgUrl" alt="">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: "Category",
  data() {
    return {
      value: '',
      activeKey: 0,
      type: 1,
      sidebarList: [
        {
          title: '推荐分类',
          type: 1
        }, {
          title: '全球奶粉',
          type: 2
        }, {
          title: '尿不湿',
          type: 3
        }
      ]
    }
  },
  methods: {
    reRender(type) {
      this.type = type;
      this.getList()
    },
    getList() {
      this.$store.dispatch('getCategoryList', qs.stringify({
        type: this.type
      }))
    }
  },
  mounted() {
    this.getList();
  },
  computed: {
    returnList() {
      return this.$store.state.catList
    }
  }
}
</script>

<style scoped lang="stylus">
.category {
  .van-nav-bar {
    height: 1.48rem;
  }

  .van-nav-bar__title {
    font-size: .59rem;
    font-weight: 400;
  }

  .main-area {
    display flex
    //background-color #868786

    .render-part {
      flex 1
      //background-color #e06819
      display flex
      flex-wrap wrap
      .block {
        width 33.3%
        height: 33.3%;
        display flex
        flex-direction column
        justify-content center
        align-items center
        p{
          text-align center
          width 80%
          font-size 12px
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        }
        img {
          width 80px

        }
      }
    }
  }
}

</style>