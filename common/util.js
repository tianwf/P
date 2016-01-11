require.config({
    baseUrl : "../",
    
    map: {
        '*': {
            'style': 'lib/requirejs/css.min'
        }
    },
    /**/
    paths : {
        /*
        *   避免js文件名和映射名相同，防止打包时被当做js文件重命名
        */
        'jquery' : 'lib/jquery/jquery_1.11.3',
        'hdb' : 'lib/handlebars/handlebars_v4.0.4',
        'hdbHelper' : 'lib/handlebars/helpers',
        'backbone' : 'lib/backbone/1.2.1/m',
        'underscore' : 'lib/underscore/1.8.3/m',
        'pagination':'lib/pagination/1.2.1/jquery.pagination',
        /*
        'cookie' : 'assets/common/cookie',
        'text' : 'assets/lib/requirejs/text',
        'json2' : 'assets/lib/json2/json2',
        'blockUI' : 'assets/lib/blockUI/2.64/jquery.blockUI.min',
        'artDialog' : 'assets/lib/dialog/6.0.4/dialog',
        'dialog' : 'assets/common/dialog_amd',
        'ajax' : 'assets/common/ajax_amd',
        'svMap' : 'assets/common/svConfig',
        'pager' : 'assets/common/pager_amd',
        'Util' : 'assets/common/global',
        'datepiker' : 'assets/lib/datepiker/WdatePicker',
        'pop': 'assets/common/pop_amd',
        'tabs': 'assets/common/tab_amd',
        'busiComm': 'assets/common/busiComm'
        */
    },
    
    shim:{
        'hdb':{
            exports:['Handlebars']
        },
        'hdbHelper':{
            deps:['hdb']
        },
        
        /*
        'ajax':{
            deps:['jquery']
        },
        'artDialog': {
            deps:['jquery']
        },
        'dialog': {
            deps:['artDialog'],
            exports: 'dialog'
        },
        'datepiker' : {
            deps:['jquery'],
            exports:'datepiker'
        }
        */
    }
    
});

/*
*   @author: fany
*   @date:2015-09-28
*   @desc:全局公用模块
*       大部分业务模块都会用到，业务模块只需引用此公用模块，无需单个添加。
*       打包工程时，保证公用模块只打包一次，防止重复打包或未打包等情况造成程序出错。例：tableTpl.js
*/
define([
    'jquery',
    'backbone',
    'hdb',
    'pagination',

    'hdbHelper',
    /*
    'cookie',
    'ajax',
    'svMap',
    'pager',
    'dialog',
    'pop',
    'tabs',
    'busiComm',
    'json2',
    'hdbHelper'*/

//Backbone,cookie,$, ajax, svMap, pager, dialog,hdb,pop,tabs,busiComm, eventTarget
], function($,Backbone,hdb) {
    return {
        $: $,
        Backbone:Backbone,
        hdb: hdb,
        /*
        cookie:cookie,
        ajax: ajax,
        svMap: svMap,
        pager: pager,
        dialog: dialog,
        tips: pop,
        tabs: tabs,
        busiComm: busiComm
        */
    }
});