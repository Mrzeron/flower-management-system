# 花礼网后台实现
## 实现功能
### 主页面

1. 用bootstrap栅格布局实现基本排版
2. 路由跳转 输入URL 导航栏完成自动切换 使用$emit实现
3. 进入页面时 导航栏淡入效果进入
4. mock数据获取导航内容和跳转地址

### 商品列表页
所有数据均为localstorage中存储数据

1. 随机生成顶部tag标签颜色
2. 使用bootstrap实现表格排版
3. 默认使用商品ID排序 通过过滤器orderby实现
4. 编辑操作可对单行内容进行修改 如修改ID会进行重新排序 修改成功后会有提示弹出
5. 删除按钮可出现模态框提示是否确认删除 取消不删除 确定删除 删除成功会有提示弹出

### 删除商品页
1. 输入指定ID 点击可进行商品删除 切换到商品列表页面可发现商品已被删除 成功弹出成功提示
2. 如果ID不存在 会弹出失败提示
3. 清空输入按钮可以清空输入框内容

### 增加商品页
1. 使用bootstrap实现表格实现基本布局
2. 填写表格内表单相应内容点击确定添加 成功弹出成功提示并将商品添加至商品列表 如果ID已存在则弹出错误提示 并不能添加
3. 清空输入按钮可以清空输入框内容 

## 使用说明
使用fekit server -n 启动