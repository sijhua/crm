 <template>
  <el-container id="index-container">
    <el-aside width="100px">
      <navigation></navigation>
    </el-aside>
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="user">
              <img :src="info.profilePhote" class="avatar" alt="" width="100" />
            </div>
          </el-col>
          <el-col :span="12">
            <div class="contact">
              <el-descriptions class="margin-top" :column="2" border>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user"></i>
                    Name
                  </template>
                  {{ info.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets"></i>
                    jobTitle
                  </template>
                  {{ info.jobTitle }}
                </el-descriptions-item>

                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone"></i>
                    title
                  </template>
                  {{ info.title }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-message"></i>
                    company
                  </template>
                  {{ info.company }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building"></i>
                    tags
                  </template>
                  {{ info.tags }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-col>
        </el-row>
        <!--seperate line  -->
        <div>
          <el-divider content-position="right"></el-divider>
        </div>

        <!--separate the table -->
        <div class="personal-infor">
          <el-descriptions
            class="margin-top"
            title="Personal Information"
            :column="2"
            border
          >
            <el-descriptions-item
              v-for="(item, index) in info.phoneNumbers"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                Phone({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
            <el-descriptions-item
              v-for="(item, index) in info.emails"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                Emails({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
            <el-descriptions-item
              v-for="(item, index) in info.addresses"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                Address({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
            <el-descriptions-item
              v-for="(item, index) in info.websites"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                Website({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
            <el-descriptions-item
              v-for="(item, index) in info.socialMediaProfiles"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                SocialMediaProfile({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
            <el-descriptions-item
              v-for="(item, index) in info.impDates"
              :key="index"
            >
              <template slot="label">
                <i class="el-icon-office-building"></i>
                ImpDates({{ index + 1 }})
              </template>
              {{ item.value }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
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

        <div>
          <el-button
            class="note1"
            slot="reference"
            v-for="item in notesData"
            :key="item._id"
          >
            <img />
            <p>Subject: {{ item.subject }}</p>
            <p>Comment: {{ item.comment }}</p>
            <el-button
              class="danger"
              size="mini"
              @click="handleDelete(item._id)"
              >delete</el-button
            >
          </el-button>
        </div>
        <el-dialog :visible.sync="deleteContactVisible" width="40%">
          <template slot="title">
            <div class="delete-title">
              Are you sure that you want to delete this notes?
            </div>
          </template>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleDeleteYes">Yes</el-button>
            <el-button @click="deleteContactVisible = false">No</el-button>
          </div>
        </el-dialog>
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
      centerDialogVisible: false,
      DialogVisible: false,
      groupData: [],
      dialogNotesVisible: false,
      form: {
        subject: "",
        comment: "",
      },
      formLabelWidth: "500px",
      info: {},
      notesData: [],
      deleteId: "",
      deleteContactVisible: false,
    };
  },
  async mounted() {
    let { id } = this.$route.query;
    this.id = id;
    let res = await this.$axios.get(this.$path.CONTACT + "/" + id);
    this.info = res.data.data[0];
    this.fetchNotes();
  },
  methods: {
    async handleDeleteYes() {
      let res = await this.$axios.delete(
        this.$path.NOTES + "/" + this.deleteId
      );
      if (res.data.code === 200) {
        this.$message.success("success");
        this.deleteContactVisible = false;
        this.fetchNotes();
      }
    },
    handleDelete(id) {
      this.deleteId = id;
      this.deleteContactVisible = true;
    },
    async handleAddNote() {
      this.form.tid = this.id;
      this.form.uid = sessionStorage.id;
      await this.$axios.post(this.$path.NOTES, this.form);
      this.$message.success("ok");
      this.dialogNotesVisible = false;
      this.fetchNotes();
    },
    async fetchNotes() {
      let res = await this.$axios.get(this.$path.NOTES, { tid: this.id });
      if (res.data.data.length) {
        this.notesData = res.data.data;
      } else {
        this.notesData = [];
      }
    },
  },
};
</script>

<style>
html,
body,
.el-container {
  height: 100%;
}
.el-main img {
  position: relative;
  height: 100px;
  margin-top: 28px;
  margin-left: 0px;
  border-radius: 100px;
}

.user {
  position: relative;
  top: 5px;
}

.contact {
  position: relative;
  /* left; */
  width: 700px;
}

.el-divider {
  position: relative;
  width: 100%;
  height: 4px;
  left: 0%;
  background: #7dc4d3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.personal-infor {
  position: relative;
  left: 41px;
  /* top: 45px; */
  width: 1000px;
}

.note-title {
  position: relative;
  display: inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  margin-top: 20px;
  margin-left: 41px;
}
.addNotes-button {
  position: relative;
  width: 70px;
  height: 32px;
  left: 41px;
  top: 0px;

  font-family: Alatsi;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15%;
  text-align: center;
  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
.note1 {
  position: relative;
  width: 256px;
  height: 205px;
  left: 41px;
  top: 41px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.note2 {
  position: relative;
  width: 256px;
  height: 205px;
  left: 81px;
  top: 41px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.note3 {
  position: relative;
  width: 256px;
  height: 205px;
  left: 121px;
  top: 41px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.note4 {
  position: relative;
  width: 256px;
  height: 205px;
  left: 161px;
  top: 41px;
  text-align: left;
  background: #ededed;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>