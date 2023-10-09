import request from './request';

export default {
  get: (url,arg) => request({url: url, method: 'get',params: arg}),
  getRestful: (url,arg) => request({url: url + '/' + arg, method: 'get'}),
  post: (url,arg) => request({url: url, method: 'post',data: arg}),
  postFormData: (url,arg) => {
    return request(
      {url: url, method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: arg
    })
  },
  put: (url,arg) => request({url: url, method: 'put',data: arg}),
  delete: (url,arg) => request({url: url, method: 'delete',params: arg}),
  deleteRestful: (url,arg) => request({url: url + '/' + arg, method: 'delete'}),
}
