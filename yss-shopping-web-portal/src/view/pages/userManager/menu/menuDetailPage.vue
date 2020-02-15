<template>
  <div>
    <div v-if="menuDetailPageShowFlag">
      <Card :bordered="false" title="页面详情">
        <Form :label-width="80">
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="名称">
                <Input readonly v-model="menuName" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="代码">
                <Input readonly v-model="menuCode" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="URL">
                <Input readonly v-model="menuUrl" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="状态">
                <Input readonly v-model="state" />
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
                <Input readonly v-model="parentMenuName" />
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
              <Button type="primary" style="margin-left: 8px">修改</Button>
              <Button type="primary" style="margin-left: 8px">删除</Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
    </div>
  </div>
</template>



<script>
import { getToken } from "@/libs/util";
import { selectSystemDetailAPI } from "@/api/system/system";
import { selectSysMenuDetailAPI } from "@/api/userManager/menu.js";

export default {
  name: "MenuDetailPageComponent",
  components: {},
  data() {
    return {
      menuDetailPageShowFlag: false,
      mid: null,
      menuName: null,
      menuCode: null,
      menuUrl: null,
      state: null,
      level: null,
      parentMenuName: null,
      remark: null
    };
  },

  methods: {
    /**
     * 查询菜单详情
     */
    selectMenuDetail(node) {
      this.menuDetailPageShowFlag = true;
      this.mid = node.mid;
      let params = new Object();
      params.mid = node.mid;
      selectSysMenuDetailAPI(params).then(res => {
        if (res.data.code == 1) {
          this.menuName = res.data.data.menuName;
          this.menuCode = res.data.data.menuCode;
          this.menuUrl = res.data.data.menuUrl;
          this.state = res.data.data.state;
          this.level = res.data.data.level;
          this.parentMenuName = res.data.data.parentMenuName;
          this.remark = res.data.data.remark;
        } else if (res.data.code == 0) {
          this.$Notice.error({
            desc: res.data.msg
          });
        }
      });
    }
  },

  created() {
    // 监听全局事件hideMenuDetailPageComponentEvent  隐藏菜单詳情组件
    let _this = this;
    this.bus.$on("hideMenuDetailPageComponentEvent", function(data) {
      _this.menuDetailPageShowFlag = false;
    });
  }
};
</script>
