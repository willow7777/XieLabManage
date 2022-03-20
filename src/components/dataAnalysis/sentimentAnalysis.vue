<template>
    <div>
      <Tabs type="card">
        <TabPane label="高频词汇提取">
          <div style="margin: 10px 0 0 20px">
            <Row :gutter="16">
              <!-- 词频统计 -->
              <i-col span="5">
                <Card shadow>
                  <Card v-for="item in list" :key="item.name" class="freqComp">
                    <span>{{item.name}}</span>
                    <span>{{item.value}}</span>
                  </Card>
                </Card>
              </i-col>

              <!-- 词云图 -->
              <i-col span="19">
                <Card shadow>
                  <word-freq></word-freq>
                </Card>
              </i-col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="立场倾向与趋势预测">
          <div class="line-container">
<!--            <Row :gutter="16" style="margin-bottom: 20px">-->
<!--              <i-col>-->
<!--                <div>-->
<!--                  <select-comp :name="nameComp"></select-comp>-->
<!--                </div>-->
<!--              </i-col>-->
<!--            </Row>-->
            <Row :gutter="16">
              <i-col>
                <div>
                  <cycle-comp style="margin-top: 10px "></cycle-comp>
                </div>
              </i-col>
            </Row>
            <br>
            <Row :gutter="16">
              <i-col>
                <div>
                  <sentiment-line-comp></sentiment-line-comp>
                </div>
              </i-col>
            </Row>
          </div>
        </TabPane>
        <TabPane label="用户画像">
          <Row :gutter="16">
            <Card shadow>
              <select-comp></select-comp>
            </Card>
          </Row>
          <Row :gutter="16">
            <Card shadow>
              <people-data style="margin-bottom: 20px"></people-data>
            </Card>
          </Row>
<!--          <Row :gutter="16">-->
<!--            <Card shadow>-->
<!--              <people-active></people-active>-->
<!--            </Card>-->
<!--          </Row>-->
        </TabPane>
      </Tabs>
    </div>
</template>

<script>
import selectComp from '../select/selectTargetNet.vue'
// 立场检测与趋势预测
import cycleComp from '../charts/cyclePredict.vue'
import sentimentLineComp from '../charts/sentimentLine.vue'

// 词云图
import wordFreq from "../charts/wordFreq";

// 用户画像部分
import peopleData from "../charts/peopleData";
// import peopleActive from "../charts/peopleActive";
export default {
    components: {
        selectComp,
        cycleComp,
        sentimentLineComp,
        wordFreq,
        peopleData,
        // peopleActive
    },
    data(){
      return {
        nameComp: 'wordFreq',
        allData: [],
        token: this.$store.state.token,
        list: [
          {name: '关键词1', value: 124533},
          {name: '关键词2', value: 124533},
          {name: '关键词3', value: 355243},
          {name: '关键词4', value: 52351},
          {name: '关键词5', value: 5323},
          {name: '关键词6', value: 12415},
          {name: '关键词7', value: 85644},
          {name: '关键词8', value: 532235},
          {name: '关键词9', value: 9483},
          {name: '关键词10', value: 535268}
        ]
      }
    }
}
</script>
<style lang="stylus" scoped>
.freqComp
  margin-bottom 13px
  span:nth-child(2)
    float right
</style>
