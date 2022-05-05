<template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <div class="title">Events</div>
        <button class="calendar-button" @click="$router.push('/calendar')"
          >Calendar</button
        >
        <button class="addEvent-button" @click="dialogFormVisible = true"
          >add event</button
        >

        <el-dialog title="Add event" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="Subject:" :label-width="formLabelWidth">
              <input v-model="form.subject" auto-complete="False" id="subject-input">
              </input>
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
            <button
              type="primary"
              @click="handleAddEvent"
              v-on:click="increase"
              id="add-event"
              >Confirm</button
            >
          </span>
        </el-dialog>

        <br />
        <div class="event-info" v-for="item in eventData" :key="item._id">
          <div class="delete-button" style="margin-top: 10px">
            <el-button
              type="text"
              @click="handleDeleteEvent(item._id)"
              style="
                color: white;
                right: 500px;
                margin-top: -30px;
                float: right;
                color: #4f6585;
                font-size: 25px;
              "
              ><i class="el-icon-circle-close"></i
            ></el-button>
          </div>
          <div class="event">
            <span>Subject: </span
            ><span class="content">{{ item.subject }}</span>
            <br />
            <span>Status: </span>
            <span class="status">{{ item.status }}</span>
            <div class="view-button">
              <el-button
                type="text"
                @click="handleShow(item)"
                style="
                  color: white;
                  margin-left: 10px;
                  margin-top: -5px;
                  float: left;
                "
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
              <span>Status: </span><span class="status">{{ obj.status }}</span>
              <br />
              <span>Comment: </span
              ><span class="content">{{ obj.comment }}</span>
              <br />
              <span>Start Date/Time: </span
              ><span class="content">{{ obj.startTime }}</span>
              <span class="endDate">End Date/Time: </span
              ><span class="content">{{ obj.endTime }}</span>
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
            width: 820px;
            margin-top: 25px;
            margin-left: 48px;
            margin-bottom: 60px;
          "
        >
          <el-table-column prop="name" label="Name" width="180">
          </el-table-column>
          <el-table-column label="Company" width="210">
            <template #default="o">
              {{ o.row.company }}
            </template>
          </el-table-column>
          <el-table-column label="Tags">
            <template #default="o">
              {{ o.row.tags }}
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
      <el-row>
        <el-col :span="12">
          <el-form label-width="80px">
            <el-form-item label="name">
              <el-input v-model="name" @change="handleChange"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
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
    <div class="dialog">
      <el-button type="text" @click="deleteContactVisible2 = true" center>
      </el-button>

      <el-dialog :visible.sync="deleteContactVisible2" width="40%">
        <template slot="title">
          <div class="delete-title">
            Are you sure that you want to delete this event?
          </div>
        </template>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleDeleteYes2">Yes</el-button>
          <el-button @click="deleteContactVisible2 = false">No</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
// @ is an alias to /src
import navigation from "@/components/navigation";
import addMember from "@/components/addMember";

export default {
  name: "Dashboard",
  components: {
    navigation,
    addMember,
  },
  data() {
    return {
      demoEvents: [],
      count: 0,
      obj: {},
      deleteContactVisible: false,
      deleteContactVisible2: false,
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
      formLabelWidth: "180px",
      eventData: [],
      visivle: "",
      fid: "",
      name:"",
    };
  },
  methods: {
    async handleChange() {
      if (this.name) {
        let res = await this.$axios.get("/api/contact", {
          uid: sessionStorage.id,
          name: this.name,
        });
        this.userList = res.data.data;
      } else {
        let res = await this.$axios.get("/api/contact", {
          uid: sessionStorage.id,
        });
        this.userList = res.data.data;
      }
    },
    increase: function () {
      this.count++;
    },
    handleShow(data) {
      this.DialogVisible = true;
      this.obj = data;
    },
    async handleAddEvent() {
      var startDate = this.form.startTime;
      var endDate = this.form.endTime;
      this.form.startTime = this.$moment(startDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.form.endTime = this.$moment(endDate).format("YYYY-MM-DD HH:mm:ss");
      await this.$axios.post(this.$path.EVENT, this.form);
      this.$message.success("ok");
      this.dialogFormVisible = false;
      this.fetchData();
      count++;
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
    async handleDeleteYes2() {
      let res = await this.$axios.delete(
        this.$path.EVENT + "/" + this.deleteId2
      );
      if (res.data.code === 200) {
        this.$message.success("success");
        this.deleteContactVisible2 = false;
        this.fetchData();
      }
    },
    handleDelete(id) {
      this.deleteId = id;
      this.deleteContactVisible = true;
    },
    handleDeleteEvent(id) {
      this.deleteId2 = id;
      this.deleteContactVisible2 = true;
    },
    async handleUpdate2() {
      if(this.checkList.length>10){
        this.$message.error("You can only add up to ten contacts");
        return;
      }
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
    async handleDayChange(e) {
      let date = new Date(e.date);
      let res4 = await this.$axios.get(this.$path.EVENT, {
        date,
        uid: sessionStorage.id,
      });
      this.demoEvents = res4.data.data.map((v) => ({
        date: this.$moment(new Date(v.startTime)).format("YYYY-MM-DD HH:mm:ss"),
        start: this.$moment(new Date(v.startTime)).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        end: this.$moment(new Date(v.endTime)).format("YYYY-MM-DD HH:mm:ss"),
        title: v.subject,
        desc: v.comment,
      }));
    },
    handleMonthChange(e) {
      var m = e.slice(0, 2);
      this.$nextTick(() => {
        var items = document.querySelectorAll(".item");
        items.forEach((v) => {
          v.style.background = "";
          v.onclick = function () {
            items.forEach((e) => {
              e.style.background = "";
            });
            this.style.background = "orange";
          };
          this.eventData.forEach((item) => {
            var month = this.$moment(new Date(item.startTime)).format("MM");
            var day = this.$moment(new Date(item.startTime)).format("D");
            if (m === month) {
              if (v.textContent.trim() === day) {
                var span = document.createElement("span");
                span.className = "is-today";
                span.style.background = "red";
                v.appendChild(span);
              }
            }
          });
        });
      });
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
      } else {
        this.contactTableData = [];
      }

      let res3 = await this.$axios.get(this.$path.EVENT, {
        uid: sessionStorage.id,
      });
      if (res3.data.data.length) {
        this.eventData = res3.data.data.map((v) => {
          v.startTime = this.$moment(new Date(v.startTime)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          v.endTime = this.$moment(new Date(v.endTime)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          var day = this.$moment(new Date(v.startTime)).format("D");
          var month = this.$moment(new Date(v.startTime)).format("MM");
          var items = document.querySelectorAll(".item");
          items.forEach((v) => {
            if (
              v.textContent.trim() === day &&
              month == new Date().getMonth() + 1
            ) {
              var span = document.createElement("span");
              span.className = "is-today";
              span.style.background = "red";
              v.appendChild(span);
            }
          });
          return v;
        });
      } else {
        this.eventData = [];
      }
      let res4 = await this.$axios.get(this.$path.EVENT, {
        date: new Date(),
        uid: sessionStorage.id,
      });
      this.demoEvents = res4.data.data.map((v) => ({
        date: this.$moment(new Date(v.startTime)).format("YYYY-MM-DD HH:mm:ss"),
        start: this.$moment(new Date(v.startTime)).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        end: this.$moment(new Date(v.endTime)).format("YYYY-MM-DD HH:mm:ss"),
        title: v.subject,
        desc: v.comment,
      }));
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
    this.$nextTick(() => {
      var items = document.querySelectorAll(".item");
      items.forEach((v) => {
        v.onclick = function () {
          items.forEach((e) => {
            e.style.background = "";
          });
          this.style.background = "orange";
        };
      });
    });
  },
};
</script>

<style scoped>
.date-title {
  text-align: center;
}
.date-time {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
.date-desc {
  color: #ccc;
}
.calender {
  width: 1000px;
  height: auto;
  background: #ccc;
  margin-top: 30px;
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
  word-wrap: break-word;
  word-break: break-all;

  line-height: 30px;
  margin-left: 5px;
}
.addEvent-button {
  position: relative;
  width: 150px;
  height: 45px;
  left: 600px;
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
.calendar-button {
  position: relative;
  width: 150px;
  height: 45px;
  left: 600px;
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
  display: inline-block;
  margin-left: 34px;
  margin-top: 2%;
  width: 210px;
  padding: 23px;
  background: rgba(125, 196, 211, 0.5);
  border-radius: 10px;
}

.view-button {
  margin-left: 75%;
  margin-top: 6px;
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
