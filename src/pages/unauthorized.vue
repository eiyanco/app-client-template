<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<template>
  <el-row class="tac">
    <el-col :span="8">
      <h1>Unauthorized!</h1>
      <el-button @click="$router.push({ name: 'chats' })">Go home</el-button>
    </el-col>
  </el-row>
</template>


