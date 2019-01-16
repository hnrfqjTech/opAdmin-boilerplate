import Vue from 'vue';
import _CONST from '@/const/global';
import HmUi from 'hm-ui';
import Permission from '@/components/permission';
import PagerGrid from '@/components/pager-grid';
import PagerCard from '@/components/pager-card';

const UiList = [
  Permission,
  PagerGrid,
  PagerCard,
];

export default {
  install() {
    Vue.use(HmUi);
    UiList.forEach((widget) => {
      Vue.component(_CONST.PREFIX + widget.name, widget);
    });
  },
};
