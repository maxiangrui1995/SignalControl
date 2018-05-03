<template>
    <div>
        <Button type="primary" icon="plus" :style="{'margin-bottom':'10px'}">新增</Button>
        <Table :columns="columns" :data="data" :loading="loading"></Table>
        <div style="text-align:right; margin-top:10px;">
            <Page :total="total" :current="page" :page-size="rows" show-elevator @on-change="pageChange"></Page>
        </div>
    </div>
</template>

<script>
import { getCharacteristicPlan } from "@/api";
import expandRow from "./Plan-temp";
export default {
  components: { expandRow },
  data() {
    return {
      loading: true,
      page: 1,
      rows: 10,
      total: 0,
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "方案",
          key: "patternid",
          render: (h, params) => {
            return h("div", ~~params.row.patternid + 1);
          }
        },
        {
          title: "步数",
          key: "step"
        },
        {
          title: "周期",
          key: "period"
        }
      ],
      data: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          job: "Data engineer",
          interest: "badminton",
          birthday: "1991-05-14",
          book: "Steve Jobs",
          movie: "The Prestige",
          music: "I Cry"
        },
        {
          name: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park",
          job: "Data Scientist",
          interest: "volleyball",
          birthday: "1989-03-18",
          book: "My Struggle",
          movie: "Roman Holiday",
          music: "My Heart Will Go On"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          job: "Data Product Manager",
          interest: "tennis",
          birthday: "1992-01-31",
          book: "Win",
          movie: "Jobs",
          music: "Don’t Cry"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          job: "Data Analyst",
          interest: "snooker",
          birthday: "1988-7-25",
          book: "A Dream in Red Mansions",
          movie: "A Chinese Ghost Story",
          music: "actor"
        }
      ]
    };
  },
  methods: {
    getData() {
      this.loading = true;
      getCharacteristicPlan({
        plan_id: this.$route.params.id,
        page: this.page,
        rows: this.rows
      }).then(res => {
        console.log(res.data);
        let data = res.data;

        this.loading = false;
        this.data = data.list;
        this.total = ~~data.total;
      });
    },
    pageChange(page) {
      this.page = page;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style>

</style>
