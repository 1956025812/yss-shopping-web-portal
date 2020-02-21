<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openRoleSavePageModal"
    >
      <Icon type="md-Add" size="25" />
    </Button>
    <Modal
      v-model="roleSavePageModalFlag"
      title="新增角色"
      ok-text="保存"
      @on-ok="saveRole()"
      :mask-closable="false"
      :closable="false"
      :loading="loadingFlag"
    >
      <Form ref="FormValidateRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级角色" prop="parentId">
          <Select v-model="formValidate.parentRoleId" placeholder="请选择上级角色,没有不填" :clearable="true">
            <Option
              v-for="eachRole in formValidate.parentRoleList"
              :value="eachRole.rid"
              :key="eachRole.rid"
            >{{ eachRole.roleName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="角色名称" prop="roleName">
          <Input v-model="formValidate.roleName" placeholder="请输入角色名称" />
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
  selectSysRoleListAPI,
  saveSysRoleAPI
} from "@/api/userManager/role.js";

export default {
  name: "RoleSavePageComponent",
  data() {
    return {
      roleSavePageModalFlag: false,
      loadingFlag: true,
      formValidate: {
        parentRoleList: [],
        parentRoleId: "",
        roleName: null,
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
     *打开新增角色按钮弹窗
     */
    openRoleSavePageModal() {
      this.roleSavePageModalFlag = true;
      this.$refs.FormValidateRef.resetFields();
      this.$options.methods.initParentRoleSelect.bind(this)();
    },

    /**
     * 初始化上级角色下拉框
     */
    initParentRoleSelect() {
      let params = new Object();
      selectSysRoleListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.formValidate.parentRoleList = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 新增角色按钮
     */
    saveRoleButton() {
      this.$refs.FormValidateRef.validate(valid => {
        if (valid) {
          let params = new Object();
          let parentRoleId = this.formValidate.parentRoleId;
          params.parentId = parentRoleId == "" ? 0 : parentRoleId;
          params.roleName = this.formValidate.roleName;
          params.remark = this.formValidate.remark;
          saveSysRoleAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
              // 关闭模态窗
              this.roleSavePageModalFlag = false;

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











