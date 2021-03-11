<template>
    <div class="head-card card m-1">
        <div class="card-body m-0 p-1 header-bg">
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
.head-card {
    min-height: 10.8rem;
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

.header-bg { 
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.5)),  url("/images/header-bg.png"); 
    background-repeat: no-repeat, repeat;
    background-size: cover;
    background-position: center;
}

.header-title {
    font-family: "RocknRoll One", Arial, Verdana, Serif;
   -webkit-text-stroke: 1px black;
   color: white;
   text-shadow:
       3px 3px 0 #000,
     -1px -1px 0 #000,  
      1px -1px 0 #000,
      -1px 1px 0 #000,
       1px 1px 0 #000;
}
.header-title .version {
    font-family: Arial, Verdana, Serif;
    font-size: 1.5rem
}
</style>
