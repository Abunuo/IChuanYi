var waterlist = require('./waterlist');
var bibei=require('./bibei.js');
var gouwu=require('./gouwu.js');
var products=require('./products.js');
var qianggou=require('./qianggou.js');
var listrefresh=require('./productMore.js');
var listmore=require('./productRefresh.js');
var receptions=require('./receptions.js');
var adress=require('./adress.js');

module.exports = function() {
    return {
        'list':waterlist,
        'bibei':bibei,
        'gouwu':gouwu,
        'products':products,
        'qianggou':qianggou,
        'listrefresh':listrefresh,
        'listmore':listmore,
        'receptions':receptions,
        'adress':adress
    }
}
