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
        <FormItem label="上级页面" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="页面名称" prop="menuName">
          <Input v-model="formValidate.menuName" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="页面代码" prop="menuCode">
          <Input v-model="formValidate.menuCode" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="备注" prop="remark">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>


 
<script>
import { getToken } from "@/libs/util";

export default {
  name: "MenuPageSavePageComponent",
  data() {
    return {
      menuPageSavePageModalFlag: false,
      loadingFlag: true,
      formValidate: {
        city: "",
        menuName: "",
        menuCode: "",
        remark: ""
      },
      ruleValidate: {
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
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
    },

    /**
     * 新增菜单页面
     */
    saveMenuPage() {
      this.$refs.FormValidateRef.validate(valid => {
        this.loadingFlag = false;
        if (valid) {
        } else {
          this.$Notice.error({
            desc: "内容不合法，请重新填写。"
          });
        }
      });
    }
  },

  created() {}
};
</script>











