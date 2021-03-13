<template>
    <div class="container-fluid m-0 mt-2 mb-3" >
        <div class="row">
            <div class="col-1 p-0"></div>
            <div class="col-10 p-0 card text-center shadow border rounded">
                <app-header></app-header>
            </div>
            <div class="col-1 p-0"></div>
        </div>
        <div class="row">
            <div class="col-1 p-0"></div>
            <div class="col-10 p-0 card text-center shadow border rounded">
                <body-sql ref="bodySQL" v-if="module === 'sql'"></body-sql>
                <body-tokens ref="bodyTokens" v-if="module === 'tokens'"></body-tokens>
                <body-documents ref="bodyDocuments" v-if="module === 'documents'"></body-documents>
                <body-data ref="bodyData" v-if="module === 'data'"></body-data>
            </div>
            <div class="col-1 p-0"></div>
        </div>
        <data-engine ref="dataEngine"></data-engine>
        <pop-up-modal ref="popUpModal"></pop-up-modal>
        <alert-comp ref="alertComp"></alert-comp>
        <spinner></spinner>     
    </div>
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root : this,
            triggerSpinner : true,
            module : 'sql'
        }
    },    
    watch : {
    },
    mounted () {
        var me = this;
        setTimeout(function() {
        },200);
    },
    methods :{
        dataEngine(caller) {
            if (caller) this.$refs.dataEngine.caller = caller;
            return this.$refs.dataEngine
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            'bodySql'   : '/vueApp/easyMySQLCloud/body/sql.vue',
            'bodyDocuments'   : '/vueApp/easyMySQLCloud/body/documents.vue',
            'bodyData'   : '/vueApp/easyMySQLCloud/body/data.vue',
            'bodyTokens'   : '/vueApp/easyMySQLCloud/body/tokens.vue'
        }, 
        TPL :{
            'appHeader' : '/vueApp/easyMySQLCloud/appHeader.vue',
            'dataEngine' : '/vueApp/easyMySQLCloud/dataEngine.vue',
            'spinner'   : '/vueApp/easyMySQLCloud/spinner.vue',
            'popUpModal': '/vueApp/easyMySQLCloud/popUpModals/_frame.vue',
            'appBody'   : '/vueApp/easyMySQLCloud/appBody.vue'
        }
    })
}
</script>
 
<style>
.body-card { min-height : 40em }
</style>
