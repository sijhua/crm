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
export default {
  data() {
    return {
      dialogVisible: false,
      checkAll: false,
      contactOptions : ["George", "Dorcey"],
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

</style>


