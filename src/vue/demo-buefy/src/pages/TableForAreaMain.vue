<template>
  <section>

    <b-table :data="data" :paginated="isPaginated" :per-page="perPage" :current-page.sync="currentPage" :pagination-simple="isPaginationSimple" :default-sort-direction="defaultSortDirection" default-sort="user.first_name">

      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="email.status" label="Status" sortable>
          <b-tag :type="props.row.email.status === 'SendOK' ? 'is-success' : 'is-danger'">
            {{ props.row.email.status === 'SendOK' ? 'success' : 'error'}}
          </b-tag>
        </b-table-column>

        <b-table-column field="email.detail" label="Detail">
          <div>
            <b-tag type="is-light">EID:</b-tag>
            <b-tag type="is-white">{{ props.row.email.eid }}</b-tag>
            <b-tag type="is-light">Date:</b-tag>
            <b-tag type="is-white">{{ props.row.date }}</b-tag>
          </div>
          <div>
            <b-tag type="is-light">From:</b-tag>
            <b-tag type="is-white">{{ props.row.from }}</b-tag>
            <b-tag type="is-light">To:</b-tag>
            <b-tag type="is-white">{{ props.row.to }}</b-tag>
          </div>
        </b-table-column>

        <b-table-column field="more" label="More" centered>
          <a class="button is-info is-outlined">More Info</a>
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
const data = [
  {
    id: 1,
    email: { status: "SendOK", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-10-15 13:43:27",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  },
  {
    id: 2,
    email: { status: "SendErr", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-12-15 06:00:53",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  },
  {
    id: 3,
    email: { status: "SendOK", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-04-26 06:26:28",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  },
  {
    id: 4,
    email: { status: "SendOK", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-04-10 10:28:46",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  },
  {
    id: 5,
    email: { status: "SendOK", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-12-06 14:38:38",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  },
  {
    id: 6,
    email: { status: "SendOK", eid: "de52feac-556c-4189-b363-46a5e23a9c19" },
    date: "2016-05-24 08:58:12",
    from: "no-reply@test.com",
    to: "gunsluo@gmail.com"
  }
];

export default {
  data() {
    return {
      data,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5
    };
  }
};
</script>

<style scoped>
.table td, .table th {vertical-align: middle; }
</style>
