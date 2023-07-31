<template>
  <div class="app-container">

    <search-form
      ref="baseSearchForm"
      :query-params="queryParams"
      :builder-form="builderSearch.search"
      :builder-button="builderSearch.button"
      @baseHandleQuery="baseHandleQuery"
      @resetQuery="resetQuery"
      @baseHandleAdd="baseHandleAdd"
      @toggleExpandAll="toggleExpandAll"
    >
      <template slot="item-status">
        <el-select v-model="queryParams.status" placeholder="菜单状态" clearable>
          <el-option v-for="dict in dict.type.sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </template>
    </search-form>

    <base-table
      :loading="loading"
      :table-list="tableList"
      :query-params="queryParams"
      :builder-columns="builderTable.columns"
      :builder-actions="builderTable.actions"
      :row-key="'id'"
      :open-page="false"
      :v-if="refreshTable"
      :default-expand-all="isExpandAll"
      @baseHandleQuery="baseHandleQuery"
      @baseHandleEdit="baseHandleEdit"
      @baseHandleAdd="baseHandleAdd"
      @submitDeleteByColumn="submitDeleteByColumn"
      @baseHandleSelectionChange="baseHandleSelectionChange"
    >
      <template slot="column-icon" slot-scope="scope">
        <svg-icon :icon-class="scope.row.icon" />
      </template>
      <template slot="column-status" slot-scope="scope">
        <dict-tag :options="dict.type.sys_normal_disable" :value="scope.row.status"/>
      </template>
    </base-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="dialog" width="680px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <treeselect
                v-model="form.parentId"
                :options="menuOptions"
                :normalizer="normalizer"
                :show-count="true"
                placeholder="选择上级菜单"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单图标" prop="icon">
              <el-popover
                placement="bottom-start"
                width="460"
                trigger="click"
                @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected" />
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                    v-if="form.icon"
                    slot="prefix"
                    :icon-class="form.icon"
                    class="el-input__icon"
                    style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon" />
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="sort">
              <el-input-number v-model="form.sort" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择是外链则路由地址需要以`http(s)://`开头" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                是否外链
              </span>
              <el-radio-group v-model="form.stateFrame">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="path">
              <span slot="label">
                <el-tooltip content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由地址
              </span>
              <el-input v-model="form.path" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item prop="component">
              <span slot="label">
                <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                组件路径
              </span>
              <el-input v-model="form.component" placeholder="请输入组件路径" />
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <el-input v-model="form.query" placeholder="请输入路由参数" maxlength="255" />
              <span slot="label">
                <el-tooltip content='访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`' placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                路由参数
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                是否缓存
              </span>
              <el-radio-group v-model="form.stateCache">
                <el-radio label="0">缓存</el-radio>
                <el-radio label="1">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                显示状态
              </span>
              <el-radio-group v-model="form.visible">
                <el-radio
                  v-for="dict in dict.type.sys_show_hide"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <span slot="label">
                <el-tooltip content="选择停用则路由将不会出现在侧边栏，也不能被访问" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                菜单状态
              </span>
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in dict.type.sys_normal_disable"
                  :key="dict.value"
                  :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import IconSelect from "@/components/IconSelect";
import crud from '/src/common/crud/crud';

export default {
  name: "Menu",
  dicts: ['sys_show_hide', 'sys_normal_disable'],
  components: { Treeselect, IconSelect },
  mixins: [crud],
  data() {
    return {
      builderSearch,
      builderTable,
      // 菜单树选项
      menuOptions: [],
      // 是否展开，默认全部折叠
      isExpandAll: false,
      // 重新渲染表格状态
      refreshTable: true,
      // 表单校验
      rules: {
        menuName: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "菜单顺序不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路由地址不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.baseHandleQuery();
  },
  methods: {
    baseInit(){
      this.url = '/module/system/sysmenu';
      this.isPage = false;
      this.viewName = '菜单管理';
      this.sortCondition = {
        sort: true
      }
      return true;
    },
    afterQuery(){
      this.tableList = this.handleTree(JSON.parse(JSON.stringify(this.tableList)), "id");
      return true;
    },
    // 选择图标
    selected(name) {
      this.form.icon = name;
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node.menuName,
        children: node.children
      };
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      this.apiPost(this.CRUD.queryByParam,{}).then(res => {
        this.menuOptions = [];
        const menu = { id: "0", menuName: '主类目', children: [] };
        menu.children = this.handleTree(res.data, "id");
        this.menuOptions.push(menu);
      })
    },
    /** 新增按钮操作 */
    baseHandleAdd(row) {
      this.clearForm();
      this.getTreeselect();
      this.title = this.viewName + '新增';
      this.dialog = true;
      if (row != null && row.id) {
        this.form.parentId = row.id;
      } else {
        this.form.parentId = 0;
      }
    },
    /** 修改按钮操作 */
    baseHandleEdit(row) {
      this.clearForm();
      this.getTreeselect();
      this.title = this.viewName + '编辑';
      this.dialog = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    clearForm(){
      this.form = {
        id: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        sort: undefined,
        stateFrame: '0',
        stateCache: '0',
        visible: "0",
        status: "0"
      };
      this.resetForm("form");
    },
  }
};

const builderSearch = {
  search: [
    { title: '菜单名称', key: 'menuName',span:8  },
    { title: '状态', key: 'status',span:8  },
  ],
  button: [
    { title: '重置', key: 'reset', type: 'primary', action: 'resetQuery' },
    { title: '查询', key: 'search', type: 'primary', action: 'baseHandleQuery' },
    { title: '新增', key: 'add', type: 'success',icon: 'el-icon-plus', action: 'baseHandleAdd' },
    { title: '展开/折叠', key: 'openOrClose', type: 'info',icon: 'el-icon-sort', action: 'toggleExpandAll' },
  ]
};
const builderTable = {
  columns: [
    { title: '菜单名称', key: 'menuName',align: 'left',showOverflowTooltip: true },
    { title: '图标', key: 'icon',showOverflowTooltip: true},
    { title: '排序', key: 'sort' },
    { title: '组件路径', key: 'component',showOverflowTooltip: true },
    { title: '状态', key: 'status'},
    { title: '创建时间', key: 'createTime'},
  ],
  actions: [
    { title: '新增', key: 'add', type: 'success', action: 'baseHandleAdd'},
    { title: '编辑', key: 'edit', type: 'success', action: 'baseHandleEdit'},
    { title: '删除', key: 'delete', type: 'danger', action: 'submitDeleteByColumn'}
  ]
};
</script>
