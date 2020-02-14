<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuPageSavePageModal"
    >
      <Icon type="md-Add" size="25" />
    </Button>
    <Modal
      v-model="menuPageSavePageModalFlag"
      title="新增页面"
      ok-text="保存"
      @on-ok="saveMenuPage()"
      :mask-closable="false"
      :closable="false"
      :loading="loadingFlag"
    >
      <Form ref="FormValidateRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级页面" prop="parentMenuId">
          <Select v-model="formValidate.parentMenuId" placeholder="请选择上级页面,没有不填" :clearable="true">
            <Option
              v-for="eachMenu in formValidate.parentMenuList"
              :value="eachMenu.menuCode"
              :key="eachMenu.menuCode"
            >{{ eachMenu.menuName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="页面名称" prop="menuName">
          <Input v-model="formValidate.menuName" placeholder="请输入页面名称" />
        </FormItem>
        <FormItem label="页面代码" prop="menuCode">
          <Input v-model="formValidate.menuCode" placeholder="请输入页面代码" />
        </FormItem>
        <FormItem label="页面URL" prop="menuUrl">
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
  selectSysMenuListAPI,
  saveSysMenuAPI
} from "@/api/userManager/menu.js";

export default {
  name: "MenuPageSavePageComponent",
  data() {
    return {
      menuPageSavePageModalFlag: false,
      loadingFlag: true,
      formValidate: {
        parentMenuList: [],
        parentMenuId: "",
        menuName: "",
        menuCode: "",
        menuUrl: "",
        remark: ""
      },
      ruleValidate: {
        menuName: [
          {
            required: true,
            message: "页面名称不能为空",
            trigger: "blur"
          }
        ],
        menuCode: [
          {
            required: true,
            message: "页面代码不能为空",
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
     *打开新增菜单页面弹窗
     */
    openMenuPageSavePageModal() {
      this.menuPageSavePageModalFlag = true;
      this.$refs.FormValidateRef.resetFields();
      this.$options.methods.initParentMenuSelect.bind(this)();
    },

    /**
     * 初始化上级菜单页面下拉框
     */
    initParentMenuSelect() {
      let params = new Object();
      params.type = 1;
      selectSysMenuListAPI(params).then(res => {
        if (res.data.code == 1) {
          this.formValidate.parentMenuList = res.data.data;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 新增菜单页面
     */
    saveMenuPage() {
      this.$refs.FormValidateRef.validate(valid => {
        if (valid) {
          let params = new Object();
          let parentMenuId = this.formValidate.parentMenuId;
          params.parentId = 0; // TODO
          params.menuType = 1;
          params.menuCode = this.formValidate.menuCode;
          params.menuName = this.formValidate.menuName;
          params.menuUrl = this.formValidate.menuUrl;
          params.remark = this.formValidate.remark;
          console.log(JSON.stringify(params));
          saveSysMenuAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
            } else if (res.data.code == 0) {
              this.$Notice.error({
                // TODO
                desc: res.data.msg
              });
            }
          });
        } else {
          // TODO
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











