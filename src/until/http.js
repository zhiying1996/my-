//const BASEURL = 'https://backstage.quchuxing.com/'
const BASEURL = 'http://47.92.84.65:23000/'
//const BASEURL = '/'
const URL = {
    login : BASEURL + 'backend/login',//登录
    getCheckList : BASEURL + 'mission/getCheckList',//后台审核列表
    getTaskInfo : BASEURL + 'mission/getTaskInfo',//任务详情
    checkMission : BASEURL + 'mission/checkMission',//后台审核
    getMissionByType : BASEURL + 'mission/getMissionByType',//后台获取审核通过/不通过的列表
    homepage : BASEURL + 'cple/homepage',
    missionStatistics:BASEURL + 'mission/missionStatistics',//任务统计
    transferCheckList:BASEURL + 'cple/transferCheckList',//提现审核列表
    transferCheck:BASEURL + 'cple/transferCheck',//提现审核
    getMissionDetail:BASEURL +'mission/getMissionDetail',//任务主or做任务详情
    selectAdmin:BASEURL+'backend/selectAdmin',//获取管理员列表
    insertAdmin:BASEURL+'backend/insertAdmin',//超级管理员添加用户
    updateAdmin:BASEURL+'backend/updateAdmin',//修改管理员权限
    deleteAdmin:BASEURL+'backend/deleteAdmin',//超级管理员删除管理员
    shieldUser:BASEURL+'mission/shieldUser',//屏蔽用户
    updatePassword:BASEURL+'backend/updatePassword',//管理员登录修改密码

    manualAuthen: BASEURL+'driver/manualAuthen',//人工实名认证
    realNameList: BASEURL+'driver/realNameList',//实名认证列表
    outOfRealName: BASEURL+'driver/outOfRealName',//解除实名认证
    outOfRealNameList: BASEURL+'driver/outOfRealNameList',//已解除实名认证列表

    getDriverCheckList: BASEURL+'getDriverCheckList',//车主审核列表
    batchCheckDriver: BASEURL+'batchCheckDriver',//自动批量审核列表
    getCheckDetail: BASEURL+'getCheckDetail',//车主审核详情
    checkDriver: BASEURL+'checkDriver',//车主审核详情
    getDriverList: BASEURL+'getDriverList',//获取已审核车主列表

    getCpleData:BASEURL+'cple/getCpleData',//获取CPLE总数据
    getPersonalCpleList:BASEURL+'cple/getPersonalCpleList',//获取用戶cple列表
    getCpleDetail:BASEURL+'cple/getCpleDetail',//获取个人CPLE明细
    getBalanceData:BASEURL+'driver/getBalanceData',//获取余额总数据 
    getPersonalMoneyList:BASEURL+'driver/getPersonalMoneyList',//获取车主金钱列表
    balance:BASEURL+'driver/balance',//个人金钱流水明细
    
    mainModuleList:BASEURL+'banner/mainModuleList',//广告主模块列表
    createMainModule:BASEURL+'banner/createMainModule',//添加广告主模块
    moduleList:BASEURL+'banner/moduleList',//子模块列表
    createModule:BASEURL+'banner/createModule',//添加子模块
    insertBanner:BASEURL+'banner/insertBanner',//添加图片
    updateModule:BASEURL+'banner/updateModule',//修改子模块
    deleteModule:BASEURL+'banner/deleteModule',//删除子模块
    updateBanner:BASEURL+'banner/updateBanner',//修改图片
    deleteBanner:BASEURL+'banner/deleteBanner',//删除图片
    
    productLink:BASEURL+'productLink/createModule',//添加商品主模块
    getModuleList:BASEURL+'productLink/getModuleList',//商品主模块列表
    productList:BASEURL+'productLink/productList',//商品列表
    insertProduct:BASEURL+'productLink/insertProduct',//添加产品
    updateProduct:BASEURL+'productLink/updateProduct',//修改产品
    deleteProduct:BASEURL+'productLink/deleteProduct',//删除产品

    bannedList:BASEURL+'driver/bannedList',//封禁列表
    bannedUser:BASEURL+'driver/bannedUser',//封禁用户
    releaseUser:BASEURL+'driver/releaseUser',//解禁用户


    getCpleSaveData:BASEURL+'cple/getCpleSaveData',//获取持仓总数据
    getPersonalCpleSaveList:BASEURL+'cple/getPersonalCpleSaveList',//获取持仓列表
    getPersonalSaveDetail:BASEURL+'cple/getPersonalSaveDetail',//获取持仓明细 
    getCpleSaveDataAfterDays:BASEURL+'cple/getCpleSaveDataAfterDays',//获得n天内的每日到期持仓 

    insertTeacher:BASEURL+'driver/insertTeacher',//添加讲师
    getTeachers:BASEURL+'driver/getTeachers',//获取讲师列表
    invalidTeacher:BASEURL+'driver/invalidTeacher',//使讲师失效
    getTeacherPeriod:BASEURL+'driver/getTeacherPeriod',//获取期数列表

    shangxueyuan:BASEURL+'shangxueyuan/upload_file',//上传视频音频
    
    getVersionMsg:BASEURL+'backend/getVersionMsg',//获取版本信息
    insertVersionMsg:BASEURL+'backend/insertVersionMsg',//添加版本信息

    getCpleDistribution:BASEURL+'cple/getCpleDistribution',//获取CPLE流通分布
    getGameData:BASEURL+'cple/getGameData',//游戏数据统计
 

}

module.exports = URL
