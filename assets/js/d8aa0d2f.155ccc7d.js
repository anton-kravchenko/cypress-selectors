(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[300],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=s(n),d=o,g=f["".concat(c,".").concat(d)]||f[d]||p[d]||a;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},41:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return l},toc:function(){return c},default:function(){return u}});var r=n(2122),o=n(9756),a=(n(7294),n(3905)),i={},l={unversionedId:"api-reference/global-configuration",id:"api-reference/global-configuration",isDocsHomePage:!1,title:"Global configuration",description:"There is also a global configuration that allows to change default attribute, enable logging and specify the way how children elements are being queried.",source:"@site/docs/api-reference/global-configuration.md",sourceDirName:"api-reference",slug:"/api-reference/global-configuration",permalink:"cypress-selectors/api-reference/global-configuration",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/master/docs/docs/api-reference/global-configuration.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"Selector Configuration",permalink:"cypress-selectors/api-reference/selector-configuration"},next:{title:"`By` namespace",permalink:"cypress-selectors/api-reference/by"}},c=[{value:"ConfigureSelectors",id:"configureselectors",children:[]},{value:"ResetSelectorsConfiguration",id:"resetselectorsconfiguration",children:[]}],s={toc:c};function u(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"There is also a ",(0,a.kt)("em",{parentName:"p"},"global")," configuration that allows to change default ",(0,a.kt)("em",{parentName:"p"},"attribute"),", enable logging and specify the way how children elements are being queried."),(0,a.kt)("h3",{id:"configureselectors"},"ConfigureSelectors"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { ConfigureSelectors } from 'cypress-selectors';\n\nConfigureSelectors({\n  defaultAttribute: 'cy-id',\n  isLoggingEnabled: true,\n  searchOnlyFirstLevelDescendants: true,\n});\n")),(0,a.kt)("h4",{id:"defaultattribute"},(0,a.kt)("inlineCode",{parentName:"h4"},"defaultAttribute")),(0,a.kt)("p",null,"The attribute value to be used be default by ",(0,a.kt)("inlineCode",{parentName:"p"},"ByAttribute")," selector."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"Default"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"cypress-id")),(0,a.kt)("h4",{id:"isloggingenabled"},(0,a.kt)("inlineCode",{parentName:"h4"},"isLoggingEnabled")),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," every selector will be logged into the console when being referenced, like the following:"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},'Querying "Selectors.root" by selector: #root')),(0,a.kt)("h4",{id:"searchonlyfirstleveldescendants"},(0,a.kt)("inlineCode",{parentName:"h4"},"searchOnlyFirstLevelDescendants")),(0,a.kt)("p",null,"It ",(0,a.kt)("inlineCode",{parentName:"p"},"true")," the lib will be querying ",(0,a.kt)("a",{parentName:"p",href:"https://api.jquery.com/child-selector/"},"first-level descendants (via '>')")," when resolving ",(0,a.kt)("em",{parentName:"p"},"child-parent")," relationship."),(0,a.kt)("p",null,"If ",(0,a.kt)("inlineCode",{parentName:"p"},"false")," the lib will be querying ",(0,a.kt)("a",{parentName:"p",href:"https://api.jquery.com/descendant-selector/"},"any-level descendants (via ' ')")," when resolving ",(0,a.kt)("em",{parentName:"p"},"child-parent")," relationship."),(0,a.kt)("h3",{id:"resetselectorsconfiguration"},"ResetSelectorsConfiguration"),(0,a.kt)("p",null,"To reset the configuration to defaults call ",(0,a.kt)("inlineCode",{parentName:"p"},"ResetSelectorsConfiguration"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"import { ResetSelectorsConfiguration } from 'cypress-selectors';\n\nResetSelectorsConfiguration();\n")))}u.isMDXComponent=!0}}]);