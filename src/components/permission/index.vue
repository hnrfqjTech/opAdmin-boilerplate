<template>
  <transition v-if="visible">
    <slot />
  </transition>
</template>

<script type="text/babel">
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Permission',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapGetters(['menuAll']),
  },
  watch: {
    menuAll: {
      handler(newVal) {
        this.renderHandle();
      },
      deep: true,
    },
  },
  created() {
    this.renderHandle();
  },
  methods: {
    renderHandle() {
      const oldDisplay = '';
      if (typeof this.list === 'object') {
        const storeMenuAll = this.menuAll;
        let match = false;

        const hasPermission = (menuAll, rule) => {
          menuAll.forEach((item) => {
            if (item.perms) {
              if (item.perms.search(rule) !== -1) match = true;
            }

            if (item.subMenus) {
              hasPermission(item.subMenus, rule);
            }
          });
        };
        this.list.forEach((item) => {
          hasPermission(storeMenuAll, item);
        });

        this.visible = match;
      } else if (typeof this.list === 'boolean') {
        this.visible = this.list;
      }
    },
  },
};
</script>

<style lang="scss"></style>
