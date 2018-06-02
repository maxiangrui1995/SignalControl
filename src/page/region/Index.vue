<template>
  <!-- <div style="height:100%"> -->
  <!-- <g-map /> -->
  <!-- <div style="position:absolute;top:20px;left:20px;width:400px;max-height:500px;overflow:auto" ref="tree"> -->
  <!-- <Card :bordered="false"> -->
  <div class="wrapper" style="position:absolute;top:0;right:0;bottom:0;left:0;overflow-y:auto;overflow-x:hidden;">
    <Button type="primary" @click="createData" :style="{'margin-bottom':'10px'}">
      <Icon type="plus"></Icon>
      新增</Button>
    <Tree :data="data" :render="renderContent"></Tree>

    <Modal v-model="modal" :title="modalTitle">
      <Form ref="form" :rules="formRules" :model="formItem" :label-width="80">
        <FormItem label="路口名称" prop="name">
          <Input v-model="formItem.name" placeholder="请输入新的路口名称..." />
        </FormItem>
        <FormItem label="路口类型">
          <Select v-model="formItem.direction">
            <Option value="1357">标准十字路口</Option>
          </Select>
        </FormItem>
        <FormItem label="纬度" prop="lng">
          <Input v-model="formItem.lng" placeholder="请输入新的纬度坐标..." />
        </FormItem>
        <FormItem label="经度" prop="lat">
          <Input v-model="formItem.lat" placeholder="请输入新的经度坐标..." />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>

  <!-- </Card> -->
  <!-- </div> -->

  <!-- </div> -->
</template>
<script>
// import GMap from "@/components/gmap";
import { dataList, dataAdd, dataDelete, dataUpdate } from "@/api/d_area";
import {
  dataAdd as dataAdd_crossing,
  dataDelete as dataDelete_crossing,
  dataUpdate as dataUpdate_crossing
} from "@/api/d_crossing";
import { d_crossing } from "@/untils/params";
export default {
  name: "region",
  // components: { GMap },
  data() {
    return {
      data: [],
      buttonProps: {
        type: "ghost",
        size: "small"
      },
      modal: false,
      modalTitle: "",
      modal_loading: false,
      formItem: {},
      formRules: {
        name: [
          {
            required: true,
            message: "请输入路口名称"
          }
        ],
        lat: [
          {
            required: true,
            message: "请输入纬度"
          }
        ],
        lng: [
          {
            required: true,
            message: "请输入经度"
          }
        ]
      }
    };
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: data.children ? "ios-folder-outline" : "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            data.direction !== undefined
              ? h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "详细信息",
                      placement: "top-start",
                      transfer: true
                    }
                  },
                  [
                    h("Tag", data.name),
                    h(
                      "div",
                      {
                        slot: "content"
                      },
                      [
                        h("img", {
                          style: {
                            width: "120px"
                          },
                          attrs: {
                            src: require("@/assets/crossing.jpg")
                          }
                        }),
                        h(
                          "div",
                          {
                            style: {
                              "margin-bottom": "6px"
                            }
                          },
                          "路口类型：十字路口"
                        ),
                        h(
                          "div",
                          {
                            style: {
                              "margin-bottom": "6px"
                            }
                          },
                          "纬度：" + data.lng
                        ),
                        ,
                        h("div", "经度：" + data.lat)
                      ]
                    )
                  ]
                )
              : h("span", data.name)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "edit"
                }),
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.modify(data);
                  }
                }
              }),
              data.direction === undefined
                ? h("Button", {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "ios-plus-empty"
                    }),
                    style: {
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.append(data);
                      }
                    }
                  })
                : h("Button", {
                    props: Object.assign({}, this.buttonProps, {
                      icon: "information"
                    }),
                    style: {
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.dev(data);
                      }
                    }
                  }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "ios-minus-empty"
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              })
            ]
          )
        ]
      );
    },
    modify(data) {
      if (data.pid === "0") {
        // 区域
        let newValue = data.name;
        let self = this;
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: newValue,
                autofocus: true,
                placeholder: "请输入新的区域名称..."
              },
              on: {
                input: val => {
                  newValue = val;
                }
              }
            });
          },
          loading: true,
          onOk() {
            dataUpdate({
              id: data.id,
              name: newValue
            }).then(res => {
              if (res.status) {
                this.$Message.success("添加成功");
              } else {
                this.$Message.error("添加失败");
              }
              this.$Modal.remove();
              self.loadData();
            });
          }
        });
      } else if (data.direction == undefined) {
        // 道路.
        let newValue = data.name;
        let self = this;
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: newValue,
                autofocus: true,
                placeholder: "请输入新的道路名称..."
              },
              on: {
                input: val => {
                  newValue = val;
                }
              }
            });
          },
          loading: true,
          onOk() {
            dataUpdate({
              id: data.id,
              name: newValue
            }).then(res => {
              if (res.status) {
                this.$Message.success("添加成功");
              } else {
                this.$Message.error("添加失败");
              }
              this.$Modal.remove();
              self.loadData();
            });
          }
        });
      } else {
        this.modal = true;
        this.modalTitle = "路口信息编辑";
        this.formItem.name = data.name;
        this.formItem.lat = data.lat;
        this.formItem.lng = data.lng;
        this.formItem.direction = data.direction;
        this.formItem.road_data = data.road_data;
        this.formItem.id = data.id;
        this.formItem._type = "modify";
      }
    },
    append(data) {
      if (data.pid === "0") {
        // 新增道路
        let newValue = "";
        let self = this;
        this.$Modal.confirm({
          render: h => {
            return h("Input", {
              props: {
                value: newValue,
                autofocus: true,
                placeholder: "请输入新的道路名称..."
              },
              on: {
                input: val => {
                  newValue = val;
                }
              }
            });
          },
          loading: true,
          onOk() {
            dataAdd({
              pid: data.id,
              name: newValue
            }).then(res => {
              if (res.status) {
                this.$Message.success("添加成功");
              } else {
                this.$Message.error("添加失败");
              }
              this.$Modal.remove();
              self.loadData();
            });
          }
        });
      } else if (data.direction == undefined) {
        // 新增路口
        this.formItem = {
          name: "",
          lat: "",
          lng: "",
          direction: "1357",
          area_id: data.id
        };
        this.modal = true;
        this.modalTitle = "路口信息新增";
      }
    },
    remove(root, node, data) {
      if (data.pid === "0") {
        // 区域
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            dataDelete({ id: data.id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
              this.loadData();
            });
          }
        });
      } else if (data.direction == undefined) {
        // 道路.
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            dataDelete({ id: data.id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
              this.loadData();
            });
          }
        });
      } else {
        this.$Modal.confirm({
          content: "<p>确定删除？删除后无法恢复！</p>",
          loading: true,
          onOk: () => {
            dataDelete_crossing({ id: data.id }).then(res => {
              if (res.status) {
                this.$Message.success("删除成功");
              } else {
                this.$Message.error("删除失败");
              }
              this.$Modal.remove();
              this.loadData();
            });
          }
        });
      }
    },
    loadData() {
      dataList().then(res => {
        this.data = res.data;
      });
    },
    createData() {
      let newValue = "";
      let self = this;
      this.$Modal.confirm({
        render: h => {
          return h("Input", {
            props: {
              value: newValue,
              autofocus: true,
              placeholder: "请输入新的区域名称..."
            },
            on: {
              input: val => {
                newValue = val;
              }
            }
          });
        },
        loading: true,
        onOk() {
          dataAdd({
            pid: 0,
            name: newValue
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
            } else {
              this.$Message.error("添加失败");
            }
            self.$Modal.remove();
            self.loadData();
          });
        }
      });
    },
    formOk() {
      this.modal_loading = true;
      this.$refs["form"].validate(valid => {
        if (!valid) {
          this.modal_loading = false;
          return;
        }

        if (this.formItem._type === "modify") {
          delete this.formItem._type;
          dataUpdate_crossing({
            ...this.formItem
          }).then(res => {
            if (res.status) {
              this.$Message.success("修改成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error("修改失败");
            }
            this.modal_loading = false;
          });
        } else {
          dataAdd_crossing({
            ...this.formItem,
            road_data: d_crossing.road_data
          }).then(res => {
            if (res.status) {
              this.$Message.success("添加成功");
              this.modal = false;
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.modal_loading = false;
          });
        }
      });
    },
    dev(data) {
      this.$router.push({
        path: "/region/" + data.id
      });
    }
  },
  created() {
    this.loadData();
    this.$nextTick(() => {
      // Scrollbar.init(this.$refs.tree);
    });
  }
};
</script>
