(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[812],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=l(n),m=a,g=u["".concat(p,".").concat(m)]||u[m]||d[m]||o;return n?r.createElement(g,i(i({ref:t},c),{},{components:n})):r.createElement(g,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},3494:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return s},toc:function(){return p},default:function(){return c}});var r=n(2122),a=n(9756),o=(n(7294),n(3905)),i={},s={unversionedId:"getting-started/set-up",id:"getting-started/set-up",isDocsHomePage:!1,title:"Set Up",description:"Installation",source:"@site/docs/getting-started/set-up.md",sourceDirName:"getting-started",slug:"/getting-started/set-up",permalink:"/cypress-selectors/getting-started/set-up",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/main/docs/docs/getting-started/set-up.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Basic usage",permalink:"/cypress-selectors/getting-started/basic-usage"},next:{title:"Selectors",permalink:"/cypress-selectors/api-reference/selectors"}},p=[{value:"Installation",id:"installation",children:[]},{value:"Configuring <code>ts-loader</code>",id:"configuring-ts-loader",children:[]},{value:"Configuring <code>babel-loader</code>",id:"configuring-babel-loader",children:[]},{value:"Configuring <code>TypeScript</code>",id:"configuring-typescript",children:[]}],l={toc:p};function c(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"installation"},"Installation"),(0,o.kt)("p",null,"Via ",(0,o.kt)("inlineCode",{parentName:"p"},"npm"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npm i -D cypress-selectors\n")),(0,o.kt)("p",null,"Via ",(0,o.kt)("inlineCode",{parentName:"p"},"yarn"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add cypress-selectors\n")),(0,o.kt)("h3",{id:"configuring-ts-loader"},"Configuring ",(0,o.kt)("inlineCode",{parentName:"h3"},"ts-loader")),(0,o.kt)("p",null,"If you're using ",(0,o.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/"},"TypeScript"),", you'll need to setup ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/TypeStrong/ts-loader"},"ts-loader"),"."),(0,o.kt)("p",null,"Setup ",(0,o.kt)("a",{parentName:"p",href:"https://webpack.js.org/"},"webpack")," to use ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/TypeStrong/ts-loader"},"ts-loader"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-typescript"},"const path = require('path');\n\nmodule.exports = {\n  entry: './main.ts',\n  mode: 'production',\n  target: 'node',\n  module: {\n    rules: [{ test: /\\.ts?$/, use: 'ts-loader', exclude: /node_modules/ }],\n  },\n  resolve: { extensions: ['.ts'] },\n  output: {\n    filename: 'main.js',\n    path: path.resolve(__dirname, 'dist'),\n    libraryTarget: 'commonjs2',\n  },\n};\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This is the preferred way of setting up the project. ",(0,o.kt)("inlineCode",{parentName:"p"},"child-parent")," linking doesn't work if the code is being transpiled via ",(0,o.kt)("inlineCode",{parentName:"p"},"babel-loader"),"."))),(0,o.kt)("h3",{id:"configuring-babel-loader"},"Configuring ",(0,o.kt)("inlineCode",{parentName:"h3"},"babel-loader")),(0,o.kt)("p",null,"Configure ",(0,o.kt)("inlineCode",{parentName:"p"},".babelrc")," to enable support of ",(0,o.kt)("inlineCode",{parentName:"p"},"decorators")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"class properties"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "presets": ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],\n  "plugins": [\n    ["@babel/plugin-proposal-decorators", { "legacy": true }],\n    "@babel/plugin-proposal-class-properties"\n  ]\n}\n')),(0,o.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If you're using ",(0,o.kt)("inlineCode",{parentName:"p"},"babel-loader")," for transpiling your tests, ",(0,o.kt)("inlineCode",{parentName:"p"},"child-parent")," linking ",(0,o.kt)("a",{parentName:"p",href:"/cypress-selectors/recipes#linking-parent-element-via-reference"},"via reference")," is not going to work. See ",(0,o.kt)("a",{parentName:"p",href:"/cypress-selectors/caveats#children-parent-linking-via-reference"},"caveats")," page for more details."))),(0,o.kt)("h3",{id:"configuring-typescript"},"Configuring ",(0,o.kt)("inlineCode",{parentName:"h3"},"TypeScript")),(0,o.kt)("p",null,"Enable support of ",(0,o.kt)("a",{parentName:"p",href:"https://www.typescriptlang.org/docs/handbook/decorators.html"},"decorators")," via setting ",(0,o.kt)("inlineCode",{parentName:"p"},"experimentalDecorators")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,o.kt)("p",null,"See the following ",(0,o.kt)("inlineCode",{parentName:"p"},"tsconfig.json")," as a reference:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "compilerOptions": {\n    "experimentalDecorators": true,\n    "outDir": "./dist/",\n    "target": "es5",\n    "lib": ["esnext", "DOM"],\n    "allowJs": false,\n    "strict": true,\n    "forceConsistentCasingInFileNames": true,\n    "module": "commonjs",\n    "moduleResolution": "node",\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "baseUrl": "src",\n    "esModuleInterop": true,\n    "declaration": true,\n    "skipLibCheck": true\n  },\n  "include": ["src", "cypress"]\n}\n')))}c.isMDXComponent=!0}}]);