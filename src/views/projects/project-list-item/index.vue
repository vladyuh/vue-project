<template>
  <router-link
      class="projects-list__item"
      :to="`${project.url}`"
  >
    <div class="projects-list__item-wr">
      <span class="projects-list__item-link">{{ project?.link }}</span>
      <section-header class="projects-list__item-title" :level="4" :text="project?.title"/>
      <p class="projects-list__item-desc" v-html="project?.description"/>
    </div>
  </router-link>
</template>

<script>
import SectionHeader from "@/common-components/section-header";

export default {
  name: 'project-list-item',
  components: {
    SectionHeader,
  },
  props: {
    project: Object
  },
}
</script>