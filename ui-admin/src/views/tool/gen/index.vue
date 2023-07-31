<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="76px">
      <el-form-item label="表名称" prop="tableName">
        <el-input
          v-model="queryParams.tableName"
          placeholder="请输入表名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="表描述" prop="tableComment">
        <el-input
          v-model="queryParams.tableComment"
          placeholder="请输入表描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-download"
          size="small"
          @click="handleGenDialog"
        >生成</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableList"
      border
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column label="序号" type="index" width="80" align="center">
        <template slot-scope="scope">
          <span>{{(queryParams.page - 1) * queryParams.size + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="表名称" align="center" prop="tableName" :show-overflow-tooltip="true"/>
      <el-table-column label="存储引擎" align="center" prop="engine"/>
      <el-table-column label="表描述" align="center" prop="tableComment" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="更新时间" align="center" prop="updateTime" />
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.size"
      :page-sizes="[10,20,30,50,100,200]"
      @pagination="getList"
    />

    <el-dialog title="参数配置" :visible.sync="dialog" width="680px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="packageModuleName">
              <span slot="label">
                <el-tooltip content="基础包名 {eg: com.bebas } 该值为基础包名，在启动类Application的上一级，如com.bebas.StartApplication" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                基础包名
              </span>
              <el-input v-model="form.packageModuleName" placeholder="com.bebas" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="moduleName">
              <span slot="label">
                <el-tooltip content="模块名 {eg: base  }  该值为模块名称，如base、quartz、generator" placement="top">
                <i class="el-icon-question"></i>
                </el-tooltip>
                模块名
              </span>
              <el-input v-model="form.moduleName" placeholder="模块名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="form.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选表" prop="tableNames">
              {{tableNames}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleGenTable">确 定</el-button>
        <el-button @click="dialog = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { genList,generateStart } from "/src/api/tool/gen";

export default {
  name: "Gen",
  data() {
    return {
      dialog: false,
      // 遮罩层
      loading: true,
      // 唯一标识符
      uniqueId: "",
      // 选中数组
      ids: [],
      // 选中表数组
      tableNames: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表数据
      tableList: [],
      // 查询参数
      queryParams: {
        page: 1,
        size: 10,
        tableName: undefined,
        tableComment: undefined
      },
      form: {},
      rules: {

      }
    };
  },
  created() {
    this.getList();
  },
  activated() {
    const time = this.$route.query.t;
    if (time != null && time != this.uniqueId) {
      this.uniqueId = time;
      this.queryParams.page = Number(this.$route.query.page);
      this.getList();
    }
  },
  methods: {
    /** 查询表集合 */
    getList() {
      this.loading = true;
      genList(this.queryParams).then(response => {
          this.tableList = response.data;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    handleGenDialog(){
      const that = this;
      const tableNames = this.tableNames;
      if (tableNames == "") {
        this.$modal.msgError("请选择要生成的数据");
        return;
      }
      this.dialog = true;
    },
    /** 生成代码操作 */
    handleGenTable(row) {
      const that = this;
      const tableNames = row.tableName || this.tableNames;
      if (tableNames == "") {
        this.$modal.msgError("请选择要生成的数据");
        return;
      }
      this.form.tableNames = this.tableNames;
      generateStart(this.form).then(res => {
        if (res == null) {
          this.$message({
            message: '没有可下载文件',
            type: 'warning'
          })
          return
        }
        const fileName = 'generatorCode_' + new Date().getTime() + '.zip';
        const link = window.document.createElement('a')
        link.download = fileName;
        link.style.display = 'none';
        link.href = window.URL.createObjectURL(new Blob([res]));
        window.document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href)
        window.document.body.removeChild(link);
        this.$message({
          message: '代码生成成功，正在下载请稍后!',
          type: 'success'
        });
        this.dialog = false;
      });
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.tableId);
      this.tableNames = selection.map(item => item.tableName);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
  }
};
</script>
