<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0">
                <div class="row">
                    <div class="col-3 p-1 m-0 ">
                        <div class="pl-2 m-0 text-left"><h5>Tokens:</h5></div>
                        <div class="current-db border border-success rounded m-1 p-1 text-left alert-success">
                            <div class="p-1">
                                <a href="JavaScript:void(0)" v-on:click="addToken()">Add Token</a>
                            </div>
                        </div>
                        <div v-for="o in tokens "
                            class="border border-secondary rounded m-1 p-1 text-left">
                            {{o}}
                        </div>
                    </div>
                    <div class="card tokens-body-section alert-secondary col-9 p-2 m-0 text-left">
                        <div v-if="module === 'addToken'">
                            <div class="form-group">
                                <label class="p-2">Input Token Owner's Email or Phone</label>
                                <input type="text" class="form-control" v-model="form.owner" 
                                    placeholder="Email or phone">                        

                                <button type="button" class="btn btn-primary m-2 ml-1" v-on:click="generateToken()">Request a Token</button>
                            </div>
                        </div>
                        <div v-if="module !== 'addToken'">Token Details</div>
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
            form : {
                owner: ''
            },
            tokens : ['test1', 'test2', 'test3'],

            currentToken : '',
            module : ''
        }
    },
    mounted() {
        this.getTokes();
    },
    watch : {

    },
    methods :{
        addToken() {
            const me = this;
            me.module = 'addToken';
            me.tokens.push('new-' + new Date().getTime());
        },
        getTokes() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'getTokens'
            }, (result)=> {
                me.tokens = (!result || !result.result) ? [] : result.result;
            }, true);
        },
        generateToken() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'generateToken'
            }, (result)=> {
                console.log(result);
            }, true);
        }
    }
}
</script>
 
<style>
.tokens-body-section {
    min-height : 38rem; 
}
</style>
