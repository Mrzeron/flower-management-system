//定义模块
var myapp = angular.module('myapp', ['ngRoute', 'ngAnimate']);

//路由配置


myapp.config(['$routeProvider', function($routeProvider) {
    //忽略路由切换的大小写
    $routeProvider.caseInsensitiveMatch = 'true';
    //定义路由
    $routeProvider
        .when('/main', {
            templateUrl: '/tpls/main.html',
            controller: 'main_controller'
        })
        .when('/list', {
            templateUrl: '/tpls/list.html',
            controller: 'list_controller'
        })
        .when('/del', {
            templateUrl: '/tpls/del.html',
            controller: 'del_controller'
        })
        .when('/add', {
            templateUrl: '/tpls/add.html',
            controller: 'add_controller'
        })
        .otherwise({
            redirectTo: '/main'
        })
}])
myapp.controller('list_controller', ['$route', '$scope', '$window', '$timeout', function($route, $scope, $window, $timeout) {
    $scope.alert_show = false; //定义操作成功提示框
    $scope.btnSure = false; //定义模态框控制框
    $scope.delIndex = ''; //定义要删除的当前索引
    $scope.changeSureValue = function() {
            //将当前选中索引取出来做删除操作
            /*$scope.btnSure = true;*/
            var index = $scope.delIndex;
            //取出数据
            var shops = $window.JSON.parse($window.localStorage.getItem('shops'));
            //删除指定数据
            shops.splice(index, 1);
            //保存至localstorage
            $window.localStorage.setItem('shops', $window.JSON.stringify(shops))
                //更新页面
            $scope.shops = shops;
            $scope.btnSure = false;
            $scope.delIndex = '';
            $scope.alert_show = true;
            $timeout(function() {
                console.log(1)
                $scope.alert_show = false;
            }, 1000)
        }
        //取出tag的名字
    var lists = $window.localStorage.getItem('listTag');
    $scope.lists = $window.JSON.parse(lists);
    //声明tag的颜色种类
    var arrlistColor = ['abel-success', 'label-primary', 'label-info', 'label-warning', 'label-danger'];
    //声明存放标签颜色的数组
    $scope.listColor = [];
    var edit = {};
    for (var i = 0; i < $scope.lists.length; i++) {

        var raMath = Math.floor(Math.random() * 5);
        //给标签随机颜色
        $scope.listColor.push(arrlistColor[raMath]);

    }
    //获取列表数据
    var shops = $window.JSON.parse($window.localStorage.getItem('shops'));
    $scope.shops = shops;
    //给单行编辑变量赋初始值
    for (var j = 0; j < shops.length; j++) {
        edit[j] = true;
    }
    //给单行编辑变量赋初始值
    //删除按钮
    $scope.delTD = function(index) {
            //将当前选中索引存储起来
            $scope.delIndex = index;


        }
        //编辑按钮

    /*$scope.edit = true;*/
    //打开排序锁
    $scope.softOnOff = 'id';
    //打开排序锁
    //将单行锁赋值给M层
    $scope.edit = edit;
    //将单行锁赋值给M层
    //点击编辑
    $scope.changeShops = function(index) {
            $scope.edit[index] = false;
            //关闭排序锁
            $scope.softOnOff = '';
            //关闭排序锁

        }
        //点击保存
    $scope.changeShopsSave = function(index) {

        //取出数据
        var shops = $window.JSON.parse($window.localStorage.getItem('shops'));
        //更新数据
        shops[index].id = $scope.shops[index].id;
        shops[index].price = $scope.shops[index].price;
        shops[index].num = $scope.shops[index].num;
        shops[index].type = $scope.shops[index].type;
        shops[index].discount = $scope.shops[index].discount;
        //保存数据
        $window.localStorage.setItem("shops", $window.JSON.stringify(shops));
        //保存数据
        //单行编辑
        $scope.edit[index] = true;
        //单行编辑
        //打开排序锁
        $scope.softOnOff = 'id';
        $scope.alert_show = true;
        $timeout(function() {
            console.log(1)
            $scope.alert_show = false;
        }, 500)

    }



    $scope.index = 1;
    $scope.$emit('changeIndex', $scope)

}])

myapp.controller('del_controller', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
    //删除指定ID商品
    $scope.hadDel = '';
    $scope.showTitle = true;
    $scope.showWarn = false;
    $scope.delId = function() {
        var index = $scope.IDval - 1; //矫正删除索引误差
        $scope.hadDel = $scope.IDval;
        var shops = $window.JSON.parse($window.localStorage.getItem('shops'));
        //删除指定数据
        if (shops[index]) {
            shops.splice(index, 1);
            //保存至localstorage
            $window.localStorage.setItem('shops', $window.JSON.stringify(shops))
                //更新页面
            $scope.shops = shops;
            $scope.IDval = '';
            $scope.showTitle = false;
            $timeout(function() {
              //操作成功提示
                $scope.showTitle = true;
            }, 1000)

        } else {
            $scope.showWarn = true;
            $timeout(function() {
              //操作失败提示
                $scope.showWarn = false;
            }, 2000)
            $scope.IDval = '';
        }


    }
    $scope.clearId = function() {
        $scope.IDval = '';
        //清空内容
    }
    $scope.index = 2;
    $scope.$emit('changeIndex', $scope)

}])

myapp.controller('add_controller', ['$scope', '$window', '$timeout', function($scope, $window, $timeout) {
    $scope.showTitle = false;//操作成功提示框开关
    $scope.showWarn = false;//操作失败提示框开关
    $scope.addSp = function() {
      //添加商品
        var shops = $window.JSON.parse($window.localStorage.getItem('shops'));
        //判断ID是否存在
        if (!shops[$scope.sp.id]) {
            shops.push($scope.sp);
            $window.localStorage.setItem('shops', $window.JSON.stringify(shops));
            $scope.sp = '';
            $scope.showTitle = true;
            //正确操作提示
            $timeout(function() {
                $scope.showTitle = false;
            }, 700);
        } else {
          //错误操作提示
            $scope.showWarn = true;
            $timeout(function() {
                $scope.showWarn = false;
            }, 2000);
        }


    }
    $scope.clearForm = function() {
        $scope.sp = '';
    }
    $scope.index = 3;
    $scope.$emit('changeIndex', $scope)



}])

myapp.controller('main_controller', function($scope) {
        $scope.index = 0;
        $scope.$emit('changeIndex', $scope);



    })
    //路由结束


myapp.controller('nav-controller', ['$scope', '$http', '$rootScope', '$window', function($scope, $http, $rootScope, $window) {
    //定义list列表数据
    var arrData = [{ "id": 1, "name": "鲜花/幸福久久-戴安娜粉玫瑰99枝，栀子叶适量", "type": "鲜花", "price": 539, "num": 100, "discount": 0.75 },
        { "id": 2, "name": "鲜花/99的爱-香槟玫瑰99枝，尤加利适量", "type": "鲜花", "price": 559, "num": 100, "discount": 0.75 },
        { "id": 3, "name": "鲜花/倾城月色-雪山白玫瑰11枝，搭配适量紫色勿忘我栀子叶", "type": "鲜花", "price": 100, "num": 100, "discount": 0.75 },
        { "id": 4, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 5, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 6, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 7, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 8, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 9, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 10, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 11, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 12, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 13, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 14, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 15, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 16, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 17, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 18, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 19, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 },
        { "id": 20, "name": "好吃点", "type": "鲜花", "price": 10, "num": 100, "discount": 0.75 }
    ];
    //将list列表数据存入localstorage
    $window.localStorage.setItem("shops", $window.JSON.stringify(arrData));
    //将tag数据存入localstorage
    $window.localStorage.setItem('listTag', '["鲜花","永生花","蛋糕","礼品","花语大全","爱情鲜花","送长辈鲜花"]');
    //取出导航数据
    $http.get('/mock/nav.json').then(function(res) {
        $scope.nav = res.data
    }, function() {})

    $scope.$on('changeIndex', function(event, el) {
        $scope.index = el.index;
    })
    $scope.test = function(el) {
        $scope.index = el;

    }

}])
