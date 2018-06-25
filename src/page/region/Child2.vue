<template>
  <Layout>
    <Header :style="{background: '#fff', padding: '0 20px', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
      <Breadcrumb :style="{display: 'inline-block'}">
        <BreadcrumbItem to="/region">区域管理</BreadcrumbItem>
        <BreadcrumbItem :to="'/region/'+id1">{{name1}}</BreadcrumbItem>
        <BreadcrumbItem>{{name2}}</BreadcrumbItem>
      </Breadcrumb>
      <div style="float:right;">
        <Button type="primary">
          <Icon type="plus" :style="{marginRight:'10px'}"></Icon>新增
        </Button>
        <i-input icon="ios-search" placeholder="请输入名称进行检索" style="width: 200px"></i-input>
      </div>
    </Header>
    <Content :style="{padding: '20px'}">
      <Row :gutter="16">
        <i-col :xs="24" :sm="12" :md="6" :lg="4" v-for="item in data" :key="item.id" :style="{'margin-bottom':'10px'}">
          <Card>
            <div slot="title">
              {{item.name}}
            </div>
            <div slot="extra">
              <Tooltip content="在地图上查看" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                <a href="javascript:;" @click="viewCrossingInMap(item)">
                  <Icon type="map"></Icon>
                </a>
              </Tooltip>
              <Tooltip content="编辑" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                <a href="javascript:;">
                  <Icon type="compose"></Icon>
                </a>
              </Tooltip>
              <Tooltip content="删除" transfer :style="{ position: 'relative', top: '-2px', marginRight: '5px', cursor: 'pointer'}">
                <a href="javascript:;">
                  <Icon type="ios-trash-outline"></Icon>
                </a>
              </Tooltip>
              <Tooltip content="绑定设备" transfer :style="{ position: 'relative', top: '-2px', cursor: 'pointer'}">
                <a href="javascript:;" @click="bindDevs(item)">
                  <Icon type="archive"></Icon>
                </a>
              </Tooltip>
            </div>
            <div class="image-list">
              <div v-if="!item.uploading">
                <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="" style="width:100%;display:block">
              </div>
              <div v-else>
                <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
                <Progress :percent="25" hide-info></Progress>
              </div>
              <div class="image-list-cover">
                <div class="image-list-cover-wrapper">
                  <Tooltip content="查看大图" transfer>
                    <Icon type="ios-eye-outline" :size="26" @click="handleView(item)"></Icon>
                  </Tooltip>
                  <Tooltip content="重新上传图片" transfer>
                    <Upload action="//jsonplaceholder.typicode.com/posts/" ref="upload" :show-upload-list="false" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :on-format-error="handleFormatError" :before-upload="handleBeforeUpload">
                      <Icon type="ios-cloud-upload" :size="22"></Icon>
                    </Upload>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
        </i-col>
      </Row>
    </Content>

    <Modal title="路口图片" v-model="visible">
      <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" style="width: 100%;display:block">
    </Modal>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      id1: this.$route.params.id1,
      id2: this.$route.params.id2,
      name1: "",
      name2: "",
      visible: false,
      loading: false
    };
  },
  methods: {
    // 请求数据
    fetchCrossing() {
      this.loading = true;
      this.$store.dispatch("setCrossing");
    },
    // 过滤数据
    formatterCrossing(data) {
      data.forEach(item => {
        if (item.id == this.id1 && item.children) {
          this.name1 = item.name;
          item.children.forEach(item => {
            if (item.id == this.id2 && item.children) {
              this.data = item.children;
              this.name2 = item.name;
            }
          });
        }
      });
      this.loading = false;
    },
    // 绑定设备详情
    bindDevs(row) {
      this.$router.push({
        path: "/region/" + this.id1 + "/" + this.id2 + "/" + row.id + "/devs"
      });
    },
    // 在地图上查看路口
    viewCrossingInMap(row) {
      this.$router.push({
        path: "/region/" + this.id1 + "/" + this.id2 + "/" + row.id + "/map"
      });
    },
    handleView() {
      this.visible = true;
    },
    handleSuccess(res, file) {
      file.url =
        "https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar";
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleBeforeUpload() {
      return true;
    }
  },
  created() {
    if (!this.crossing.length) {
      this.fetchCrossing();
    } else {
      this.formatterCrossing(this.crossing);
    }
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

<style lang='less' scoped>
.image-list {
  position: relative;
  &-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    i {
      color: #fff;
      margin: 0 10px;
      cursor: pointer;
    }
    i:hover {
      color: #2d8cf0;
    }
  }
  &-cover-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover &-cover {
    display: block;
  }
}
</style>
