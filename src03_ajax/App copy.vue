<template>
  <div>
    <div v-if="!repoName">loading...</div>
    <div v-else>
      most star repo is
      <a :href="repoUrl">{{repoName}}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      repoName: "",
      repourl: ""
    };
  },
  mounted() {
    //使用Vue-resource发送ajax请求
    // const url ='https://api.github.com/search/repositories?q=r&sort=stars'
    // this.$http.get(url).then(response =>{
    //   const result = response.data
    //   const {name,html_url} = result.items[0]
    //   //更新数据
    //   this.repoName = name
    //   this.repourl = html_url
    // }).catch(error=>{
    //   alert('请求出错了'+error.statusText)
    // })
    //使用axios发送ajax请求
    const url = "https://api.github.com/search/repositories?q=j&sort=stars";
    axios
      .get(url)
      .then(response => {
        const result = response.data;
        const { name, html_url } = result.items[0];
        //更新数据
        this.repoName = name;
        this.repourl = html_url;
      })
      .catch(error => {
        alert("请求出错了" + error.message);
      });
  }
};
</script>

<style scoped>
</style>
