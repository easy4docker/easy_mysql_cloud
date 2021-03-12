<template>
    <div class="body-card card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-2 p-2 m-0 text-left">
                    Databases
                    </div>
                    <div class="col-10 p-2 m-0 text-left">
                    body SQL
                    </div>
                </div>
            </div>
            <div class="container-fluid mt-1 head-menu-2">
            </div>
        </div>
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root :  this.$parent.root,
            module : ''
        }
    },
    mounted() {
        const me = this;
        me.queryDatabases();
    },
    watch : {

    },
    methods :{
        queryDatabases() {
            const me = this;
            me.dataEngine().appPost({}, (result)=> {
                console.log(result);
            }, true);
        }
    }
}
</script>
 
<style>
</style>
