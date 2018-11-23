<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button v-has-add:uac_departments class="filter-item" @click="handleCreate" type="primary">添加</el-button>
      <el-button v-has-update:uac_departments class="filter-item" type="primary" @click="handleUpdate()">编辑</el-button>
      <el-button v-has-status:uac_departments class="filter-item" type="success" @click="handleDelete()">删除</el-button>
    </div>

    <el-row>
      <el-col :span="6">
        <el-tree :default-expand-all="true" :expand-on-click-node="false" :highlight-current="true" ref="tree" :data="list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="18" class="el-card el-card__body">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 400px; margin-left:20px;'>
          <el-form-item v-if="this.dialogStatus === 'create'" label="父级节点">
            <el-input :disabled="true" v-model="curDepartName"></el-input>
          </el-form-item>
          <el-form-item label="部门名" prop="deptname">
            <el-input :disabled="!inputEnabled" v-model="temp.deptname"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input :disabled="!inputEnabled" v-model="temp.description"></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="sort">
            <el-input :disabled="!inputEnabled" v-model="temp.sort"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button v-if="this.inputEnabled&&dialogStatus=='create'" type="primary" @click="createData">创建</el-button>
          <el-button v-else-if="this.inputEnabled&&dialogStatus=='update'" type="primary" @click="updateData">保存</el-button>
          <el-button v-if="inputEnabled" @click="inputEnabled = false;dialogStatus=null">取消</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-card{
  box-shadow: 0 0px 0px 0 rgba(0,0,0,.1);
}
.el-dialog__body{
  padding: 1px 20px；
}
.dialog-footer{
  width: 400px;
  margin-left: 50px;
}
.el-button+.el-button{
  margin-left: 0px;
}
</style>

<script>
import {
  fetchList,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '@/api/department'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: '部门管理',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      defaultProps: {
        children: 'children',
        label: 'deptname'
      },
      listLoading: true,
      inputEnabled: false,
      curDepartId: undefined,
      dialogStatus: '',
      temp: this.initCreateUpdateTemp(),
      rules: {
        deptname: [
          { required: true, message: '部门名必填', trigger: 'change' }
        ],
        description: [
          { required: true, message: '描述必填', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '顺序必填', trigger: 'change' }
        ]
      },
      curDepartName: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    initCreateUpdateTemp() {
      return {
        id: null,
        deptname: null,
        description: null,
        sort: null,
        parentid: null,
        status: 0
      }
    },
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.result
        this.listLoading = false
      })
    },
    handleDelete() {
      const id = this.temp.id
      if (this.temp.id == null) {
        this.$message({
          message: '请先选择一个需要删除的部门节点',
          type: 'warning'
        })
        return
      }
      this.$confirm(`此操作将永久删除${this.temp.deptname}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment(id).then(() => {
          this.$notify({
            message: '操作成功',
            type: 'success'
          })

          this.$refs['dataForm'].resetFields()
          this.getList()// 重新加载列表
          this.resetTemp()
        })
      })
    },
    resetTemp() {
      this.temp = this.initCreateUpdateTemp()
    },
    handleCreate() {
      this.resetTemp()
      const node = this.$refs.tree.getCurrentNode()
      if (node != null) {
        this.temp.parentid = node.id
      }
      this.dialogStatus = 'create'
      this.inputEnabled = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createDepartment(this.temp).then(() => {
            this.getList()// 重新加载列表
            this.inputEnabled = false
            this.$refs['dataForm'].resetFields()
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
    handleUpdate() {
      if (this.temp.id == null) {
        this.$message({
          message: '请先选择一个需要编辑的部门节点',
          type: 'warning'
        })
        return
      }
      const node = this.$refs.tree.getCurrentNode()
      const r = Object.assign({}, node) // copy obj
      for (var property in this.temp) {
        this.temp[property] = r[property]
      }
      this.dialogStatus = 'update'
      this.inputEnabled = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateDepartment(tempData).then(() => {
            this.getList()// 重新加载列表
            this.inputEnabled = false
            this.$refs['dataForm'].resetFields()
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
    handleNodeClick(data) {
      const r = Object.assign({}, data) // copy obj
      this.curDepartName = r.deptname
      for (var property in this.temp) {
        this.temp[property] = r[property]
      }

      this.dialogStatus = null
      this.inputEnabled = false
    }
  }
}
</script>