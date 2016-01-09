
define(['../common/util', 'lib/requirejs/text!tpl/list.tpl', 
        'lib/requirejs/text!tpl/list.tpl'], 
    function(Util, tpl,itemTpl){
    var Model = Backbone.Model.extend({});
    var Collection = Backbone.Collection.extend({
        model:Model
    });

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
            Util.$.ajax({
                url:options.data.url,
                dataType:'json',
                success:$.proxy(this.load,this),
                error:function(err){
                    debugger;
                }
            })
        },
        addOne:function(i,model){
            var listItem = new ListItem({ model:model, listOptions:this.options });
            $('tbody',this.el).append(listItem.render().el);
        },
        load:function(result){
            this.collection = new Collection(result.beans);
            Util.$.each(this.collection.models, $.proxy(this.addOne,this));
            //console.log(result)
        }
    });

    var ListItem = Util.Backbone.View.extend({
        tagName:'tr',
        events:{
            'click    td':'cellClick',
            'click    ':'rowClick'

        },
        //template:Util.hdb.compile(itemTpl),
        initialize:function(options){
            this.options = options;
            var tpl = '';
            $.each(options.listOptions.field.items,function(i,item){
                tpl+='<td>{{'+item.name+'}}</td>';
            });
            if (options.listOptions.field.button){
                tpl+='<td>';
                $.each(options.listOptions.field.button.items,function(i,item){
                    tpl+='<a href="###">'+item.text+'</a>';
                });
                tpl+='</td>';
            }

            this.template = Util.hdb.compile(tpl);
            //console.log(template)
            //tpl+='tr';
        },
        render:function(model){
            var tpl = '';
            
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        cellClick:function(e){
            var $src = $(e.currentTarget);
            this.trigger('cellClick', e, this.model.toJSON(), $src.text());
            this.trigger('rowClick', e, this.model.toJSON());

            //console.log(this.model.toJSON())
        },
        rowClick:function(e){
            var $src = $(e.currentTarget);
            // this.trigger('cellClick', e, this.model.toJSON(), $src.text());
            // this.trigger('rowClick', e, this.model.toJSON());

            console.log($src)
        }
    });

    var ListItemCell = Backbone.View.extend({
        el:'td',
        initialize:function(options){

        },
        render:function(){
            this.$el.html(this.options);
        }
    })
    /*
    */
    return objClass;
});
