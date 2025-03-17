<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>All Customers</h1>

        <AppLink :to="{ name: 'customers.customer.home', params: { id: 4 }}">Customer Home</AppLink>
        <AppLink :to="{ name: 'customers.create'}">Create Customer </AppLink>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
<script setup lang="ts">
import AppLink from "@/components/AppLink.vue";
</script>
