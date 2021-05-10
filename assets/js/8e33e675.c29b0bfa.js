(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[590],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=r.createContext({}),l=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(o.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,g=m["".concat(o,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(g,c(c({ref:t},p),{},{components:n})):r.createElement(g,c({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,c=new Array(i);c[0]=m;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s.mdxType="string"==typeof e?e:a,c[1]=s;for(var l=2;l<i;l++)c[l]=n[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2163:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return c},metadata:function(){return s},toc:function(){return o},default:function(){return p}});var r=n(2122),a=n(9756),i=(n(7294),n(3905)),c={},s={unversionedId:"recipes",id:"recipes",isDocsHomePage:!1,title:"Recipes",description:"Selecting elements by XPath",source:"@site/docs/recipes.md",sourceDirName:".",slug:"/recipes",permalink:"/cypress-selectors/recipes",editUrl:"https://github.com/anton-kravchenko/cypress-selectors/edit/master/docs/docs/recipes.md",version:"current",frontMatter:{},sidebar:"docs",previous:{title:"`By` namespace",permalink:"/cypress-selectors/api-reference/by"},next:{title:"Motivation",permalink:"/cypress-selectors/motivation"}},o=[{value:"Selecting elements by <strong>XPath</strong>",id:"selecting-elements-by-xpath",children:[]},{value:"Linking parent element via <em>reference</em>",id:"linking-parent-element-via-reference",children:[]},{value:"Linking parent element via <code>parentAlias</code> attribute",id:"linking-parent-element-via-parentalias-attribute",children:[]},{value:"Searching by non-default <strong>attribute</strong>",id:"searching-by-non-default-attribute",children:[]},{value:"Selecting elements by <strong>index</strong>",id:"selecting-elements-by-index",children:[]},{value:"Specifying custom <strong>timeout</strong> for selectors",id:"specifying-custom-timeout-for-selectors",children:[]},{value:"Implementing <strong>Page Objects</strong>",id:"implementing-page-objects",children:[]}],l={toc:o};function p(e){var t=e.components,n=(0,a.Z)(e,["components"]);return(0,i.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"selecting-elements-by-xpath"},"Selecting elements by ",(0,i.kt)("strong",{parentName:"h3"},"XPath")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selector {\n  @ByXPath(`//div[@cypress-id='app']/div[@cypress-id='children']`) static app: Selector;\n  @ByXPath(`count(//div)`) static numberOfDivElements: Selector;\n}\n")),(0,i.kt)("h3",{id:"linking-parent-element-via-reference"},"Linking parent element via ",(0,i.kt)("em",{parentName:"h3"},"reference")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ById('main') static parent: Selector;\n\n  @ByClass('button', { parent: Selectors.parent })\n  static children: Selector; // equivalent of - cy.get('#main .button')\n}\n")),(0,i.kt)("h3",{id:"linking-parent-element-via-parentalias-attribute"},"Linking parent element via ",(0,i.kt)("inlineCode",{parentName:"h3"},"parentAlias")," attribute"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  @ById('main', { alias: 'root' })\n  static parent: Selector;\n\n  @ByClass('button', { parentAlias: 'root' })\n  static children: Selector; // equivalent of - cy.get('#main .button')\n}\n")),(0,i.kt)("h3",{id:"searching-by-non-default-attribute"},"Searching by non-default ",(0,i.kt)("strong",{parentName:"h3"},"attribute")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selector {\n  @ByAttribute('submit', { attribute: 'cy-data' })\n  static customAttribute: Selector;\n}\n")),(0,i.kt)("h3",{id:"selecting-elements-by-index"},"Selecting elements by ",(0,i.kt)("strong",{parentName:"h3"},"index")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selector {\n  @ByAttribute('row', { eq: 0 }) static firstRow: Selector;\n  @ByAttribute('row', { eq: 1 }) static secondRow: Selector;\n}\n")),(0,i.kt)("h3",{id:"specifying-custom-timeout-for-selectors"},"Specifying custom ",(0,i.kt)("strong",{parentName:"h3"},"timeout")," for selectors"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class Selectors {\n  /* Will try to find an element for up to 10 seconds */\n  @ById('main', { timeout: 10 * 1000 }) static parent: Selector;\n  /* By default, timeout for any selector is inherited from \"defaultCommandTimeout\" value of Cypress configuration */\n  @ById('app') static parent: Selector;\n}\n")),(0,i.kt)("h3",{id:"implementing-page-objects"},"Implementing ",(0,i.kt)("strong",{parentName:"h3"},"Page Objects")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"class SearchPagePO {\n  @ById('input') searchInput!: Selector;\n  @ByAttribute('submit-search') submitSearch!: Selector;\n\n  searchFor(term: string): SearchPagePO {\n    this.searchInput.type(term);\n    this.submitSearch.click();\n    return this;\n  }\n}\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/"},"PageObject is considered to be an anti-pattern")," although."))}p.isMDXComponent=!0}}]);