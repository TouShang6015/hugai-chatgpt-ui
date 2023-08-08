import {
  baseQueryPageByParam,
  baseQueryByParam,
  baseQueryById,
  baseAdd,
  baseEdit,
  baseDeleteByIds
} from './crudRequest'
import api, {getR, putR, postR, getRestful, deleteR} from './BaseRequest'

export default {
  data() {
    return {
      // 基本参数
      viewName: '',
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      ids: "",
      // 搜索框展示
      showSearch: true,
      // 请求数据的url
      url: '',
      // 表格数据
      tableList: [],
      // 表格 Loading 属性
      loading: true,
      // 查询参数
      queryParams: {
        // 页码
        page: 0,
        // 每页数据条数
        size: 10,
      },
      // 查询条件自定义参数
      queryCondition: {},
      // 排序条件自定义参数
      sortCondition: {
        updateTime: false
      },
      // 总数据条数
      total: 0,
      // 弹窗属性
      dialog: false,
      isDetail: false,
      // 标题
      title: '',
      // Form 表单
      form: {},
      // 等待时间
      time: 20,
      // 提示类型 1 2
      notifyType: 1,
      // 表单校验
      rules: {},
      // 是否开启分页
      isPage: true,
      // 是否为子组件
      isComponentChildren: false,
      // 是否使用base 组件
      useBaseComponent: false,
      fileList: [],
      staticWebsite: '',
      CRUD: {
        queryById: 'baseQueryById',
        queryByParam: 'baseQueryByParam',
        queryPageByParam: 'baseQueryPageByParam',
        add: 'baseAdd',
        edit: 'baseEdit',
        deleteByIds: 'baseDeleteByIds',
      }
    }
  },
  created(){
    this.staticWebsite = this.$store.getters.configMain.staticWebsite;
  },
  methods: {
    // 初始化 - 必须调用，重置url
    baseInit() {
      return true;
    },
    async baseQueryByParam() {
      if (!await this.baseInit()) {
        return
      }
      this.loading = true;
      if (this.isPage) {
        return new Promise((resolve, reject) => {
          this.queryParams.queryCondition = this.queryCondition;
          this.queryParams.sortCondition = this.sortCondition;
          api.post(this.url + '/' + this.CRUD.queryPageByParam, this.queryParams).then(res => {
            if (res == null || res == undefined) {
              this.notifyError();
            }
            this.total = parseInt(res.total) || 0;
            this.tableList = res.data || null;
            if (!this.afterQuery()) {
              return
            }
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          this.queryParams.queryCondition = this.queryCondition;
          this.queryParams.sortCondition = this.sortCondition;
          api.post(this.url  + '/' + this.CRUD.queryByParam, this.queryParams).then(res => {
            if (res == null || res == undefined) {
              this.notifyError();
            }
            this.tableList = res.data || null;
            if (!this.afterQuery()) {
              return
            }
            setTimeout(() => {
              this.loading = false
            }, this.time)
            resolve(res)
          }).catch(err => {
            this.loading = false
            reject(err)
          })
        })
      }

    },
    baseHandleQuery() {
      if (this.isComponentChildren){
        return;
      }
      if (!this.beforeQuery()) {
        return
      }
      this.loading = true;
      this.baseQueryByParam();
    },
    // ----------------------------------- 新增编辑 -----------------------------------
    baseHandleAdd(row) {
      this.clearForm();
      this.title = this.viewName + '新增';
      this.dialog = true;
    },
    baseHandleEdit(row, flag) {
      this.clearForm();
      this.title = this.viewName + '编辑';
      let a = flag || false;
      if (a) {
        let id = (row == null || row == undefined) ? this.ids : row.id;
        api.getRestful(this.url + '/' + this.CRDU.queryById, id).then(res => {
          this.dialog = true;
          this.form = res.data;
          if (!this.afterQueryById()){
            return;
          }
        });
      } else {
        this.dialog = true;
        this.form = JSON.parse(JSON.stringify(row));
        if (!this.afterQueryById()){
          return;
        }
      }
    },
    baseHandleDetailRow(row) {
      this.baseHandleDetail(row,true);
    },
    baseHandleDetail(row, flag) {
      this.clearForm();
      this.title = this.viewName + '详情';
      this.dialog = true;
      this.isDetail = true;
      let a = (flag == null || flag == undefined) ? true : flag;
      if (a) {
        let id = (row == null || row == undefined) ? this.ids : (row.id == null || row.id == undefined) ? row : row.id;
        api.getRestful(this.url + '/' + this.CRDU.queryById, id).then(res => {
          this.dialog = true;
          this.form = res.data;
          if (!this.afterQueryById()){
            return;
          }
        });
      } else {
        this.dialog = true;
        this.form = JSON.parse(JSON.stringify(row));
        if (!this.afterQueryById()){
          return;
        }
      }
    },
    submitForm() {
      this.submitAdd();
    },
    submitAdd() {
      let that = this;
      if (this.form.id != null) {
        this.submitEdit();
        return;
      }
      let ref = undefined
      if (this.useBaseComponent){
        ref = this.$refs['baseForm'].$refs['form']
      }else{
        ref = this.$refs['form']
      }
      if (ref) {
        ref.validate((valid) => {
          if (valid) {
            if (!this.beforeAdd()) {
              return;
            }
            api.post(this.url + '/' + this.CRUD.add, JSON.parse(JSON.stringify(this.form))).then(res => {
              this.loading = true;
              if (res == null || res == undefined) {
                this.notifyError();
              } else if (res.code == 200) {
                this.notifySuccess(res.message);
                this.cancel();
                if (this.isComponentChildren){
                  this.$emit('flushTableList');
                }else{
                  this.baseHandleQuery();
                }
                if (!this.afterAdd()) {
                  return;
                }
              } else {
                this.notifyError(res.message);
              }
              this.loading = false;
            });
          }
        })
      }
    },
    submitEdit() {
      if (this.form.id == null) {
        this.clearForm();
        this.submitAdd();
        return;
      }
      let ref = undefined
      if (this.useBaseComponent){
        ref = this.$refs['baseForm'].$refs['form']
      }else{
        ref = this.$refs['form']
      }
      if (ref) {
        ref.validate((valid) => {
          if (valid) {
            if (!this.beforeEdit()) {
              return
            }
            api.put(this.url + '/' + this.CRUD.edit, JSON.parse(JSON.stringify(this.form))).then(res => {
              this.loading = true;
              if (res == null || res == undefined) {
                this.notifyError();
              } else if (res.code == 200) {
                this.notifySuccess(res.message);
                this.cancel();
                if (this.isComponentChildren){
                  this.$emit('flushTableList');
                }else{
                  this.baseHandleQuery();
                }
                if (!this.afterEdit()) {
                  return;
                }
              } else {
                this.notifyError(res.message);
              }
              this.loading = false;
            });
          }
        })
      }
    },
    submitDelete(id) {
      this.$confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.beforeDelete()) {
          return
        }
        let ids = (id == null) ? this.ids : id;
        if (ids == null || ids == undefined || ids == '') {
          return;
        }
        api.deleteRestful(this.url + '/' + this.CRUD.deleteByIds, ids).then(res => {
          if (res == null || res == undefined) {
            this.notifyError();
          } else if (res.code == 200) {
            this.notifySuccess(res.message);
          } else {
            this.notifyError(res.message);
          }
          this.cancel();
          this.baseHandleQuery()
        })
      })
    },
    submitDeleteByColumn(row) {
      this.$confirm('你确定删除选中的数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (!this.beforeDelete()) {
          return
        }
        let id = row.id;
        let ids = (id == null) ? this.ids : id;
        if (ids == null || ids == undefined || ids == '') {
          return;
        }
        api.deleteRestful(this.url + '/' + this.CRUD.deleteByIds, ids).then(res => {
          if (res == null || res == undefined) {
            this.notifyError();
          } else if (res.code == 200) {
            this.notifySuccess(res.message);
          } else {
            this.notifyError(res.message);
          }
          this.cancel();
          this.baseHandleQuery()
        })
      })
    },
    // ----------------------------------- 操作前回调 -----------------------------------
    beforeQuery() {
      return true;
    },
    beforeAdd() {
      return true
    },
    beforeEdit() {
      return true
    },
    beforeDelete() {
      return true
    },
    afterQuery() {
      return true;
    },
    afterAdd() {
      return true;
    },
    afterEdit() {
      return true;
    },
    afterQueryById(){
      return true;
    },
    // ----------------------------------- 通用提示封装 -----------------------------------
    notifySuccess(msg) {
      let message = msg || '请求成功';
      this.notifyCommonOpen(message, 'success', 2500);
    },
    notifyError(msg) {
      let message = msg || '请求失败';
      this.notifyCommonOpen(message, 'error', 2500);
    },
    notifyCommonOpen(msg, type, time) {
      if (this.notifyType === 1) {
        this.$message({message: msg, type: type, duration: time});
      } else if (this.notifyType === 2)
        this.$notify({title: msg, type: type, duration: time})
    },
    // ----------------------------------- 表单重置 -----------------------------------
    // 多选框选中数据
    baseHandleSelectionChange(selection) {
      this.ids = selection.map(item => item.id).join(',');
      this.single = selection.length != 1
      this.multiple = !selection.length
    },
    resetQuery() {
      this.queryParams = {
        page: 1,
        size: this.queryParams.size
      };
      this.queryCondition = {};
      this.sortCondition = {
        updateTime: false
      };
      if (this.$refs["queryForm"]) {
        this.$refs["queryForm"].resetFields();
      }
    },
    cancel() {
      this.dialog = false
      this.isDetail = false;
      this.clearForm();
    },
    clearForm() {
      this.resetForm("form");
      this.form = {};
      this.isDetail = false;
      this.fileList = [];
    },
    resetForm(refName) {
      if (this.useBaseComponent){
        if (this.$refs['baseForm'].$refs[refName]) {
          this.$refs['baseForm'].$refs[refName].resetFields();
        }
      }else{
        if (this.$refs[refName]) {
          this.$refs[refName].resetFields();
        }
      }
    },
    // ----------------------------------- 扩展请求 -----------------------------------
    async apiGet(url,arg){
      let finalUrl = this.url + '/' + url;
      return await api.get(finalUrl, arg)
    },
    async apiGetRestful(url,arg){
      let finalUrl = this.url + '/' + url;
      return await api.getRestful(finalUrl, arg)
    },
    async apiPost(url,arg){
      let finalUrl = this.url + '/' + url;
      return await api.post(finalUrl, arg)
    },
    async apiPut(url,arg){
      let finalUrl = this.url + '/' + url;
      return await api.put(finalUrl, arg)
    },
    async apiDelete(url,arg){
      let finalUrl = this.url + '/' + url;
      return await api.deleteRestful(finalUrl, arg)
    },
    async getRequest(url, param, baseUrl) {
      let burl = baseUrl;
      if (baseUrl == null || baseUrl == undefined || baseUrl == '') {
        burl = this.url;
      }
      let data = getR(url, param, burl);
      return await data;
    },
    async getRestfulRequest(url, param, baseUrl) {
      let burl = baseUrl;
      if (baseUrl == null || baseUrl == undefined || baseUrl == '') {
        burl = this.url;
      }
      return await getRestful(url, param, burl);
    },
    async putRequest(url, param, baseUrl) {
      let burl = baseUrl;
      if (baseUrl == null || baseUrl == undefined || baseUrl == '') {
        burl = this.url;
      }
      let data = putR(url, param, burl);
      return await data;
    },
    async postRequest(url, param, baseUrl) {
      let burl = baseUrl;
      if (baseUrl == null || baseUrl == undefined || baseUrl == '') {
        burl = this.url;
      }
      let data = postR(url, param, burl);
      return await data;
    },
    async deleteRequest(url, param, baseUrl) {
      let burl = baseUrl;
      if (baseUrl == null || baseUrl == undefined || baseUrl == '') {
        burl = this.url;
      }
      let data = deleteR(url, param, burl);
      return await data;
    },
  }
}
