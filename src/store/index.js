import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  // 声明
  state: {
    // count: 0
    // app中的数据列表
    list: [],
    inputValue: 'aaa',
    listId: 5,
    // 底部3个按钮的切换
    viewBtn: 'all'
  },
  mutations: {
    // mutations函数中第一个参数都是state
    listInit (state, list) {
      state.list = list
    },
    // 保存input输入框的值到state中
    setInputValue (state, value) {
      state.inputValue = value
    },
    // 点击添加事件按钮,把输入框的内容添加到state.list中
    addlist (state) {
      const obj = {
        id: state.listId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.listId++
      state.inputValue = ''
    },
    // 删除按钮触发的事件
    delListInfo (state, id) {
      const i = state.list.findIndex(a => a.id === id)
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 点击复选框切换done状态
    checkIdDone (state, item) {
      const done = !item.done
      const i = state.list.findIndex(a => a.id === item.id)
      if (i !== -1) {
        state.list[i].done = done
      }
      console.log(done)
      console.log(item)
    },
    // 清除选择的复习框
    delCheckAllDone (state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 切换底部三个按钮状态
    changeBtn (state, key) {
      state.viewBtn = key
    }
  },
  actions: {
    // actions函数只能修改mutation,不能直接修改state
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('listInit', data)
      })
    }
  },
  getters: {
    // 统计未选条数
    unDoneNum (state) {
      return state.list.filter(x => x.done === false).length
    },
    // 切换列表显示状态(全选,已完成,未完成)
    changeListInfo (state) {
      if (state.viewBtn === 'all') {
        return state.list
      }
      if (state.viewBtn === 'unDone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewBtn === 'done') {
        return state.list.filter(x => x.done === true)
      }
      // 返回list保证这次过滤不会对原数组造成影响
      return state.list
    }
  },
  modules: {
  }
})
