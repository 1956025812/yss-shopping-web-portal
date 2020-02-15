<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuButtonSavePageModal"
    >
      <Icon type="md-Add" size="25" />
    </Button>
    <Modal
      v-model="menuButtonSavePageModalFlag"
      title="新增按钮"
      ok-text="保存"
      @on-ok="saveMenuButton()"
      :mask-closable="false"
      :closable="false"
      :loading="loadingFlag"
    >
      <Form ref="FormValidateRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="所属页面" prop="parentId">
          <Select v-model="formValidate.parentMenuId" :clearable="true" :disabled="true">
            <Option
              :value="formValidate.parentMenuId"
              :key="formValidate.parentMenuId"
            >{{ formValidate.parentMenuName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="按钮名称" prop="menuName">
          <Input v-model="formValidate.menuName" placeholder="请输入页面名称" />
        </FormItem>
        <FormItem label="按钮代码" prop="menuCode">
          <Input v-model="formValidate.menuCode" />
        </FormItem>
        <FormItem label="按钮URL" prop="menuUrl">
          <Input v-model="formValidate.menuUrl" placeholder="请输入页面URL" />
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
  selectSysMenuDetailAPI,
  saveSysMenuAPI
} from "@/api/userManager/menu.js";

export default {
  name: "MenuButtonSavePageComponent",
  data() {
    return {
      menuButtonSavePageModalFlag: false,
      loadingFlag: true,
      selectedNode: null,
      formValidate: {
        parentMenuId: "",
        parentMenuName: null,
        menuName: null,
        menuCode: null,
        menuUrl: null,
        remark: null
      },
      ruleValidate: {
        menuName: [
          {
            required: true,
            message: "按钮名称不能为空",
            trigger: "blur"
          }
        ],
        menuUrl: [
          {
            required: true,
            message: "按钮连接不能为空",
            trigger: "blur"
          }
        ],
        menuCode: [
          {
            required: true,
            message: "按钮代码不能为空",
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
     *打开新增菜单按钮弹窗
     */
    openMenuButtonSavePageModal(node) {
      this.menuButtonSavePageModalFlag = true;
      this.selectedNode = node;
      this.$refs.FormValidateRef.resetFields();
      this.formValidate.parentMenuId = node.mid;
      this.formValidate.parentMenuName = node.title;
    },

    /**
     * 新增菜单按钮
     */
    saveMenuButton() {
      this.$refs.FormValidateRef.validate(valid => {
        if (valid) {
          let params = new Object();
          params.parentId = this.selectedNode.mid;
          params.menuType = 2;
          params.menuCode = this.formValidate.menuCode;
          params.menuName = this.formValidate.menuName;
          params.menuUrl = this.formValidate.menuUrl;
          params.remark = this.formValidate.remark;
          saveSysMenuAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
              // 关闭模态窗
              this.menuButtonSavePageModalFlag = false;

              // 刷新子菜单列表
              this.$parent.selectMenuChildrenList(this.selectedNode);
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











