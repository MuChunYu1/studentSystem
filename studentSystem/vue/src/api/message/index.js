import req from '@/utils/req';

// 获取所有信息
export const reqFindAllMessage = () => req.get('/message/findAllMessage')

// 获取分页查询后的信息 接口： /message/findPageMessage?currentPage={currentPage}&limit={limit}
export const reqFindPageMessage = (currentPage,limit) => req.get(`/message/findPageMessage?currentPage=${currentPage}&limit=${limit}`)

// 添加信息
export const reqAddMessage = (messageInfo) => req.post('/message/addMessage',messageInfo)
// 修改信息
export const reqUpdateMessage = (messageInfo) => req.put('/message/updateMessage',messageInfo)

// 删除信息
export const reqDeleteMessage = (messageId) => req.delete(`/message/deleteMessage?messageId=${messageId}`)

// 批量删除信息
export const reqBatchDeleteMessage = (messageIdArr) => {
  return req.delete(`/message/batchDeleteMessage?messageIdArr=${messageIdArr}`)
}

// 根据信息类型查询信息
export const reqFindMessage = (issue) => req.get(`/message/findMessage?issue=${issue}`)

// 根据处理状态查询信息
export const reqStateMessage = (state) => req.get(`/message/findStateMessage?state=${state}`)

