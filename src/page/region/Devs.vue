<template>
    <Layout>
        <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
            <Breadcrumb :style="{display: 'inline-block'}">
                <BreadcrumbItem to="/region">区域管理</BreadcrumbItem>
                <BreadcrumbItem :to="'/region/'+id1">{{name1}}</BreadcrumbItem>
                <BreadcrumbItem :to="'/region/'+id1+'/'+id2">{{name2}}</BreadcrumbItem>
                <BreadcrumbItem>{{name3}}</BreadcrumbItem>
            </Breadcrumb>
        </Header>
        <Content :style="{padding: '20px'}">
            <Row :gutter="16">
                <i-col span="12" :style="{'margin-bottom':'10px'}">
                    <Card>
                        <div slot="title">信号机</div>
                        <div slot="extra">
                            <Tooltip content="新增信号机" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                                <a href="javascript:;">
                                    <Icon type="plus-round"></Icon>
                                </a>
                            </Tooltip>
                        </div>
                        <Table highlight-row :show-header="false" :columns="machine.columns" :data="machine.data" :loading="machine.loading" class="table-noborder"></Table>
                    </Card>
                </i-col>
                <i-col span="12" :style="{'margin-bottom':'10px'}">
                    <Card>
                        <div slot="title">备用电源</div>
                        <div slot="extra">
                            <Tooltip content="新增备用电源" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                                <a href="javascript:;">
                                    <Icon type="plus-round"></Icon>
                                </a>
                            </Tooltip>
                        </div>
                        <Table highlight-row :show-header="false" :columns="ups.columns" :data="ups.data" :loading="ups.loading" class="table-noborder"></Table>
                    </Card>
                </i-col>
            </Row>
            <Row :gutter="16">
                <i-col span="12" :style="{'margin-bottom':'10px'}">
                    <Card>
                        <div slot="title">车检服务器</div>
                        <div slot="extra">
                            <Tooltip content="新增车检服务器" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                                <a href="javascript:;">
                                    <Icon type="plus-round"></Icon>
                                </a>
                            </Tooltip>
                        </div>
                        <Table highlight-row :show-header="false" :columns="ipc.columns" :data="ipc.data" :loading="ipc.loading" class="table-noborder"></Table>
                    </Card>
                </i-col>
                <i-col span="12" :style="{'margin-bottom':'10px'}">
                    <Card>
                        <div slot="title">相机</div>
                        <div slot="extra">
                            <Tooltip content="新增相机" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                                <a href="javascript:;">
                                    <Icon type="plus-round"></Icon>
                                </a>
                            </Tooltip>
                        </div>
                        <Table highlight-row :show-header="false" :columns="camera.columns" :data="camera.data" :loading="camera.loading" class="table-noborder"></Table>
                    </Card>
                </i-col>
            </Row>
        </Content>
    </Layout>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      id1: this.$route.params.id1,
      id2: this.$route.params.id2,
      id3: this.$route.params.id3,
      name1: "",
      name2: "",
      name3: "",
      machine: {
        data: [],
        columns: [
          {
            title: "ip",
            key: "ip"
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
                        this.modifyData(params.row);
                      }
                    }
                  },
                  [h("a", "编辑")]
                ),
                h("em", { class: ["item-split"] }),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.removeData(params.row);
                      }
                    }
                  },
                  [h("a", "删除")]
                )
              ]);
            }
          }
        ],
        loading: false
      },
      ups: {
        data: [],
        columns: [
          {
            title: "ip",
            key: "ip"
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
                        this.modifyData(params.row);
                      }
                    }
                  },
                  [h("a", "编辑")]
                ),
                h("em", { class: ["item-split"] }),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.removeData(params.row);
                      }
                    }
                  },
                  [h("a", "删除")]
                )
              ]);
            }
          }
        ],
        loading: false
      },
      ipc: {
        data: [],
        columns: [
          {
            title: "ip",
            key: "ip"
          },
          {
            title: "别名",
            key: "name"
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
                        this.modifyData(params.row);
                      }
                    }
                  },
                  [h("a", "编辑")]
                ),
                h("em", { class: ["item-split"] }),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.removeData(params.row);
                      }
                    }
                  },
                  [h("a", "删除")]
                )
              ]);
            }
          }
        ],
        loading: false
      },
      camera: {
        data: [],
        type: { "1": "车流量视频", "2": "电子警察" },
        itemStyle: { "line-height": "20px" },
        columns: [
          {
            title: "ip",
            key: "ip"
          },
          {
            title: "type",
            key: "type",
            render: (h, params) => {
              let itemStyle = this.camera.itemStyle;
              return h("div", this.camera.type[params.row.type]);
            }
          },
          {
            title: "用户名",
            key: "username",
            render: (h, params) => {
              let itemStyle = this.camera.itemStyle;
              return h("div", [
                h("div", { style: itemStyle }, "用户名"),
                h("div", { style: itemStyle }, params.row.username)
              ]);
            }
          },
          {
            title: "密码",
            key: "password",
            render: (h, params) => {
              let itemStyle = this.camera.itemStyle;
              return h("div", [
                h("div", { style: itemStyle }, "密码"),
                h("div", { style: itemStyle }, params.row.password)
              ]);
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
                        this.modifyData(params.row);
                      }
                    }
                  },
                  [h("a", "编辑")]
                ),
                h("em", { class: ["item-split"] }),
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.removeData(params.row);
                      }
                    }
                  },
                  [h("a", "删除")]
                )
              ]);
            }
          }
        ],
        loading: false
      }
    };
  },
  methods: {
    // 请求数据
    fetchCrossing() {
      this.$store.dispatch("setCrossing");
    },
    // 过滤数据
    formatterCrossing(data) {
      data.forEach(item => {
        if (item.id == this.id1 && item.children) {
          this.name1 = item.name;
          item.children.forEach(item => {
            if (item.id == this.id2 && item.children) {
              this.name2 = item.name;
              item.children.forEach(item => {
                if (item.id == this.id3) {
                  this.data = item;
                  this.name3 = item.name;
                }
              });
            }
          });
        }
      });
    },
    // 请求设备信息
    fetchDevs() {
      this.machine.loading = true;
      this.ups.loading = true;
      this.ipc.loading = true;
      this.camera.loading = true;
      this.ajax("index/d_crossing/dataView", { id: this.id3 }).then(res => {
        if (res.status) {
          let data = res.data;
          console.log(data);
          this.machine.data = [data.machine];
          this.machine.loading = false;
          this.ups.data = [data.ups];
          this.ups.loading = false;
          this.ipc.data = data.ipc;
          this.ipc.loading = false;
          this.camera.data = data.camera;
          this.camera.loading = false;
        }
      });
    }
  },
  created() {
    if (!this.crossing.length) {
      this.fetchCrossing();
    } else {
      this.formatterCrossing(this.crossing);
    }
    this.fetchDevs();
  },
  computed: {
    crossing() {
      let data = this.$store.state.crossing;
      return data;
    }
  },
  watch: {
    crossing(data) {
      this.formatterCrossing(data);
    }
  }
};
</script>

<style>
</style>
