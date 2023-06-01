import Mock from "mockjs"

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

Mock.mock('/dev-api/user/login', 'post', config => {
  const { body } = config
  const { username } = JSON.parse(body)
  const token = tokens[username]

  if (!token) {
    return {
      code: 401,
      message: '用户不存在！'
    }
  } else {
    return {
      code: 200,
      data: token
    }
  }
})

Mock.mock('/dev-api/user/userInfo', 'get', config => {
  const { token } = config.query
  const info = users[token]

  if (!info) {
    return {
      code: 508,
      message: '个人信息不存在！'
    }
  } else {
    return {
      code: 200,
      data: info
    }
  }
})

//重点部分，middlewares就是新增加的，原本只有devServer。
// module.exports = function (middlewares, devServer) {
// 	if(process.env.MOCK === 'true') {
//     //middlewares.unshift就是之前的before，middlewares.push是after
//     middlewares.unshift(
//       {
//         name: 'mock',
//         // `path` 是可选的
//         path: '/dev-api/user/userInfo',
//         middleware: (req, res) => {
//           let json = users
//           res.send(Mock.mock(json))
//         },
//       },
//       {
//         name: 'mock',
//         // `path` 是可选的
//         path: '/dev-api/user/login',
//         middleware: (req, res) => {
//           const { query:{username} } = req
//           console.log(username)
//           const token = tokens[username]

//           if(!token) {
//             res.send(Mock.mock({
//               code: 401,
//               message: '用户不存在！'
//             }))
//           } else {
//             res.send(Mock.mock({
//               code: 200,
//               data: token
//             }))
//           }
//         }
//       },
//     )
//     return middlewares
//   }
// }
