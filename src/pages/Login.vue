<template>
  <div class="column items-center justify-evenly">
    <q-card flat bordered>
      <q-card-section>
        <div class="text-h6 q-mb-lg">Login</div>
        <p class="q-mb-lg">
          This is the initial login page. You can design it to acompany your SSO and corporate styles
        </p>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn color="primary" @click="login">Login</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from 'src/stores';

const store = useStore();
const login = () => store.account.login();
</script>
