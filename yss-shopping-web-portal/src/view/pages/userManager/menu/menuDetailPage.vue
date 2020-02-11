<template>
  <div>
    <div>
      <Card :bordered="false" title="菜单详情">
        <Form :label-width="80">
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="菜单名称">
                <Input readonly v-model="menuName" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="类型">
                <Input readonly v-model="menuTypeName" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="菜单代码">
                <Input readonly v-model="menuCode" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="上级菜单">
                <Input readonly v-model="parentMenuName" />
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
              <FormItem label="状态">
                <Input readonly v-model="state" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="创建信息">
                <Input readonly v-model="createInfo" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="创建时间">
                <Input readonly v-model="createTime" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10" style="float: left">
              <FormItem label="修改信息">
                <Input readonly v-model="updateInfo" />
              </FormItem>
            </Col>
            <Col span="10" style="float: right">
              <FormItem label="修改时间">
                <Input readonly v-model="updateTime" />
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
import { selectSysMenuDetailAPI } from "@/api/menu/menu";

export default {
  name: "MenuDetailPageComponent",
  components: {},
  data() {
    return {
      mid: null,
      menuTypeName: null,
      menuCode: null,
      menuName: null,
      parentMenuName: null,
      level: null,
      state: null,
      createInfo: null,
      createTime: null,
      updateInfo: null,
      updateTime: null,
      remark: null
    };
  },

  methods: {
    /**
     * 查询系统或菜单详情
     */
    selectSystemOrMenuDetail(node) {}
  },

  created() {}
};
</script>
