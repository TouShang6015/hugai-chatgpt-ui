<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogState" :width="width" append-to-body :before-close="beforeClose">
      <el-form ref="form" :model="form" :rules="rules" :label-width="labelWidth">
        <el-row>
          <div style="display: inline" v-for="item in builderItem" :key="item.key">
            <el-col :span="item.span || 24" :offset="item.offset || 0">
              <slot :name="'form-item-' + item.key">
                <el-form-item :label="item.title" :prop="item.key">
                  <slot :name="'item-' + item.key">
                    <!-- input -->
                    <el-input v-model="form[item.key]"
                              v-if="item.type === 'input' || item.type === 'textarea' || item.type == null"
                              :type="item.type"
                              :placeholder="item.placeholder || ''" clearable
                              :disabled="item.disabled || false"
                              :style="item.style"/>
                    <!-- select -->
                    <el-select v-model="form[item.key]" v-if="item.type === 'select'" :placeholder="item.placeholder" :style="item.style">
                      <el-option v-for="option in (item.options || [])" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                    <el-input-number v-model="form[item.key]"
                                     v-if="item.type === 'number'"
                                     :controls-position="item.cotrolsPosition || 'right'"
                                     :min="item.min" />
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
        <el-row>
          <slot name="footer-button">
            <el-form-item class="footer">
              <slot :name="'button-' + item.key" v-for="item in builderActions">
                <el-button
                  :type="item.type"
                  :size="item.size == null ? 'normal' : item.size"
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
      dialog: { type: Boolean, default: false },
      width: { type: String, default: '600px' },
      labelWidth: { type: String, default: '80px' },
      form: { type: Object, required: true },
      rules: { type: Object, default: {} },
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
        dialogState: false
      }
    },
    watch: {
      dialog(val){
        this.dialogState = val;
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
  }

</style>
