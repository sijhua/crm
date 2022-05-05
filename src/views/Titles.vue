<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="title">Titles</div>
        <el-button class="addGroup-button" @click="dialogFormVisible = true"
          >add title</el-button
        >
        <el-dialog title="Add Title" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Name" :label-width="formLabelWidth">
              <el-input
                v-model="addForm.name"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleAdd">Confirm</el-button>
          </span>
        </el-dialog>
        <el-table
          :data="usersData"
          height="480"
          style="width: 985px; margin-top: 10px; margin-left: 25px"
        >
          <el-table-column label="name" width="100" prop="name">
          </el-table-column>
          <el-table-column prop="action" label="" width="250">
            <template #default="o">
              <el-button-group>
                <el-button type="text" @click="handleDelete(o.row._id)">
                  <span class="delete-group">
                    <i
                      class="el-icon-delete"
                      style="color: white; margin-top: 4px"
                    ></i>
                  </span>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>

        <div class="dialog">
          <el-dialog :visible.sync="deleteContactVisible" width="40%">
            <template slot="title">
              <div class="delete-title">
                Are you sure that you want to delete this title?
              </div>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleDeleteYes">Yes</el-button>
              <el-button @click="deleteContactVisible = false">No</el-button>
            </div>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navigation from "@/components/navigation";

export default {
  name: "Person",
  components: {
    navigation,
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      deleteVisible: false,
      deleteContactVisible: false,
      search: "",
      select: "name",
      inputDecription: "",
      inputName: "",
      dialogVisible: false,
      dialogFormVisible: false,
      imageUrl: "",
      contactTableData: [],
      usersData: [],
      contactData: [],
      url: this.$path.TITLES,
      visivle: true,
      formLabelWidth: "150px",
      form: {},
      url2: this.$path.TEAM,
      upload: this.$path.UPLOAD,
      addForm: {
        name: "",
        desc: "",
        thumb: "",
        uid: sessionStorage.id,
      },
      deleteId: "",
      deleteContactVisible: false,
    };
  },
  methods: {
    async handleDeleteYes() {
      let res = await this.$axios.delete(this.url + "/" + this.deleteId);
      if (res.data.code === 200) {
        this.$message.success("success");
        this.deleteContactVisible = false;
        this.fetchData();
      }
    },
    async handleAdd() {
      let res = await this.$axios.post(this.url, this.addForm);
      if (res.data.code === 200) {
        this.$message.success("success");
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    handleDelete(id) {
      this.deleteId = id;
      this.deleteContactVisible = true;
    },
    async handleResetPassword(id) {
      let res = await this.$axios.put(this.url + "/" + id, {
        password: "123456",
      });
      if (res.data.code === 200) {
        this.$message.success("success");
      }
    },
    async handleSearch() {
      let query = { uid: sessionStorage.id };
      query[this.select] = this.search;
      let res = await this.$axios.get(this.url, query);
      if (res.data.code === 200) {
        this.contactTableData = res.data.data;
      }
    },
    async fetchData() {
      let query = {};
      // if (this.searchForm.name) {
      //   query.name = this.searchForm.name;
      // }
      let res = await this.$axios.get(this.url, query);
      if (res.data.code === 200) {
        this.usersData = res.data.data;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
html,
body,
.el-container {
  height: 100%;
}
.contact-title {
  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-top: 30px;
  margin-left: 3%;
}
.title {
  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-left: 3%;
}
.view-group {
  text-align: center;
  padding: 4px;
  margin-left: 6px;
  margin-top: -5px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: #0899d385;
  border-radius: 5px;
}
.delete-group {
  text-align: center;
  margin-left: 0px;
  padding: 4px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: rgba(255, 14, 14, 0.815);
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 7px;
}
.add-contact {
  margin-top: -70px;
  margin-left: 420px;
  margin-bottom: -90px;
}
.group-title {
  margin-top: 15px;
  margin-left: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
}
.delete-title {
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-top: 10px;
  margin-left: 20px;
  font-size: 20px;
}
.dialog-footer {
  text-align: center;
  margin-top: -20px;
  margin-bottom: 15px;
}
.el-table {
  margin-top: 20%;
}
.search-box {
  position: relative;
  width: 501px;
  height: 45px;
  left: 510px;
  margin-top: 20px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
}
.addGroup-button {
  position: relative;
  width: 150px;
  height: 45px;
  left: 660px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15%;
  text-align: center;
  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.addContactbutton {
  position: relative;
}
</style>

<style>
.dialog .el-dialog {
  background-color: #4f6585;
}
</style>