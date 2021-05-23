<template>
  <div class="board-page">
    <Board
      :projects="projects"
      :filter-task="filterTask"
      :tasks="tasks"
      @deleteTask="deleteTask"
    />
  </div>
</template>

<script lang="ts" src="./board-page.ts"></script>
