<template>
<div class="crawl">
    <!-- 添加和搜索 -->
    <div class="operate">
        <Button type="primary" @click="addClick()">添加任务（关键词）</Button>
        <Button type="primary" @click="modal2=true">添加任务（URL）</Button>

    </div>

    <!-- 爬虫任务列表 -->
    <div class="taskTable">
        <Table :columns="list" :data="data" :loading="loading">
            <template slot-scope="{ index }" slot="task">
                <span>{{ index+1 }}</span>
            </template>
            <template slot-scope="{ row }" slot="keyword">
                <span>{{ row.keyword }}</span>
            </template>
            <template slot-scope="{ row }" slot="targets">
                <span>{{ row.targets }}</span>
            </template>
          <template slot-scope="{ row }" slot="createTime">
            <span>{{ row.createTime | createTime }}</span>
          </template>
            <template slot-scope="{ row, index }" slot="action2">
                <div>
                    <Button @click="handleEdit(row, index)" type="info" shape="circle" icon="md-create"></Button>
                    <Button @click="remove(index)" type="error" shape="circle" icon="md-trash"></Button>
                </div>
            </template>
            <template slot-scope="{ row, index }" slot="taskStatus">
                <i-switch ref="swvalue" v-model="row.taskStatus" :before-change="beforeChange" @on-change="ifOpen($event, row, index)" :disabled="editIndex===index?true:false" :true-value=1 :false-value=0>
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
            </template>
        </Table>
    </div>
  <!-- 弹窗组件 -->
  <Modal
          title="输入URL"
          v-model="modal2"
          @on-ok="inputUrlOk"
          :mask-closable="false" :z-index=999999>
    <div>
      <Form>
        <FormItem prop="inputUrl">
          <Input v-model="inputUrl" placeholder="输入URL" clearable />
        </FormItem>
        <FormItem prop="selectUrl">
          <Select v-model="selectUrl" placeholder="目标网站">
            <Option value="twitter">Twitter</Option>
            <Option value="facebook">Facebook</Option>
            <Option value="weibo">微博</Option>
            <Option value="ck101">卡提诺</Option>
            <Option value="eyny">伊莉</Option>
            <Option value="ltn">自由时报</Option>
            <Option value="setn">三立新闻</Option>
            <Option value="lihkg">连登</Option>
            <Option value="DFI">印度军事论坛</Option>
            <Option value="sputniknews">俄罗斯卫星通讯社</Option>
            <Option value="nytimes">纽约时报</Option>
            <Option value="ani">亚洲国际新闻</Option>
            <Option value="timesofindia">印度时报</Option>
            <Option value="outlook">瞭望</Option>
            <Option value="cnr">央广网</Option>
            <Option value="sohu">搜狐</Option>
            <Option value="sina">新浪</Option>
            <Option value="true">ADSB</Option>
            <Option value="true">印度卫生部</Option>
            <Option value="true">失业率</Option>
            <Option value="true">其他</Option>
          </Select>
        </FormItem>
      </Form>

    </div>
  </Modal>


    <!-- 弹窗组件 -->
    <Modal
        :title="title"
        v-model="modal"
        :mask-closable="false" :z-index=999999>
        <div class="modalDiv">
            <div><span>关键词：</span></div>
            <div><Input v-model="inputVal" placeholder="请输入关键词" clearable/></div>
        </div>
        <div class="modalDiv">
            <div><span>选择目标网站：</span></div>
            <div>
                <Checkbox
                    :indeterminate="indeterminate"
                    :value="checkAll"
                    @click.prevent.native="handleCheckAll">全选</Checkbox>
                <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <div style="display: grid;grid-template-columns: 1fr 1fr 1fr">
                      <Checkbox label="twitter">Twitter</Checkbox>
                      <Checkbox label="facebook">Facebook</Checkbox>
                      <Checkbox label="weibo">微博</Checkbox>
                      <Checkbox label="ck101">卡提诺</Checkbox>
                      <Checkbox label="eyny">伊莉</Checkbox>
                      <Checkbox label="ltn">自由时报</Checkbox>
                      <Checkbox label="setn">三立新闻</Checkbox>
                      <Checkbox label="lihkg">连登</Checkbox>
                      <Checkbox label="DFI">印度军事论坛</Checkbox>
                      <Checkbox label="sputniknews">俄罗斯卫星通讯社</Checkbox>
                      <Checkbox label="nytimes">纽约时报</Checkbox>
                      <Checkbox label="ani">亚洲国际新闻</Checkbox>
                      <Checkbox label="timesofindia">印度时报</Checkbox>
                      <Checkbox label="outlook">瞭望</Checkbox>
                      <Checkbox label="cnr">央广网</Checkbox>
                      <Checkbox label="sohu">搜狐</Checkbox>
                      <Checkbox label="sina">新浪</Checkbox>
                      <Checkbox label="11" :value="true" disabled>ADSB</Checkbox>
                      <Checkbox label="12" :value="true" disabled>印度卫生部</Checkbox>
                      <Checkbox label="13" :value="true" disabled>失业率</Checkbox>
                    </div>

                </CheckboxGroup>
            </div>
            <div class="modalDiv" v-show="warningMsg">
                <p style="color: red;">（目标网站仅能在等同数量下进行修改，请勿增加或减少目标网站的数量！）</p>
                <p style="color: red;">（无法选择中的选项为定时任务、每小时爬取一次）</p>
            </div>
        </div>
        <div slot="footer">
            <Button @click="modalCancel()">取消</Button>
            <Button type="primary" @click="modalOk()">确定</Button>
        </div>
        <div style="clear: both;"></div>
    </Modal>
</div>
</template>

<script>
import { text } from 'body-parser';
import api from './api'

export default {
    ...api
}
</script>

<style lang="stylus" scoped>
@import './crawl.styl'
</style>
