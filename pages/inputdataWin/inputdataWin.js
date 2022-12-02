// pages/inputdataWin/inputdataWin.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    date: '2021-10-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,

    // isSelect:false,//
    // types:['排羽馆（东区体育馆102）','羽毛球室（东区锅炉房102）'],//体育馆名称
    // type:"",

    DqOpenid: '',
    select: false,
    name: '',
    type: '',
    types: ['排羽馆（东区体育馆102）','羽毛球室（东区锅炉房102）'],//体育馆名称

  },

  
// 点击下拉框 
bindShowMsg() {
  this.setData({
    select: !this.data.select
  })
},
// 已选下拉框 
mySelect(e) {
  console.log(e)
  var value = e.currentTarget.dataset.type
  this.setData({
    type: value,
    select: false
  })

},

  //点击控制下拉框的展示、隐藏
  select:function(){
    var isSelect = this.data.isSelect
    this.setData({ isSelect:!isSelect})
  },
  //点击下拉框选项，选中并隐藏下拉框
  getType:function(e){
    let value = e.currentTarget.dataset.type
    this.setData({
      type:value ,
      isSelect: false,
    })
  },


  powerDrawer: function (e) { 
    var currentStatus = e.currentTarget.dataset.status;  
    var name = this.data.name;  
    var date = this.data.date;
    var time = this.data.time;
    var type = this.data.type;

    this.util(currentStatus) 
    //跳转到预约界面
    wx.navigateTo({
      url: '../booking/booking?name=' + name + '&date=' + date + '&time=' + time + '&type=' + type
    })
  }, 
  util: function(currentStatus){ 
    /* 动画部分 */ 
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({ 
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });  
       
    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;  
   
    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();  
   
    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({ 
      animationData: animation.export() 
    }) 
       
    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () { 
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();  
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({ 
        animationData: animation  
      }) 
         
      //关闭  
      if (currentStatus == "close") { 
        this.setData( 
          { 
            showModalStatus: false 
          } 
        );  
      } 
    }.bind(this), 200) 
     
    // 显示  
    if (currentStatus == "open") { 
      this.setData( 
        { 
          showModalStatus: true 
        } 
      );  
    } 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData( 
      { 
        showModalStatus: true ,
      } 
    ); 
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
    //获取当前时间
    var dt = new Date(Date.parse(new Date())+ 60*60*1000*8).toISOString();
    var curr_date = dt.substring(0, 10)
    var curr_time = dt.substring(11, 16)
    
    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime,
      date: curr_date,
      time: curr_time
      // date: util.formatTime(new Date())
    });
  },
  bindInputChange(e){
    this.setData({name:e.detail.value});
  },
  changeDate(e){
    this.setData({ date:e.detail.value});
  },
  changeTime(e){
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e){
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e){
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({ 
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})