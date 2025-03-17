<script setup>
import { onBeforeRouteLeave } from "vue-router";

defineProps({
  id: Number,
  name: String
})

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (!answer) return false
})
</script>
<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>Customer Orders</h1>
        <h1>Id {{ id }}</h1>
        <h1>Name {{ name }}</h1>

        <ElButton link @click="$router.back()">Go back</ElButton>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
