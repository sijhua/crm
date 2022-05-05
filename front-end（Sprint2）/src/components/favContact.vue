<template>
  <div class="contact">
    <el-button class="contact-button" @click="dialogFormVisible = true"
      >add contact</el-button
    >

    <el-dialog title="Add contact" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="Title:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: 'title can not be null',
            trigger: 'blur',
          }"
        >
          <el-select v-model="form.title" placeholder="Please select a title">
            <el-option label="Mr" value="Mr"></el-option>
            <el-option label="Ms" value="Ms"></el-option>
            <el-option label="Mrs" value="Mrs"></el-option>
            <el-option label="Doc" value="Doc"></el-option>
            <el-option label="Capt" value="Capt"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="Name:"
          :label-width="formLabelWidth"
          :rules="{
            required: true,
            message: 'tags can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="form.name" auto-complete="False"> </el-input>
        </el-form-item>

        <el-form-item
          v-for="(phoneNumber, index) in form.phoneNumbers"
          :label="'Phone Number ' + index + '   +61'"
          :key="phoneNumber.key"
          :prop="'phoneNumbers.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'phone Number can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="phoneNumber.value"></el-input>
          <el-button @click.prevent="removePhoneNumber(phoneNumber)"
            >Delete</el-button
          >
          <el-button @click="addPhoneNumber">New Phone Number</el-button>
        </el-form-item>

        <el-form-item
          v-for="(email, index) in form.emails"
          :label="'Email ' + index"
          :key="email.key"
          :prop="'emails.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'email can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="email.value"></el-input>
          <el-button @click.prevent="removeEmail(email)">Delete</el-button>
          <el-button @click="addEmail">New email</el-button>
        </el-form-item>

        <el-form-item
          v-for="(address, index) in form.addresses"
          :label="'Address ' + index"
          :key="address.key"
          :prop="'addresses.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'address can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="address.value"></el-input>
          <el-button @click.prevent="removeAddress(address)">Delete</el-button>
          <el-button @click="addAddress">New address</el-button>
        </el-form-item>

        <el-form-item
          v-for="(company, index) in form.companys"
          :label="'Company ' + index"
          :key="company.key"
          :prop="'companys.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'company can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="company.value"></el-input>
          <el-button @click.prevent="removeCompany(company)">Delete</el-button>
          <el-button @click="addCompany">New company</el-button>
        </el-form-item>

        <el-form-item label="Job Title:" :label-width="formLabelWidth">
          <el-input v-model="form.jobTitle" auto-complete="False"> </el-input>
        </el-form-item>

        <el-form-item
          v-for="(website, index) in form.websites"
          :label="'Website ' + index"
          :key="website.key"
          :prop="'websites.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'website can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="website.value"></el-input>
          <el-button @click.prevent="removeWebsite(website)">Delete</el-button>
          <el-button @click="addWebsite">New website</el-button>
        </el-form-item>

        <el-form-item
          v-for="(socialMediaProfile, index) in form.socialMediaProfiles"
          :label="'Social Media Profile ' + index"
          :key="socialMediaProfile.key"
          :prop="'socialMediaProfiles.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'socialMediaProfile can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="socialMediaProfile.value"></el-input>
          <el-button
            @click.prevent="removeSocialMediaProfile(socialMediaProfile)"
            >Delete</el-button
          >
          <el-button @click="addSocialMediaProfile"
            >New socialMediaProfile</el-button
          >
        </el-form-item>

        <el-form-item
          v-for="(impDates, index) in form.impDates"
          :label="'Imp Dates ' + index"
          :key="impDates.key"
          :prop="'impDates.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'impDates can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="impDates.value"></el-input>
          <el-button @click.prevent="removeImpDates(impDates)"
            >Delete</el-button
          >
          <el-button @click="addImpDates">New impDates</el-button>
        </el-form-item>

        <el-form-item
          v-for="(tags, index) in form.tags"
          :label="'Tags ' + index"
          :key="tags.key"
          :prop="'tags.' + index + '.value'"
          :label-width="formLabelWidth"
          :rules="{
            required: false,
            message: 'tags can not be null',
            trigger: 'blur',
          }"
        >
          <el-input v-model="tags.value"></el-input>
          <el-button @click.prevent="removeTags(tags)">Delete</el-button>
          <el-button @click="addTags">New tags</el-button>
        </el-form-item>

        <el-form-item label="Profile Photo" :label-width="formLabelWidth">
          <el-button type="text" @click="dialogFormVisible = true"
            >upload...</el-button
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  name: "addContact",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    dialogFormVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        console.log(val);
        this.$emit("update:visible", val); // openCardDialog改变的时候通知父组件
      },
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      search: "",
      select: "",
      form: {
        title: "",
        name: "",

        jobTitle: "",

        profilePhote: "",
        phoneNumbers: [
          {
            key: 1,
            value: "",
          },
        ],
        emails: [
          {
            key: 1,
            value: "",
          },
        ],
        addresses: [
          {
            key: 1,
            value: "",
          },
        ],
        companys: [
          {
            key: 1,
            value: "",
          },
        ],
        websites: [
          {
            key: 1,
            value: "",
          },
        ],
        socialMediaProfiles: [
          {
            key: 1,
            value: "",
          },
        ],
        impDates: [
          {
            key: 1,
            value: "",
          },
        ],
        tags: [
          {
            key: 1,
            value: "",
          },
        ],
      },
      formLabelWidth: "150px",
    };
  },
  methods: {
    removePhoneNumber(item) {
      var index = this.form.phoneNumbers.indexOf(item);
      if (index !== -1) {
        this.form.phoneNumbers.splice(index, 1);
      }
    },
    addPhoneNumber() {
      this.form.phoneNumbers.push({
        key: Date.now(),
        value: "",
      });
    },

    removeEmail(item) {
      var index = this.form.emails.indexOf(item);
      if (index !== -1) {
        this.form.emails.splice(index, 1);
      }
    },
    addEmail() {
      this.form.emails.push({
        key: Date.now(),
        value: "",
      });
    },

    removeAddress(item) {
      var index = this.form.addresses.indexOf(item);
      if (index !== -1) {
        this.form.addresses.splice(index, 1);
      }
    },
    addAddress() {
      this.form.addresses.push({
        key: Date.now(),
        value: "",
      });
    },

    removeCompany(item) {
      var index = this.form.companys.indexOf(item);
      if (index !== -1) {
        this.form.companys.splice(index, 1);
      }
    },
    addCompany() {
      this.form.companys.push({
        key: Date.now(),
        value: "",
      });
    },

    removeWebsite(item) {
      var index = this.form.websites.indexOf(item);
      if (index !== -1) {
        this.form.websites.splice(index, 1);
      }
    },
    addWebsite() {
      this.form.websites.push({
        key: Date.now(),
        value: "",
      });
    },

    removeSocialMediaProfile(item) {
      var index = this.form.socialMediaProfiles.indexOf(item);
      if (index !== -1) {
        this.form.socialMediaProfiles.splice(index, 1);
      }
    },
    addSocialMediaProfile() {
      this.form.socialMediaProfiles.push({
        key: Date.now(),
        value: "",
      });
    },

    removeImpDates(item) {
      var index = this.form.impDates.indexOf(item);
      if (index !== -1) {
        this.form.impDates.splice(index, 1);
      }
    },
    addImpDates() {
      this.form.impDates.push({
        key: Date.now(),
        value: "",
      });
    },

    removeTags(item) {
      var index = this.form.tags.indexOf(item);
      if (index !== -1) {
        this.form.tags.splice(index, 1);
      }
    },
    addTags() {
      this.form.tags.push({
        key: Date.now(),
        value: "",
      });
    },
  },
};
</script>


<style scoped>
.contact-title{
  display:inline-block;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  margin-top:30px;
  margin-left:3%;
}
.contact{
  display:inline-block;
}
.contact-button {
  position: relative;
  display:inline-block;
  width: 150px;
  height: 45px;
  left: 480px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
.el-select .el-input {
  width: 110px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

</style>