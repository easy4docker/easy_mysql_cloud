<template>
    <span>

    </span>    
</template>
 
<script>
module.exports = {
    props : ['item', 'plugin_path'],
    data: function() {
        return {
            root :  this.$parent.root,
            token : '11223344'
        }
    },
    mounted () {
        let me = this;
        // let url = me.plugin_path + '/api/main.js';
        me.$forceUpdate();
    },
    methods :{
    },
    components: VUEApp.loadComponents({
        LOAD    : {
        }, 
        TPL :{
        }
    })
}
</script>
 
<style>
.adupterBody { color: #333 }
</style>
