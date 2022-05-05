<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="title">Events</div>
        <el-button class="addEvent-button" @click="dialogFormVisible = true"
          >add event</el-button
        >

        <el-dialog title="Add event" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Subject:" :label-width="formLabelWidth">
              <el-input v-model="form.subject" auto-complete="False">
              </el-input>
            </el-form-item>

            <el-form-item label="Status:" :label-width="formLabelWidth">
              <el-radio-group v-model="form.status" size="medium">
                <el-radio-button
                  label="complete"
                  value="complete"
                ></el-radio-button>
                <el-radio-button
                  label="incomplete"
                  value="incomplete"
                ></el-radio-button>
                <el-radio-button
                  label="cancelled"
                  value="cancelled"
                ></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Comment:" :label-width="formLabelWidth">
              <el-input v-model="form.comment" auto-complete="False">
              </el-input>
            </el-form-item>

            <el-form-item
              label="Start Date/Time:"
              :label-width="formLabelWidth"
            >
              <el-date-picker
                v-model="form.startTime"
                type="datetime"
                placeholder="DD/MM/YYYY"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="End Date/Time:" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.endTime"
                type="datetime"
                placeholder="DD/MM/YYYY"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="Location:" :label-width="formLabelWidth">
              <el-input v-model="form.location" auto-complete="False">
              </el-input>
            </el-form-item>

            <el-form-item label="Meeting link:" :label-width="formLabelWidth">
              <el-input v-model="form.meetingLink" auto-complete="False">
              </el-input>
            </el-form-item>

            <el-form-item
              label="Other tagged contact:"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.taggedContact" auto-complete="False">
              </el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="handleAddEvent"
              >Confirm</el-button
            >
          </span>
        </el-dialog>

        <div class="event-info" v-for="item in eventData" :key="item._id">
          <div class="event">
            <span>Subject: </span
            ><span class="content">{{ item.subject }}</span>
            <br />
            <span>Status: </span>
            <span class="status">{{item.status}}</span>
            <div class="view-button">
              <el-button
                type="text"
                @click="handleShow(item)"
                style="color: white; margin-left: 13px; margin-top: -10px"
                >view</el-button
              >
            </div>

            <el-dialog
              title="Event details"
              :data="eventData"
              :visible.sync="DialogVisible"
            >
              <span>Subject: </span
              ><span class="content">{{ obj.subject }}</span>
              <br />
              <p class="blank"></p>
              <span>Status: </span><span class="status">{{obj.status}}</span>
              <br />
              <span>Comment: </span
              ><span class="content">{{ obj.comment }}</span>
              <br />
              <span>Start Date/Time: </span
              ><span class="content">{{obj.startTime}}</span>
              <span class="endDate">End Date/Time: </span
              ><span class="content">{{obj.endTime}}</span>
              <br />
              <span>Location: </span
              ><span class="content">{{ obj.location }}</span>
              <br />
              <span>Meeting link: </span
              ><span class="content">{{ obj.meetingLink }}</span>
              <br />
              <span>Other tagged contacts:{{ obj.taggedContact }} </span>
            </el-dialog>
          </div>
        </div>
        <div class="favContactbutton">
          <div class="title">Favorite contacts</div>
          <el-button class="addFav-button" @click="handleEditMember"
            >Add member</el-button
          >
        </div>
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
      </el-main>
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
  </el-container>
</template>

<script>
// @ is an alias to /src
import navigation from "@/components/navigation";

export default {
  name: "Dashboard",
  components: {
    navigation,
  },
  data() {
    return {
      obj: {},
      deleteContactVisible: false,
      dialogVisible2: false,
      checkList: [],
      userList: [],
      dialogFormVisible: false,
      DialogVisible: false,
      radio: "",
      contactTableData: [],
      form: {
        uid: sessionStorage.id,
        subject: "",
        comment: "",
        value: "",
        location: "",
        meetingLink: "",
        taggedContact: "",
      },
      formLabelWidth: "150px",
      eventData: [],
      visivle: "",
      fid: "",
    };
  },
  methods: {
    handleShow(data) {
      this.DialogVisible = true;
      this.obj = data;
    },
    async handleAddEvent() {
      await this.$axios.post(this.$path.EVENT, this.form);
      this.$message.success("ok");
      this.dialogFormVisible = false;
      this.fetchData();
    },
    async handleDeleteYes() {
      this.checkList = this.checkList.filter((v) => v != this.deleteId);
      let res = await this.$axios.put(this.$path.FAVORAITES + "/" + this.fid, {
        ids: JSON.stringify(this.checkList),
      });
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
    async handleUpdate2() {
      let res = await this.$axios.post(this.$path.FAVORAITES, {
        uid: sessionStorage.id,
        ids: this.checkList,
      });
      if (res.data.code === 200) {
        this.$message.success("ok");
        this.dialogVisible2 = false;
        this.fetchData();
      }
    },
    async fetchData() {
      let res = await this.$axios.get(this.$path.FAVORAITES, {
        id: sessionStorage.id,
      });
      if (res.data.data.length) {
        this.checkList = res.data.data[0].ids;
        this.fid = res.data.data[0]._id;
      }
      let res2 = await this.$axios.get(this.$path.CONTACT, {
        ids: JSON.stringify(this.checkList),
      });
      if (res2.data.data.length) {
        this.contactTableData = res2.data.data;
      }
      let res3 = await this.$axios.get(this.$path.EVENT, {
        uid: sessionStorage.id,
      });
      if (res3.data.data.length) {
        this.eventData = res3.data.data;
      }
    },
    async handleEditMember() {
      this.dialogVisible2 = true;
      let res = await this.$axios.get("/api/contact", {
        uid: sessionStorage.id,
      });
      this.userList = res.data.data;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
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
.addMember-button {
  display: inline-block;
  width: 180px;
  height: 45px;
  float: right;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  text-align: center;
  color: #ffffff;
  background: #4f6585;
  border-radius: 5px;
  margin-right: 500px;
}
html,
body,
.el-container {
  height: 100%;
}
.title {
  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-left: 3%;
  margin-top: 30px;
}
.status {
  background: #4f6585;
  height: 20px;
  width: 100px;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
  padding: 6px;
  font-family: "Arial";
  margin-left: 5px;
}

.event {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 35px;
}

.content {
  font-family: "Arial";
  line-height: 30px;
  margin-left: 5px;
}
.addEvent-button,
.addFav-button {
  position: relative;
  width: 150px;
  height: 45px;
  left: 570px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 15%;
  text-align: center;
  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
.addFav-button {
  width: 180px;
  left: 450px;
}
.event-info {
  margin-left: 3%;
  margin-top: 2%;
  width: 260px;
  padding: 1.5%;
  background: rgba(125, 196, 211, 0.5);
  border-radius: 10px;
}

.view-button {
  margin-left: 75%;
  background: #4f6585;
  width: 22%;
  height: 30px;
  border-radius: 5px;
}
.favContactbutton {
  margin-top: 30px;
}
.endDate {
  margin-left: 80px;
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
</style>
