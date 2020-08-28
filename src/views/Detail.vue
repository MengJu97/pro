<template>
  <div class="detail">
    <van-nav-bar
        title="商品详情"
        placeholder
        fixed
        left-arrow
        @click-left="onClickLeft"
    />
    <van-swipe class="my-swipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item,index) in imgArr" :key="index">
        <img :src="item" alt="">
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/4
        </div>
      </template>
    </van-swipe>
    <div class="goodsDesc">
      <div class="goods-title">
        <p><span class="rmb">¥</span><span class="price">{{ renderList.currentPrice }}.00</span><span
            class="vip">会员专享</span></p>
      </div>
      <div class="normal-price">
        普通价 ¥{{ renderList.originalPrice }}.00
      </div>
      <div class="product-name">{{ renderList.productName }}</div>
      <div class="main-desc">{{ renderList.describe }}</div>
    </div>
    <van-cell title="选择" is-link value="可选规格" @click="changeShow"/>
    <van-cell title="商品评论（0）" is-link value="好评"/>
    <van-sku
        v-model="show"
        :sku="renderSku"
        :goods="renderGoods"
        :goods-id="this.$route.params.id"
        :hide-stock="sku.hide_stock"
    />
    <van-goods-action>
      <van-goods-action-icon icon="service-o" text="客服" @click="onClickIcon"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon"/>
      <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton"/>
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton"/>
    </van-goods-action>
  </div>
</template>

<script>
import qs from 'qs'
import {Toast} from 'vant'

export default {
  name: "Detail",
  data() {
    return {
      current: 0,
      show: false,
      sku: {
        tree: [
          {
            k_id: 123, // 属性id
            k: '尺码', // 属性名
            is_multiple: true, // 是否可多选
            v: [
              {
                id: 1222, // 属性值id
                name: '珍珠', // 属性值名
                price: 1, // 属性值加价
              },
              {
                id: 1223,
                name: '椰果',
                price: 1,
              },
            ],
          },
        ],
        price: '100.00',
        stock_num: 227,
        collection_id: 2261,
        none_sku: false,
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      }
    }
  },
  computed: {
    k_id() {
      return this.$store.state.itemDetailList._id;
    },
    k_kind() {
      return this.$store.state.itemDetailList
    },
    k_standards() {
      return this.$store.state.itemDetailStandards
    }
    ,
    k_type() {
      const arr = [];
      for (let i = 0; i < this.doubleStandards.length; i++) {
        let obj = {
          id: i,
          name: this.doubleStandards[i],
          price: 1
        }
        arr.push(obj)
      }
      return arr
    },
    renderSku() {
      return {
        tree: [
          {
            k_id: this.renderList.productId, // 属性id
            k: this.renderTitle, // 属性名
            is_multiple: true, // 是否可多选
            v: this.k_type,
          },
        ],
        price: this.renderList.currentPrice,
        stock_num: 227,
        collection_id: 2261,
        none_sku: false,
      }
    },
    renderGoods() {
      return {
        picture: this.renderList.imgUrl
      }
    },
    renderTitle() {
      return this.k_standards.title
    },
    doubleStandards() {
      return this.$store.state.itemDetailStandardsStandards;
    }
    ,
    renderList() {
      return this.$store.state.itemDetailList
    },
    imgArr() {
      return this.$store.state.itemDetailList.imgArr
    }
  },
  methods: {
    changeShow() {
      this.show = true;
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      // Toast('点击图标');
      this.show = true;
    },
    onClickButton() {
      // Toast('点击按钮');
      this.show = true;
    },
  },
  mounted() {
    this.$store.dispatch('actionGetDetail', qs.stringify({
      productId: this.$route.params.id
    }))
  }
}
</script>

<style lang="stylus">
.detail {
  background-color #f7f7f7
}

.van-nav-bar {
  height: 1.48rem;
}

.van-nav-bar__title {
  font-size: .59rem;
  font-weight: 400;
}

.van-nav-bar .van-icon {
  color: black;
  font-size .7rem
}

.custom-indicator {
  text-align center
  line-height .556rem
  width 1.185rem
  height .556rem
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  color white
  background-color #b9b9b9
  border-radius .5rem
}

.goodsDesc {
  padding 0 0.46rem
  background-color white
}

.goods-title {
  p {
    height 1.53rem
    margin 0

    .rmb {
      display inline-block
      font-size .35rem
      color #e06819
      margin-right .1rem
    }

    .price {
      font-size .65rem
      color #e06819
      font-weight 300
      margin-right .2rem
    }

    .vip {
      display inline-block
      font-size .3rem
      color #e06819
      background-color #ffe5d3
      padding 0 .1rem
      border-radius .3rem
    }
  }
}

.normal-price {
  height 0.8rem
  line-height .8rem
  font-size .37rem
  color #868786
}

.product-name {
  font-size .4rem
  height .92rem
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  font-weight 500
  line-height .92rem
}

.main-desc {
  height .92rem
  font-size .3rem
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  color #acacac
  line-height .92rem
}

.van-cell {
  margin-top .5rem
}
</style>