<template>
  <el-main>
    <el-button class="addMember-button" @click="dialogVisible = true"
      >Add member</el-button
    >

    <el-dialog :visible.sync="dialogVisible">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >Include all</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="checkedContacts"
        @change="handlecheckedContactsChange"
      >
        <el-checkbox
          v-for="contact in contacts"
          :label="contact"
          :key="contact"
          >{{ contact }}</el-checkbox
        >
      </el-checkbox-group>
    </el-dialog>
  </el-main>
</template>
<script>
const contactOptions = ["George", "Dorcey"];
export default {
  data() {
    return {
      dialogVisible: false,
      checkAll: false,
      checkedContacts: ["Shanghai", "Beijing"],
      contacts: contactOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedContacts = val ? contactOptions : [];
      this.isIndeterminate = false;
    },
    handlecheckedContactsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.contacts.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.contacts.length;
    },
  },
};
</script>


<style scoped>
.addMember-button {
  position: absolute;
  width: 180px;
  height: 52px;
  left: 636px;
  top: 439px;

  font-family: Alatsi;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 38px;
  text-align: center;

  color: #ffffff;

  background: #4f6585;
  border-radius: 5px;
}
</style>


