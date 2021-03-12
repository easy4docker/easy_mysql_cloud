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
                <non-auth-page v-if="step === 'nonAuthPage'"></non-auth-page>
                <init-root-password v-if="step === 'initRootPassword'"></init-root-password>
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
            step : 1
        }
    },    
    watch : {
    },
    mounted () {
        var me = this;
        
        setTimeout(function() {
            me.easydockerFP = localStorage.getItem('easydockerFP');
            me.getAuthStatus();
        },200);
    },
    methods :{
        getAuthStatus() {
            const me = this;
            me.dataEngine().appPost({
                    cmd     :'auth',
                    data    : {},
                    dataType: 'json'
                },
                function(result) {
                    me.step = result.step;
                    console.log(result);
                }, true);
        },
        dataEngine(caller) {
            if (caller) this.$refs.dataEngine.caller = caller;
            return this.$refs.dataEngine
        }
    },
    components: VUEApp.loadComponents({
        LOAD    : {
            initRootPassword    : '/vueApp/easyMySQLCloud/auth/initRootPassword.vue',
            nonAuthPage         : '/vueApp/easyMySQLCloud/auth/nonAuthPage.vue',
            authSignin          : '/vueApp/easyMySQLCloud/auth/signin.vue'
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
.body-card { min-height : 40rem }
</style>
