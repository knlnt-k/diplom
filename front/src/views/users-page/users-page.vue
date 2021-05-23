<template>
  <div class="users-page">
    <Users
      :api-state="apiState"
      :users="users"
      @changeUserAccess="changeUserAccess"
    />
  </div>
</template>

<script lang="ts" src="./users-page.ts"></script>
