# babel-plugin-jsx-src-basepath

[npm](https://www.npmjs.com/package/babel-plugin-jsx-src-basepath)

This plugin is replace src attribute in jsx except start with http or https.    
It is useful when you want to replace the base path of the image or video or audio tag. (ex: using static file with CDN)  

You can Custumize target tags by option.

## Install

```bash
npm install -D babel-plugin-jsx-src-basepath
```

## Usage

> Use only in production environment because if you using devServer in webpack or watch .. etc, it replaced in every time.

```js

const isProduction = process.env.NODE_ENV === 'production';

{
  "plugins": [
    ["babel-plugin-jsx-src-basepath", {
        isProduction && [
            'babel-plugin-jsx-src-basepath',
        {
        basePath:'https://cdn.example.com',
        targetTags:['img','video','audio']
        }
    ].filter(Boolean)
  ]
}
```

## Options

| Name | Type | Default                 | Description |
| ---- | ---- |-------------------------| ----------- |
| basePath | string | undefeind(required)     | base path |
| targetTags | string[] | ['img','video','audio'] | target tags |


## Example

```jsx
const url = '/test.png';

// before
<img src="/images/1.jpg" />
<img src="/images/2.jpg" />
<img src="/images/3.jpg" />
<img src="https://public.image.jpg" />
<img src={url} />
 
// after
<img src="https://cdn.example.com/images/1.jpg" />
<img src="https://cdn.example.com/images/2.jpg" />
<img src="https://cdn.example.com/images/3.jpg" />
<img src="https://public.image.jpg" />
<img src="https://cdn.example.com/test.jpg" />

```

## ❗️Caution

- If src value reference to variable, It's must defined in the same file.( Not support import or require )
- if src starts with http or https, it will not be replaced.
- If src value is state or props, it will not be replaced.(only string variable)

## Contributing

Always welcome for your contribution.  
Improve this feature for working with import or require and state etc.