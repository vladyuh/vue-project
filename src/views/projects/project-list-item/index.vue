<template>
  <router-link
      class="projects-list__item"
      :to="`${project.url}`"
  >
    <div class="projects-list__item-wr">
      <span class="projects-list__item-link">{{ project?.link }}</span>
      <section-header class="projects-list__item-title" :level="4" :text="project?.title"/>
      <p class="projects-list__item-desc" v-html="project?.description"/>
      <div class="projects-list__item-icon">
        <icon
            class="projects-list__item-icon-bg"
            icon-name="ic_figure"
        />
        <icon
            class="projects-list__item-icon-symbol"
            icon-name="ic_arrow-up"
        />
      </div>
    </div>
  </router-link>
</template>

<script>
import SectionHeader from "@/common-components/section-header";
import Icon from "@/common-components/icon";

export default {
  name: 'project-list-item',
  components: {
    SectionHeader,
    Icon
  },
  props: {
    project: Object
  },
}
</script>