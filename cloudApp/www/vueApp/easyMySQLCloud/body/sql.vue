<template>
    <div class="body-card card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-3 p-2 m-0 ">
                        <div class="p-1 text-center"><b>Databases</b></div>
                        <div v-for="o in databases" class="border border-secondary rounded m-1 p-1 text-left">
                        {{o.Database}}
                        </div>
                    </div>
                    <div class="col-9 p-2 m-0 text-left">
                        <div class="form-group">
                            <label class="pl-3">Query:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="pl-3">Result:</label>
                            <div class="overflow-auto result-section p-3 rounded bg-dark border-secondary">
                                <pre class="text-success p-1">{{queryResult}}</pre>
                            </div>
                        </div>
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
            databases : [],
            currentDatabase : '',
            querySQL : '',
            queryResult : {}
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
            me.root.dataEngine().appPost({
                cmd : 'query',
                sql : 'SHOW DATABASES'
            }, (result)=> {
                me.databases = result.result;
                me.queryResult = result;
                console.log(result);
            }, true);
        }
    }
}
</script>
 
<style>
.result-section {
    height: 26rem; border: 6px solid #999;
}
</style>
