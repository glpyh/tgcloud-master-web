<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item" placeholder="服务名称" v-model="listQuery.serviceName">
      </el-input>
      <el-select class="filter-item" clearable style="width: 130px" v-model="listQuery.status" placeholder="状态">
        <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button v-has-add:role class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">添加</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中" border fit highlight-current-row
      style="width: 100%" height="510">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="描述">
              <span>{{ props.row.remark }}</span>
            </el-form-item>
         </el-form>
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务名称" width="150">
        <template slot-scope="scope">
          <svg-icon v-bind:icon-class="`${scope.row.icon}`" />
          <span>{{scope.row.serviceName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="服务应用名" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.serviceCode}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="服务ID" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.clientId}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否授权">
        <template slot-scope="scope">
          <span>{{scope.row.isAuth?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="是否路由">
        <template slot-scope="scope">
          <span>{{scope.row.isRoute?'是':'否'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="路由别名" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.routeName}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="路由前缀">
        <template slot-scope="scope">
          <span>{{scope.row.routePrefix}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="路由基础地址" width="120">
        <template slot-scope="scope">
          <span>{{scope.row.baseUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="自/异系统" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.type | serviceText}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="70px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status | statusText}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="联系人">
        <template slot-scope="scope">
          <span>{{scope.row.contacter}}</span>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="手机号" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" class-name="small-padding fixed-width" width="200px">
        <template slot-scope="scope">
          <el-button v-has-update:role type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-has-status:role size="mini" type="success" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @open="onDialogOpen">
      <el-form :label-position="right" :rules="rules" ref="dataForm" :model="temp" label-width="100px" style='margin:0 15px;'>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="服务名称" prop="serviceName">
              <el-input v-model="temp.serviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务应用名" prop="serviceCode">
              <el-input v-model="temp.serviceCode" placeholder="服务eureka中注册应用名称"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="路由基础地址" prop="baseUrl">
              <el-input v-model="temp.baseUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="服务ID" prop="clientId">
              <el-input v-model="temp.clientId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务密钥" prop="clientSecret">
              <el-input v-model="temp.clientSecret"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="路由别名" prop="routeName">
              <el-input v-model="temp.routeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由前缀" prop="routePrefix">
              <el-input v-model="temp.routePrefix"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="自/异系统" prop="type">
              <el-select class="filter-item" style="width: 130px" v-model="temp.type">
                <el-option v-for="item in serviceType" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人" prop="contacter">
              <el-input v-model="temp.contacter"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号" prop="mobile">
              <el-input v-model="temp.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="状态" prop="status"> 
              <el-select class="filter-item" style="width: 130px" v-model="temp.status">
                <el-option v-for="item in statusType" :key="item.key" :label="item.display_name" :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否授权" prop="isnavigate">
              <el-switch v-model="temp.isAuth"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否路由" prop="isnavigate">
              <el-switch v-model="temp.isRoute"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="小图标" prop="icon">
              <el-input v-model="temp.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="大图标" prop="picture">
              <el-input v-model="temp.picture"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="顺序" prop="sort">
              <el-input v-model.number="temp.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" :rows="2" v-model="temp.remark"></el-input>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">创建</el-button>
        <el-button v-else-if="dialogStatus==='update'" type="primary" @click="updateData">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  fetchList,
  createMicroservice,
  updateMicroservice,
  deleteMicroservice
} from '@/api/microservice'
import waves from '@/directive/waves' // 水波纹指令
import config from '@/utils/config'

const serviceType = [
  { key: 0, display_name: '自系统' },
  { key: 1, display_name: '异系统' }
]

export default {
  name: '微服务管理',
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
        serviceName: null,
        status: null
      },
      statusType: config.commonStatus,
      serviceType,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      temp: this.initCreateUpdateTemp(),
      dialogTreeVisible: false,
      rules: {
        serviceName: [
          { required: true, message: '服务名称必填', trigger: 'change' }
        ],
        status: [
          { required: true, message: '状态必填', trigger: 'change' }
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
      return config.commonStatusValue[type]
    },
    serviceText(type) {
      return serviceType[type].display_name
    }
  },
  created() {
    this.getList()
  },
  methods: {
    initCreateUpdateTemp() {
      return {
        id: null,
        serviceName: null,
        serviceCode: null,
        routeName: null,
        routePrefix: null,
        clientId: null,
        clientSecret: null,
        type: null,
        baseUrl: null,
        icon: null,
        picture: null,
        sort: null,
        contacter: null,
        mobile: null,
        remark: null,
        status: 0,
        isAuth: null,
        isRoute: null
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
      this.listQuery.pageNum = 1
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
    handleDelete(row) {
      const id = row.id
      this.$confirm(`此操作将永久删除${row.serviceName}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMicroservice(id).then(() => {
          this.getList()// 重新加载列表
          this.$notify({
            message: '操作成功',
            type: 'success'
          })
        })
      })
    },
    resetTemp() {
      this.temp = this.initCreateUpdateTemp()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createMicroservice(this.temp).then(() => {
            this.getList()// 重新加载列表
            this.dialogFormVisible = false
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
          updateMicroservice(tempData).then(() => {
            this.getList()// 重新加载列表
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style>
.treenode{
  padding-left:30px;
  font-size: 13px;

}
</style>
