<template>
  <li :style="{background:bgColor}" @mouseenter="handeleEnter(true)" @mouseleave="handeleEnter(false)">
    <label>
      <input type="checkbox" v-model="isCheck"/>
      <span> {{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
export default {
  /*
    模板中读取数据的来源：
      data:自身可变数据
      props:外部传入的数据
      computed:基于已有属性的计算属性
  */

  props:{//属性名/属性值的类型
    todo:Object,
    index:Number,
    updateTodo:Function
  },
  data() {
    return {
      bgColor:'white',
      isShow:false
    }
  },
  methods: {
    handeleEnter(isEnter){
      if(isEnter){
        this.bgColor="#ccc",
        this.isShow=true
      }else{
        this.bgColor="white",
        this.isShow=false
      }
    },
    deleteItem(){
      if(confirm('确定删除嘛')){
        // this.deleteTodo(this.index)
        this.$globalEventBus.$emit('deleteTodo',this.index)
      }
    }
  },
  computed: {
    isCheck:{
      get(){//checkout是否勾选，看接收的todo是否已经完成
        return this.todo.complete
      },
      set(value){//当用户操作checkbox界面时调用
        this.updateTodo(this.todo,value)
      }
    }
  },
};
</script>

<style scoped>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>