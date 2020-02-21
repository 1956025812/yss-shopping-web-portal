<template>
  <div>
    <div v-if="showMenuChildrenPageFlag">
      <Card>
        <p slot="title">子菜单列表</p>
        <Button
          slot="extra"
          type="primary"
          @click="openSaveMenuButtonModal()"
          :disabled="openSaveMenuButtonDisableFlag"
        >新增按钮</Button>
        <!-- 子菜单列表 -->
        <div>
          <Table border :columns="menuChildrenColumns" :data="menuChildrenListTableData"></Table>
        </div>
      </Card>
    </div>

    <!-- 新增子菜单按钮弹窗组件 -->
    <MenuButtonSavePageComponent ref="MenuButtonSavePageComponentRef" style="display: none"></MenuButtonSavePageComponent>
    <!-- 修改菜单详情弹窗组件 -->
    <MenuUpdatePageComponent ref="MenuUpdatePageComponentRef" style="display: none"></MenuUpdatePageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysMenuListAPI, delSysMenuAPI } from "@/api/userManager/menu.js";
import MenuButtonSavePageComponent from "_p/userManager/menu/menuButtonSavePage.vue";
import MenuUpdatePageComponent from "_p/userManager/menu/menuUpdatePage.vue";

export default {
  name: "MenuChildrenPageComponent",
  components: {
    MenuButtonSavePageComponent,
    MenuUpdatePageComponent
  },
  data() {
    return {
      showMenuChildrenPageFlag: false,
      openSaveMenuButtonDisableFlag: false,
      selectedNode: null,
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
                    click: () => {
                      this.$refs.MenuUpdatePageComponentRef.openMenuUpdatePageModal.bind(
                        this
                      )(params.row.mid);
                    }
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
                    click: () => {
                      this.openDelSysMenuModal.bind(this)(params.row);
                    }
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
      this.openSaveMenuButtonDisableFlag = false;
      this.selectedNode = node;

      let params = new Object();
      params.parentId = node.mid;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.menuChildrenListTableData = res.data.data;

          // 如果子菜单不为空并且有页面类型的子菜单时禁用新增按钮按钮
          for (let i = 0; i < this.menuChildrenListTableData.length; i++) {
            if (this.menuChildrenListTableData[i].menuType == 1) {
              this.openSaveMenuButtonDisableFlag = true;
              break;
            }
          }
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 打开新增菜单按钮弹窗组件
     */
    openSaveMenuButtonModal() {
      this.$refs.MenuButtonSavePageComponentRef.openMenuButtonSavePageModal(
        this.selectedNode
      );
    },

    /**
     * 删除菜单
     */
    openDelSysMenuModal(row) {
      this.$Modal.confirm({
        title: "删除菜单",
        content: "确认要删除菜单[" + row.menuName + "]么？",
        onOk: () => {
          let params = new Object();
          params.mid = row.mid;
          delSysMenuAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });

              // 调用全局监听事件刷新左侧菜单树列表并关闭页面详情和子菜单列表
              this.bus.$emit("flushMenuTreeComponentEvent");
              this.bus.$emit("hideMenuDetailPageComponentEvent");
              this.bus.$emit("hideMenuChildrenPageComponentEvent");
            } else if (res.data.code == 0) {
              this.$Notice.error({
                desc: res.data.msg
              });
            }
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











