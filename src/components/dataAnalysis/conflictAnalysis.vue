<template>
  <div>
    <Tabs type="card">
<!--      <TabPane label="高频词汇提取">-->
<!--        <div style="margin: 10px 0 0 20px">-->
<!--          <Row :gutter="16">-->
<!--            &lt;!&ndash; 词频统计 &ndash;&gt;-->
<!--            <i-col span="5">-->
<!--              <Card shadow>-->
<!--                <Card v-for="item in list" :key="item.name" class="freqComp">-->
<!--                  <span>{{item.name}}</span>-->
<!--                  <span>{{item.value}}</span>-->
<!--                </Card>-->
<!--              </Card>-->
<!--            </i-col>-->

<!--            &lt;!&ndash; 词云图 &ndash;&gt;-->
<!--            <i-col span="19">-->
<!--              <Card shadow>-->
<!--                <conflict-word-freq></conflict-word-freq>-->
<!--              </Card>-->
<!--            </i-col>-->
<!--          </Row>-->
<!--        </div>-->
<!--      </TabPane>-->
      <TabPane label="趋势预测">
        <div class="line-container">
          <conflict-line></conflict-line>
        </div>
      </TabPane>
<!--      <TabPane label="新闻画像">-->
<!--        <div class="line-container">-->
<!--          <conflict-from style="margin-left:30px"></conflict-from>-->
<!--          <conflict-time></conflict-time>-->
<!--        </div>-->
<!--      </TabPane>-->
    </Tabs>
  </div>
</template>

<script>
    // 词频图
    // import conflictWordFreq from "../charts/conflictWordFreq";

    // 来源饼图
    // import conflictFrom from "../charts/conflictFrom";
    // 来源条形图
    // import conflictTime from "../charts/conflictTime";

    // import peopleData from "../charts/peopleData";
    import conflictLine from "../charts/conflictLine";

    // import conflictFrom from "../charts/conflictFrom";
    // import peopleActive from "../charts/peopleActive";

    export default {
        name: "conflictAnalysis",
        components: {
            // conflictWordFreq,
            // conflictFrom,
            // conflictTime,
            conflictLine,
        },
        data() {
            return {
                nameComp: 'wordFreq',
                allData: [],
                token: this.$store.state.token,
                list: [{
                    name: '关键词1',
                    value: 124533
                }, {
                    name: '关键词2',
                    value: 124533
                }, {
                    name: '关键词3',
                    value: 355243
                }, {
                    name: '关键词4',
                    value: 52351
                }, {
                    name: '关键词5',
                    value: 5323
                }, {
                    name: '关键词6',
                    value: 12415
                }, {
                    name: '关键词7',
                    value: 85644
                }, {
                    name: '关键词8',
                    value: 532235
                }, {
                    name: '关键词9',
                    value: 9483
                }, {
                    name: '关键词10',
                    value: 535268
                }]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .freqComp
      margin-bottom 10px
      span:nth-child(2)
       float right
</style>
