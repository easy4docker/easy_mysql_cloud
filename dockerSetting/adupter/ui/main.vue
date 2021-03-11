<template>
    <span>oop
        <div class="adupterBody border border-info br-3 m-1 p-3 rounded-lg alert-info"> qqq
            <user-form v-if="!isUserAdded()"></user-form>
            <span v-if="isUserAdded()">App User ready!
                <a class="btn btn-sm btn-warning m-1"  href="JavaScript:void(0)" v-on:click="removeAppUser()">Remove App User</a>
            </span>
        </div>
        {{appUserList}}
    </span>    
</template>
 
<script>
module.exports = {
    props : ['item', 'plugin_path'],
    data: function() {
        return {
            root :  this.$parent.root,
            hasDoneSetup : false,
            appUserList : []
        }
    },
    mounted () {
        let me = this;
        let url = me.plugin_path + '/api/main.js';
        me.getAllUsers();
        VUEApp.dynamicLoadComponent({userForm : me.plugin_path + '/ui/userForm.vue'}, me);
        me.$forceUpdate();
    },
    methods :{
        isUserAdded() {
            let me = this;
            return (me.appUserList.length) ? true : false;
        },
        _get(url, param, calback) {
            $.ajax({
                type: 'GET',
                url:url,
                data: param,
                success: function(result) {
                   // me.root.triggerSpinner = false;
                    calback(result);
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                   // me.root.triggerSpinner = false;
                   calback(null)
                },
                dataType: 'JSON'
            });
        },
        _post(url, data, calback) {
            $.ajax({
                type: 'POST',
                url:url,
                data: data,
                success: function(result) {
                    calback(result);
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                   calback(null)
                },
                dataType: 'JSON'
            });
        },
        isAppUserReady () {
           return (!this.appUserList || !this.appUserList.length) ?  false : true;
        },
        getAllUsers() {
            let me = this;
            let url = me.plugin_path + '/api/main.js';
            me._post(url, {cmd : 'getAppUsers'}, function(data) {
                me.appUserList = data;
                me.$forceUpdate();
            });
        },
       removeAppUser() {
            let me = this;
            let url = me.plugin_path + '/api/main.js';
            me._post(url, {cmd : 'removeAppUser'}, function(data) {
                me.getAllUsers();
            });
        },
       addUser(postData) {
            let me = this;
            let url = me.plugin_path + '/api/main.js';
            me._post(url, {cmd : 'addUser', postData: postData}, function(data) {
                me.getAllUsers();
            });
        }

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
