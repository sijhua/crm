<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="addContactbutton">
          <div class="contact-title">You-are-right</div>
          <el-button class="addMember-button" @click="handleEditMember"
            >Add member</el-button
          >
        </div>

        <div class="ContactTable"></div>
        <el-table
          :data="contactTableData"
          style="
            width: 810px;
            margin-top: 25px;
            margin-left: 25px;
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
          <el-table-column prop="action" label="" width="100">
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
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container>
      <div class="note-title">Notes</div>

      <el-button class="addNotes-button" @click="dialogNotesVisible = true"
        >Add</el-button
      >

      <el-dialog title="Add Notes" :visible.sync="dialogNotesVisible">
        <el-form :model="form">
          <el-form-item label="Subject" :label-width="formLabelWidth">
            <el-input v-model="form.subject" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Comment" :label-width="formLabelWidth">
            <el-input v-model="form.comment" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogNotesVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleAddNote">Confirm</el-button>
        </span>
      </el-dialog>

      <el-popover placement="right" trigger="hover" width="400">
        <el-button
          class="note1"
          slot="reference"
          v-for="item in notesData"
          :key="item._id"
        >
          <p>Subject:{{ item.subject }}</p>
          <p>Comment:{{ item.comment }}</p>
        </el-button>
      </el-popover>
    </el-container>
    <el-dialog title="member" :visible.sync="dialogVisible2" width="50%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          :label="item._id"
          v-for="(item, index) in userList"
          :key="index"
          >{{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">cancel</el-button>
        <el-button type="primary" @click="handleUpdate2">update</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navigation from "@/components/navigation";
import addMember from "@/components/addMember";

export default {
  name: "Person",
  components: {
    navigation,
    addMember,
  },
  methods: {
    async handleAddNote() {
      this.form.tid = this.id;
      this.form.uid = sessionStorage.id;
      await this.$axios.post(this.$path.NOTES, this.form);
      this.$message.success("ok");
      this.dialogNotesVisible = false;
      this.fetchNotes();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    async handleEditMember() {
      this.dialogVisible2 = true;
      let res = await this.$axios.get("/api/contact", {
        uid: sessionStorage.id,
      });
      this.userList = res.data.data;
    },
    async handleUpdate2() {
      let res = await this.$axios.put(this.url + "/" + this.id, {
        member: this.checkList,
      });
      if (res.data.code === 200) {
        this.$message.success("ok");
        this.dialogVisible2 = false;
        this.fetchData();
      }
    },
    async fetchData() {
      let res = await this.$axios.get(this.url + "/" + this.id);
      this.checkList = res.data.data[0].member;
      let res2 = await this.$axios.get(this.$path.CONTACT, {
        ids: JSON.stringify(this.checkList),
      });
      this.contactTableData = res2.data.data;
    },
    async fetchNotes() {
      let res = await this.$axios.get(this.$path.NOTES, { tid: this.id });
      this.notesData = res.data.data;
    },
  },
  data() {
    return {
      notesData: [],
      url: this.$path.TEAM,
      dialogVisible2: false,
      checkList: [],
      userList: [],
      outerVisible: false,
      innerVisible: false,
      deleteVisible: false,
      deleteContactVisible: false,
      search: "",
      select: "",
      inputDecription: "",
      inputName: "",
      dialogVisible: false,
      dialogFormVisible: false,
      imageUrl: "",
      contactTableData: [
        {
          Name: "hahaha",
          Company: "hh",
          Tags: "hhh",
        },
      ],
      groupData: [],
      contactData: [],
      visivle: false,
      dialogNotesVisible: false,
      form: {
        subject: "",
        comment: "",
      },
      formLabelWidth: "150px",
    };
  },
  async mounted() {
    this.id = this.$route.query.id;
    this.fetchData();
    this.fetchNotes();
  },
};
</script>

<style scoped>
.addMember-button {
  position: fixed;
  display: inline-block;
  width: 180px;
  height: 45px;
  left: 780px;

  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  text-align: center;

  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
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
.note-title {
  position: absolute;
  left: 1100px;
  top: 135px;
  bottom: 74.71%;

  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;

  color: #000000;
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
  left: 208px;
  margin-top: 20px;

  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
}
.addGroup-button {
  position: relative;
  width: 15%;
  height: 15%;
  left: 35%;

  font-family: Alatsi;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 15%;
  text-align: center;
  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
.addNotes-button {
  position: absolute;
  display: inline;
  width: 70px;
  height: 35px;
  left: 1290px;
  top: 127px;

  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
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
.note1 {
  position: absolute;
  width: 256px;
  height: 105px;
  left: 1105px;
  top: 200px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.note2 {
  position: absolute;
  width: 256px;
  height: 105px;
  left: 1105px;
  top: 340px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.note3 {
  position: absolute;
  width: 256px;
  height: 105px;
  left: 1105px;
  top: 480px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.note4 {
  position: absolute;
  width: 256px;
  height: 105px;
  left: 1105px;
  top: 620px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>

<style>
.dialog .el-dialog {
  background-color: #4f6585;
}
</style>