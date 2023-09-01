<template>
  <div class="dashboard-container">
    <mavon-editor
      v-model="content"
      :defaultOpen="'preview'"
      :externalLink="externalLink"
      :editable="false"
      :subfield="false"
      :toolbarsFlag="false"
    />
  </div>
</template>

<script>
  import "mavon-editor/dist/markdown/github-markdown.min.css";
  import hljs from "mavon-editor/dist/highlightjs/highlight.min.js";
  import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

  export default {
    name: "index",
    props: {
      content: {
        type: String, default: ''
      }
    },
    data() {
      return {
        detailData: {},
        initCodeState: false,
        externalLink: {
          markdown_css: function () {
            return "/mavon-editor/markdown/github-markdown.min.css";
          },
          hljs_js: function () {
            return "/mavon-editor/highlightjs/highlight.min.js";
          },
          hljs_css: function (css) {
            return "/mavon-editor/highlightjs/styles/" + css + ".min.css";
          },
          hljs_lang: function (lang) {
            return "/mavon-editor/highlightjs/languages/" + lang + ".min.js";
          },
          katex_css: function () {
            return "/mavon-editor/katex/katex.min.css";
          },
          katex_js: function () {
            return "/mavon-editor/katex/katex.min.js";
          },
        },
      }
    },
    watch:{
      content:{
        deep: true,
        handler(val){
          this.detailData.mavonEditor = val;
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      initCodes() {
        this.codes = this.$el.querySelectorAll("pre>.hljs>code")
        if (this.codes.length > 0) {
          for (let i = 0; i < this.codes.length; i++) {
            if (this.codes[i].offsetHeight != 0) {
              return this.init();
            } else {
              this.timer = setInterval(() => {
                for (let j = 0; j < this.codes.length; j++) {
                  if (this.codes[j].offsetHeight != 0) {
                    clearInterval(this.timer);
                    return this.init();
                  }
                }

              }, 500);
              return;
            }
          }
          return;
        }
      },
      init() {
        const _this = this;
        this.$nextTick(() => {
          clearInterval(this.timer);
          for (const item of this.codes) {
            // 取出 code 的父元素 pre（后面方便使用）
            let pre = item.parentElement;
            // 添加拖动属性
            this.dragAround(item);
            // 新建元素 代码块序号
            let lineNumBox = document.createElement("div");
            lineNumBox.setAttribute(
              "style",
              "height: " + item.offsetHeight + "px"
            );
            lineNumBox.className = "line-num-box";
            // 插入序号 计算方式：获取code元素的高并除以行高，得到行数，根据行数插入序号
            let num = ""; // 设行高二十
            for (let i = 1; i < Math.ceil(item.offsetHeight / 20) + 1; i++) {
              num += i + "\n"; // 序号加上换行符
            }
            lineNumBox.innerText = num; // 插入序号
            pre.insertBefore(lineNumBox, item);
            let codeBox = document.createElement("div");
            codeBox.className = "code-box";
            codeBox.appendChild(item);
            pre.appendChild(codeBox);
            let icon =
              `<div class="mac-icon">` +
              `<button class="copy-button">复制</button>` +
              `</div>`;
            pre.insertAdjacentHTML("afterbegin", icon);
            // 获取复制元素
            let copyButton = pre.firstElementChild.getElementsByClassName("copy-button")[0];
            copyButton.onclick = function () {
              let innerText = pre.lastElementChild.innerText;
              if (navigator.clipboard && window.isSecureContext) {
                const copyPromise = navigator.clipboard.writeText(innerText);
                copyPromise.then(() => {
                  _this.$message.success("复制成功");
                }).catch(() => {
                  _this.$message.error("复制失败");
                });
              }else{
                // 创建text area
                const textArea = document.createElement('textarea')
                textArea.value = innerText
                // 使text area不在viewport，同时设置不可见
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                _this.$message.success("复制成功");
                return new Promise((res, rej) => {
                  // 执行复制命令并移除文本框
                  document.execCommand('copy') ? res() : rej()
                  textArea.remove()
                })
              }
            };
            hljs.highlightBlock(codeBox.firstElementChild);
          }
        });
      },
      // 给某个元素添加左右拖动属性
      dragAround(anyElement) {

        let mouseDown = false; // 鼠标是否按下
        let x = 0; // 鼠标点击的下标
        let left = 0; // 当前滚动条位置
        anyElement.onmousedown = function (e) {
          mouseDown = true; // 鼠标按下
          x = e.clientX; // 获取鼠标点击位置 （x坐标）
          left = this.scrollLeft; // 滚动条当前位置
        };
        anyElement.onmousemove = function (e) {
          // 鼠标按下
          if (mouseDown) {
            let curX = e.clientX; // 鼠标移动到当前的位置
            let diffX = curX - x; // 鼠标移动距离（当前位置 减去之前的位置）
            this.scrollLeft = left - diffX;
          }
        };
        anyElement.onmouseup = function () {
          mouseDown = false;
        };
        anyElement.onmouseleave = function () {
          mouseDown = false;
        };
      },
    },
    destroyed() {
      clearInterval(this.timer);
    },
  }
</script>

<style scope>

</style>
