<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total > 0">
    <!--上一页-->
    <button :disabled="currentPage===1" @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start > 2">···</button>
      <!-- 连续页码 -->
    <button 
      v-for="no in startEnd.end" :key="no"
        v-if="no >= startEnd.start"
        :class="{active:currentPage===no}"
        @click="changeCurrentPage(no)"
    >{{no}}</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start < totalPages - 1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.start<totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage===totalPages" @click="changeCurrentPage(currentPage + 1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    // 初始化数据
    props:{
      pageConfig:{
        type: Object,
        default: {
          total: 0, //总数据的个数
          showPageNo: 5, //连续显示页码数
          pageNo: 1, //当前页码
          pageSize: 10
        }
      },
    },

    data(){
      /*注意:
        在data中可以读取props和vue原型对象上的属性
        在data()中不可以直接读取data对象中的数据
        beforeCreat()在data之前
      */ 
      return {
        currentPage: this.pageConfig.pageNo //当前页码
      }
    },

    computed:{
      //总页码数
      totalPages(){
        //取出总数量和每页记录数
        const {total, pageSize} = this.pageConfig;
        //容错处理
        if(total<=0 || pageSize<=0) return 0
        //返回值
        return Math.ceil(total/pageSize) //向上取整
      },

      /*
        计算得到连续页码的start和end
          连续页码数: pageConfig.showPageNo
          当前页码数: currentPage
          总页码数: totalPages
      */
       startEnd(){
          let start = 0;
          let end = 0;
          //1.取出相关的数据
          // const {showPageNo} = this.pageConfig
          // const {totalPages, currentPage} = this
          const {totalPages, currentPage, pageConfig:{showPageNo}} = this //多层级对象解构
          
          //2.计算后更新start和end
          /* 
          currentPage  showPageNo  totalPages
            4             5             10     23456 规律:start = currentPage - Math.floor(showPageNo/2)
            2             5             10     12345 排除特殊情况:start小于1让其等于1
            9             5             10     6789 10
          */

          //2-1.计算start
          start = currentPage - Math.floor(showPageNo/2);
          //排除特殊情况,如果start页码小于1,start赋值为1
          if(start < 1){
            start = 1
          }

          //2-2.根据start计算end
          /*
            currentPage  showPageNo  totalPages
                4             5             10     23456  规律:end = start + showPageNo - 1

              1. 排除特殊情况,如果end大于了总页码数,end赋值为总页码数,即789 10 ==> end = totalPages
              2. 但显示页码数的只有四位了,此时需要再次修正start: 让start到end为showPageNo 
                规律: start = end - showPageNo + 1
                9             5             10     789 10 11 

              3. 此时还需要再次判断start是否小于1,如果小于1,将start赋值为1
                2             5             3  ==> end = 3 start = -1    
          */ 
          end = start + showPageNo - 1
          //排除特殊情况,如果end大于了总页码数,end赋值为总页码数
          if(end > totalPages){
            end = totalPages
            //修正start: 让start到end为showPageNo
            start = end - showPageNo + 1
            //如果start小于1, 指定为1
            if(start < 1){
              start = 1
            } 
          }

          //3.返回计算后的start和end
          return {start, end}
       },

      //要根据已有数据计算出连续页码的start和end
      startEnd2(){
        //得到已有依赖数据
        // 当前页码 / 连续页码数 / 总页码数
        const currentPage = this.currentPage;
        const showPageNo = this.pageConfig.showPageNo;
        const totalPages = this.totalPages
        //计算产生需要的数据(找start和end之间的关系)
        let start = 0;
        let end = 0;
        /*start分析1-推规律:
          currentPage   showPageNo    totalPages
              4             3             10     ==> 345 即:start 3  当前页 - 连续显示页/2向下取整
        */ 
        start = currentPage - Math.floor(showPageNo/2)
        /*start分析2-判断start临界值:
          currentPage   showPageNo    totalPages
              2             5             10     ==> 345 即:start 2 - 2 = 0 页码数小于1此时应该修正为1
        */ 
        if(start < 1){
          start = 1; //修正之后,如果当前显示的开始end页码等于1时,还应该重新调整showPageNo显示页码数的最后页码数end
        }
        /* end分析1-推规律2:
          正确的规律应该是: end = start + showPageNo - 1
          currentPage   showPageNo    totalPages  
              4             5             10 
          start = 1 ==> 1 + 5 - 1   5
          start = 4 ==> 4 + 5 - 1   8
        */ 
        end = start + showPageNo - 1  
         
        /*end分析2-判断end临界值:
          currentPage   showPageNo    totalPages
              9             5             10     ==> 7 8 9 10 11 即:end 11 超过了最大页码数此时应修正为10
        */ 
        if(end > totalPages){
          end = totalPages //如果end超过了最大页码,修正为最大页码
          /*end分析2-判断end临界值:
            currentPage   showPageNo    totalPages
              9             5             10     
              start = 9 - 2  ==> 
              end = 10
            ==> 修正之后, 处理特殊情况:连续显示的页码数是789 10只有四位,此时还需要再次修正start即将start向前推一位678910
              问题描述: 如果当前显示的最后end页码数大于实际的最大totalPages页码数,还应该重新调整showPageNo显示页码数的开始页码数start
            ==> 规律: start = end - showPageNo + 1 
          */ 
          start = end - showPageNo + 1 
        }
        //返回数据
        return {start, end}
      }
      /*end分析1-推规律1: 这种推理错误,应该是去调整最后end显示页码数
        currentPage   showPageNo    totalPages
            4             5             10     ==> 23456 即:end 6  当前页 + 连续显示页/2向下取整
      */ 
      // end = currentPage + Math.floor(showPageNo/2)
    },

    //监视
    watch: {
      //当接收的pageConfig中的pageNo发生改变时调用
      'pageConfig.pageNo'(value){
        //将当前页码指定为外部传入的值
        this.currentPage = value
      }
    },

    methods:{
      //将当前页码改为传过来的指定页码
      changeCurrentPage(page){
        //修改当前页码
        this.currentPage = page;
        //通知外部父组件
        this.$emit('changeCurrentPage', page);
      }
    },
  }
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline:none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
