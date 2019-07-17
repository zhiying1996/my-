import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../views//HelloWorld'
import Home from '../views//Home'
import Table from '../views/nav1/Table.vue'
import handsome from '../views/nav1/handsome.vue'
import Form from '../views/nav1/Form.vue'
import status from '../views/nav1/status.vue'
import TaskDetails from '../views/nav1/TaskDetails.vue'
import Director from '../views/nav1/Director.vue'
import TaskDetailsPage from '../views/nav1/TaskDetailsPage.vue'
import TaskDetailsPage1 from '../views/nav1/TaskDetailsPage1.vue'
import Page4 from '../views/nav2/Page4.vue'
import Page5 from '../views/nav2/Page5.vue'
import Page6 from '../views/nav2/Page6.vue'
import management from '../views/nav0/management.vue'
import BanManagement from '../views/nav0/BanManagement.vue'
import LecturerManagement from '../views/nav0/LecturerManagement.vue'

import CarList from '../views/CarList/CarList.vue'
import CarList2 from '../views/CarList/CarList2.vue'
import CarListJup from '../views/CarList/CarListJup.vue'
import CarListJup2 from '../views/CarList/CarListJup2.vue'
import CarListInput from '../views/CarList/CarListInput.vue'

import CPLEuser from '../views/cple/CPLEuser.vue'
import CPLEstatistics from '../views/cple/CPLEstatistics.vue'
import Balance from '../views/cple/Balance.vue'
import BalanceDetails from '../views/cple/BalanceDetails.vue'
import withdraw from '../views/cple/withdraw.vue'
import processeddraw from '../views/cple/processeddraw.vue'
import expire from '../views/cple/expire.vue'
import expireXq from '../views/cple/expireXq.vue'
import expireMx from '../views/cple/expireMx.vue'
import CPLECirculation from '../views/cple/CPLECirculation.vue'
import Interesting from '../views/cple/Interesting.vue'


import LifeBackground from '../views/pictureManagement/LifeBackground.vue'
import commodityManagement from '../views/pictureManagement/commodityManagement.vue'
import Verified from '../views/realName/Verified.vue'
import VerifiedList from '../views/realName/VerifiedList.vue'
import LiftRealName from '../views/realName/LiftRealName.vue'

import UploadingVideo from '../views/businessSchool/UploadingVideo.vue'
import detailuploading from '../views/businessSchool/detailuploading.vue'

import version from '../views/configurationa/version.vue'


Vue.use(Router)

export default new Router({
    base: '/vue/',
    routes: [
        {
            path: '/HelloWorld',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/',
            component: Home,
            name: '导航一',
            iconCls: 'fa fa-address-card',
            leaf: true,
            children: [
            { path: '/management', component: management, name: 'management' },
            { path: '/BanManagement', component: BanManagement, name: 'BanManagement' },
            { path: '/LecturerManagement', component: LecturerManagement, name: 'LecturerManagement' }
            ]
        },
        {
            path: '/Home',
            component: Home,
            redirect: '/handsome',
            name: '导航二',
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/handsome', component: handsome, name: 'handsome' },
                { path: '/table', component: Table, name: 'Table' },
                { path: '/form', component: Form, name: 'Form'},
                { path: '/status', component: status, name: 'status' },
                { path: '/TaskDetails', component: TaskDetails, name: 'TaskDetails',meta: {
                    keepAlive: true
                }
         },
                { path: '/Director', component: Director, name: 'Director' ,meta: {
                    keepAlive: true
                }},
                { path: '/TaskDetailsPage', component: TaskDetailsPage, name: 'TaskDetailsPage' },
                { path: '/TaskDetailsPage1', component: TaskDetailsPage1, name: 'TaskDetailsPage1' }, 
            ]
        },
        {
            path: '/',
            component: Home,
            name: '导航三',
            iconCls: 'fa fa-id-card-o',
            children: [
                { path: '/page4', component: Page4, name: 'page4' },
                { path: '/page5', component: Page5, name: 'page5' },
                { path: '/page6', component: Page6, name: 'page6' }
            ]
        },
        {
            path: '/',
            component: Home,
            name: '导航四',
            iconCls: 'fa fa-id-card-o',
            children: [
                { path: '/Balance', component: Balance, name: 'Balance' },
                { path: '/BalanceDetails', component: BalanceDetails, name: 'BalanceDetails' },
                { path: '/CPLEuser', component: CPLEuser, name: 'CPLEuser' },
                { path: '/CPLEstatistics', component: CPLEstatistics, name: 'CPLEstatistics' },
                { path: '/withdraw', component: withdraw, name: 'withdraw' },
                { path: '/processeddraw', component: processeddraw, name: 'processeddraw' },
                { path: '/expire', component: expire, name: 'expire' },
                { path: '/expireXq', component: expireXq, name: 'expireXq' },
                { path: '/expireMx', component: expireMx, name: 'expireMx' },
                { path: '/CPLECirculation', component: CPLECirculation, name: 'CPLECirculation' },
                { path: '/Interesting', component: Interesting, name: 'Interesting' },
            ]
        },
        {
            path: '/',
            component: Home,
            name: '导航五',
            iconCls: 'fa fa-id-card-o',
            children: [
                { path: '/CarList', component: CarList, name: 'CarList'},
                { path: '/CarList2', component: CarList2, name: 'CarList2'},
                { path: '/CarListJup', component: CarListJup, name: 'CarListJup' },
                { path: '/CarListInput', component: CarListInput, name: 'CarListInput',meta: {
                    keepAlive: true
                } },
                { path: '/CarListJup2', component: CarListJup2, name: 'CarListJup2' },
                ]
             },
        {
            path: '/',
            component: Home,
            name: '导航六',
            iconCls: 'fa fa-id-card-o',
            children: [
                 { path: '/LifeBackground', component: LifeBackground, name: 'LifeBackground'},
                 { path: '/commodityManagement', component: commodityManagement, name: 'commodityManagement'},                 
                 ]
            },
        {
            path: '/',
            component: Home,
            name: '导航七',
            iconCls: 'fa fa-id-card-o',
            children: [
                  { path: '/Verified', component: Verified, name: 'Verified'},
                  { path: '/VerifiedList', component: VerifiedList, name: 'VerifiedList'},
                  { path: '/LiftRealName', component: LiftRealName, name: 'LiftRealName'},                         
                  ]
            },
            {
                path: '/',
                component: Home,
                name: '导航八',
                iconCls: 'fa fa-id-card-o',
                children: [
                      { path: '/UploadingVideo', component: UploadingVideo, name: 'UploadingVideo'}, 
                      { path: '/detailuploading', component: detailuploading, name: 'detailuploading'}                       
                      ]
                },
                {
                    path: '/',
                    component: Home,
                    name: '导航九',
                    iconCls: 'fa fa-id-card-o',
                    children: [
                          { path: '/version', component: version, name: 'version'},                        
                          ]
                    },
    ]
})
