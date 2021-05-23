<template>
  <div class="tasks-page">
    <Tasks
      :form-filter="formFilter"
      :tasks="tasks"
      :pagination="pagination"
      :api-state="apiState"
      @deleteTask="deleteTasks"
      @openPopup="openPopup"
    />
  </div>
</template>

<script lang="ts" src="./tasks-page.ts"></script>
