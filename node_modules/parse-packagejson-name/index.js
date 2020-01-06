var nameRegExp = /^(?:@([^/]+)\/)?(([^\.]+)(?:\.(.*))?)$/;
module.exports = function parsePackageJsonName(name) {
  var returnObject = {
    scope: null,
    fullName: '',
    projectName: '',
    moduleName: '',
  };
  var match = (typeof name === 'object' ? (name.name || '') : name || '').match(nameRegExp);
  if (match) {
    returnObject.scope = match[1] || null;
    returnObject.fullName = match[2] || match[0];
    returnObject.projectName = match[3] === match[2] ? null : match[3];
    returnObject.moduleName = match[4] || match[2] || null;
  }
  return returnObject;
}
