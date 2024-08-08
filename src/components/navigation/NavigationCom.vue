<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue"

function handleSelect(key:string,keyPath:string[]){
  console.log(key,keyPath);
  
}
</script>

<template>
    <el-col class="h-[80vh] w-[15vw]">
      <h3 class="mb-10 text-[20px]">离散数学知识图谱</h3>
      <el-menu
        default-active="/analyze"
        class="el-menu-vertical-demo h-full"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/analyze" >
          <el-icon><document /></el-icon>
          <span class="text-[20px]">分析</span>
        </el-menu-item>
        <el-menu-item index="/manage">
          <el-icon><setting /></el-icon>
          <span class="text-[20px]">管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</template>

<style lang="scss" scoped>
    
</style>
