<template>
    <!--class="adupterBody border border-secondary br-3 m-1 p-3 rounded-lg alert-info"-->
    <div class="container m-0 text-left border border-secondary alert-secondary">
      <form>
          <div class="row">
            <div class="col-6 p-1 pl-3 m-0 text-left">
                Setup <b class="text-secondary">appUser</b> password:
            </div>
            <div class="col-6 p-1 pr-3 m-0 text-right">
                <span class="text-secondary">{{warning}}</span><span class="text-danger">{{error}}</span>
            </div>           
        </div>
        <div class="row">
            <div class="col-4 p-1 pl-3 m-0 text-left">
              <div class="form-group">
                <label>password</label>
                <input type="password" class="form-control" maxlength="64" v-on:keyup="textWarning()" v-model="form.password" placeholder="Password">
              </div>
            </div>
            <div class="col-4 p-1 pl-3 m-0 text-left">
              <div class="form-group">
                <label>Verify password</label>
                <input type="password" class="form-control" maxlength="64" v-on:keyup="textWarning()" v-model="form.vpassword" placeholder="Verify password">
              </div>
            </div>
            <div class="col-4 p-1 pl-3 m-0 text-right">
              <label>&nbsp;</label>
              <a class="form-control btn btn-sm btn-success" href="JavaScript:void(0)" v-on:click="submitAddUser()">Add User</a>
            </div>            
        </div>
      </form>
    </div>
</template>
 
<script>
module.exports = {
    data: function() {
        var me = this;
        return {
            form    : {
                        password  : '',
                        vpassword : ''
                      },
            warning : '',
            error   : ''
        }
    },
    methods :{
      textWarning() {
        var me = this;
        if (me.form.password.length < 8 || me.form.vpassword.length < 8) {
          me.error = '';
          me.warning = 'Length of password should be more than 8 charactors';
        }
      },
      formValidation() {
        var me = this;
        if (me.form.password.length < 8) {
          me.warning = '';
          me.error = 'Length of password should be more than 8 charactors.';
          return false;
        }
        if (me.form.password != me.form.vpassword) {
          me.warning = '';
          me.error = 'Password verification failed.';
          return false;
        }
        return true;
      },
      submitAddUser() {
        var me = this;
        if (me.formValidation()) {
          me.$parent.addUser(me.form);
        }
      }
    }
}
</script>
<style>
</style>
