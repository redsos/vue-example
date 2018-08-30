<template>
  <div class="column">

    <b-collapse class="panel first-panel">
      <div class="panel-heading">
        <strong>Query Condition</strong>
      </div>
    </b-collapse>

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
          <b-input v-model="matchEmail" placeholder="pattern: [from|to:email]" type="search" icon="">
          </b-input>
        </b-field>
      </div>
      <div class="column is-2">
      </div>
      <div class="column is-4">
        <button class="button is-primary" @click="conditionQuery">
          <span class="icon is-small">
            <b-icon icon="magnify"></b-icon>
          </span>
          <span>Query</span>
        </button>
      </div>
    </div>

    <b-collapse class="panel">
      <div class="panel-heading">
        <strong>Query Result</strong>
      </div>
    </b-collapse>

    <b-table :data="data" :paginated="isPaginated" :per-page="perPage" :current-page.sync="currentPage" :pagination-simple="isPaginationSimple" :backend-pagination="isBackendPagination" :total="total" @page-change="pageChange">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="status" label="Status" sortable>
          <b-tag :type="props.row.status === 'SendOK' ? 'is-success' : 'is-danger'">
            {{ props.row.status === 'SendOK' ? 'SUCCESS' : 'ERROR'}}
          </b-tag>
        </b-table-column>

        <b-table-column field="date" label="Date" sortable>
          <b-tag type="is-white" size="is-medium">{{ props.row.date }}</b-tag>
        </b-table-column>

        <b-table-column field="detail" label="Detail">
          <b-field grouped group-multiline>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-dark">EID</b-tag>
                <b-tag type="is-light">{{ props.row.eid }}</b-tag>
              </b-taglist>
            </div>
          </b-field>

          <b-field grouped group-multiline>
            <div class="control">
              <b-taglist attached>
                <b-tag type="is-light">From:</b-tag>
                <b-tag type="is-white">{{ props.row.content.from }}</b-tag>
              </b-taglist>
            </div>

            <div class="control">
              <b-taglist attached>
                <b-tag type="is-light">To:</b-tag>
                <b-tag type="is-white">{{ props.row.content.to.join(',') }}</b-tag>
              </b-taglist>
            </div>
          </b-field>
        </b-table-column>

        <b-table-column field="more" label="More" centered>
          <button class="button is-info is-outlined" @click="emailDetail(props.row.id, $event)">More Info</button>
        </b-table-column>
      </template>
    </b-table>

    <EmailDetail :row="emailCardModal"></EmailDetail>

  </div>
</template>

<script>
import EmailDetail from '@/pages/EmailDetailForMain.vue'

export default {
  data () {
    return {
      // startDate: new Date(),
      startDate: null,
      endDate: null,
      matchEmail: '',
      // detail
      emailCardModal: {
        active: false,
        data: {
          status: null,
          content: {
            subject: null
          }
        }
      },
      // table
      data: [],
      isPaginated: true,
      isPaginationSimple: false,
      isBackendPagination: true,
      total: 0,
      lastIDs: {},
      currentPage: 1,
      perPage: 10,
      handleResult: function (response) {
        let result = {}
        if (response.status !== 200) {
          result.err = 'failed to query, status: ' + response.status
          return result
        }
        if (response.data === undefined) {
          result.err = 'failed to query data.'
          return result
        }
        if (response.data.code !== 0) {
          result.err = 'failed to query, code: ' + response.date.code
          return result
        }

        let emails = response.data.emails || []
        let vemails = []
        let baseNum = (this.currentPage - 1) * this.perPage + 1
        for (let [index, item] of emails.entries()) {
          vemails.push({
            id: baseNum + index,
            eid: item.eID,
            reid: item.reID,
            status: item.status,
            date: item.sendDate,
            reason: item.reason,
            content: {
              from: item.email.from,
              to: item.email.to,
              cc: item.email.cc,
              bcc: item.email.bcc,
              subject: item.email.subject,
              html: item.email.html,
              text: item.email.text
            }
          })
        }

        result.data = vemails
        result.total = response.data.total
        result.lastID = response.data.lastID
        return result
      }
    }
  },
  created () {
    let url = this.axios.default.baseURL + '/api/email?limit=' + this.perPage
    this.axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + this.$auth.getToken(), 
        } 
      }).then(response => {
      let result = this.handleResult(response)
      if (result.err) {
        this.$dialog.alert({
          title: 'Error',
          message: result.err,
          type: 'is-danger',
          hasIcon: true,
          icon: 'times-circle',
          iconPack: 'fa'
        })
        return
      }

      this.data = result.data
      this.total = result.total
      this.lastIDs[this.currentPage + 1] = result.lastID
    })
  },
  methods: {
    pageChange: function (message, event) {
      let condition = this.conditionGet(event)
      if (!condition) {
        return
      }

      let offset = (message - 1) * this.perPage
      if (offset) {
        condition += '&offset=' + offset
      }
      let lastID = this.lastIDs[message] || ''
      if (offset) {
        condition += '&lastID=' + lastID
      }

      let url = this.axios.default.baseURL + '/api/email?' + condition
      this.axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + this.$auth.getToken(), 
        } 
      }).then(response => {
        let result = this.handleResult(response)
        if (result.err) {
          this.$dialog.alert({
            title: 'Error',
            message: result.err,
            type: 'is-danger',
            hasIcon: true,
            icon: 'times-circle',
            iconPack: 'fa'
          })
          return
        }

        this.data = result.data
        this.total = result.total
        this.currentPage = message
        this.lastIDs[this.currentPage + 1] = result.lastID
      })
    },
    conditionQuery: function (event) {
      this.pageChange(1, event)
    },
    conditionGet: function (event) {
      let condition = 'limit=' + this.perPage
      if (this.startDate) {
        condition += '&startDate=' + this.startDate.getTime() / 1000
      }
      if (this.endDate) {
        condition +=
          '&endDate=' + (this.endDate.getTime() / 1000 + 24 * 3600 - 1)
      }
      if (this.matchEmail) {
        let result = {}
        let allPattern = this.matchEmail.split(' ')
        for (let item of allPattern) {
          let emailArr = item.split(':')
          if (emailArr.length > 1) {
            result[emailArr[0]] = emailArr[1]
          } else {
            result.to = emailArr[0]
          }
        }

        if (result.from) {
          if (!this.validEmail(result.from)) {
            this.$dialog.alert({
              title: 'Error',
              message: ' email address [' + result.from + '] is incorrect',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
            return
          }
          condition += '&from=' + result.from
        }
        if (result.to) {
          if (!this.validEmail(result.to)) {
            this.$dialog.alert({
              title: 'Error',
              message: ' email address [' + result.to + '] is incorrect',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
            return
          }
          condition += '&to=' + result.to
        }
        if (result.cc) {
          if (!this.validEmail(result.cc)) {
            this.$dialog.alert({
              title: 'Error',
              message: ' email address [' + result.cc + '] is incorrect',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
            return
          }
          condition += '&cc=' + result.cc
        }
        if (result.bcc) {
          if (!this.validEmail(result.bcc)) {
            this.$dialog.alert({
              title: 'Error',
              message: ' email address [' + result.bcc + '] is incorrect',
              type: 'is-danger',
              hasIcon: true,
              icon: 'times-circle',
              iconPack: 'fa'
            })
            return
          }
          condition += '&bcc=' + result.bcc
        }
      }

      return condition
    },
    emailDetail: function (id, event) {
      let baseNum = (this.currentPage - 1) * this.perPage + 1
      let idx = id - baseNum
      let row = this.data[idx]

      this.emailCardModal.data = row
      this.emailCardModal.active = true
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    }
  },
  components: {
    EmailDetail
  }
}
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

.first-panel {
  margin-top: 0px;
}

.table td,
.table th {
  vertical-align: middle;
}
</style>
