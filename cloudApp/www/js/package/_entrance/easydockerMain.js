$(document).ready(
    function() {
        $(document).ready(
            function() {
                new Vue({
                    el: '#MySQLCloud',
                    data: function() {},
                    mounted () {
                    },
                    methods :{
                    },
                    components: VUEApp.loadComponents({
                        LOAD    : {}, 
                        TPL :{
                            'appRoot' : '/vueApp/easyMySQLCloud/appRoot.vue'
                        }
                    })
                });
            }
        )
    }
) 
