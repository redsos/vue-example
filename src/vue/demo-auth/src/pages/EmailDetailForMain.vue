<template>
  <b-modal :active.sync="row.active" :width="960" scroll="keep">
    <div class="box">
      <b-notification :type="row.data.status === 'SendOK' ? 'is-success' : 'is-danger'" :closable="false" has-icon>
        <b-field grouped group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">EID:</b-tag>
              <b-tag type="is-light">{{ row.data.eid }}</b-tag>
            </b-taglist>
            The email was sent {{row.data.status === 'SendOK' ? 'successfully' : 'failed'}} at {{row.data.date}}.
          </div>
        </b-field>

        {{row.data.status === 'SendOK' ? '' : 'Reason:' + row.data.reason}}
      </b-notification>
      <div class="content">
        <h1>{{ row.data.content.subject }}</h1>
        <b-field grouped group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-primary" size="is-medium">FROM:</b-tag>
              <b-tag type="is-light" size="is-medium">{{ row.data.content.from }}</b-tag>
            </b-taglist>
          </div>
        </b-field>
        <b-field grouped group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark" size="is-medium">TO:</b-tag>
              <b-tag type="is-light" size="is-medium">{{ row.data.content.to }}</b-tag>
            </b-taglist>
          </div>
          <div class="control" v-if="row.data.content.cc">
            <b-taglist attached>
              <b-tag type="is-dark" size="is-medium">CC:</b-tag>
              <b-tag type="is-light" size="is-medium">{{ row.data.content.cc }}</b-tag>
            </b-taglist>
          </div>
          <div class="control" v-if="row.data.content.bcc">
            <b-taglist attached>
              <b-tag type="is-dark" size="is-medium">BCC:</b-tag>
              <b-tag type="is-light" size="is-medium">{{ row.data.content.bcc }}</b-tag>
            </b-taglist>
          </div>
        </b-field>
      </div>
      <hr>
      <div class="content">
        <p v-if="row.data.content.text">{{ row.data.content.text }}</p>
        <p v-else>{{ row.data.content.html }}</p>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  }
}
</script>
