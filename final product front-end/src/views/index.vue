<template>
    <div class="infoshow">
        <el-button type="text" @click="centerDialogVisible = true">open Dialog</el-button>

        <el-dialog
        title="reminder"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">delete</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>
        </span>
        </el-dialog>

        <el-row type="flex" class="row-bg" justify="center">
            <div class="user">
                <img src="https://www.gravatar.com/avatar/anything?s=200&d=mm" class="avatar" alt="">
            </div>
            <div class="userinfo">
                <div class="user-item">
                    <span>email</span>
                </div>
                <div class="user-item">
                    <span>password</span>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
// @ is an alias to /src
import navigation from '@/components/navigation'

export default {
  name: 'index',
  components: {
    navigation
  },
  data() {
      return {
        centerDialogVisible: false
      };
    }
}
</script>

<style scoped>
.infoshow{
    width:100%;
    height:100%;
    box-sizing:border-box;
}
.row-bg{
    width:100%;
    height:100%;
}
.user{
    text-align:center;
    position:relative;
    top:30%;
}
.user span{
    display: block;
    text-align:center;
    margin-top:20px;
    font-size:20px;
    font-weight:bold;
}
.userinfo{
    height:100%;
}
.user-item{
    position:relative;
    top:30%;
    padding:26px;
    font-size:28px;
}
</style>
