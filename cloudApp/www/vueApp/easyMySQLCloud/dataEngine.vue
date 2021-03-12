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
            data.token = income_token;
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
