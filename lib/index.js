module.exports = function ({ types: t }) {
    const defaultTargets = ['img','video','audio'];
    return {
        visitor: {
            JSXOpeningElement(path,state){
                const options = state.opts;
                validateOption(options)
                const basePath = normalizeBasePath(options.basePath);
                const targetTags = options.targetTags || defaultTargets;

                const node = path.node;
                const tag = node.name.name;
                if(targetTags.includes(tag)){
                    const srcAttr = node.attributes.find(attr=>attr.name.name === 'src');
                    if(srcAttr){
                        const isString = t.isStringLiteral(srcAttr.value);
                        const srcValue = srcAttr.value.value;
                        if(isString){
                            if(!srcValue.startsWith('http')){
                                srcAttr.value.value = `${basePath}${srcValue}`;
                            }
                        }else{
                            const variableName = srcAttr.value.expression.name;
                            const binding = path.scope.getBinding(variableName);
                            const init = binding.path.node.init;

                            if(!binding.path.isImportSpecifier()){
                                if(t.isStringLiteral(init)){
                                    if(!init.value.startsWith('http')){
                                        init.value = `${basePath}${init.value}`;
                                    }
                                }
                            }else{
                                throw new Error('Import specifier is not supported yet.')
                            }
                        }
                    }
                }
            }
        },
    };
};

function validateOption(options){
    if(!options.basePath) throw new Error('basePath is required');
}

function normalizeBasePath(basePath){
    return basePath.endsWith('/') ? basePath.slice(0,-1) : basePath;
}

