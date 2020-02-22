<template>
  <div>
    <div v-if="roleDetailPageShowFlag">
      <Card :bordered="false" title="角色详情">
        <Form :label-width="80">
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="角色名称">
                <Input readonly v-model="roleName" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="角色状态">
                <Input readonly v-model="stateName" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="层级">
                <Input readonly v-model="level" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="上级">
                <Input readonly v-model="parentRoleName" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="描述">
              <Input
                type="textarea"
                :autosize="true"
                style="width: 100%"
                readonly
                v-model="remark"
              />
            </FormItem>
          </Row>
          <Row>
            <FormItem>
              <Button type="primary" style="margin-left: 8px">分配权限</Button>
              <Button type="primary" style="margin-left: 8px" @click="openUpdateRoleModal()">修改</Button>
              <Button type="primary" style="margin-left: 8px" @click="openDelRoleModal()">删除</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
    </div>

    <!-- 修改角色详情弹窗组件 -->
    <RoleUpdatePageComponent ref="RoleUpdatePageComponentRef" style="display:none"></RoleUpdatePageComponent>
  </div>
</template>


<script>
import { getToken } from "@/libs/util";
import {
  selectSysRoleDetailAPI,
  delSysRoleAPI
} from "@/api/userManager/role.js";
import RoleUpdatePageComponent from "_p/userManager/role/roleUpdatePage.vue";

export default {
  name: "RoleDetailPageComponent",
  components: { RoleUpdatePageComponent },
  data() {
    return {
      roleDetailPageShowFlag: false,
      selectedNode: null,
      roleName: null,
      stateName: null,
      level: null,
      parentRoleName: null,
      remark: null
    };
  },

  methods: {
    /**
     * 查询角色详情
     */
    selectRoleDetail(node) {
      this.roleDetailPageShowFlag = true;
      this.selectedNode = node;
      let params = new Object();
      params.rid = node.rid;
      selectSysRoleDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.roleName = res.data.data.roleName;
          let roleStateName = null;
          let roleState = res.data.data.state;
          if (roleState == 1) {
            roleStateName = "启用";
          } else if (roleState == 2) {
            roleStateName = "禁用";
          }
          this.stateName = roleStateName;
          this.level = res.data.data.level;
          this.parentRoleName = res.data.data.parentRoleName;
          this.remark = res.data.data.remark;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 打开修改角色弹窗
     */
    openUpdateRoleModal() {
      this.$refs.RoleUpdatePageComponentRef.openRoleUpdatePageModal.bind(this)(
        this.selectedNode.rid
      );
    },

    /**
     * 删除角色
     */
    openDelRoleModal() {
      this.$Modal.confirm({
        title: "删除角色",
        content: "确认要删除角色[" + this.selectedNode.title + "]么？",
        onOk: () => {
          let params = new Object();
          params.rid = this.selectedNode.rid;
          delSysroleAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });

              // 调用全局监听事件刷新左侧角色树列表并关闭页面详情和子角色列表
              this.bus.$emit("flushRoleTreeComponentEvent");
              this.bus.$emit("hideRoleDetailPageComponentEvent");
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
    // 监听全局事件hideRoleDetailPageComponentEvent  隐藏角色詳情组件
    let _this = this;
    this.bus.$on("hideRoleDetailPageComponentEvent", function(data) {
      _this.roleDetailPageShowFlag = false;
    });
  }
};
</script>
