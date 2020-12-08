<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="tabControlShow"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="2"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad.once="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "views/home/childComps/HomeSwiper";
import HomeRecommendView from "views/home/childComps/HomeRecommendView";
import FeatureView from "views/home/childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  components: {
    NavBar,
    TabControl,
    // 请求数据 返回数据尽量在首页完成，因为首页中多个组件都需要用到数据，可以避免在每个组件中都请求一次
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,
    BackTop,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      tabControlShow: false,
      saveY: 0,
    };
  },
  computed: {
    //   数据在一开始就已经请求过了，点击tabControl返回不同的currentType，在由goodlist渲染不同的页面，本质就是不同的gonds数据渲染不同的页面
    showGoods() {
      // 将goods作为计算属性   并动态返回给GoodsList子组件
      return this.goods[this.currentType].list;
    },
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    console.log(this.$refs.scroll.scroll.y);
    this.saveY = this.$refs.scroll.scroll.y;
  },
  created() {
    // 使用created生命周期函数可以在页面一旦被创建好就请求数据，链式调用then方法返回数据

    // 请求banner recommend图片等信息
    this.getHomeMultidata();

    // 在组件被创建后直接请求商品信息
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // console.log(this.goods);
  },
  mounted() {
    // 图片加载监听  注意： created里面是拿不到$refs的，只有在组件挂载到DOM中才能拿到，即mounted中
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("itemImgLoad", () => {
      //   this.$refs.scroll.refresh();
      refresh();
    });
  },
  methods: {
    //   事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回顶部按钮点击
    backClick() {
      //   console.log(this.$refs);
      //   直接使用scroll组件中的scrollTo方法,点击回到顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      //  1. 判断backtop是否显示
      this.isShowBackTop = position.y > -1000 ? false : true;
      //  2.判断tabControl是否吸顶
      this.tabControlShow = -position.y > this.tabOffsetTop ? true : false;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    // 监听轮播图片加载完成
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      //   console.log(this.tabOffsetTop);
    },

    //   网络请求相关的方法
    //首页轮播数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 首页商品信息 再次对getHomeGoods进行封转
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
        // console.log(type);
        // console.log(page);
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>