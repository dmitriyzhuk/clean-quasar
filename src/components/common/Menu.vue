<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item-label header> Essential Links </q-item-label>
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const leftDrawerOpen = ref(false);
</script>
