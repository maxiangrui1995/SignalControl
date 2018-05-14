<template>
  <div class="dh-table-wrapper">
    <div class="dh-table-wrapper-header">
      <Breadcrumb>
        <BreadcrumbItem to="/regionalManagement">区域管理</BreadcrumbItem>
        <BreadcrumbItem :to="breadcrumUrl">{{name}}</BreadcrumbItem>
        <BreadcrumbItem :to="breadcrumUrl2">{{name2}}</BreadcrumbItem>
        <BreadcrumbItem>{{name3}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <y-signal :data="signalData"></y-signal>
    <y-ups :data="upsData"></y-ups>
    <y-ipc :data="ipcData"></y-ipc>
    <y-camera :data="cameraData"></y-camera>
  </div>
</template>

<script>
import YSignal from "./Details/Signal";
import YUps from "./Details/Ups";
import YCamera from "./Details/Camera";
import YIpc from "./Details/Ipc";
export default {
  components: {
    YSignal,
    YUps,
    YCamera,
    YIpc
  },
  data() {
    return {
      id: this.$route.params.id,
      pid: this.$route.params.pid,
      crossing_id: this.$route.params.crossing_id,
      name: "",
      name2: "",
      name3: "",
      breadcrumUrl: "/regionalManagement/" + this.$route.params.id,
      breadcrumUrl2:
        "/regionalManagement/" +
        this.$route.params.id +
        "/" +
        this.$route.params.pid,
      signalData: [{ ip: "192.168.0.8", port: 4001, id: 1 }],
      upsData: [{ ip: "192.168.0.88", port: 5000, id: 1 }],
      cameraData: [
        {
          ip: "192.168.0.1",
          port: 2555,
          type: "2",
          username: "admin",
          password: "123",
          id: 1
        },
        {
          ip: "192.168.0.2",
          port: 2555,
          type: "2",
          username: "admin",
          password: "123",
          id: 2
        },
        {
          ip: "192.168.0.3",
          port: 2555,
          type: "2",
          username: "admin",
          password: "123",
          id: 3
        },
        {
          ip: "192.168.0.4",
          port: 2555,
          type: "2",
          username: "admin",
          password: "123",
          id: 4
        }
      ],
      ipcData: [
        {
          ip: "192.168.0.1",
          name: "192.168.0.1",
          id: 1
        },
        {
          ip: "192.168.0.2",
          name: "192.168.0.1",
          id: 2
        },
        {
          ip: "192.168.0.3",
          name: "192.168.0.1",
          id: 3
        },
        {
          ip: "192.168.0.4",
          name: "192.168.0.1",
          id: 4
        }
      ]
    };
  },
  methods: { createData() {} },
  computed: {
    regionData() {
      let data = this.$store.state.regionModule.data;
      let region = [];
      if (data) {
        data.forEach(element => {
          if (element.id === this.id) {
            this.name = element.name;
            if (element.children) {
              element.children.forEach(element => {
                if (element.id === this.pid) {
                  this.name2 = element.name;
                  if (element.children) {
                    element.children.forEach(element => {
                      if (element.id === this.crossing_id) {
                        this.name3 = element.name;
                        region = element.children;
                      }
                    });
                  }
                }
              });
            }
          }
        });
      }
      return region;
    },
    loading() {
      return this.$store.state.regionModule.loading;
    }
  },
  created() {
    if (!this.$store.state.regionModule.data.length) {
      this.$store.dispatch("regionModule/SET_DATA");
    }
  },
  watch: {
    regionData() {}
  }
};
</script>

<style>

</style>
