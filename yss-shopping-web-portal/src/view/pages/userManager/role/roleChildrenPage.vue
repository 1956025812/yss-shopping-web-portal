<template>
  <div>
    <div v-if="showRoleChildrenPageFlag">
      <Card>
        <p slot="title">子角色列表</p>
        <!-- 子角色列表 -->
        <div>
          <Table border :columns="roleChildrenColumns" :data="roleChildrenListTableData"></Table>
        </div>
      </Card>
    </div>

    <!-- 修改角色详情弹窗组件 -->
    <RoleUpdatePageComponent ref="RoleUpdatePageComponentRef" style="display:none"></RoleUpdatePageComponent>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSysRoleListAPI } from "@/api/userManager/role.js";
import RoleUpdatePageComponent from "_p/userManager/role/roleUpdatePage.vue";

export default {
  name: "RoleChildrenPageComponent",
  components: { RoleUpdatePageComponent },
  data() {
    return {
      showRoleChildrenPageFlag: false,
      selectedNode: null,
      roleChildrenListTableData: [],
      roleChildrenColumns: [
        {
          type: "index",
          width: 40,
          align: "center"
        },
        {
          title: "名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "级别",
          key: "level",
          align: "center"
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          render: (h, params) => {
            let roleStateName = null;
            switch (params.row.state) {
              case 1:
                roleStateName = "启用";
                break;
              case 2:
                roleStateName = "禁用";
                break;
            }
            return h("span", roleStateName);
          }
        },
        {
          title: "备注",
          key: "remark",
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
                      this.$refs.RoleUpdatePageComponentRef.openRoleUpdatePageModal.bind(
                        this
                      )(params.row.rid);
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
     * 查看子角色列表
     */
    selectRoleChildrenList(node) {
      this.showRoleChildrenPageFlag = true;
      this.selectedNode = node;

      let params = new Object();
      params.parentId = node.rid;
      selectSysRoleListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.roleChildrenListTableData = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 监听全局事件hideRoleChildrenPageComponentEvent  隐藏子角色列表组件
    let _this = this;
    this.bus.$on("hideRoleChildrenPageComponentEvent", function(data) {
      _this.showRoleChildrenPageFlag = false;
    });
  }
};
</script>











