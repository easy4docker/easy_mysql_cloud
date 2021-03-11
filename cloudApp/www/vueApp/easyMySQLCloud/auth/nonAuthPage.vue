<template>
    <div class="body-card card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0 head-menu-1">
                <div class="row">
                    <div class="col-12 p-3 m-0 text-center text-danger">
                    <i class="fa fa-bell" aria-hidden="true"></i> The initial password has not been setup yet.  Please go to EasyDocker Admin link with auth token.  
                    <img class="m-3 border rounded border-info" src="/images/example-non-auth-page.png" width="80%">
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
    },
    watch : {

    },
    methods :{
    }
}
</script>
 
<style>
</style>
