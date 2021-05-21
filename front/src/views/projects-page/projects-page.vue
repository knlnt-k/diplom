<template>
  <main class="projects-page">
    <Projects
      :projects="projects"
      :form="form"
      :api-state="apiState"
      :pagination="pagination"
      :current-project="currentProject"
      :is-edit="isEdit"
      @handleClosePopup="handleClosePopup"
      @deleteProject="deleteProject"
      @changePage="changePage"
      @setCurrentProject="setCurrentProject"
      @toggleIsEdit="toggleIsEdit"
    />
  </main>
</template>

<script lang="ts" src="./projects-page.ts"></script>
