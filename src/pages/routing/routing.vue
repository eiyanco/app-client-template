<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>Routing</h1>

        <router-link :to="{ name: 'text', params: { text: 'sushi' }}">Text</router-link>
        <router-link :to="{ name: 'number', params: { number: 2 }}">Number</router-link>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
