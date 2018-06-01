<template>
  <div style="display:inline-block">
    <Poptip placement="bottom-end" width="300" :style="{'padding':'0 10px'}">
      <Badge dot :style="{'margin':'0 14px'}">
        <Icon type="ios-bell" size="20"></Icon>
      </Badge>
      <div slot="content">
        <Tabs value="signal">
          <TabPane :label="label_machine" name="signal">
            <ul>
              <li v-for="item in data_machine" :key="item.id">{{item.name}}</li>
            </ul>
          </TabPane>
          <TabPane :label="label_ups" name="ups">
            <ul>
              <li v-for="item in data_ups" :key="item.id">{{item.name}}</li>
            </ul>
          </TabPane>
        </Tabs>
      </div>
    </Poptip>
  </div>
</template>

<script>
import { dataListRedis as dataListRedis_machine } from "@/api/d_machine_error";
import { dataListRedis as dataListRedis_ups } from "@/api/d_ups_error";
export default {
  data() {
    return {
      data_machine: [],
      data_ups: [],
      label_machine: h => {
        return h("div", [
          h("span", "信号机"),
          h("Badge", {
            props: {
              count: this.data_machine.length
            }
          })
        ]);
      },
      label_ups: h => {
        return h("div", [
          h("span", "备用电源"),
          h("Badge", {
            props: {
              count: this.data_ups.length
            }
          })
        ]);
      }
    };
  },
  methods: {
    loadData_machine() {
      dataListRedis_machine().then(res => {
        if (res.status) {
          this.data_machine = res.data;
        }
      });
    },
    loadData_ups() {
      dataListRedis_ups().then(res => {
        if (res.status) {
          this.data_ups = res.data;
        }
      });
    }
  },
  created() {
    this.loadData_machine();
    this.loadData_ups();
  }
};
</script>

<style scoped lang='less'>
.ivu-poptip {
  cursor: pointer;
  &:hover {
    background: #679ab1;
  }
}
</style>
