<template>
  <div class="reports-page">
    <Reports
      :times="times"
      :tasks="tasks"
      :projects="projects"
      @getProjects="getProjects"
      @changeProjectID="changeProjectID"
      @createReport="createReport"
    />
  </div>
</template>

<script lang="ts" src="./reports-page.ts"></script>
