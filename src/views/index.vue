<template>
    <div class="infoshow">
        <el-button type="text" @click="centerDialogVisible = true">点击打开 Dialog</el-button>

        <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
