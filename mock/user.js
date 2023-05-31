const Mock = require('mockjs')

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://avatars.githubusercontent.com/u/475440?s=52&v=4',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://avatars.githubusercontent.com/u/74501447?s=40&v=4',
    name: 'Normal Editor'
  }
}

//重点部分，middlewares就是新增加的，原本只有devServer。
module.exports = function (middlewares) {
	if(process.env.MOCK === 'true') {
    //middlewares.unshift就是之前的before，middlewares.push是after
    middlewares.unshift({
      name: 'mock',
      // `path` 是可选的
      path: '/user/userInfo',
      middleware: (req, res) => {
        let json = users //mock数据的样式，自己新建。
        res.send(Mock.mock(json))
      },
    })
    //return别忘了
    return middlewares
  }
}
