<template>
  <section
      v-if="isLoaded"
      class="projects-page"
  >
    <div class="container">
      <back-title
          ref="backTitle"
          text="Проекты"
      >
        <icon-btn
            v-if="isMobile || isTablet"
            icon="ic_sort"
            class="projects-page__filter-icon"
            @click="$refs.bottomSheet.open()"
        />
        <custom-select
            v-if="!isMobile && !isTablet"
            class="projects-page__filter-select"
            label="Сортировка"
            ref="customSelect"
            placeholder="Выберите..."
            :options="options"
            @input="setSelected($event)"
        />
      </back-title>
      <div class="projects-page__list">
        <project-list-item
            v-for="(project, index) in filteredProjects"
            :key="index"
            :project="project"
        />
      </div>
    </div>

    <bottom-sheet
        ref="bottomSheet"
        v-if="isMobile || isTablet"
    >
      <section-header
        :level="5"
        text="Сортировка"
      />
      <custom-select
          class="projects-page__filter-select"
          label="Сортировка"
          ref="customSelect"
          placeholder="Выберите..."
          :options="options"
          :is-in-bottom-sheet="true"
          @input="setSelected($event)"
      />
    </bottom-sheet>
  </section>

  <preloader
    v-else
    full-page
    remove-overflow
  />
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ProjectListItem from "@/views/projects/project-list-item";
import CustomSelect from "@/common-components/custom-select";
import SectionHeader from "@/common-components/section-header";
import Preloader from "@/common-components/preloader";
import BackTitle from "@/common-components/back-title";
import IconBtn from "@/common-components/icon-btn";
import BottomSheet from "@/common-components/bottom-sheet";

export default {
  name: 'ProjectsView',
  components: {
    BottomSheet,
    IconBtn,
    // eslint-disable-next-line vue/no-unused-components
    SectionHeader,
    CustomSelect,
    ProjectListItem,
    Preloader,
    BackTitle
  },
  data() {
    return {
      projects: null,
      isLoaded: false,
      options: [
        {name: "filter", value: "old", label: "Дата по возрастанию"},
        {name: "filter", value: "new", label: "Дата по убыванию"},
        {name: "filter", value: "title-down", label: "Алфавит по возрастанию"},
        {name: "filter", value: "title-up", label: "Алфавит по убыванию"},
      ],
      selected: null
    }
  },
  created() {
    this.getProjectsData()
  },
  mounted() {},
  computed: {
    ...mapGetters(['isMobile']),
    ...mapGetters(['isTablet']),
    filteredProjects () {

      const filtered = this.projects

      if(this.selected?.value === 'old') {
        filtered?.sort((a,b) => a.code - b.code)
      }

      if(this.selected?.value === 'new') {
        filtered?.sort((a,b) => b.code - a.code)
      }

      if(this.selected?.value === 'title-down') {
        filtered?.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      }

      if(this.selected?.value === 'title-up') {
        filtered?.sort((a, b) => {
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        })
      }

      return filtered
    }
  },
  watch: {
    isLoaded: {
      immediate: true,
      handler: async function (value) {
        if (value) {
          await this.$nextTick()
          this.selected = JSON.parse(localStorage?.getItem('value'))
          if (this.selected) {
            this.$refs.customSelect?.selectOption(this.selected, false)
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['openModal']),
    getProjectsData() {
      fetch('projects.json')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.projects = data
            setTimeout(() => {
              this.isLoaded = true
            },1000)
          });
    },
    setSelected (option) {
      localStorage.setItem('value', JSON.stringify(option))
      this.selected = JSON.parse(localStorage.getItem('value'))

      if(this.$refs.bottomSheet) {
        this.$refs.bottomSheet.close()
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>