<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="addContactbutton">
          <p class="contact-title">Contacts</p>
          <addContact :visivle.sync="visivle"></addContact>
        </div>
        <div class="search-box">
          <el-input
            placeholder="Please search"
            v-model="search"
            class="input-with-select"
          >
            <el-select v-model="select" slot="prepend" placeholder="Select">
              <el-option label="Name" value="name"></el-option>
              <el-option label="Company" value="company"></el-option>
              <el-option label="Tag" value="tag"></el-option>
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </div>
        <el-table
          :data="contactTableData"
          style="
            width: 970px;
            margin-top: 25px;
            margin-left: 40px;
            margin-bottom: 60px;
          "
        >
          <el-table-column prop="name" label="Name" width="180">
          </el-table-column>
          <el-table-column label="Company" width="180">
            <template #default="o">
              {{ o.row.companys[0].value || "" }}
            </template>
          </el-table-column>
          <el-table-column label="Tags">
            <template #default="o">
              <span v-for="item in o.row.tags">{{ item.value }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="" width="200">
            <template #default="o">
              <router-link
                :to="{ name: 'information', query: { id: o.row._id } }"
              >
                <el-button type="text">
                  <span class="view-group">
                    <i
                      class="el-icon-view"
                      style="color: white; margin-top: 4px"
                    ></i>
                  </span>
                </el-button>
              </router-link>
              <el-button type="text" @click="handleDelete(o.row._id)">
                <span class="delete-group">
                  <i
                    class="el-icon-delete"
                    style="color: white; margin-top: 4px"
                  ></i>
                </span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog">
          <el-button type="text" @click="deleteContactVisible = true" center>
          </el-button>
          <el-dialog :visible.sync="deleteContactVisible" width="40%">
            <template slot="title">
              <div class="delete-title">
                Are you sure that you want to delete this contact?
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
import addContact from "@/components/addContact";

export default {
  name: "Person",
  components: {
    navigation,
    addContact,
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
      groupData: [],
      contactData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      url: this.$path.CONTACT,
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
    };
  },
  methods: {
    async handleSearch() {
      let query = { uid: sessionStorage.id };
      query[this.select] = this.search;
      let res = await this.$axios.get(this.url, query);
      if (res.data.code === 200) {
        this.contactTableData = res.data.data;
      }
    },
    async handleDeleteYes() {
      let res = await this.$axios.delete(this.url + "/" + this.deleteId);
      if (res.data.code === 200) {
        this.$message.success("success");
        this.deleteContactVisible = false;
        this.fetchData();
      }
    },
    handleDelete(id) {
      this.deleteId = id;
      this.deleteContactVisible = true;
    },
    async handleAdd() {
      let res = await this.$axios.post(this.url2, this.addForm);
      if (res.data.code === 200) {
        this.$message.success("success");
        this.dialogFormVisible = false;
        this.fetchData();
      }
    },
    handleAvatarSuccess(res, file) {
      this.addForm.thumb = res;
    },
    beforeAvatarUpload(file) {
      return true;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    async fetchData() {
      let query = { uid: sessionStorage.id };
      // if (this.searchForm.name) {
      //   query.name = this.searchForm.name;
      // }
      let res = await this.$axios.get(this.url, query);
      if (res.data.code === 200) {
        this.contactTableData = res.data.data;
      }
      let res2 = await this.$axios.get(this.url2, { uid: sessionStorage.id });
      if (res2.data.code === 200) {
        this.groupData = res2.data.data;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
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