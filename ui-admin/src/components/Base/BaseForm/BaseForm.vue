<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogState"
               v-if="dialog"
               :width="width"
               append-to-body :before-close="beforeClose">
      <el-form ref="form"
               :model="form"
               :rules="finalRules"
               :size="size"
               :label-width="labelWidth">
        <el-row :gutter="25">
          <div style="display: inline" v-for="item in builderItem" :key="item.key">
            <el-col :span="item.span || 24" :offset="item.offset || 0">
              <slot :name="'form-item-' + item.key">
                <el-form-item :label="item.title" :prop="item.key">
                  <slot :name="'item-' + item.key">
                    <!-- input -->
                    <el-input v-model="form[item.key]"
                              :autosize="item.autosize"
                              v-if="item.type === 'input' || item.type === 'textarea' || item.type == null"
                              :type="item.type"
                              :placeholder="item.placeholder || ''" clearable
                              :disabled="item.disabled || false"
                              :maxlength="item.maxlength"
                              :show-word-limit="item.maxlength != null"
                              :rows="item.rows"
                              :style="item.style"/>
                    <!-- switch -->
                    <el-switch
                      v-model="form[item.key]"
                      v-if="item.type === 'switch'"
                      :active-text="item.activeText"
                      :active-value="item.activeValue"
                      :active-color="item.activeColor"
                      :inactive-text="item.inactiveText"
                      :inactive-value="item.inactiveValue"
                      :inactive-color="item.inactiveColor"
                    >
                    </el-switch>
                    <!-- select -->
                    <el-select v-model="form[item.key]" autosize v-if="item.type === 'select'" :placeholder="item.placeholder" :style="item.style">
                      <el-option v-for="option in (item.options || [])" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                    <el-input-number v-model="form[item.key]"
                                     v-if="item.type === 'number'"
                                     autosize
                                     :controls-position="item.cotrolsPosition || 'right'"
                                     :step="item.step"
                                     :precision="item.precision"
                                     :min="item.min"
                                     :max="item.max"
                    />
                    <!-- date/datetime -->
                    <el-date-picker v-model="form[item.key]"
                                    v-if="item.type === 'date' || item.type === 'datetime'"
                                    :style="item.style"
                                    :type="item.type"
                                    :placeholder="item.placeholder"
                                    :size="item.size"
                                    :format="item.format"
                                    :value-format="item.valueFormat"
                    ></el-date-picker>
                    <!-- editor -->
                    <editor
                      v-if="item.type === 'editor'"
                      v-model="form[item.key]"
                      :min-height="item.minHeight == null ? 180 : item.minHeight"/>
                  </slot>
                </el-form-item>
              </slot>
            </el-col>
          </div>
        </el-row>
        <el-row :gutter="25">
          <slot name="footer-button">
            <el-form-item class="footer">
              <slot :name="'button-' + item.key" v-for="item in builderActions">
                <el-button
                  :type="item.type"
                  :size="item.size == null ? size : item.size"
                  :plain="item.plain"
                  @click="handleCallBack(item.action)">{{item.title}}
                </el-button>
              </slot>
            </el-form-item>
          </slot>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "BaseForm",
    props: {
      title: { type: String, required: true },
      size: { type: String, default: 'mini' },
      dialog: { type: Boolean, default: false },
      autoRules: { type: Boolean, default: false },
      width: { type: String, default: '600px' },
      labelWidth: { type: String, default: '80px' },
      form: { type: Object, required: true },
      rules: { type: Object, default: () => ({}) },
      builderItem: {
        type: Array,
        required: true
      },
      builderActions: {
        type: Array,
        default: () => ([
          { title: '确 定', key: 'submitForm', type: 'primary', action: 'submitForm'},
          { title: '取 消', key: 'cancel', type: 'info',plain: true, action: 'cancel'},
        ])
      },
    },

    data() {
      return {
        dialogState: false,
        finalRules: {},
      }
    },
    watch: {
      dialog(val){
        this.dialogState = val;
      }
    },
    mounted() {
      this.finalRules = JSON.parse(JSON.stringify(this.rules))
      if (this.autoRules){
        let rules = {}
        this.builderItem.forEach(item => {
          rules[item.key] = { 'required': true, trigger: "blur", message: `${item.title}不能为空` }
        })
        this.finalRules = JSON.parse(JSON.stringify(rules))
        this.$emit('changeRules',this.finalRules)
      }
    },
    methods: {
      handleCallBack(action){
        if (action == null) {
          return;
        }
        this.$emit(action);
      },
      handleCallBackAction(action,row){
        if (action == null) {
          return;
        }
        this.$emit(action,row);
      },
      beforeClose(done){
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>

  .footer{
    float: right;
    margin-right: 20px;
  }

</style>
