<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item" placeholder="权限名" v-model="listQuery.permname">
      </el-input>
      <el-select class="filter-item" clearable style="width: 130px" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in  permType" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-select class="filter-item" clearable style="width: 130px" v-model="listQuery.type" placeholder="类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-has-add:uac_perms class="filter-item" style="margin-left: 10px;" @click="handleTopCreate" type="primary" icon="el-icon-edit">添加顶级菜单</el-button>
     </div>

    <tree-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中" border fit highlight-current-row
      style="width: 100%" height="510">
      <el-table-column align="center" label="icon图标" >
        <template slot-scope="scope">
          <svg-icon v-bind:icon-class="`${scope.row.icon}`" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限名" width="160px">
        <template slot-scope="scope">
          <span>{{scope.row.permname}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="类型" width="70px">
        <template slot-scope="scope">
          <span>{{scope.row.type | typeText}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否导航" >
        <template slot-scope="scope">
          <span>{{scope.row.isnavigate?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否插件模式" width="120px">
        <template slot-scope="scope">
          <span>{{scope.row.isplugin?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="请求url" width="210px">
        <template slot-scope="scope">
          <span>{{scope.row.url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="请求action" width="100px">
        <template slot-scope="scope">
          <span>{{scope.row.action}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限code" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述" width="200px">
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="导航标题title" width="150px">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="导航组件" width="250px">
        <template slot-scope="scope">
          <span>{{scope.row.component}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="导航路径path" width="250px">
        <template slot-scope="scope">
          <span>{{scope.row.path}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="70px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusText}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" class-name="small-padding fixed-width" width="300px">
        <template slot-scope="scope">
          <el-button v-has-add:uac_perms type="primary" size="mini" v-show="scope.row.type!==2" @click="handleChildrenCreate(scope.row)">添加</el-button>
          <el-button v-has-update:uac_perms v-show="scope.row.status=='0'" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-has-status:uac_perms v-show="scope.row.status!='-1'" size="mini" type="success" @click="handleDelete(scope.row)">删除
          </el-button>
          <el-button v-has-status:uac_perms v-show="scope.row.status!='0'" size="mini" @click="handleModifyStatus(scope.row,'0')">正常
          </el-button>
          <el-button v-has-status:uac_perms v-show="scope.row.status!='1'" size="mini" type="danger" @click="handleModifyStatus(scope.row,'1')">锁定
          </el-button>
        </template>
      </el-table-column>
    </tree-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @open="onDialogOpen">
      <el-form :label-position="right" :rules="rules" ref="dataForm" :model="temp" label-width="100px" style='margin:0 15px;'>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="权限名" prop="permname">
              <el-input v-model="temp.permname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="请求url" prop="url">
            <el-input v-model="temp.url"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="权限code" prop="code">
            <el-input v-model="temp.code"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="类别" prop="type">
              <el-select class="filter-item" v-model="temp.type">
                <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="请求action" prop="action">
              <el-select class="filter-item" v-model="temp.action">
                <el-option v-for="item in actionOptions" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="icon图标" prop="icon">
              <el-input v-model="temp.icon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item v-if="dialogStatus !== 'topCreate'" label="父节点"> 
              <el-select class="filter-item" v-model="temp.parentid">
                <el-option v-for="item in typeData" :key="item.id" :label="item.permname" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否导航" prop="isnavigate">
              <el-switch v-model="temp.isnavigate"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="是否插件模式" prop="isplugin">
              <el-switch v-model="temp.isplugin"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="导航组件" prop="component">
              <el-input v-model="temp.component"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="导航路径path" prop="path">
              <el-input v-model="temp.path"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="导航标题title" prop="title">
              <el-input v-model="temp.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态" prop="status"> 
              <el-select class="filter-item" v-model="temp.status">
                <el-option v-for="item in permType" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="顺序" prop="sort">
              <el-input v-model.number="temp.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="2" v-model="temp.description"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='topCreate'||dialogStatus==='childrenCreate'" type="primary" @click="createData">创建</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  createPerm,
  updatePerm,
  updateStatus,
  deletePerm,
  menuNode
} from '@/api/permission'
import waves from '@/directive/waves' // 水波纹指令
import treeTable from '@/components/TreeTable'
import config from '@/utils/config'

const permType = [
  { key: 0, display_name: '正常' },
  { key: 1, display_name: '锁定' }
]

const typeOptions = [
  { key: 0, display_name: '菜单' },
  { key: 1, display_name: '页面' },
  { key: 2, display_name: '按钮' }
]

const actionOptions = [
  { key: '', display_name: '' },
  { key: 'GET', display_name: 'GET' },
  { key: 'POST', display_name: 'POST' },
  { key: 'PUT', display_name: 'PUT' },
  { key: 'DELETE', display_name: 'DELETE' }
]

const typeValue = typeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: '权限菜单管理',
  components: { treeTable },
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        type: 0,
        permname: null,
        status: 0
      },
      permType,
      typeOptions,
      actionOptions,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        topCreate: '顶级节点添加',
        childrenCreate: '子节点添加'
      },
      temp: this.initCreateUpdateTemp(),
      typeData: [],
      isNeedGetTypeData: true,
      rules: {
        permname: [
          { required: true, message: '权限名必填', trigger: 'change' }
        ],
        type: [
          { required: true, message: '类型必填', trigger: 'change' }
        ],
        status: [
          { required: true, message: '状态必填', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '顺序必填', trigger: 'change' },
          { type: 'number', message: '顺序必须为数字值' }
        ],
        url: [
          { validator: this.validateUrl, trigger: 'change' }
        ],
        code: [
          { validator: this.validateCode, trigger: 'change' }
        ]
      },
      downloadLoading: false
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': 'success',
        '1': 'info',
        '-1': 'danger'
      }
      return statusMap[status]
    },
    statusText(type) {
      return config.userStatusValue[type]
    },
    typeText(type) {
      return typeValue[type]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    validateUrl(rule, value, callback) {
      if ((this.temp.type === 1 || this.temp.type === 2) &&
       (this.temp.url === '' || this.temp.url === null)) {
        callback(new Error('请输入地址url'))
      }
      callback()
    },
    validateCode(rule, value, callback) {
      // if ((this.temp.type === 1 || this.temp.type === 2) &&
      //  (this.temp.code === '' || this.temp.code === null)) {
      //   callback(new Error('请输入权限code'))
      // }
      callback()
    },
    initCreateUpdateTemp() {
      return {
        id: null,
        permname: null,
        description: null,
        parentid: null,
        type: null,
        url: null,
        action: null,
        code: null,
        icon: null,
        sort: null,
        status: 0,
        component: null,
        title: null,
        path: null,
        isnavigate: false,
        isplugin: false
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.result.list
        this.total = response.result.total * 1
        this.listLoading = false
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      const id = row.id
      updateStatus({ id, status }).then(() => {
        this.$notify({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
      })
    },
    handleDelete(row) {
      const id = row.id
      const message = row.children && row.children.length > 0 ? '将同步删除子项是否确认删除?' : '是否确认删除?'
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePerm(id).then(() => {
          this.$notify({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
      })
    },
    resetTemp() {
      this.temp = this.initCreateUpdateTemp()
    },
    handleTopCreate() {
      this.resetTemp()
      this.dialogStatus = 'topCreate'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleChildrenCreate(row) {
      this.resetTemp()
      this.temp.parentid = row.id
      this.dialogStatus = 'childrenCreate'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createPerm(this.temp).then(() => {
            this.getList()// 重新加载列表
            this.dialogFormVisible = false
            this.isNeedGetTypeData = true
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      const r = Object.assign({}, row) // copy obj
      for (var property in this.temp) {
        this.temp[property] = r[property]
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updatePerm(tempData).then(() => {
            this.getList()// 重新加载列表
            this.dialogFormVisible = false
            this.isNeedGetTypeData = true
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    onDialogOpen() {
      if (!this.isNeedGetTypeData) { return }
      menuNode().then(response => {
        this.typeData = response.result
        this.isNeedGetTypeData = false
      })
    }
  }
}
</script>