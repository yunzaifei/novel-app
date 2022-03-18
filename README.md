使用 react-native 开发的小说 app，使用 typescript。

## 第三方组件

### react-navigation

官网：[https://reactnavigation.org/](https://reactnavigation.org/)

- 安装

```
yarn add @react-navigation/native

// Stack navigation
yarn add @react-navigation/stack

// Tab navigation
yarn add @react-navigation/bottom-tabs

// Drawer navigation
yarn add @react-navigation/drawer
```

- 依赖项

```
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

要完成安装`react-native-gesture-handler`，请在项目文件的入口文件添加以下内容，例如`index.js`或`App.js`：

```
import 'react-native-gesture-handler';
```

### react-native-vector-icons

官网：[https://github.com/oblador/react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

```
yarn add react-native-vector-icons
```

### styled-components

官网：[https://styled-components.com/docs/basics](https://styled-components.com/docs/basics)

```
yarn add styled-components
```

在'react-native'中引用方式如下

```
import styled from 'styled-components/native'
```

## 项目配置

### 自定义路径别名(typescript)

1. 编辑您的文件`tsconfig.json`

```
    "target": "esnext",
     "baseUrl": ".",
     "paths": {
       "*": ["src/*"],
       "tests": ["tests/*"],
       "@components/*": ["src/components/*"],
     },
    }
```

2. 添加开发包`babel-plugin-module-resolver`到项目

```
yarn add -D babel-plugin-module-resolver
```

3. 配置`babel.config.js`

```
{
  plugins: [
    [
       'module-resolver',
       {
         root: ['./src'],
         extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
         alias: {
           "tests": ["./tests/"],
           "@components": "./src/components",
         }
       }
     ]
  ]
}
```

## LICENCE

[GNU General Public License v2.0](./LICENCE)
