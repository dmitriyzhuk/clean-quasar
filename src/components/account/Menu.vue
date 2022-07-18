<template>
  <q-btn-dropdown v-if="store.account.isAuthanticated" class="user-menu" auto-close flat :ripple="false" no-caps dense>
    <template #label>
      <div class="row items-center no-wrap q-gutter-x-sm">
        <q-avatar>
          <q-img :src="user.image" />
        </q-avatar>
      </div>
    </template>
    <q-list link class="user-menu" dense>
      <q-item :to="paths.profile">
        <span class="text-h6 ellipsis-2-lines">{{ user.name }}</span>
      </q-item>
      <q-item
        v-for="role in user.roles"
        :key="role"
        :class="{ selected: role == user.role }"
        clickable
        @click="changeRole(role)"
      >
        <q-radio v-model="user.role" :val="role" dense :label="role" />
      </q-item>
      <q-separator />
      <!-- <q-item :to="paths.profile" class="row no-wrap items-center" v-if="user.roles.find((role) => role == 'Learner')">
        <q-icon class="q-mr-sm" name="person" />
        <q-item-section class="item-label">User settings</q-item-section>
      </q-item> -->
      <q-item :to="paths.logout" class="row no-wrap items-center">
        <q-icon class="q-mr-sm" name="logout" />
        <q-item-section class="item-label">Sign Out</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'src/stores';
import { paths } from 'src/router/paths';
const store = useStore();
const user = computed(() => store.account.getAccount);
const changeRole = (role: string) => store.account.changeRole(role);
</script>
<style lang="scss">
.user-menu {
  .q-btn-dropdown__arrow {
    display: none;
  }
}
</style>
