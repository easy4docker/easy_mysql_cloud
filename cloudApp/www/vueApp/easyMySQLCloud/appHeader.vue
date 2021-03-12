<template>
    <div class="head-card card m-1">
        <div class="card-body m-0 p-1 alert-info">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-2 p-0 m-0 text-left">
                    </div>
                    <div class="col-8 p-3 text-center">
                        <h1 class="header-title m-3">Easy MySQL Cloud 
                            <span class="version">(Version &alpha;)</span></h1>
                    </div>
                    <div class="col-2 p-0 m-0 text-right text-warning">
                    
                    </div>
                </div>
            </div>
            <div class="container-fluid mt-1 head-menu-2 text-left">
                <a href="JavaScript:void(0)" v-on:click="module('tokens')" v-if="root.module !== 'tokens'" class="m-3 ml-1">Access Token</a>
                <b class="m-3" v-if="root.module === 'tokens'">Access Token</b> |
                <a href="JavaScript:void(0)" v-if="root.module !== 'sql'"  v-on:click="module('sql')" class="m-3">SQL Tool</a>
                <b class="m-3" v-if="root.module === 'sql'">SQL Tool</b> |
                <a href="JavaScript:void(0)" v-if="root.module !== 'documents'"  v-on:click="module('documents')" class="m-3">Documents</a>
                <b class="m-3" v-if="root.module === 'documents'">Documents</b>
            </div>
        </div>
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root :  this.$parent.root
        }
    },
    mounted() {
    },
    watch : {

    },
    methods :{
        module (v) {
            this.root.module = v;
        }
    }
}
</script>
 
<style>
.head-card {
    min-height: 5.8rem;
}
.head-menu-1 {
    height: 7rem;
}
.head-menu-2 {
    height: 1.5rem;
}

.head-menu-2 .menu-frame {
    background: rgba(0,0,0,0.33);
}

.header-title {
    font-family: "RocknRoll One", Arial, Verdana, Serif;
}
.header-title .version {
    font-family: Arial, Verdana, Serif;
    font-size: 1.5rem
}
</style>
