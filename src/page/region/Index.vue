<template>
  <div>
    <div style="position:absolute;top:20px;left:20px;width:300px;">
      <Card :bordered="false">
        <Button type="primary" :style="{'margin-bottom':'10px'}">
          <Icon type="plus"></Icon>
          新增</Button>
        <Tree :data="data" :render="renderContent"></Tree>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: "栖霞区",
          expand: true,
          children: [
            {
              title: "恒源路",
              expand: true,
              children: [
                {
                  title: "恒源路",
                  expand: true,
                  type: "crossing"
                },
                {
                  title: "恒光路",
                  expand: true,
                  type: "crossing"
                }
              ]
            },
            {
              title: "恒光路",
              expand: true
            }
          ]
        },
        {
          title: "child 1-2",
          expand: true,
          children: [
            {
              title: "leaf 1-2-1",
              expand: true
            },
            {
              title: "leaf 1-2-1",
              expand: true
            }
          ]
        },
        {
          title: "恒光路",
          expand: true
        }
      ],
      buttonProps: {
        type: "ghost",
        size: "small"
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
            data.type == "crossing"
              ? h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      title: "详细信息",
                      placement: "right"
                    }
                  },
                  [
                    h("Tag", data.title),
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
                          "纬度：118.12122"
                        ),
                        ,
                        h("div", "经度：33.12122")
                      ]
                    )
                  ]
                )
              : h("span", data.title)
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
            data.type !== "crossing"
              ? [
                  h("Button", {
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
              : ""
          )
        ]
      );
    },
    append(data) {
      const children = data.children || [];
      children.push({
        title: "appended node",
        expand: true
      });
      this.$set(data, "children", children);
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    }
  }
};
</script>
