<template>
  <div>
    <div v-if="showMenuChildrenPageFlag">
      <Card>
        <p slot="title">子菜单列表</p>
        <Button slot="extra" type="primary" @click="openAddMenuModal()">新增</Button>

        <!-- 子菜单列表 -->
        <div>
          <Table border :columns="menuChildrenColumns" :data="menuChildrenListTableData"></Table>
        </div>
      </Card>
    </div>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI } from "@/api/userManager/menu.js";

export default {
  name: "MenuChildrenPageComponent",
  components: {},
  data() {
    return {
      showMenuChildrenPageFlag: false,
      node: null,
      menuChildrenListTableData: [],
      menuChildrenColumns: [
        {
          type: "index",
          width: 40,
          align: "center"
        },
        {
          title: "名称",
          key: "menuName",
          align: "center"
        },
        {
          title: "代码",
          key: "menuCode",
          align: "center"
        },
        {
          title: "类型",
          key: "menuTypeName",
          align: "center",
          render: (h, params) => {
            let tempMenuTypeName = null;
            switch (params.row.menuType) {
              case 1:
                tempMenuTypeName = "页面";
                break;
              case 2:
                tempMenuTypeName = "按钮";
                break;
            }
            return h("span", tempMenuTypeName);
          }
        },
        {
          title: "URL",
          key: "menuUrl",
          align: "center"
        },
        {
          title: "级别",
          key: "level",
          align: "center"
        },
        // TODO 菜单这个不需要启用禁用
        // {
        //   title: "状态",
        //   key: "menuStateName",
        //   align: "center",
        //   render: (h, params) => {
        //     let tempMenuStateName = null;
        //     switch (params.row.state) {
        //       case 1:
        //         tempMenuStateName = "启用";
        //         break;
        //       case 2:
        //         tempMenuStateName = "禁用";
        //         break;
        //     }
        //     return h("span", tempMenuStateName);
        //   }
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },

  methods: {
    /**
     * 查看子菜单列表
     */
    selectMenuChildrenList(node) {
      this.showMenuChildrenPageFlag = true;

      let params = new Object();
      params.parmentId = node.mid;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.menuChildrenListTableData = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 监听全局事件hideMenuChildrenPageComponentEvent  隐藏子菜单列表组件
    let _this = this;
    this.bus.$on("hideMenuChildrenPageComponentEvent", function(data) {
      _this.showMenuChildrenPageFlag = false;
    });
  }
};
</script>











