<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { getOptionsApi, searchAutocompleteApi } from '@/apis/analyzeApi'
import { onMounted } from 'vue'

const queryAutocompleteString = ref('')
const selectedOption = ref('')
const lebal_options = ref<any>([])
const isOptionsLoaded = ref(false)

const emits = defineEmits(['search'])

async function getOptions() {
  const data = await getOptionsApi()
  lebal_options.value = data.map((item: { id: number; value: string; label: string }) => {
    return {
      id: item.id,
      label: item.label,
      value: item.label
    }
  })
  isOptionsLoaded.value = true
}
function handleSelectFocus() {
  if (!isOptionsLoaded.value) {
    getOptions()
  }
}
async function queryAutocompleteSearch(queryAutocompleteString: string, callback: any) {
  if (queryAutocompleteString) {
    try {
      const response = await searchAutocompleteApi(queryAutocompleteString)
      callback(response.data.results)
    } catch (error) {
      console.error('Autocomplete error:', error)
      callback([])
    }
  } else {
    callback([])
  }
}
function search_selected() {
  emits('search', queryAutocompleteString.value)
}

onMounted(() => {
  getOptions()
})
</script>

<template>
  <div class="search-box">
    <!-- 自动补全输入框组件 -->
    <el-autocomplete
      v-model="queryAutocompleteString"
      :fetch-suggestions="queryAutocompleteSearch"
      placeholder="Please input"
      style="max-width: 600px"
      class="input-with-select"
      value-key="name"
    >
      <!-- 自定义前置内容：选择框 -->
      <template #prepend>
        <el-select
          v-model="selectedOption"
          placeholder="Select"
          style="width: 115px"
          @focus="handleSelectFocus"
        >
          <el-option
            v-for="option in lebal_options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </template>
      <!-- 自定义后置内容：搜索按钮 -->
      <template #append>
        <el-button :icon="Search" @click="search_selected">搜索</el-button>
      </template>
    </el-autocomplete>
  </div>
</template>

<style lang="scss" scoped></style>
