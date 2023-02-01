<template>
  <div class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li
          v-for="(item, key) in items"
          :key="key"
          class="breadcrumbs__item"
      >
        <router-link
            :to="item.href"
            v-html="item.text"
            :class="['breadcrumbs__link', {'breadcrumbs__link--active': $route.path === item.href}]"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'breadcrumbs',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
  }
}
</script>

<style src="./style.scss" lang="scss"/>
