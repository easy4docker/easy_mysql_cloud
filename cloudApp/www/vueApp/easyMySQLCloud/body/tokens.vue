<template>
    <div class="body-card m-1">
        <div class="card-body m-0 p-1">
            <div class="container-fluid m-0">
                <div class="row">
                    <div class="col-4 p-1 m-0 ">
                        <div class="card border pl-0 m-0 text-left">
                            <div class="container-fluid m-0">
                                <div class="row">
                                    <div class="col-8 text-left p-2 pl-0">
                                        <h5>Tokens List</h5>
                                    </div>
                                    <div class="col-4 text-right">
                                        <button class="btn btn-sm btn-warning m-2" v-on:click="addToken()">
                                            Add new
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-for="(v, k) in tokens" class="record-item-box m-1 p-1 text-left">
                            <a href="JavaScript:void(0)" v-on:click="getToken(k)">
                                {{k}}
                            </a><br/>
                            <div class="text-right">
                                Created:<span class="text-info">{{showDate(v.tm)}}</span>
                                Owner: <span class="text-info">{{v.owner}}</span></div>
                        </div>
                    </div>
                    <div class="card tokens-body-section alert-secondary col-8 p-2 m-0 text-left">
                        <div v-if="module === 'addToken'">
                            <div class="form-group">
                                <label class="p-2">Input Token Owner's Email or Phone</label>
                                <input type="text" class="form-control" v-model="form.owner" 
                                    placeholder="Email or phone">                        

                                <button type="button" class="btn btn-primary m-2 ml-1" v-on:click="generateToken()">Request a token</button>
                            </div>
                        </div>
                        <div v-if="module === 'showInfo'">
                            <div class="card m-2 p-2 alert-info border-info">
                                <div class="container-fluid m-0">
                                    <div class="row">
                                        <div class="col-10">
                                            Token : {{currentToken.token}}<br/>
                                            Owner : {{currentToken.owner}}<br/>
                                            created : {{showDate(currentToken.tm)}}
                                        </div>
                                        <div class="col-2 text-right">
                                            <button class="btn btn-secondary" v-on:click="removeToken(currentToken.token)">
                                                <i class="fa fa-trash" aria-hidden="true"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
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
            tokens : [],

            currentToken : {},
            module : ''
        }
    },
    mounted() {
        this.getTokens();
    },
    watch : {

    },
    methods :{
        initData() {
            this.form = {
                owner: ''
            };
            this.currentToken = {};
            this.module = '';
        },
        showDate(tm) {
            const d = new Date(tm);
            return  ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
            ("00" + d.getDate()).slice(-2) + " " +
            d.getFullYear() + " " +
            ("00" + d.getHours()).slice(-2) + ":" +
            ("00" + d.getMinutes()).slice(-2)
        },
        addToken() {
            const me = this;
            me.module = 'addToken';
        },
        getTokens() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'getTokens'
            }, (result)=> {
                me.tokens = (!result || !result.result) ? [] : result.result;
            }, true);
        },
        getToken(token) {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'getToken',
                key : token
            }, (result)=> {
                me.currentToken = result.result;
                me.module = 'showInfo';
            }, true);
        },
        generateToken() {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'generateToken',
                owner : me.form.owner
            }, (result)=> {
                me.initData();
                me.getToken(result.result);
                me. getTokens();
                // me.tokens = (!result || !result.result) ? [] : result.result;
            }, true);
        },
        removeToken(token) {
            const me = this;
            me.root.dataEngine().appPost({
                cmd : 'token',
                code : 'removeToken',
                key : token
            }, (result)=> {
                me.initData();
                me.tokens = (!result || !result.result) ? [] : result.result;
            }, true);
        }
    }
}
</script>
 
<style>
.tokens-body-section {
    min-height : 38rem; 
}
.record-item-box {
    border-bottom: 1px dashed #ccc
}
</style>
