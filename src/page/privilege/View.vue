<template>
  <div style="position:absolute;top:20px;left:20px;width:500px;">
    <Card :padding="10">
      <p v-if="!data.length">暂无数据</p>
      <Tabs v-if="data.length">
        <TabPane v-for="item in data" :key="item.sch_id" :label="item.sch_name" :name="item.sch_id">
          <div class="ivu-article">
            <blockquote>
              <p>绑定警车：{{item.boundPlate}}</p>
            </blockquote>
          </div>
          <Table :columns="columns" :data="item.children" :showHeader="false" :loading="loading" size="small" :height="120"></Table>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { planList } from "@/api/d_secret_service_plan";
export default {
  data() {
    return {
      data: [],
      columns: [
        {
          type: "index",
          width: 30,
          align: "center"
        },
        {
          title: "name",
          key: "name",
          render: (h, params) => {
            let row = params.row;
            return h(
              "Poptip",
              {
                props: {
                  trigger: "hover",
                  title: "详细信息",
                  placement: "right",
                  transfer: true
                }
              },
              [
                h("Tag", row.name),
                h(
                  "div",
                  {
                    slot: "content"
                  },
                  [
                    h(
                      "div",
                      {
                        style: {
                          "margin-bottom": "6px"
                        }
                      },
                      "信号机：" + row.name
                    ),
                    h(
                      "div",
                      {
                        style: {
                          "margin-bottom": "6px"
                        }
                      },
                      "触发距离：" + row.distance
                    ),
                    h(
                      "div",
                      {
                        style: {
                          "margin-bottom": "6px"
                        }
                      },
                      "延时关闭：" + row.delay
                    )
                  ]
                )
              ]
            );
          }
        },
        {
          title: "current_distance",
          key: "current_distance"
        },
        {
          title: "count_down",
          key: "count_down"
        },
        {
          title: "is_open",
          key: "is_open",
          render: (h, params) => {
            let row = params.row;
            let obj = {
              open_faild: "自动开启失败",
              close_faild: "自动关闭失败",
              true: "已自动开启",
              false: "未开启"
            };
            return h("div", obj[row.is_open]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.pathToDetails(params.row.id);
                    }
                  }
                },
                [h("a", "开启")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeData(params.row.id);
                    }
                  }
                },
                [h("a", "关闭")]
              )
            ]);
          }
        }
      ],
      loading: false,
      markers: {}
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      planList({
        status: "1"
      }).then(res => {
        if (res.status) {
          this.data = res.data.list;
          this.loading = false;

          this.loadMarker();
        }
      });
    },
    loadMarker() {
      this.data.forEach(item => {
        item.children.forEach(item => {
          if (!this.markers[item.id]) {
            let position = new google.maps.LatLng(item.lat, item.lng);
            let marker = (this.markers[item.id] = new google.maps.Marker({
              position: position,
              icon: "/static/images/gcrossing.png",
              title: item.name,
              id: item.id,
              map: this.gmap
            }));
          }
        });
      });
    }
  },
  computed: {
    gmap() {
      return this.$store.state.gmap;
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
