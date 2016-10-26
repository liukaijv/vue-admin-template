<style>
    .nav > li > a.v-link-active {
        color: #fff;
    }

    body.mini-navbar .nav-header {
        background: none;
    }
</style>
<template>
    <nav class="navbar-default navbar-static-side" role="navigation">
        <div class="sidebar-collapse">
            <ul class="nav">
                <li class="nav-header">
                    <div class="dropdown profile-element">
                        <img src="../../assets/img/avatar_large.jpg" class="img-circle" width="60">                       
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span class="clear"> 
                                <span class="block m-t-xs"><strong class="font-bold">{{admin.name}}</strong></span> 
                                <span class="text-muted text-xs block">账号资料 <b class="caret"></b></span> 
                            </span>
                        </a>
                        <ul class="dropdown-menu animated fadeInRight m-t-xs">
                            <li><a>修改密码</a></li>
                            <li class="divider"></li>
                            <li><a @click.prevent="logout">退出</a></li>
                        </ul>
                    </div>
                    <div class="logo-element">
                     YC
                 </div>
             </li>
         </ul>
         <ul class="nav" v-menu>
            <li class="active">
                <a v-link="{name:'dashboard'}">
                    <i class="fa fa-dashboard"></i>
                    <span class="nav-label">Dashboard</span>                    
                </a>               
            </li>
            <li>
                <a>
                    <i class="fa fa-user"></i>
                    <span class="nav-label">用户管理</span>
                    <span class="fa arrow"></span>
                </a>
                <ul class="nav nav-second-level">
                    <li> <a v-link="{name:'user'}">用户列表</a></li>                 
                </ul>
            </li>           
        </ul>

    </div>
</nav>
</template>

<script>
    import AuthMixin from '../../mixins/auth';

    export default {
        props: ['admin'],
        mixins: [AuthMixin]       
   }
</script>