<style>
    .login-box{
        position: fixed;
        left: 50%;
        top: 40%;
        transform: translate(-50%,-50%);
        min-width: 320px;
    }
    .login-box .login-logo{
        width: 30%;
    }
    .login-box .login-title{
        color:#fff;
        font-size:18px;
        padding:20px 0 50px;
        font-family: "Microsoft YaHei";
        font-weight: normal;
    }
    .login-box .input-group .form-control{
        border-left: none;
    }
</style>
<template>
    <div>
        <div class="login-box">
            <div class="middle-box text-center animated fadeInDown">
                <div>
                    <div>
                        <img class="login-logo" src="../assets/img/logo.png">
                    </div>
                    <h3 class="login-title">XX后台管理系统（服务商端）</h3>
                    <form class="m-t" role="form" onsubmit="return false">
                        <div class="form-group">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user"></i></span>                    
                                <input type="text" class="form-control" placeholder="账号" required v-model="credentials.name">
                            </div>
                        </div>
                        <div class="form-group">
                           <div class="input-group">
                               <span class="input-group-addon"><i class="fa fa-lock"></i></span>  
                               <input type="password" class="form-control" placeholder="密码" required
                               v-model="credentials.password">
                           </div>
                       </div>
                       <button type="submit" class="btn btn-primary block full-width m-b" @click="login">立即登录</button>
                   </form>
               </div>
           </div>

       </div>
       <p class="footer back-bor-null"> &copy; 2016 Noop all rights reserved </p>
   </div>
</template>

<script>

    import auth from '../lib/auth';

    export default {
        data() {
            return {
                credentials: {
                    name: '',
                    password: ''
                }
            };
        },
        methods: {
            login() {
                auth.login(this, this.credentials).then(() => {
                    this.$route.router.go('/dashboard');                   
                }, (error) => {
                    error.msg && this.$alert(error.msg);
                });
            }
        }
    }
</script>