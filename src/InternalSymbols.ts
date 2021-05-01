const internalAliasLabel = 'INTERNAL_ALIAS_KEY';
const internalAliasKey: unique symbol = Symbol(internalAliasLabel);
const hostIDKey: unique symbol = Symbol('HOST_ID');

export { internalAliasKey, hostIDKey };
