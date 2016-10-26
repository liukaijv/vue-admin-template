<template>
    <div id="wrapper">

        <sidebar :admin="admin"></sidebar>

        <div id="page-wrapper" class="gray-bg">

            <top :admin="admin"></top>

            <router-view></router-view>

            <bottom></bottom>
        </div>

    </div>
</template>

<script>

    import auth from '../lib/auth';
    import Top from './partial/top';
    import Sidebar from './partial/sidebar';
    import Bottom from './partial/bottom';

    export default {
        ready: function () {
            let vm = this;
            let local_admin = JSON.parse(sessionStorage.getItem('jwt_user'));         
            if (local_admin) {
                vm.admin = local_admin;
            } else {               
                vm.$route.router.go('/login');                   
            }
        },
        data: function () {
            return {
                admin: {}
            }
        },
        components: {
            top: Top,
            sidebar: Sidebar,
            bottom: Bottom
        }
    }
</script>