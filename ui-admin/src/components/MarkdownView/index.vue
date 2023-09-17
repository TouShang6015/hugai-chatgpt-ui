<template>
  <div class="dashboard-container">
    <mavon-editor
      v-model="value"
      :editable="editable"
      :subfield="subfield"
      :defaultOpen="defaultOpen"
      :toolbarsFlag="toolbarsFlag"
      :boxShadow="false"
    />
  </div>
</template>

<script>
  import "mavon-editor/dist/markdown/github-markdown.min.css";
  import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

  export default {
    name: "MarkdownView",
    props: {
      content: {
        type: String, default: ''
      },
      editable: { type: Boolean, default: true},
      subfield: { type: Boolean, default: false},
      toolbarsFlag: { type: Boolean, default: true},
      defaultOpen: { type: String, default: 'edit'},
    },
    data() {
      return {
        value: this.content,
        initCodeState: false,
      }
    },
    watch:{
      value:{
        deep: true,
        handler(val){
          this.value = val;
          this.callbackValue(val)
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      callbackValue(val){
        this.$emit('callbackValue',val);
      }
    }
  }
</script>

<style scope>

</style>
