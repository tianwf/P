
define(['../common/util', 'lib/requirejs/text!tpl/list.tpl', 
        'lib/requirejs/text!tpl/list.tpl','style!css/list.css'], 
    function(Util, tpl,itemTpl){
    var Model = Backbone.Model.extend({});
    var ListItemCellModel = Backbone.Model.extend({});
    var Collection = Backbone.Collection.extend({
        model:Model
    });

    var addOne = function(i,model){
        var listItem = new ListItem({ model:model, listOptions:this.options });
        $('tbody',this.el).append(listItem.render().el);
        listItem.on('rowClick',$.proxy(function(e, data){
            if (this.options && this.options.events && this.options.events.rowClick){
                this.options.events.rowClick.call(this,e,data);
            }
            this.trigger('rowClick',e,data);
        },this));
        listItem.on('cellClick',$.proxy(function(e, data,text){
            if (this.options && this.options.events && this.options.events.cellClick){
                this.options.events.cellClick.call(this,e,data,text);
            }
            this.trigger('cellClick',e,data,text);
        },this));

    }

    var pageInit=function(result){
        if (!this.loaded){
            this.loaded = 1;
            $('tfoot .pagination',this.el).pagination( result.bean.total , {
                'items_per_page'      : this.options.page.perPage,
                'current_page': 0 ,
                'num_display_entries' : 3,
                'num_edge_entries'    : 1,  
                //'link_to': '#tradeRecordsIndex' ,
                'prev_text'           : "<",  
                'next_text'           : ">",  
                'call_callback_at_once' : false,  //控制分页控件第一次不触发callback.
                'callback': $.proxy(function(pageIndex, $page){  
                    load.call(this,pageIndex);
                    //Util.pagination(page_index , false , pageParams , str );  
                },this)
            });
        }
    }
    var load=function(pageIndex,searchParam){
        var url = this.options.data.url;
        var pageIndex = pageIndex || 0;
        var perPage = this.options.page.perPage || 3;
        var start = pageIndex*perPage;
        // start limit
        if (url.indexOf('?') < 0){
            url+='?';
        }else{
            url+='&';
        }
        url += 'start='+start+'&perPage='+perPage;
        $('tbody',this.el).empty();
        Util.$.ajax({
            url:url,
            dataType:'json',
            data:searchParam,
            success:$.proxy(function(result){
                loadHandle.call(this,result);
                pageInit.call(this,result);
            },this),
            error:function(err){
                console.log('集成组件-列表 数据加载失败');
            }
        });
    }
    var loadHandle=function(result){
        this.collection = new Collection(result.beans);
        Util.$.each(this.collection.models, $.proxy(addOne,this));
        if (this.options && this.options.events && this.options.events.afterBuild){
            this.options.events.afterBuild.call(this,this.collection.models);
        }
    }
    var objClass = Util.Backbone.View.extend({
        events:{
            //'':''
        },
        template:Util.hdb.compile(tpl),
        initialize:function(options){
            if (options && options.el){
                this.$el = $(options.el);
            }
            this.options = options;
            this.$el.html(this.template(options));
        },
        search:function(searchParam){
            load.call(this,0,searchParam);
        }
    });

    var ListItem = Util.Backbone.View.extend({
        tagName:'tr',
        events:{
            //'click    td':'cellClick',
            'click    ':'rowClick'

        },
        //template:Util.hdb.compile(itemTpl),
        initialize:function(options){
            this.options = options;
            var tpl = '';
            this.cells = [];
            var json = this.model.toJSON();
            $.each(options.listOptions.field.items,$.proxy(function(i,item){
                var cellView = new ListItemCellView({ config:item,data:json });
                this.$el.append(cellView.render().el);
            },this));

            var $buttonCell = $('<td></td>');
            this.$el.append($buttonCell);
            $.each(options.listOptions.field.button.items,$.proxy(function(i,item){
                var buttonView = new ListItemButtonView({ config:item,data:json });
                $buttonCell.append(buttonView.render().el);
            },this));

            // if (options.listOptions.field.button){
            //     tpl+='<td>';
            //     $.each(options.listOptions.field.button.items,function(i,item){
            //         tpl+='<a href="###">'+item.text+'</a>';
            //     });
            //     tpl+='</td>';
            // }

            // this.template = Util.hdb.compile(tpl);
            //console.log(template)
            //tpl+='tr';
        },
        render:function(model){
            // var tpl = '';
            //this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        cellClick:function(e, cellConfig){
            var $src = $(e.currentTarget);
            this.trigger('cellClick', e, cellConfig);
        },
        rowClick:function(e){
            var $src = $(e.currentTarget);
            this.trigger('rowClick', e, this.model.toJSON());
        }
    });

    var ListItemButtonView = Backbone.View.extend({
        tagName:'a',
        events:{
            'click':'buttonClick'
        },
        initialize:function(options){
            this.$el.attr('href','###');
            this.options = options;
        },
        render:function(){
            this.$el.html(this.options.config.text);
            return this;
        },
        buttonClick:function(e){
            if (this.options && this.options.config && this.options.config.click){
                this.options.config.click.call(this,e,this.options);
            }
        }
    });

    var ListItemCellView = Backbone.View.extend({
        tagName:'td',
        events:{
            'click':'cellClick'
        },
        initialize:function(options){
            this.options = options;
        },
        render:function(){
            var cellVal = this.options.data[this.options.config.name];
            if (this.options.config.render){
                cellVal = this.options.config.render.call(this,this.options.data,cellVal);
            }
            this.$el.html(cellVal);
            return this;
        },
        cellClick:function(e){
            if (this.options && this.options.config && this.options.config.click){
                this.options.config.click.call(this,e,this.options);
            }
            //this.trigger('click', e,this.options);
        }
    });
    /*
    */
    return objClass;
});
