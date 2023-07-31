<template>
  <div class="search-form">
    <el-card class="box-card" shadow="never" body-style="{}">
      <div slot="header" class="header-title">
        <slot name="header-title">
          <span>{{title}}</span>
        </slot>
        <slot name="header_button">
          <div class="btn-item-class" v-for="item in builderButton" :key="item.key">
            <slot :name="'btn-' + item.key">
              <el-button
                :type="item.type || 'primary'"
                :size="item.size || 'small'"
                :plain="item.plain"
                :icon="item.icon"
                :disabled="item.disable"
                v-hasPermi="item.hasPermi"
                @click="handleBtnCallBack(item)"
              >
                {{item.title}}
              </el-button>
            </slot>
          </div>
        </slot>
      </div>
      <div>
        <slot name="header-form">
          <el-form :model="queryParams" ref="queryForm" :size="size" :inline="true" v-show="showSearchState" :label-width="labelWidth">
            <div v-for="item in builderForm" :key="item.key">
              <slot :name="'form-item-' + item.key">
                <el-col :span="item.span || 6">
                  <el-form-item :label="item.title + ':'" :prop="item.key">
                    <slot :name="'item-' + item.key">
                      <!-- input -->
                      <el-input v-model="queryParams[item.key]" v-if="item.type === 'input' || item.type == null" :placeholder="item.placeholder || ''" clearable :disabled="item.disabled || false" :style="item.style"/>
                      <!-- select -->
                      <el-select v-model="queryParams[item.key]" v-if="item.type === 'select'" :placeholder="item.placeholder" :style="item.style">
                        <el-option v-for="option in (item.options || [])" :label="option.label" :value="option.value"></el-option>
                      </el-select>
                      <!-- date/datetime -->
                      <el-date-picker v-model="queryParams[item.key]"
                                      v-if="item.type === 'date' || item.type === 'datetime'"
                                      :style="item.style"
                                      :type="item.type"
                                      :placeholder="item.placeholder"
                                      :size="item.size"
                                      :format="item.format"
                                      :value-format="item.valueFormat"
                      ></el-date-picker>
                    </slot>
                  </el-form-item>
                </el-col>
              </slot>
            </div>
          </el-form>
        </slot>
      </div>
    </el-card>

  </div>
</template>

<script>
  export default {
    name: "SearchForm",
    props: {
      // form
      queryParams: {
        type: Object, required: true
      },
      showSearchState: {
        type: Boolean, default: true
      },
      size: {
        type: String, default: 'small'
      },
      labelWidth: {
        type: String, default: '80px'
      },
      // card
      title: {
        type: String, default: '查询区域'
      },
      // builder
      builderButton: {
        type: Array,
        default: () => ([
          { title: '重置', key: 'reset', type: 'primary',icon: 'el-icon-refresh-right', action: 'resetQuery' },
          { title: '查询', key: 'search', type: 'primary',icon:'el-icon-zoom-in', action: 'baseHandleQuery' },
          { title: '新增', key: 'add', type: 'success',icon:'el-icon-circle-plus-outline', action: 'baseHandleAdd' },
        ])
      },
      builderForm: {
        type: Array,
        default: () => ([
          { title: '主键', key: 'id'  },
        ])
      }
    },
    data() {
      return {}
    },
    methods: {
      handleBtnCallBack(item){
        if (item == null) {
          return;
        }
        const action = item.action;
        if (action == null) {
          return;
        }
        this.$emit(action);
      }
    }
  }
</script>

<style scoped>
  .search-form{
    margin-bottom: 10px;
  }
  .header-title span{
    font-size: 16px;
    line-height: 30px;
    border-left: 3px #c9d8f6 solid;
    border-radius: 8px;
    padding-left: 10px;
  }
  .btn-item-class{
    display:inline-block;
    margin-left: 5px;
    margin-right: 5px;
    float: right;
  }

  ::v-deep .el-card__header {
    padding: 10px 20px;
  }

  ::v-deep .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 10px;
  }

  ::v-deep .el-form-item label.el-form-item__label{
    font-weight: normal;
  }
</style>
