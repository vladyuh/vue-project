<template>
  <section
      v-if="isLoaded"
      class="projects-page"
  >
    <div class="container">
      <section-header
          :level="1"
          text="Проекты"
      />
      <div class="projects-page__head">
        <custom-select
            class="projects-page__filter-select"
            label="Сортировка"
            ref="customSelect"
            placeholder="Выберите..."
            :options="options"
            @input="setSelected($event)"
        />
        <input-field
            type="text"
            class="projects-page__filter-search"
            icon-name="ic_search"
            label="Поиск"
            placeholder="Введите для поиска"
            v-model="searchQuery"
        />
      </div>
      <div class="projects-page__list">
        <project-list-item
            v-for="(project, index) in searchByName"
            :key="index"
            :project="project"
        />
      </div>
    </div>
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
import InputField from "@/common-components/input-field";
import SectionHeader from "@/common-components/section-header";
import Preloader from "@/common-components/preloader";
/*import IconBtn from "@/common-components/icon-btn";
import BottomSheet from "@/common-components/bottom-sheet";*/

export default {
  name: 'ProjectsView',
  components: {
    /*BottomSheet,
    IconBtn,*/
    SectionHeader,
    CustomSelect,
    InputField,
    ProjectListItem,
    Preloader,
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
      selected: null,
      searchQuery: null
    }
  },
  created() {
    this.getProjectsData()
  },
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
    },
    searchByName () {
      if (!this.searchQuery || this.searchQuery === '' || this.searchQuery === ' ') {
        return this.filteredProjects
      }

      const query = this.searchQuery.toLowerCase()
      const filtered = this.filteredProjects

      return filtered.filter((item) => item.title.toLowerCase().includes(query))
    }
  },
  watch: {
    isLoaded: {
      immediate: true,
      handler: async function (value) {
        if (value) {
          await this.$nextTick()
          this.selectOption()
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
    },
    selectOption () {
      this.selected = JSON.parse(localStorage?.getItem('value'))
      if (this.selected) {
        this.$refs.customSelect?.selectOption(this.selected, false)
      }
    },
  }
}
</script>

<style src="./style.scss" lang="scss"/>