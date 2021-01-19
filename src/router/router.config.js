/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: '/walletAssets/index',
    meta: {
      title: '首页',
      keepAlive: false
    }
  },
  { path: '/home', name: 'home', component: () => import('@/views/home/index') },
  { path: '/scene', name: 'scene', component: () => import('@/components/scene') },
  { path: '/wallet/step1', name: 'step1', component: () => import('@/views/wallet/step1') }, // 创建钱包第1步设置钱包密码
  { path: '/wallet/step2', name: 'step2', component: () => import('@/views/wallet/step2') }, // 创建钱包第2步 生成秘钥和助记词
  { path: '/wallet/mnemonic', name: 'mnemonic', component: () => import('@/views/wallet/mnemonic') }, // 导入助记词
  { path: '/validation/step1', name: 'vdstep1', component: () => import('@/views/validation/step1') }, // 创建钱包第1步 生成私钥
  { path: '/validation/step2', name: 'vdstep2', component: () => import('@/views/validation/step2') }, // 创建钱包第二步 记录私钥
  { path: '/walletAssets/wallet', name: 'wallet', component: () => import('@/views/walletAssets/wallet') }, // 钱包列表
  { path: '/walletAssets/details', name: 'details', component: () => import('@/views/walletAssets/details') }, // 币种交易明细
  { path: '/walletAssets/transfer', name: 'transfer', component: () => import('@/views/walletAssets/transfer') }, // 转账
  { path: '/walletAssets/collection', name: 'collection', component: () => import('@/views/walletAssets/collection') }, // 收款
  { path: '/mall', name: 'mall', component: () => import('@/views/mall/index'),meta: {title: 'Owl World'} }, // 玩法说明
  { path: '/validation/beifen', name: 'beifen', component: () => import('@/views/validation/beifen') },
  { path: '/walletAssets/index', name: 'walletHome', component: () => import('@/views/walletAssets/index') },
  { path: '/wallet/priKey', name: 'priKey', component: () => import('@/views/wallet/priKey') }
]
