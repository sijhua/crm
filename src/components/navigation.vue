<template>
    <el-row>
    <el-col span="2" >
        <el-menu
        class="el-menu-vertical-demo"
        background-color="#4F6585"
        text-color="#fff"
        active-text-color="#ffd04b">
        
        <router-link to="/person">
            <el-menu-item index="0">
                <img src="https://www.gravatar.com/avatar/anything?s=200&d=mm" class="avatar" alt="">
            </el-menu-item>
        </router-link>

        <router-link to="/home">
            <el-menu-item index="0">
                <i class="el-icon-menu" style="color: white"></i>
                <br/>
                <span slot="title">dashboard</span>
            </el-menu-item>
        </router-link>

        <router-link to="/contact">
            <el-menu-item index="0">
                <i class="el-icon-phone" style="color: white"></i>
                <br/>
                <span slot="title">contacts</span>
            </el-menu-item>
        </router-link>
        </el-menu>
    </el-col>
    </el-row>
</template>

<script>
  export default {
    name: 'navigation',
  }
</script>

<style scoped>
.el-row,
.el-col,
.el-menu{
    height:100%;
    width:100px;
    overflow: hidden;
}
.el-menu-item{
    height:100px;
    line-height: 30px;
    text-align: center;
    width: 100px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
} 
.el-menu-item i{
    font-size: 30px;
    margin-top: 22px;
}
.el-menu-item img{
    height: 45px;
    margin-top: 28px;
    border-radius:50%;
}
.el-menu::-webkit-scrollbar {
  display: none;
}

</style>