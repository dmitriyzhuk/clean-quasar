<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useStore } from 'src/stores';

const store = useStore();
onBeforeMount(async () => await store.init());
</script>
