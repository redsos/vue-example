<template>
  <div class="column">

    <div class="columns">
      <div class="column is-2">
        <label>Start Date:</label>
      </div>
      <div class="column is-4">
        <b-datepicker v-model="startDate" :first-day-of-week="1" placeholder="Click to select...">
          <button class="button is-primary" @click="startDate = new Date()">
            <b-icon icon="calendar-today"></b-icon>
            <span>Today</span>
          </button>

          <button class="button is-danger" @click="startDate = null">
            <b-icon icon="close"></b-icon>
            <span>Clear</span>
          </button>
        </b-datepicker>
      </div>

      <div class="column is-2">
        <label>End Date:</label>
      </div>
      <div class="column is-4">
        <b-datepicker v-model="endDate" :first-day-of-week="1" placeholder="Click to select...">
          <button class="button is-primary" @click="endDate = new Date()">
            <b-icon icon="calendar-today"></b-icon>
            <span>Today</span>
          </button>

          <button class="button is-danger" @click="endDate = null">
            <b-icon icon="close"></b-icon>
            <span>Clear</span>
          </button>
        </b-datepicker>
      </div>

    </div>

    <div class="columns">
      <div class="column is-2">
        <label>Email Address:</label>
      </div>
      <div class="column is-4">
        <b-field>
          <b-input placeholder="condition: from: to: cc: bb:" type="search" icon="magnify">
          </b-input>
        </b-field>
      </div>
      <div class="column is-2">
      </div>
      <div class="column is-4">
        <a class="button is-primary">Confirm</a>
      </div>
    </div>

    <!-- table -->
    <b-collapse class="panel">
      <div class="panel-heading">
        <strong>Query Result</strong>
      </div>
    </b-collapse>
    <Table></Table>

  </div>
</template>

<script>
import Table from "@/pages/TableForAreaMain.vue";

export default {
  name: "ses-table",
  components: {
    Table
  },
  data() {
    return {
      startDate: new Date(),
      endDate: new Date()
    };
  }
};
</script>

<style scoped>
.columns label {
  line-height: 36px;
}
.column .button {
  margin-right: 2px;
}

.panel {
  margin-top: 40px;
}
</style>
