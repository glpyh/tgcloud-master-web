<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item" placeholder="系统应用名" v-model="listQuery.applicationName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" clearable style="width: 200px;" class="filter-item" placeholder="异常类型" v-model="listQuery.exceptionSimpleName">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="努力加载中" border fit highlight-current-row
      style="width: 100%" max-height="700">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="异常堆栈信息">
              <span>{{ props.row.exceptionStack }}</span>
            </el-form-item>
         </el-form>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统应用名" >
        <template slot-scope="scope">
          <span>{{scope.row.applicationName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常类型" >
        <template slot-scope="scope">
          <span>{{scope.row.exceptionSimpleName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常信息" >
        <template slot-scope="scope">
          <span>{{scope.row.exceptionMessage}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="异常原因" >
        <template slot-scope="scope">
          <span>{{scope.row.exceptionCause}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作者姓名" >
        <template slot-scope="scope">
          <span>{{scope.row.creator}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
/* eslint-disable */
import { fetchList } from "@/api/exceptionlog";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";

export default {
  name: "异常日志",
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
        applicationName: undefined,
        exceptionSimpleName: undefined
      },
      dialogFormVisible: false,
      temp: this.initCreateUpdateTemp()
    };
  },
  created() {
    this.getList();
  },
  methods: {
    initCreateUpdateTemp() {
      return {
        id: null,
        username: null,
        password: null,
        nickname: null,
        deptid: null,
        deptname: null,
        gender: null,
        cellphone: null,
        identitycard: null,
        email: null,
        address: null,
        status: 0
      };
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.result.list;
        this.total = response.result.total * 1;
        this.listLoading = false;
      });
    },
    loadDepartment() {
      if (this.departments.length > 0) return;
      let query = { status: 0 };
      departFetchList(query).then(response => {
        this.departments = response.result;
      });
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    resetTemp() {
      this.temp = this.initCreateUpdateTemp();
    }
  }
};
</script>