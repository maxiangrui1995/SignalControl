<template>
    <div class="wrapper">
        <Breadcrumb :style="{'margin-bottom':'20px'}">
            <BreadcrumbItem to="/region">上一级</BreadcrumbItem>
            <BreadcrumbItem>{{name}}</BreadcrumbItem>
        </Breadcrumb>
        <Button type="primary" icon="plus" @click="createData_signal" :style="{'margin-bottom':'20px'}">信号机</Button>
        <Button type="primary" icon="plus" @click="createData_ups" :style="{'margin-bottom':'20px'}">备用电源</Button>
        <Button type="primary" icon="plus" @click="createData_ipc" :style="{'margin-bottom':'20px'}">车检器</Button>
        <Button type="primary" icon="plus" @click="createData_camera" :style="{'margin-bottom':'20px'}">相机</Button>
        <Table :columns="columns_signal" :data="data_signal" :loading="loading" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns_ups" :data="data_ups" :loading="loading" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns_ipc" :data="data_ipc" :loading="loading" :style="{'margin-bottom':'20px'}"></Table>
        <Table :columns="columns_camera" :data="data_camera" :loading="loading"></Table>

        <Modal v-model="modal_signal" :title="modal_signal_title">
            <Form :model="formItem_signal" :label-width="100">
                <FormItem label="信号机IP">
                    <Input v-model="formItem_signal.ip" placeholder="请输入新的信号机IP..." />
                </FormItem>
                <FormItem label="信号机端口号">
                    <Input v-model="formItem_signal.port" placeholder="请输入新的信号机端口号..." />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modal_signal = false">取消</Button>
                <Button type="primary" :loading="modal_signal_loading" @click="formOk_signal">确定</Button>
            </div>
        </Modal>

        <Modal v-model="modal_ups" :title="modal_ups_title">
            <Form :model="formItem_ups" :label-width="100">
                <FormItem label="备用电源IP">
                    <Input v-model="formItem_ups.ip" placeholder="请输入新的备用电源IP..." />
                </FormItem>
                <FormItem label="备用端口号">
                    <Input v-model="formItem_ups.port" placeholder="请输入新的备用电源端口号..." />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modal_ups = false">取消</Button>
                <Button type="primary" :loading="modal_ups_loading" @click="formOk_ups">确定</Button>
            </div>
        </Modal>

        <Modal v-model="modal_ipc" :title="modal_ipc_title">
            <Form :model="formItem_ipc" :label-width="100">
                <FormItem label="车检器IP">
                    <Input v-model="formItem_ipc.ip" placeholder="请输入新的车检器IP..." />
                </FormItem>
                <FormItem label="车检器别名">
                    <Input v-model="formItem_ipc.name" placeholder="请输入新的车检器别名..." />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modal_ipc = false">取消</Button>
                <Button type="primary" :loading="modal_ipc_loading" @click="formOk_ipc">确定</Button>
            </div>
        </Modal>

        <Modal v-model="modal_camera" :title="modal_camera_title">
            <Form :model="formItem_camera" :label-width="100">
                <FormItem label="相机IP">
                    <Input v-model="formItem_camera.ip" placeholder="请输入新的相机IP..." />
                </FormItem>
                <FormItem label="相机端口号">
                    <Input v-model="formItem_camera.port" placeholder="请输入新的端口号..." />
                </FormItem>
                <FormItem label="相机类型">
                    <Select v-model="formItem_camera.type">
                        <Option v-for="(item,key) in camera_type" :key="key" :value="''+key">{{item}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名">
                    <Input v-model="formItem_camera.username" placeholder="请输入用户名..." />
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="formItem_camera.password" placeholder="请输入密码..." />
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modal_camera = false">取消</Button>
                <Button type="primary" :loading="modal_camera_loading" @click="formOk_camera">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { dataView } from "@/api/d_crossing";
import {
  dataUpdate as dataUpdate_signal,
  dataAdd as dataAdd_signal,
  dataDelete as dataDelete_signal
} from "@/api/d_machine";
import {
  dataUpdate as dataUpdate_ups,
  dataAdd as dataAdd_ups,
  dataDelete as dataDelete_ups
} from "@/api/d_ups";
import {
  dataUpdate as dataUpdate_ipc,
  dataAdd as dataAdd_ipc,
  dataDelete as dataDelete_ipc
} from "@/api/f_ipc";
import {
  dataUpdate as dataUpdate_camera,
  dataAdd as dataAdd_camera,
  dataDelete as dataDelete_camera
} from "@/api/f_camera";
import { camera_type } from "@/untils/params";
export default {
  name: "region-dev",
  data() {
    return {
      id: this.$route.params.id,
      name: "",
      camera_type: camera_type,
      columns_signal: [
        {
          title: "信号机IP",
          key: "ip"
        },
        {
          title: "端口号",
          key: "port"
        },
        {
          title: "操作",
          key: "active",
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
                    click: event => {
                      event.stopPropagation();
                      this.modifyData_signal(params.row);
                    }
                  }
                },
                [h("a", "修改")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData_signal(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      loading: false,
      data_signal: [],
      columns_ups: [
        {
          title: "备用电源IP",
          key: "ip"
        },
        {
          title: "端口号",
          key: "port"
        },
        {
          title: "操作",
          key: "active",
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
                    click: event => {
                      event.stopPropagation();
                      this.modifyData_ups(params.row);
                    }
                  }
                },
                [h("a", "修改")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData_ups(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      data_ups: [],
      columns_ipc: [
        {
          title: "车检器IP",
          key: "ip"
        },
        {
          title: "车检器名称",
          key: "name"
        },
        {
          title: "操作",
          key: "active",
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
                    click: event => {
                      event.stopPropagation();
                      this.modifyData_ipc(params.row);
                    }
                  }
                },
                [h("a", "修改")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData_ipc(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      data_ipc: [],
      columns_camera: [
        {
          title: "相机IP",
          key: "ip"
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            return h("div", camera_type[params.row.type]);
          }
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "操作",
          key: "active",
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
                    click: event => {
                      event.stopPropagation();
                      this.modifyData_camera(params.row);
                    }
                  }
                },
                [h("a", "修改")]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: event => {
                      event.stopPropagation();
                      this.removeData_camera(params.row);
                    }
                  }
                },
                [h("a", "删除")]
              )
            ]);
          }
        }
      ],
      data_camera: [],
      modal_signal: false,
      modal_signal_title: "",
      formItem_signal: {},
      modal_signal_loading: false,
      modal_ups: false,
      modal_ups_title: "",
      formItem_ups: {},
      modal_ups_loading: false,
      modal_ipc: false,
      modal_ipc_title: "",
      formItem_ipc: {},
      modal_ipc_loading: false,
      modal_camera: false,
      modal_camera_title: "",
      formItem_camera: {},
      modal_camera_loading: false
    };
  },
  methods: {
    loadData() {
      this.loading = true;
      dataView({
        id: this.id
      }).then(res => {
        if (res.status === "1") {
          let d = res.data;
          this.data_camera = d.camera ? d.camera : [];
          this.data_ipc = d.ipc ? d.ipc : [];
          this.data_signal = d.machine ? [d.machine] : [];
          this.data_ups = d.ups ? [d.ups] : [];
          this.name = d.crossing.name;
          this.loading = false;
        }
      });
    },
    createData_signal() {
      if (this.data_signal.length) {
        this.$Modal.warning({
          content: "已存在信号机"
        });
      } else {
        this.modal_signal = true;
        this.modal_signal_title = "信号机新增";
        this.formItem_signal = {
          ip: "",
          port: 4001,
          crossing_id: this.id
        };
      }
    },
    createData_ups() {
      if (this.data_signal.length) {
        this.$Modal.warning({
          content: "已存在备用电源"
        });
      } else {
        this.modal_signal = true;
        this.modal_signal_title = "备用电源新增";
        this.formItem_signal = {
          ip: "",
          port: 5000,
          crossing_id: this.id
        };
      }
    },
    createData_ipc() {
      this.modal_ipc = true;
      this.modal_ipc_title = "车检器新增";
      this.formItem_ipc = {
        ip: "",
        name: "",
        crossing_id: this.id
      };
    },
    createData_camera() {
      this.modal_camera = true;
      this.modal_camera_title = "相机新增";
      this.formItem_camera = {
        ip: "",
        port: 2555,
        crossing_id: this.id,
        type: "",
        username: "",
        password: "",
        manufacturer: 0
      };
    },
    modifyData_signal(row) {
      this.modal_signal = true;
      this.modal_signal_title = "信号机编辑";
      this.formItem_signal = {
        ip: row.ip,
        port: row.port,
        id: row.id,
        crossing_id: row.crossing_id
      };
    },
    modifyData_ups(row) {
      this.modal_ups = true;
      this.modal_ups_title = "备用电源编辑";
      this.formItem_ups = {
        ip: row.ip,
        port: row.port,
        id: row.id,
        crossing_id: row.crossing_id
      };
    },
    modifyData_ipc(row) {
      this.modal_ipc = true;
      this.modal_ipc_title = "车检器编辑";
      this.formItem_ipc = {
        ip: row.ip,
        name: row.name,
        id: row.id,
        crossing_id: row.crossing_id
      };
    },
    modifyData_camera(row) {
      this.modal_camera = true;
      this.modal_camera_title = "相机编辑";
      this.formItem_camera = {
        ip: row.ip,
        port: row.port,
        id: row.id,
        crossing_id: row.crossing_id,
        type: row.type,
        username: row.username,
        password: row.password,
        manufacturer: 0
      };
    },
    removeData_signal(row) {
      this.$Modal.confirm({
        content: "<p>确定删除此信号机？</p>",
        loading: true,
        onOk: () => {
          dataDelete_signal({ id: row.id }).then(res => {
            if (res.status === "1") {
              this.$Message.success(res.message);
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
          });
        }
      });
    },
    removeData_ups(row) {
      this.$Modal.confirm({
        content: "<p>确定删除此备用电源？</p>",
        loading: true,
        onOk: () => {
          dataDelete_ups({ id: row.id }).then(res => {
            if (res.status === "1") {
              this.$Message.success(res.message);
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
          });
        }
      });
    },
    removeData_ipc(row) {
      this.$Modal.confirm({
        content: "<p>确定删除此车检器？</p>",
        loading: true,
        onOk: () => {
          dataDelete_ipc({ id: row.id }).then(res => {
            if (res.status === "1") {
              this.$Message.success(res.message);
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
          });
        }
      });
    },
    removeData_camera(row) {
      this.$Modal.confirm({
        content: "<p>确定删除此相机？</p>",
        loading: true,
        onOk: () => {
          dataDelete_camera({ id: row.id }).then(res => {
            if (res.status === "1") {
              this.$Message.success(res.message);
              this.loadData();
            } else {
              this.$Message.error(res.message);
            }
            this.$Modal.remove();
          });
        }
      });
    },
    formOk_signal() {
      this.modal_signal_loading = true;
      if (this.formItem_signal.id) {
        dataUpdate_signal(this.formItem_signal).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_signal = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_signal_loading = false;
        });
      } else {
        dataAdd_signal(this.formItem_signal).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_signal = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_signal_loading = false;
        });
      }
    },
    formOk_ups() {
      this.modal_ups_loading = true;
      if (this.formItem_ups.id) {
        dataUpdate_ups(this.formItem_ups).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_ups = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_ups_loading = false;
        });
      } else {
        dataAdd_ups(this.formItem_ups).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_ups = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_ups_loading = false;
        });
      }
    },
    formOk_ipc() {
      this.modal_ipc_loading = true;
      if (this.formItem_ipc.id) {
        dataUpdate_ipc(this.formItem_ipc).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_ipc = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_ipc_loading = false;
        });
      } else {
        dataAdd_ipc(this.formItem_ipc).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_ipc = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_ipc_loading = false;
        });
      }
    },
    formOk_camera() {
      this.modal_camera_loading = true;
      if (this.formItem_camera.id) {
        dataUpdate_camera(this.formItem_camera).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_camera = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_camera_loading = false;
        });
      } else {
        dataAdd_camera(this.formItem_camera).then(res => {
          if (res.status === "1") {
            this.$Message.success(res.message);
            this.loadData();
            this.modal_camera = false;
          } else {
            this.$Message.error(res.message);
          }
          this.modal_camera_loading = false;
        });
      }
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style>
</style>
