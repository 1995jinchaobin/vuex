<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputValue' @change="inputValueChange"/>
    <a-button type="primary" @click='addItemList'>添加事项</a-button>

    <a-list bordered :dataSource="changeListInfo" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked='item.done' @click="checkId(item)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="delList(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneNum}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewBtn === 'all'? 'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewBtn === 'unDone'? 'primary':'default'" @click="changeList('unDone')">未完成</a-button>
          <a-button :type="viewBtn === 'done'? 'primary':'default'" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="delCheckAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewBtn']),
    ...mapGetters(['unDoneNum', 'changeListInfo'])
  },
  methods: {
    // 保存输入框值到state中
    inputValueChange (a) {
      // console.log(a.target.value)
      this.$store.commit('setInputValue', a.target.value)
    },
    // 添加事项按钮
    addItemList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('addlist')
    },
    // 删除按钮
    delList (id) {
      console.log(id)
      this.$store.commit('delListInfo', id)
    },
    // 点击复选框
    checkId (item) {
      // console.log(item.id)
      // console.log(item.done)
      this.$store.commit('checkIdDone', item)
    },
    // 清除已完成的选项
    delCheckAll () {
      this.$store.commit('delCheckAllDone')
    },
    // 底部3个按钮切换
    changeList (key) {
      // console.log(key)
      this.$store.commit('changeBtn', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
