var express = require('express');
var router = express.Router();


var arr = [
  {
    name:"DD",
    sex:"man",
    desc:"stupid",
    password:"123",
    num:0
  },
  {
    name:"QQ",
    sex:"man",
    desc:"foolish",
    password:"321",
    num:1
  }
]
/* GET home page. */
router.get('/', function(req, res, next) {
  //req 客户端请求
  console.log(req.cookies);
  //后盾设置cookie
  res.cookie("name", "DD");
  res.render('index', { title: 'Express' });
});


//登录路由
router.post('/login_username',function (req,res,next) {
    //取用户名 密码 获取了
  const {name, pwd} = req.body;
  const index = arr.findIndex(item => (item.name == name&&item.password == pwd))
  res.cookie('num', arr[index].num);
  res.send(`
         <h1>登录成功！欢迎回来${arr[index].name}</h1>
  `)
});

router.get('/user_msg', (req,res,next)=>{
  let num = Number(req.cookies.num)
  const userInfo = arr[num];

  res.send(`
      <div>
          <h1>用户名：${userInfo.name}</h1>
          <h2>用户描述：${userInfo.desc}</h2>
    
      </div>
  `)
});

module.exports = router;
