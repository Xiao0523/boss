import Vue from 'vue'
import Router from 'vue-router'
// import user from '@/store/modules/user'
// import { getUserId } from '@/utils/auth' // 验权

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/tinymce', component: () => import('@/components/Tinymce') },
  /* {
    path: '/test',
    component: Layout,
    redirect: '/test1',
    name: 'test',
    meta: { title: 'test' },
    children: [{
      path: '/test1',
      component: () => import('@/views/test')
    },
      {
        path: '/test2',
        component: () => import('@/views/test/ttt')
      }

    ]
  },*/
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Dashboard',
  //       meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: 'home',
    hidden: true,
    meta: {
      requireAuth: true // 1.需要登录校验
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home')
      }
    ]
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home'),
        meta: { title: '后台首页', icon: 'form' }
      }
    ]
  },
  {
    path: '/shareMoneyManager',
    component: Layout,
    redirect: '/shareMoneyManager/shareMoneyList',
    name: 'shareMoneyManager',
    meta: { title: '纷享币管理', icon: 'money' },
    children: [
      {
        path: 'shareMoneyList',
        name: 'shareMoneyList',
        component: () => import('@/views/shareMoneyManager/shareMoneyList'),
        meta: { title: '纷享币信息', icon: 'money' }
      },
      {
        path: 'shareMoneyDetails',
        name: 'shareMoneyDetails',
        component: () =>
          import('@/views/shareMoneyManager/shareMoneyList/details'),
        meta: { title: '纷享币详情', icon: 'table' },
        hidden: true
      }
      // {
      //   path: 'ArticleCat',
      //   name: 'ArticleCat',
      //   component: () => import('@/views/ArticleManager/ArticleCat'),
      //   meta: { title: '文章分类', icon: 'tree' },
      //   hidden: true
      // }
    ]
  },
  // regionManager
  {
    path: '/regionManager',
    component: Layout,
    redirect: '/regionManager/regionList',
    name: 'regionManager',
    meta: { title: '地区管理', icon: '地区管理' },
    children: [
      {
        path: 'regionList',
        name: 'regionList',
        component: () => import('@/views/regionManager/index'),
        meta: { title: '地区列表', icon: '地区管理' }
      }
    ]
  },
  {
    path: '/categoryManager',
    component: Layout,
    redirect: '/categoryManager/categoryList',
    name: 'categoryManager',
    meta: { title: '文章类目管理', icon: 'tag' },
    children: [
      {
        path: 'categoryList',
        name: 'categoryList',
        component: () => import('@/views/categoryManager/categoryList'),
        meta: { title: '文章类目列表', icon: 'tag' }
      },
      {
        path: 'categoryDetails',
        name: 'categoryEdit',
        component: () => import('@/views/categoryManager/categoryEdit'),
        meta: { title: '文章类目详情' },
        hidden: true
      },
      {
        path: 'categoryAdd',
        name: 'categoryAdd',
        component: () => import('@/views/categoryManager/categoryAdd'),
        meta: { title: '添加标签' },
        hidden: true
      }
      // {
      //   path: 'ArticleCat',
      //   name: 'ArticleCat',
      //   component: () => import('@/views/ArticleManager/ArticleCat'),
      //   meta: { title: '文章分类', icon: 'tree' },
      //   hidden: true
      // }
    ]
  },
  {
    path: '/videoCategoryManager',
    component: Layout,
    redirect: '/videoCategoryManager/categoryList',
    name: 'videoCategoryManager',
    meta: { title: '视频类目管理', icon: 'tag' },
    children: [
      {
        path: 'categoryList',
        name: 'videocategoryList',
        component: () => import('@/views/videoCategoryManager/categoryList'),
        meta: { title: '视频类目列表', icon: 'tag' }
      }
      // {
      //   path: 'ArticleCat',
      //   name: 'ArticleCat',
      //   component: () => import('@/views/ArticleManager/ArticleCat'),
      //   meta: { title: '文章分类', icon: 'tree' },
      //   hidden: true
      // }
    ]
  },
  {
    path: '/advManager',
    component: Layout,
    redirect: '/advManager/advList',
    name: 'advManager',
    meta: { title: '广告管理', icon: 'ad' },
    children: [
      {
        path: 'advList',
        name: 'advList',
        component: () => import('@/views/advManager/advList'),
        meta: { title: '广告列表', icon: 'ad' }
      },
      {
        path: 'advDetails',
        name: 'advDetails',
        component: () => import('@/views/advManager/advEdit'),
        meta: { title: '广告详情' },
        hidden: true
      },
      {
        path: 'flotAdvDetails',
        name: 'flotAdvDetails',
        component: () => import('@/views/advManager/advEdit/flotAdvEdit'),
        meta: { title: '浮窗详情' },
        hidden: true
      },
      {
        path: 'previewImg',
        name: 'previewImg',
        component: () => import('@/views/advManager/advTemplet/previewImg'),
        meta: { title: '广告图片预览' },
        hidden: true
      },
      {
        path: 'advAdd',
        name: 'advAdd',
        component: () => import('@/views/advManager/advAdd'),
        meta: { title: '添加广告' },
        hidden: true
      }
    ]
  },
  {
    path: '/flotAdv',
    name: 'flotAdv',
    component: Layout,
    redirect: '/flotAdv/flotAdvList',
    meta: { title: '浮窗管理', icon: 'ad' },
    children: [
      {
        path: 'flotAdvList',
        name: 'flotAdvList',
        component: () => import('@/views/advManager/advList/flotAdvList'),
        meta: { title: '浮窗列表', icon: 'ad' }
      },
      {
        path: 'flotAdvAdd',
        name: 'flotAdvAdd',
        component: () => import('@/views/advManager/advAdd/flotAdvAdd'),
        meta: { title: '添加浮窗内容' },
        hidden: true
      }
    ]
  },
  {
    path: '/ArticleManager',
    component: Layout,
    redirect: '/ArticleManager/ArticleList',
    name: 'ArticleManager',
    meta: { title: '文章管理', icon: 'article' },
    children: [
      {
        path: 'ArticleList',
        name: 'ArticleList',
        component: () => import('@/views/ArticleManager/ArticleList'),
        meta: { title: '文章列表', icon: 'article' }
      },
      {
        path: 'ArticleDetails',
        name: 'ArticleDetails',
        component: () => import('@/views/ArticleManager/ArticleDetails'),
        meta: { title: '文章详情' },
        hidden: true
      },
      {
        path: 'ArticlePreview',
        name: 'ArticlePreview',
        component: () => import('@/views/ArticleManager/ArticlePreview'),
        meta: { title: '文章预览' },
        hidden: true
      },
      {
        path: 'ArticleAdd',
        name: 'ArticleAdd',
        component: () => import('@/views/ArticleManager/ArticleAdd'),
        meta: { title: '添加文章' },
        hidden: true
      },
      {
        path: 'ArticleCat',
        name: 'ArticleCat',
        component: () => import('@/views/ArticleManager/ArticleCat'),
        meta: { title: '文章分类' },
        hidden: true
      }
    ]
  },
  {
    path: '/mediaManager',
    component: Layout,
    redirect: '/mediaManager/mediaArticleList',
    name: 'mediaManager',
    children: [
      {
        path: 'mediaArticleList',
        name: 'mediaArticleList',
        component: () => import('@/views/mediaManager/mediaArticleList'),
        meta: { title: '自媒体审核', icon: 'article' }
      }
    ]
  },

  // 权限
  {
    path: '/permissionsManager',
    component: Layout,
    redirect: '/permissionsManager/permissionsList',
    name: 'permissionsManager',
    meta: { title: '权限管理', icon: 'role' },
    children: [
      {
        path: 'permissionsList',
        name: 'permissionsList',
        component: () => import('@/views/permissionsManager/permissionsList'),
        meta: { title: '角色列表', icon: 'role' }
      }
    ]
  },
  // 操作管理
  {
    path: '/operationManager',
    component: Layout,
    redirect: '/operationManager/operationList',
    name: 'operationManager',
    meta: { title: '操作管理', icon: 'operation' },
    children: [
      {
        path: 'operationList',
        name: 'operationList',
        component: () => import('@/views/operationManager/operationList'),
        meta: { title: '操作列表', icon: 'operation' }
      }
    ]
  },
  /*  {
    path: '/AppManager',
    component: Layout,
    redirect: '/AppManager/AppList',
    name: 'AppManager',
    meta: { title: '应用管理', icon: 'example' },
    children: [
      {
        path: 'AppList',
        name: 'AppList',
        component: () => import('@/views/AppManager/AppList/index'),
        meta: { title: '应用列表', icon: 'table' }
      },
      {
        path: 'AppEdit',
        name: 'AppEdit',
        component: () => import('@/views/AppManager/AppEdit'),
        meta: { title: '应用编辑', icon: 'table' },
        hidden: true
      },
      {
        path: 'AppCat',
        name: 'AppCat',
        component: () => import('@/views/AppManager/AppCat/index'),
        meta: { title: '应用分类', icon: 'table' },
        hidden: true
      },
      {
        path: 'AppAdd',
        name: 'AppAdd',
        component: () => import('@/views/AppManager/AppAdd/index'),
        meta: { title: '添加应用', icon: 'table' },
        hidden: true
      }
    ]
  },
  {
    path: '/reportsManager',
    component: Layout,
    redirect: '/reportsManager/reportsList',
    name: 'ReportsManager',
    meta: { title: '媒体报道', icon: '' },
    children: [
      {
        path: 'reportsList',
        name: 'reportsList',
        component: () => import('@/views/reportsManager/reportsList'),
        meta: { title: '媒体列表', icon: 'table'  }
      },
      // reportsDetails
      {
        path: 'reportsDetails',
        name: 'reportsDetails',
        component: () => import('@/views/reportsManager/reportsDetails'),
        meta: { title: '报道详情', icon: '' },
        hidden: true
      },
      {
        path: 'reportsAdd',
        name: 'reportsAdd',
        component: () => import('@/views/reportsManager/reportsAdd'),
        meta: { title: '添加报道', icon: '' },
        hidden: true
      }]
  },*/
  {
    path: '/commissionRebate',
    component: Layout,
    redirect: '/commissionRebate/CommissionList',
    name: 'CommissionRebate',
    meta: { title: '佣金管理', icon: '' },
    children: [
      {
        path: 'CommissionList',
        name: 'CommissionList',
        component: () => import('@/views/commissionRebate/CommissionList'),
        meta: { title: '佣金列表', icon: 'commission' }
      },
      {
        path: 'CommissionDetails',
        name: 'CommissionDetails',
        component: () => import('@/views/commissionRebate/CommissionDetails'),
        meta: { title: '佣金详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/adminManager',
    component: Layout,
    redirect: '/adminManager/adminList',
    name: 'adminManager',
    meta: { title: '管理员管理', icon: 'admin' },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/adminManager/adminList'),
        meta: { title: '管理员列表', icon: 'admin' }
      }
    ]
  },
  {
    path: '/memberManager',
    component: Layout,
    redirect: '/memberManager/memberList',
    name: 'memberManager',
    meta: { title: '会员管理', icon: 'member' },
    children: [
      {
        path: 'memberList',
        name: 'memberList',
        component: () => import('@/views/memberManager/memberList'),
        meta: { title: '会员列表', icon: 'member' }
      },
      {
        path: 'memberDetais',
        name: 'memberDetais',
        component: () => import('@/views/memberManager/memberDetails'),
        meta: { title: '会员详情' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/businessManager',
  //   component: Layout,
  //   redirect: '/businessManager/businessList',
  //   name: 'businessManager',
  //   meta: { title: '商家管理', icon: 'table' },
  //   children: [
  //     {
  //       path: 'businessList',
  //       name: 'businessList',
  //       component: () => import('@/views/businessManager/businessList'),
  //       meta: { title: '商家列表', icon: 'table' }
  //     }]
  // },
  {
    path: '/slideshowManager',
    component: Layout,
    redirect: '/slideshowManager/slideshowList',
    name: 'slideshowManager',
    meta: { title: '轮播图管理', icon: 'slideshow' },
    children: [
      {
        path: 'slideshowList',
        name: 'slideshowList',
        component: () => import('@/views/slideshowManager/slideshowList'),
        meta: { title: '轮播图列表', icon: 'slideshow' }
      }
    ]
  },
  {
    path: '/kuaKuaMi',
    component: Layout,
    redirect: '/kuaKuaMi/withdrawList',
    name: 'kuaKuaMi',
    meta: { title: '夸夸蜜', icon: '提现' },
    children: [
      {
        path: 'withdrawList',
        name: 'kuaKuaMiWithdrawList',
        component: () => import('@/views/kuaKuaMi/withdrawList'),
        meta: { title: '夸夸蜜提现', icon: '提现' }
      }
    ]
  },
  {
    path: '/spiderCategoryManager',
    component: Layout,
    name: 'spiderCategoryManage',
    redirect: '/spiderCategoryManager/edit',
    meta: { title: '', icon: '管理' },
    children: [
      {
        path: 'edit',
        name: 'spiderCategoryEdit',
        component: () => import('@/views/spiderCategoryManager'),
        meta: { title: '类目爬虫管理', icon: '管理' }
      }
    ]
  },

  {
    path: '/configuration',
    component: Layout,
    name: 'configuration',
    redirect: '/configuration/configurationList',
    meta: { title: '常规配置', icon: 'operation' },
    children: [
      {
        path: 'configurationList',
        name: 'configurationList',
        component: () => import('@/views/configuration/configurationList'),
        meta: { title: '配置列表', icon: 'operation' }
      }
    ]
  },

  {
    path: '/cardGroup',
    component: Layout,
    name: 'cardGroup',
    redirect: '/cardGroup/cardGroupList',
    meta: { title: '卡片组管理', icon: 'slideshow' },
    children: [
      {
        path: 'cardGroupList',
        name: 'cardGroupList',
        component: () => import('@/views/cardGroup/cardGroupList'),
        meta: { title: '卡片组列表', icon: 'slideshow' }
      },

      {
        path: 'cardGroupAdd',
        name: 'cardGroupAdd',
        component: () => import('@/views/cardGroup/cardGroupAdd'),
        meta: { title: '添加卡片组' },
        hidden: true
      },
      {
        path: 'card',
        name: 'card',
        component: () => import('@/views/cardGroup/card'),
        meta: { title: '卡片管理' },
        hidden: true
      }
    ]
  },
  {
    path: '/turnTable',
    component: Layout,
    name: 'turnTable',
    redirect: '/turnTable/turnTableList',
    meta: { title: '大转盘管理', icon: 'member' },
    children: [
      {
        path: 'turnTableList',
        name: 'turnTableList',
        component: () => import('@/views/turnTable/turnTableList'),
        meta: { title: '大转盘列表' }
      }
    ]
  },
  {
    path: '/turnTableReward',
    component: Layout,
    name: 'turnTableReward',
    redirect: '/turnTableReward/turnTableRewardList',
    meta: { title: '大转盘奖励管理', icon: 'commission' },
    children: [
      {
        path: 'turnTableRewardList',
        name: 'turnTableRewardList',
        component: () => import('@/views/turnTableReward/turnTableRewardList'),
        meta: { title: '大转盘奖励列表' }
      }
    ]
  },

  {
    path: '/activityWithdraw',
    component: Layout,
    redirect: '/activityWithdraw/activityWithdrawList',
    name: 'activityWithdraw',
    meta: { title: '提现审核', icon: '提现' },
    children: [
      {
        path: 'activityWithdrawList',
        name: 'activityWithdrawList',
        component: () =>
          import('@/views/activityWithdraw/activityWithdrawList'),
        meta: { title: '提现列表', icon: '提现' }
      }
    ]
  },
  {
    path: '/weMedia',
    component: Layout,
    redirect: '/weMedia/weMediaList',
    name: 'weMedia',
    meta: { title: '自媒体管理', icon: 'article' },
    children: [
      {
        path: 'weMediaList',
        name: 'weMediaList',
        component: () => import('@/views/weMedia/weMediaList'),
        meta: { title: '自媒体文章列表' }
      }
    ]
  },
  {
    path: '/mediaPublish',
    component: Layout,
    redirect: '/mediaPublish/mediaPublishList',
    name: 'mediaPublish',
    meta: { title: '媒体人管理', icon: 'article' },
    children: [
      {
        path: 'mediaPublishList',
        name: 'mediaPublishList',
        component: () => import('@/views/mediaPublish/mediaPublishList'),
        meta: { title: '媒体人文章列表' }
      }
    ]
  },

  {
    path: '/searchRoll',
    component: Layout,
    redirect: '/searchRoll/searchRollList',
    name: 'searchRoll',
    meta: { title: '搜索框管理', icon: 'article' },
    children: [
      {
        path: 'searchRollList',
        name: 'searchRollList',
        component: () => import('@/views/searchRoll/searchRollList'),
        meta: { title: '搜索框列表' }
      }
    ]
  },

  {
    path: '/tagManager',
    component: Layout,
    redirect: '/tagManager/tagList',
    name: 'tagManager',
    meta: { title: '标签管理', icon: 'tag' },
    children: [
      {
        path: 'tagList',
        name: 'tagList',
        component: () => import('@/views/tagManager/tagList'),
        meta: { title: '标签列表' }
      }
    ]
  },

  {
    path: '/galleryManager',
    component: Layout,
    redirect: '/galleryManager/gallery',
    name: 'galleryManager',
    meta: { title: '图库管理', icon: 'slideshow' },
    children: [
      {
        path: 'gallery',
        name: 'gallery',
        component: () => import('@/views/galleryManager/gallery'),
        meta: { title: '图库列表' }
      }
    ]
  },

  {
    path: '/happyRead',
    component: Layout,
    redirect: '/happyRead/happyReadList',
    name: 'happyRead',
    meta: { title: '小说管理', icon: 'article' },
    children: [
      {
        path: 'happyReadList',
        name: 'happyReadList',
        component: () => import('@/views/happyRead/happReadList'),
        meta: { title: '小说列表' }
      },
      {
        path: 'happyReadAdd',
        name: 'happyReadAdd',
        component: () => import('@/views/happyRead/happyReadAdd'),
        meta: { title: '小说添加' },
        hidden: true
      }
    ]
  },
  {
    path: '/happyReadWithdraw',
    component: Layout,
    redirect: '/happyReadWithdraw/happyReadWithdrawList',
    name: 'happyReadWithdraw',
    meta: { title: '小说提现管理', icon: 'article' },
    children: [
      {
        path: 'happyReadWithdrawList',
        name: 'happyReadWithdrawList',
        component: () =>
          import('@/views/happyReadWithdraw/happyReadWithdrawList'),
        meta: { title: '小说提现列表' }
      }
    ]
  },
  /* --add*/
  {
    path: '/classList',
    component: Layout,
    redirect: '/classList/typeList',
    name: 'classList',
    meta: { title: '类目管理', icon: 'member' },
    children: [
    ]
  },
  {
    path: '/lanqing',
    component: Layout,
    redirect: '/lanqing/organizationList',
    name: 'LanQing',
    meta: { title: '蓝青商户', icon: 'member' },
    children: [
      // {
      //   path: 'user',
      //   name: 'User',
      //   component: () => import('@/views/lanqing/user')
      // },
      {
        path: 'organizationList',
        name: 'OrganizationList',
        component: () => import('@/views/lanqing/organization/organizationList'),
        meta: { title: '商户认证' }
      },
      {
        path: 'organizationDetail',
        name: 'OrganizationDetail',
        component: () => import('@/views/lanqing/organization/organizationList/organizationAudit'),
        meta: { title: '商户查看' },
        hidden: true
      },
      {
        path: 'storeList',
        name: 'StoreList',
        component: () => import('@/views/lanqing/organization/store/index'),
        meta: { title: '店铺认证' }
      },
      {
        path: 'storeDetail',
        name: 'StoreDetail',
        component: () => import('@/views/lanqing/organization/store/detail/index'),
        meta: { title: '店铺详情' },
        hidden: true
      },
      {
        path: 'canvassList',
        name: 'CanvassList',
        component: () => import('@/views/lanqing/canvass'),
        meta: { title: '入驻管理' }
      },
      {
        path: 'classDetail',
        name: 'ClassDetail',
        component: () => import('@/views/lanqing/organization/store/detail/classDetail'),
        meta: { title: '课程详情' },
        hidden: true
      },
      {
        path: 'teacherDetail',
        name: 'TeacherDetail',
        component: () => import('@/views/lanqing/organization/store/detail/teacherDetail'),
        meta: { title: '教师详情' },
        hidden: true
      },
      {
        path: 'commentDetail',
        name: 'CommentDetail',
        component: () => import('@/views/lanqing/organization/store/detail/commentDetail'),
        meta: { title: '评论详情' },
        hidden: true
      },
      {
        path: 'recommendedBitList',
        name: 'RecommendedBitList',
        component: () => import('@/views/lanqing/recommendedBit/index'),
        meta: { title: '推荐课程列表' }
      },
      {
        path: 'recommendedBitEdit',
        name: 'RecommendedBitEdit',
        component: () => import('@/views/lanqing/recommendedBit/edit'),
        meta: { title: '推荐课程编辑' },
        hidden: true
      },
      {
        path: 'recommendedTeacher',
        name: 'RecommendedTeacher',
        component: () => import('@/views/lanqing/teacher/index'),
        meta: { title: '推荐讲师' }
      },
      {
        path: 'recommendedTeacherEdit',
        name: 'RecommendedTeacherEdit',
        component: () => import('@/views/lanqing/teacher/edit/index'),
        meta: { title: '编辑推荐讲师' },
        hidden: true
      },
      {
        path: 'groupList',
        name: 'GroupList',
        component: () => import('@/views/lanqing/group/index'),
        meta: { title: '群组列表' }
      },
      {
        path: 'groupEdit',
        name: 'GroupEdit',
        component: () => import('@/views/lanqing/group/edit/index'),
        meta: { title: '添加群组' },
        hidden: true
      },
      {
        path: 'groupDetail',
        name: 'GroupDetail',
        component: () => import('@/views/lanqing/group/detail/index'),
        meta: { title: '群组详情' },
        hidden: true
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/lanqing/member/index'),
        meta: { title: '用户管理' }
      },
      {
        path: 'memberDetail',
        name: 'MemberDetail',
        component: () => import('@/views/lanqing/member/detail/index'),
        meta: { title: '用户详情' },
        hidden: true
      },
      {
        path: 'operate',
        name: 'Operate',
        component: () => import('@/views/lanqing/operate/index'),
        meta: { title: '运营费用管理' }
      },
      {
        path: 'operateEdit',
        name: 'OperateEdit',
        component: () => import('@/views/lanqing/operate/edit/index'),
        meta: { title: '运营费用编辑' },
        hidden: true
      },
      {
        path: 'operateDetail',
        name: 'OperateDetail',
        component: () => import('@/views/lanqing/operate/detail/index'),
        meta: { title: '运营费用详情' },
        hidden: true
      },
      {
        path: 'growUp',
        name: 'GrowUp',
        component: () => import('@/views/lanqing/growUp/index'),
        meta: { title: '成长记录' }
      },
      {
        path: 'growEdit',
        name: 'GrowEdit',
        component: () => import('@/views/lanqing/growUp/edit/index'),
        meta: { title: '编辑记录' },
        hidden: true
      },
      {
        path: 'classJoin',
        name: 'ClassJoin',
        component: () => import('@/views/lanqing/classList/join'),
        meta: { title: '添加类目' },
        hidden: true
      },
      {
        path: 'classList',
        name: 'ClassList',
        component: () => import('@/views/lanqing/classList/typeList'),
        meta: { title: '类目列表' }
      },
      {
        path: 'typeListLevelTwo',
        name: 'TypeListLevelTwo',
        component: () => import('@/views/lanqing/classList/typeListLevelTwo'),
        meta: { title: '二级类目列表' },
        hidden: true
      },
      {
        path: 'tuitionList',
        name: 'TuitionList',
        component: () => import('@/views/lanqing/tuition'),
        meta: { title: '奖学金列表' }
      },
      {
        path: 'refundList',
        name: 'RefundList',
        component: () => import('@/views/lanqing/refund'),
        meta: { title: '退款列表' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/lanqing/setting/index'),
        meta: { title: '配置管理' }
      },
      {
        path: 'bannerList',
        name: 'BannerList',
        component: () => import('@/views/lanqing/banner/index'),
        meta: { title: 'banner列表' }
      },
      {
        path: 'bannerEdit',
        name: 'BannerEdit',
        component: () => import('@/views/lanqing/banner/edit'),
        meta: { title: 'banner编辑' },
        hidden: true
      },
      {
        path: 'cashOutList',
        name: 'CashOutList',
        component: () => import('@/views/lanqing/cashOut'),
        meta: { title: '提现列表' }
      },
      {
        path: 'versonAdd',
        name: 'versonAdd',
        component: () => import('@/views/lanqing/verson'),
        meta: { title: '版本管理' }
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import('@/views/lanqing/talentShow/show'),
        meta: { title: '才艺秀列表' }
      },
      {
        path: 'showEdit',
        name: 'ShowEdit',
        component: () => import('@/views/lanqing/talentShow/show/showEdit'),
        meta: { title: '才艺秀编辑' },
        hidden: true
      },
      {
        path: 'complaintList',
        name: 'ComplaintList',
        component: () => import('@/views/lanqing/talentShow/complaintList'),
        meta: { title: '投诉列表' }
      },
      {
        path: 'compositionList',
        name: 'CompositionList',
        component: () => import('@/views/lanqing/talentShow/compositionList'),
        meta: { title: '才艺秀作品列表' },
        hidden: true
      },
      {
        path: 'compositionDetail',
        name: 'CompositionDetail',
        component: () => import('@/views/lanqing/talentShow/compositionList/compositionDetail'),
        meta: { title: '才艺秀作品详情' },
        hidden: true
      },
      {
        path: 'rewarList',
        name: 'RewardList',
        component: () => import('@/views/lanqing/talentShow/rewardList'),
        meta: { title: '才艺秀奖励列表' },
        hidden: true
      }
    ]
  },

  /* --add*/
  {
    path: '/dataAnalysis',
    component: Layout,
    name: 'dataAnalysis',
    meta: { title: '数据分析', icon: '' },
    children: [
      {
        path: 'articleData',
        name: 'articleData',
        component: () => import('@/views/dataAnalysis/articleData'),
        meta: { title: '文章数据', icon: '' }
      },
      {
        path: 'AppData',
        name: 'AppData',
        component: () => import('@/views/dataAnalysis/AppData'),
        meta: { title: '应用数据', icon: 'tree' }
      }
    ]
  },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '会员管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// router.beforeEach((to, from, next) => {
//   if (getUserId()) { // 通过vuex state获取当前的token是否存在
//     next()
//   } else { // token失效的情况
//     next({
//       path: '/login'
//       // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//     })
//   }
// })

export default router
