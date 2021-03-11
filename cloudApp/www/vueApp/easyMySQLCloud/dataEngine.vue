<template>
</template>

<script>
module.exports = {
    props: [],
    data: function() {
        return {
            root :  this.$parent.root,
            caller : null
        }
    },
    created() {
        var me = this;
    },
    methods :{
        withAuth(data) {
            let v = localStorage.getItem('easydockerFP');
            if (v) {
                data.authToken = v;
            }
            return data;
        },
        appPost(data, callback, isSpinner) {
            const me = this;
            if (isSpinner) me.$parent.triggerSpinner = true;
            $.ajax({
                type: 'POST',
                url: '/',
                data: me.withAuth(data),
                success: function(result) {
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback(result);
                },
                error: function (jqXHR, textStatus, errorThrown) { 
                    if (isSpinner) me.$parent.triggerSpinner = false;
                    callback({statu : 'failure', message : 'failure request.', result : jqXHR.responseText});
                },
                dataType: 'JSON'
            });
        }
    }
}
</script>
 
<style>
</style>
