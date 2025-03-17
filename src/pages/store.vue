<script setup>
import { useCounterStoreX } from "@/stores/counter-x";
import { useTodos } from "@/stores/todo";
import {ref} from "vue";
import { storeToRefs } from "pinia";

const counter = useCounterStoreX()
const todos = useTodos()

// Making destructured variables in store reactive
const { count, name, doubleCount } = storeToRefs(counter);

// destructuring variables/functions that are not reactive
const { increaseCount, decreaseCount } = counter;

counter.count++
// with autocompletion ✨
counter.$patch({ count: counter.count + 1 })
counter.$patch({ name: 'Ajayi'})

const todoForm = ref('')
</script>

<template>
  <ElContainer>
    <ElRow type="flex" :gutter="100" style="width: 80%">
      <ElCol :span="10">
        <div>Current Count: </div>
        <div>
          <ElButton @click="decreaseCount()">Decrease</ElButton>
          <h1>{{ name }}</h1>
          <h1>{{ count }}</h1>
          <h1>{{ doubleCount }}</h1>
          <ElButton @click="increaseCount()">Increase</ElButton>
          <ElButton @click="counter.$reset()">REset</ElButton>
        </div>
      </ElCol>
      <ElCol :span="10">
        <div>Todos</div>
        <ElInput v-model="todoForm" />
        <ElButton @click="todos.addTodo(todoForm)">Add</ElButton>

        <ul v-if="todos.todos.length">
          <li v-for="(todo, index) in todos.todos" :key="index">{{ todo.text }} - Completed ({{ todo.isFinished ? 'Yes' : 'No' }})</li>
        </ul>
        <p v-else>No todos yet</p>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
