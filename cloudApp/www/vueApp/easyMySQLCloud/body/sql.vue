<template>
    <div class="body-card card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="pl-2 m-0 text-left"><h5>Databases:</h5></div>
                        <div v-if="currentDatabase"  class="current-db border border-secondary rounded m-1 p-1 text-left alert-secondary">
                            <a href="JavaScript:void(o)" v-on:click="queryTables('', true)" class="m-1">{{currentDatabase}}</a>
                            <div class="current-db-body overflow-auto bg-secondary">
                                <div v-for="o in tables" class="ml-2 mt-1">
                                <a href="JavaScript:void(0)"  v-on:click="tableSQL(o['Tables_in_' + currentDatabase])"
                                   class="text-left text-light" >
                                    {{o['Tables_in_' + currentDatabase]}}
                                </a></div>
                            </div>  
                        </div>
                        <div v-for="o in databases" v-if="o.Database !== currentDatabase"
                            v-on:click="queryTables(o.Database, true)"
                            class="border border-secondary rounded m-1 p-1 text-left">
                            {{o.Database}}
                        </div>
                    </div>
                    <div class="card alert-secondary col-9 p-2 m-0 text-left">
                        <div class="form-group">
                            <label class="pl-2">Query: <span class="text-danger">{{protectMessage()}}</span></label>
                            <button class="btn btn-sm btn-success border border-secondary pull-right m-1" 
                                :disabled="!isSubmit()"
                                v-on:click="querySubmit()">Submit</button>
                            <textarea class="form-control" v-model="querySQL" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="pl-2">Result:</label>
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
            tables : [],
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
        queryDatabases(showResult) {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'query',
                sql : 'SHOW DATABASES'
            }, (result)=> {
                me.databases = result.result;
                if (showResult) {
                    me.queryResult = result;
                }
            }, true);
        },
        queryTables(database, showResult) {
            const me = this;
            if (!database) {
                if (me.tables.length) {
                    me.tables = [];
                } else {
                    me.queryTables(me.currentDatabase, true);
                }
            } else {
                me.root.dataEngine().appPost({
                    cmd : 'query',
                    sql : 'USE ' + database + ';SHOW TABLES'
                }, (result)=> {
                    me.currentDatabase = database;
                    
                    if (showResult) {
                        me.tables = result.result[1];
                    }
                }, true);
            }
        },
        tableSQL(table) {
            const me = this;
            me.querySQL = 'USE ' + me.currentDatabase + ';SELECT * FROM ' + table;
            me.querySubmit();
        },
        protectMessage() {
            const me = this;
            const sql = this.querySQL;
            let error = '';
           
            const PDB = ['information_schema', 'mysql', 'performance_schema', 'sys'];
            for (var o in PDB) {
                const pattDB = new RegExp('(drop) ([^\;]+|)(' + PDB[o] + ')','ig');
                const pattTABLE = new RegExp('(use) ([^\;]+|)(mysql)(.\*)( |;)(drop)','ig');
                var mD = sql.match(pattDB), mT = sql.match(pattTABLE);

                error = (mD) ? ('Do not allow to do **' + mD[0] + ' **!') : 
                        (mT) ? ('Do not allow to do **' + mT[0] +' **!') : '';
                        
                if (error) return error;
            }
            return error
        },
        isSubmit() {
            const me = this;
            return (!me.protectMessage() && me.querySQL) ? true : false
        },
        querySubmit() {
            const me = this;
            me.queryResult = '';
            me.root.dataEngine().appPost({
                cmd : 'query',
                sql : me.querySQL
            }, (result)=> {
                me.queryResult = result;
                me.queryDatabases(false);
            }, true);
        }
    }
}
</script>
 
<style>
.result-section {
    height: 26rem; border: 6px solid #999;
}
.current-db {
    max-height: 28rem;
}
.current-db-body {
    max-height: 26rem;
}
</style>
