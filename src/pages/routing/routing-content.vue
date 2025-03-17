<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1 v-if="$route.params.number">Number - {{ $route.params.number }}</h1>
        <h1 v-if="$route.params.text">Text -  {{ $route.params.text }}</h1>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
