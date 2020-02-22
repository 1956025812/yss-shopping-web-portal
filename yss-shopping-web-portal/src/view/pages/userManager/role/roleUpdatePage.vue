<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openRoleUpdatePageModal"
    >
      <Icon type="md-Add" size="25" />
    </Button>
    <Modal
      v-model="roleUpdatePageModalFlag"
      title="修改角色"
      ok-text="保存"
      @on-ok="updateRole()"
      :mask-closable="false"
      :closable="false"
      :loading="loadingFlag"
    >
      <Form ref="FormValidateRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级角色" prop="parentRoleId">
          <Select v-model="formValidate.parentRoleId" :clearable="true" :disabled="true">
            <Option
              :value="formValidate.parentRoleId"
              :key="formValidate.parentRoleId"
            >{{ formValidate.parentRoleName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formValidate.roleName" placeholder="请输入角色名称" />
        </FormItem>
        <FormItem label="角色层级" prop="roleLevel">
          <Input v-model="formValidate.roleLevel" readonly disabled />
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入备注..."
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>


 
<script>
import { getToken } from "@/libs/util";
import {
  selectSysRoleDetailAPI,
  updateSysRoleAPI
} from "@/api/userManager/role.js";

export default {
  name: "RoleUpdatePageComponent",
  data() {
    return {
      roleUpdatePageModalFlag: false,
      loadingFlag: true,
      rid: null,
      formValidate: {
        parentRoleId: "",
        parentRoleName: null,
        roleName: null,
        roleLevel: null,
        remark: null
      },
      ruleValidate: {
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ],
        remark: [
          {
            type: "string",
            max: 200,
            message: "备注不能多于200个字",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    /**
     *打开修改角色按钮弹窗
     */
    openRoleUpdatePageModal(rid) {
      this.roleUpdatePageModalFlag = true;
      this.rid = rid;

      // 查询角色详情
      let params = new Object();
      params.rid = rid;
      selectSysRoleDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.formValidate.parentRoleId = res.data.data.parentId;
          this.formValidate.parentRoleName = res.data.data.parentRoleName;
          this.formValidate.roleName = res.data.data.roleName;
          this.formValidate.roleLevel = res.data.data.level;
          this.formValidate.remark = res.data.data.remark;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 修改角色
     */
    updateRole() {
      this.$refs.FormValidateRef.validate(valid => {
        if (valid) {
          let params = new Object();
          params.rid = this.rid;
          params.roleName = this.formValidate.roleName;
          params.remark = this.formValidate.remark;
          updateSysRoleAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
              // 关闭模态窗
              this.roleUpdatePageModalFlag = false;

              // 调用全局监听事件刷新左侧角色树列表并关闭角色详情和子角色列表
              this.bus.$emit("flushRoleTreeComponentEvent");
              this.bus.$emit("hideRoleDetailPageComponentEvent");
              this.bus.$emit("hideRoleChildrenPageComponentEvent");
            } else if (res.data.code == 0) {
              this.$Notice.error({
                desc: res.data.msg
              });
              this.loadingFlag = false;
              this.$nextTick(() => {
                this.loadingFlag = true;
              });
            }
          });
        } else {
          this.$Notice.error({
            desc: "内容不合法，请重新填写。"
          });
          this.loadingFlag = false;
          this.$nextTick(() => {
            this.loadingFlag = true;
          });
        }
      });
    }
  },

  created() {}
};
</script>











