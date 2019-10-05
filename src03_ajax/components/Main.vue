<template>
  <div>
    <h1 v-if="firstView">请输入关键进行搜索</h1>
    <h1 v-else-if="loading">loading</h1>
    <h1 v-else-if="errorMsg">{{errorMsg}}</h1>
    <div class="row" v-else>
      <div class="card" v-for="(user, index) in users" :key="user.username">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style="width: 100px" />
        </a>
        <p class="card-text">{{user.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { async } from "q";
export default {
  data() {
    return {
      firstView: true,
      loading: false,
      user: [],
      errorMsg: ""
    };
  },
  mounted() {
    //绑定自定义事件监听：search
    this.$bus.$on("search", async searchName => {
      //更新数据状态(请求中)
      this.firstView = false;
      this.loading = true;
      //发ajax请求获取users
      const url = `https://api.github.com/search/users?q=${searchName}`;
      const response = await this.$axios(url);
      try {
        //请求成功，更新数据(成功)
        const users = response.data.items.map(item => ({
          username: item.login,
          url: item.html_url,
          avatar_url: item.avatar_url
        }));
        this.loading = false;
        this.users = users;
      } catch (error){
           //请求失败，更新数据(失败)
           this.loading=false
           this.errorMsg=error.message
      }
    });
  }
};
</script>

<style  scoped>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>