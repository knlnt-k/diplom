<template>
  <div class="tasks-page">
    <Tasks
      :form-filter="formFilter"
      :tasks="tasks"
      :pagination="pagination"
      :api-state="apiState"
      @deleteTask="deleteTasks"
    />
  </div>
</template>

<script lang="ts" src="./tasks-page.ts"></script>
