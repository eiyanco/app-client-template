<script setup>
defineProps({
  id: String
})
</script>
<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>Customer {{ $route.name }}</h1>
        <h1>Customer {{ id }}</h1>
        <router-link :to="{ name: 'customers.customer.home', params: { id: 4 }}">Customer's Profile</router-link>
        <router-link :to="{ name: 'customers.customer.tab', params: { id: 4, tab: 'transactions' }}">Customer's Transactions</router-link>
        <router-link :to="{ name: 'customers.customer.orders', params: { id: 4 }}">Customer's Orders</router-link>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
