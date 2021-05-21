<template>
  <div class="home-page">
    <Home
      @authorization="authorization"
      :form-data="formData"
      :companies="companies"
    />
  </div>
</template>

<script lang="ts" src="./home-page.ts"></script>

<style>
.home-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
