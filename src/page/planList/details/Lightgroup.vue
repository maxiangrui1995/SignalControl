<template>
  <div>
    <!-- <Alert show-icon closable :style="{width:'220px','margin':'0 auto'}">点击信号灯图标可进行编辑</Alert> -->
    <canvas ref="canvas" id="canvas" width="800" height="600" style="display:block;margin:0 auto"></canvas>

    <Modal v-model="modal" title="灯组编辑">
      <Form :model="formItem" :label-width="80">
        <!-- <FormItem label="是否启用">
          <Switch v-model="formItem.isenabled" disabled></Switch>
        </FormItem> -->
        <FormItem label="相位标题">
          <Row>
            <i-col span="11">
              <i-input v-model="formItem.title_old" readonly :style="{width:'100%'}"></i-input>
            </i-col>
            <i-col span="2" :style="{'text-align':'center'}">
              <Icon type="code"></Icon>
            </i-col>
            <i-col span="11">
              <Select v-model="formItem.title_new">
                <Option v-for="(item,key) in light_title" :key="key" :value="key">{{item}}</Option>
              </Select>
            </i-col>
          </Row>
        </FormItem>
        <FormItem label="相位灯型">
          <Select v-model="formItem.lightsharp">
            <Option v-for="(item,key) in lightsharp" :key="key" :value="key">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="目标类型">
          <Select v-model="formItem.target">
            <Option v-for="(item,key) in target" :key="key" :value="key">{{item}}</Option>
          </Select>
        </FormItem>
        <FormItem label="绿延伸">
          <InputNumber v-model="formItem.extendgreen" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="倒计时号牌">
          <InputNumber v-model="formItem.countdown_id" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最小绿">
          <InputNumber v-model="formItem.mingreen" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最大绿1">
          <InputNumber v-model="formItem.maxgreen1" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最大绿2">
          <InputNumber v-model="formItem.maxgreen2" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
        <FormItem label="最大绿3">
          <InputNumber v-model="formItem.maxgreen3" :max="255" :min="0" :style="{width:'100%'}"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modal = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="formOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import DRAW from "@/untils/signal";
import { dataList, updateAll } from "@/api/d_phaseinfo";
import { lightsharp, target, light_title } from "@/untils/params";
export default {
  name: "lightgroup",
  data() {
    return {
      id: this.$route.params.id,
      modal: false,
      modal_loading: false,
      formItem: {},
      lightsharp: lightsharp,
      target: target,
      light_title: light_title,
      data: []
    };
  },
  methods: {
    onClick(row) {
      /*  if (Object.keys(row).length) {
        this.formItem.isenabled = true;
      } */
      this.modal = true;
      this.formItem.id = row.id;
      this.formItem.plan_id = ~~row.plan_id;
      this.formItem.title = row.title;
      this.formItem.title_old = row.title;
      this.formItem.title_new = row.title;
      this.formItem.lightsharp = row.lightsharp;
      this.formItem.target = row.target;
      this.formItem.extendgreen = ~~row.extendgreen;
      this.formItem.countdown_id = ~~row.countdown_id;
      this.formItem.mingreen = ~~row.mingreen;
      this.formItem.maxgreen1 = ~~row.maxgreen1;
      this.formItem.maxgreen2 = ~~row.maxgreen2;
      this.formItem.maxgreen3 = ~~row.maxgreen3;
    },
    formOk() {
      this.modal_loading = true;
      let row = this.formItem;
      let arr = [];
      this.data.forEach(item => {
        arr.push({
          id: item.id,
          plan_id: item.plan_id,
          title: item.title,
          target: item.target,
          lightorder: item.lightorder,
          lightsharp: item.lightsharp,
          extendgreen: item.extendgreen,
          countdown_id: item.countdown_id,
          mingreen: item.mingreen,
          maxgreen1: item.maxgreen1,
          maxgreen2: item.maxgreen2,
          maxgreen3: item.maxgreen3,
          position: item.position,
          title_old: item.title_old,
          title_new: item.title_new
        });
      });
      arr.forEach(item => {
        if (item.title === row.title_new) {
          item.title = row.title_old;
        }
        if (item.id === row.id) {
          item = Object.assign(item, row);
          item.title = row.title_new;
        }
        item.serial_number = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item.title);
        delete item.title_old;
        delete item.title_new;
      });
      updateAll({
        plan_id: this.id,
        data: JSON.stringify(arr)
      }).then(res => {
        if (res.status) {
          this.$Message.success(res.message);
          this.modal = false;
          this.loadData();
        } else {
          this.$Message.error(res.message);
        }
        this.modal_loading = false;
      });
    },
    loadData() {
      // 传入路口数据
      let road_data = [
        {
          direction: "1",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "3",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "5",
          roadnum: "3",
          target: ["3", "2", "4"]
        },
        {
          direction: "7",
          roadnum: "3",
          target: ["3", "2", "4"]
        }
      ];
      dataList({
        plan_id: this.id,
        page: 1,
        rows: 20
      }).then(res => {
        if (res.status) {
          this.data = res.data.list;
          this.fn.draw({
            CROSSINGDATA: road_data,
            LIGHTDATA: res.data.list
          });
        }
      });
    }
  },
  created() {
    this.$nextTick(() => {
      let v = (this.fn = new DRAW(this.$refs.canvas));
      v.onClick = this.onClick;
      this.loadData();
    });
  },
  watch: {
    modal() {
      this.modal_loading = false;
    }
  }
};
</script>

<style>
</style>
