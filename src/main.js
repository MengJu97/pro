import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//rem适配
import 'amfe-flexible'

Vue.config.productionTip = false

import {
    Tabbar,
    TabbarItem,
    NavBar,
    Swipe,
    SwipeItem,
    Grid,
    GridItem,
    Image as VanImage,
    Icon,
    Card,
    GoodsAction, GoodsActionIcon, GoodsActionButton,
    Sku,
    Cell, CellGroup,
    Search,
    Sidebar, SidebarItem,
    Field,
    Button,
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(VanImage);
Vue.use(Icon);
Vue.use(Card);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Search);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Field);
Vue.use(Button);

import '../src/assets/style/style.css'

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
