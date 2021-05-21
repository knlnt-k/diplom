<template>
  <div class="list">
    <ul class="list__page">
      <li class="list__item" v-for="(row, index) in rows" :key="index">
        <slot :data="row" :index="index"></slot>
      </li>
    </ul>
    <div class="list__pagination" v-if="visiblePagination">
      <button
        class="list__pagination-button"
        :class="{
          'list__pagination-button_splitter': page === splitter,
          'list__pagination-button_current': page === currentPage
        }"
        v-for="(page, index) in pages"
        :key="index"
        @click="handleClickPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./list.ts"></script>
<style src="./list.css"></style>
