<template>
    <div>
        <router-view></router-view>
        <loading :show="showLoading"></loading>
    </div>
</template>

<script>
    import Vue from 'vue';
  
    export default {
        ready: function () { 
            Vue.http.interceptors.push((request, next) => {
                
                this.showLoading = true;
                
                next((response) => {
                    this.showLoading = false;
                });

            });
        },
        data: function () {
            return {
                showLoading: false
            }
        }
    }
</script>

<style lang="sass">
    @import './scss/custom.scss';   
</style>