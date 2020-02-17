<template>
  <div>
    <Button
      class="export-btn"
      style="border: none; appearance:none; margin-bottom: 5px;"
      @click="openMenuUpdatePageModal"
    >
      <Icon type="md-Add" size="25" />
    </Button>
    <Modal
      v-model="menuUpdatePageModalFlag"
      title="修改菜单"
      ok-text="保存"
      @on-ok="updateMenu()"
      :mask-closable="false"
      :closable="false"
      :loading="loadingFlag"
    >
      <Form ref="FormValidateRef" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="上级菜单" prop="parentMenuId">
          <Select v-model="formValidate.parentMenuId" :clearable="true" :disabled="true">
            <Option
              :value="formValidate.parentMenuId"
              :key="formValidate.parentMenuId"
            >{{ formValidate.parentMenuName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="菜单名称" prop="menuName">
          <Input v-model="formValidate.menuName" placeholder="请输入菜单名称" />
        </FormItem>
        <FormItem label="菜单类型" prop="menuType">
          <Input v-model="formValidate.menuTypeName" placeholder="请输入菜单名称" disabled />
        </FormItem>
        <FormItem label="菜单代码" prop="menuCode">
          <Input v-model="formValidate.menuCode" />
        </FormItem>
        <FormItem label="菜单URL" prop="menuUrl">
          <Input v-model="formValidate.menuUrl" placeholder="请输入菜单URL" />
        </FormItem>
        <FormItem label="菜单层级" prop="menuLevel">
          <Input v-model="formValidate.menuLevel" readonly disabled />
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
  updateSysMenuAPI
} from "@/api/userManager/menu.js";

export default {
  name: "MenuUpdatePageComponent",
  data() {
    return {
      menuUpdatePageModalFlag: false,
      loadingFlag: true,
      mid: null,
      formValidate: {
        parentMenuId: "",
        parentMenuName: null,
        menuName: null,
        menuType: null,
        menuTypeName: null,
        menuCode: null,
        menuUrl: null,
        menuLevel: null,
        remark: null
      },
      ruleValidate: {
        menuName: [
          {
            required: true,
            message: "菜单名称不能为空",
            trigger: "blur"
          }
        ],
        menuCode: [
          {
            required: true,
            message: "菜单代码不能为空",
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
     *打开修改菜单按钮弹窗
     */
    openMenuUpdatePageModal(mid) {
      this.menuUpdatePageModalFlag = true;
      this.mid = mid;

      // 查询菜单详情
      let params = new Object();
      params.mid = mid;
      selectSysMenuDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.formValidate.parentMenuId = res.data.data.parentId;
          this.formValidate.parentMenuName = res.data.data.parentMenuName;
          this.formValidate.menuName = res.data.data.menuName;
          this.formValidate.menuType = res.data.data.menuType;
          this.formValidate.menuTypeName =
            res.data.data.menuType == 1 ? "页面" : "按钮";
          this.formValidate.menuCode = res.data.data.menuCode;
          this.formValidate.menuUrl = res.data.data.menuUrl;
          this.formValidate.menuLevel = res.data.data.level;
          this.formValidate.remark = res.data.data.remark;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    },

    /**
     * 修改菜单
     */
    updateMenu() {
      this.$refs.FormValidateRef.validate(valid => {
        if (valid) {
          let params = new Object();
          params.mid = this.mid;
          params.menuName = this.formValidate.menuName;
          params.menuCode = this.formValidate.menuCode;
          params.menuUrl = this.formValidate.menuUrl;
          params.remark = this.formValidate.remark;
          updateSysMenuAPI(params).then(res => {
            if (res.data.code == 1) {
              this.$Notice.success({
                desc: res.data.msg
              });
              // 关闭模态窗
              this.menuUpdatePageModalFlag = false;

              // 调用全局监听事件刷新左侧菜单树列表并关闭页面详情和子菜单列表
              this.bus.$emit("flushMenuTreeComponentEvent");
              this.bus.$emit("hideMenuDetailPageComponentEvent");
              this.bus.$emit("hideMenuChildrenPageComponentEvent");
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











