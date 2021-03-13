<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="pl-2 m-0 text-left"><h5>Tokens:</h5></div>
                        <div v-if="currentToken"  class="current-db border border-secondary rounded m-1 p-1 text-left alert-secondary">
                            <div class="p-1">
                                <a href="JavaScript:void(o)">{{currentToken}}</a>
                            </div>
                        </div>
                        <div v-for="o in tokens "
                            class="border border-secondary rounded m-1 p-1 text-left">
                            {{o}}
                        </div>
                    </div>
                    <div class="card tokens-body-section alert-secondary col-9 p-2 m-0 text-left">
                        Tokens Management
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>
 
<script>
module.exports = {
    data: function() {
        return {
            root :  this.$parent.root,
            tokens : [],
            currentToken : ''
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
.tokens-body-section {
    min-height : 38rem; 
}
</style>
