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
                <app-body ref="appBody"></app-body>
                <auth ref="auth"></auth>
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
            root : this
        }
    },    
    watch : {
        module :  function (newValue, oldValue) {
            history.pushState('', '', '/app/' + newValue);
        } 
    },
    mounted () {
        var me = this;
        /*
        setTimeout(function() {
            me.easydockerFP = localStorage.getItem('easydockerFP');
            me.getGridMatrix();
        },200);*/
        me.getLocalEnv() 
    },
    methods :{
        getLocalEnv() {
            const me = this;
            me.dataEngine().appPost({
                    cmd     :'auth',
                    data    : {},
                    dataType: 'json'
                },
                function(result) {
                  console.log(result);
                }, function(err) {
                    console.log(err);
                });
        },
        dataEngine(caller) {
            if (caller) this.$refs.dataEngine.caller = caller;
            return this.$refs.dataEngine
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
        }, 
        TPL :{
            'appHeader' : '/vueApp/easyMySQLCloud/appHeader.vue',
            'dataEngine' : '/vueApp/easyMySQLCloud/dataEngine.vue',
            'spinner'   : '/vueApp/easyMySQLCloud/spinner.vue',
            'popUpModal': '/vueApp/easyMySQLCloud/popUpModals/_frame.vue',
            'auth'      : '/vueApp/easyMySQLCloud/auth.vue',
            'appBody'   : '/vueApp/easyMySQLCloud/appBody.vue'
        }
    })
}
</script>
 
<style>
.grid-section { min-height : 32rem }
</style>
