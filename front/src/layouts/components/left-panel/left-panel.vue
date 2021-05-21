<template>
  <aside class="left-panel" :class="{ 'left-panel_open': $leftPanel.isOpen }">
    <nav class="nav">
      <template v-for="(navItem, index) in nav">
        <li
          class="nav__item"
          :key="index"
          v-if="
            !('access' in navItem) ||
              (navItem.access(currentAccount.access) &&
                (!('pathNameForVisible' in navItem) ||
                  navItem.pathNameForVisible === $route.name))
          "
          :title="navItem.text" @click="handleClickNavItem"
        >
          <router-link
            v-if="navItem.type === 'link'"
            class="nav__link text-ellipsis"
            :class="{ nav__link_current: $route.path === navItem.path }"
            tag="a"
            :to="navItem.path"
            >{{ navItem.text }}</router-link
          >
          <Button
            v-if="navItem.type === 'button'"
            class="nav__button text-ellipsis"
            @click="handleClickButton(navItem.name || '')"
          >
            {{ navItem.text }}
          </Button>
        </li>
      </template>
    </nav>
  </aside>
</template>

<script lang="ts" src="./left-panel.ts"></script>
<style src="./left-panel.css"></style>
