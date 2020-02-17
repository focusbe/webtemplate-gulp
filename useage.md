# 使用说明

## 命令

```javascript
npm run dev //运行本地测试
npm run build //构建正式发布的代码
npm run pubdev //发布代码到测试环境
npm run cdn //清cdn缓存
npm run clean //清空打包时用到的缓存
```

## 配置

配置文件保存在 config.json

<table>
  <thead>
    <tr>
      <th style="text-align:left">&#x914D;&#x7F6E;&#x5B57;&#x6BB5;</th>
      <th style="text-align:left">&#x914D;&#x7F6E;&#x683C;&#x5F0F;</th>
      <th style="text-align:left">&#x9ED8;&#x8BA4;&#x503C;</th>
      <th style="text-align:left">&#x914D;&#x7F6E;&#x8BF4;&#x660E;</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">src</td>
      <td style="text-align:left">string</td>
      <td style="text-align:left">&quot;src/&quot;</td>
      <td style="text-align:left">&#x6E90;&#x4EE3;&#x7801;&#x76EE;&#x5F55;&#x540D;</td>
    </tr>
    <tr>
      <td style="text-align:left">dist</td>
      <td style="text-align:left">string</td>
      <td style="text-align:left">&quot;dist/&quot;</td>
      <td style="text-align:left">&#x6253;&#x5305;&#x540E;&#x4EE3;&#x7801;&#x4FDD;&#x5B58;&#x7684;&#x76EE;&#x5F55;&#x540D;</td>
    </tr>
    <tr>
      <td style="text-align:left">game</td>
      <td style="text-align:left">string</td>
      <td style="text-align:left">&quot;&quot;</td>
      <td style="text-align:left">&#x6E38;&#x620F;&#x7684;&#x6807;&#x793A;&#xFF0C;&#x5982;&#xFF1A;xx2,balls&#xFF0C;&#x914D;&#x7F6E;&#x597D;&#x53EF;&#x7528;&#x4E8E;&#x53D1;&#x5E03;&#x4EE3;&#x7801;</td>
    </tr>
    <tr>
      <td style="text-align:left">actname</td>
      <td style="text-align:left">string</td>
      <td style="text-align:left">&quot;&quot;</td>
      <td style="text-align:left">&#x6D3B;&#x52A8;&#x540D;&#x79F0;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x6D3B;&#x52A8;&#x7684;&#x76EE;&#x5F55;&#x540D;&#xFF0C;&#x914D;&#x7F6E;&#x597D;&#x53EF;&#x7528;&#x4E8E;&#x53D1;&#x5E03;&#x4EE3;&#x7801;</td>
    </tr>
    <tr>
      <td style="text-align:left">version</td>
      <td style="text-align:left">string</td>
      <td style="text-align:left">&quot;&quot;</td>
      <td style="text-align:left">
        <p>&#x6E38;&#x620F;&#x5B98;&#x7F51;&#x5728;&#x8FED;&#x4EE3;&#x65F6;&#x9700;&#x8981;&#x533A;&#x5206;&#x4E0D;&#x540C;&#x7248;&#x672C;&#x7684;css&#x3001;images
          &#x3001;css&#xFF0C;</p>
        <p>&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x53F7;&#x4F1A;&#x6DFB;&#x52A0;&#x5230;&#x76EE;&#x5F55;&#x4FDD;&#x5B58;&#x7684;&#x76EE;&#x5F55;&#x4E2D;&#x3002;</p>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">proxy</td>
      <td style="text-align:left">Array</td>
      <td style="text-align:left">[]</td>
      <td style="text-align:left">&#x4EE3;&#x7406;&#x6570;&#x7EC4;&#xFF0C;&#x7528;&#x4E8E;&#x65B9;&#x4FBF;&#x672C;&#x5730;&#x8C03;&#x7528;&#x6D4B;&#x8BD5;&#x670D;&#x63A5;&#x53E3;&#x6570;&#x7EC4;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x683C;&#x5F0F;&#x4E3A;{path:&apos;&apos;,target:&quot;&quot;}&#x3002;
        <br
        />path&#x662F;&#x9700;&#x8981;&#x5339;&#x914D;&#x7684;url&#xFF0C;&#x6BD4;&#x5982;&#x2018;*php&#x2018;&#xFF0C;target&#x662F;&#x4EE3;&#x7406;&#x7684;&#x76EE;&#x6807;url&#x3002;</td>
    </tr>
  </tbody>
</table>## 目录

 脚手架支持双端在同一个目录下开发，可以把移动端的文件放在m/下，当然你可以可以使用其他的文件名或者更深的目录都是支持的。

## HTML

html的开发和不使用脚手架并没有什么不同，但是有两个地方做了一些特殊处理——其实是为了更方便的开发

1. 引入less/stylus时直接引入 less/stylus文件，无需把文件后缀换成css，例如 ./css/main.less
2. 引入js/ts文件时 无需修改后缀名或者文件名，直接引入，例如./js/main.ts

## 脚本

#### 语言

脚本语言同时支持javascript和typescript，需要注意的是，只有文件的后缀名为.ts的文件中才可以使用typescript

#### 入口

在以前的项目中，通常是固定某一个脚本文件作为打包的入口，但是这样做对于想要不同页面有不同入口的需求很不方便，为了解决这个问题，采取了以下的策略：

1. 在html以相对路径引入的js文件作为打包的入口
2. 打包的入口可以是多个

#### 注意事项

在开发中有些以相对路径引入的js并不需要打包，比如说swiper.js，在脚手架中考虑到了这个情况，所以在打包之前对入口文件的内容稍作判断，判断在有必要打包的情况下才会采用browserfy打包，无论是需要打包或者不需要打包的脚本文件在html引入的方法都是一致的。

## 样式

#### 支持

脚手架支持 less、stylus，由于sass的环境安装很慢，目前不支持sass。

#### 注意事项

 less、和stylus需要预处理后才能使用，预处理后的文件后缀名是.css，但是在html源代码中引入的时候直接使用.less或者.stylus即可。

## 图片

#### 压缩逻辑

图片的压缩采用了tinypng（熊猫压缩），为了节省上传到代码中的空间，在压缩图片时，先对源文件进行压缩，然后复制到打包后的目录中。

为了避免重复压缩图片，对已经压缩过的图片做了记录，这些信息记录在gulpfile.js/cache/db.json文件中，建议在上传到git时也带上这个文件，这样做的好处是，服务器端构建时知道哪些图片被压缩过，这样就不需要对图片做再次压缩，可以减少时间和资源的不必要的浪费。



## 本地测试

#### 代理

在开发中通常会请求后端接口一起完成页面的逻辑，在本地运行代码时，直接请求接口会有跨域问题，为了解决这个问题可以使用http-proxy-middleware对一些url做一下代理。

#### 默认添加的代理

如果在配置文件中配置了game和actname字段，脚手架会自动为本地服务器的两类url添加代理，分别是"/\*_.php"和"/api/\*_"，代理的目标url是到活动对应的测试环境url，比如http://act.balls.web.ztgame.com/actname

如果自动配置的代理无法满足需求,你也可以通过配置文件的proxy字段中添加更多的代理

#### 登录、注册组件本地运行

在本地调试时还有一个比较棘手的问题是：登录、注册等组件无法正常运行，无法正常运行的原因是跨域问题

为了解决这个问题，只需要添加一条ztgame.com为主域的host即可，比如：local.ztgame.com 127.0.0.1，在本地调试时采用local.ztgame.com访问页面，登录注册组件即可正常使用，

脚手架集成了自动添加 local.ztgame.com 127.0.0.1 的功能，但是由于权限的问题，如果没有管理员权限，无法自动添加成功，可以手动添加或者以管理员的权限运行gulp的任务

## 发布

#### 前提

配置文件中配置了game和actname字段

#### 发布到测试环境

 发布到测试环境只需要把打包后的代码复制到测试环境对应的目录中即可，但是为了避免手动复制的繁琐，脚手架提供了把代码复制到测试环境的命令

```text
npm run pubdev
```

#### 发布到正式环境

 直接将源代码提交到对应的git库，gitlab会自动完成构建

## CDN缓存

发布完成后有时需要手动推送cdn缓存，为了让url更快的生效，脚手架提供了清空当前目录缓存的功能，具体使用方法如下

```text
npm run cleancdn
```

