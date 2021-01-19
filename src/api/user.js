import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request(
    api.Login,
    'post',
    data
  )
}

// 查询猫头鹰
export function queryMyOwlList(data) {
  return request(
    api.queryMyOwlList,
    'get',
    data
  )
}

// 一键喂养
export function feedMyOwls(params) {
  return request(
    api.feedMyOwls,
    'post',
    params
  )
}

// 我的好友
export function queryMyFriends(params) {
  return request(
    api.queryMyFriends+'/'+params.pageNum,
    'get',
    params
  )
}

// 猫头鹰首页数据
export function getIndexInfo(params) {
  return request(
    api.getIndexInfo,
    'get',
    params
  )
}

// 猫头鹰商店
export function queryPalaceOwls(params) {
  return request(
    api.queryPalaceOwls,
    'get',
    params
  )
}

// 收益列表
export function queryIncomeList(params) {
  return request(
    api.queryIncomeList+'/'+params.pageNum,
    'get',
    params
  )
}

// 公告列表
export function queryNoticeList(params) {
  return request(
    api.queryNoticeList+'/'+params.pageNum,
    'get',
    params
  )
}

// 公告详情
export function readNoticeContent(params) {
  return request(
    api.readNoticeContent,
    'get',
    params
  )
}

// 公告详情
export function createBuyOwlOrder(params) {
  return request(
    api.createBuyOwlOrder,
    'post',
    params
  )
}

// 玩法说明
export function getPlayWay(params) {
  return request(
    api.getPlayWay,
    'get',
    params
  )
}

// 钱包余额
export function queryWalletList(params) {
  return request(
    api.queryWalletList,
    'get',
    params
  )
}

// 提现列表
export function queryWithdrawList(params) {
  return request(
    api.queryWithdrawList+'/'+params.pageNum,
    'get',
    params
  )
}

// 订单支付
export function payOwlOrder(params) {
  return request(
    api.payOwlOrder,
    'post',
    params
  )
}

// 抽奖
export function getdraw(params) {
  return request(
    api.getdraw,
    'post',
    params
  )
}

// 提现
export function withdrawIncome(params) {
  return request(
    api.withdrawIncome,
    'post',
    params
  )
}

// 赚金币
export function verifyZjadReward(params) {
  return request(
    api.verifyZjadReward,
    'post',
    params
  )
}

// 转账记录
export function queryTransaction(params) {
  return request(
    api.queryTransaction+'/'+params.pageNum,
    'restful',
    params
  )
}

// 改昵称
export function updateName(params) {
  return request(
    api.updateName,
    'post',
    params
  )
}

// 统计
export function queryMyTeamOwl(params) {
  return request(
    api.queryMyTeamOwl,
    'get',
    params
  )
}

// 检查idct用户是否注册
export function checkIdct(params) {
  return request(
    api.checkIdct,
    'post',
    params
  )
}