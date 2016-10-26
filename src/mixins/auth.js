import auth from '../lib/auth';

export default {
	methods: {
		logout: function () {
			let vm = this;
			vm.$confirm('确定要退出吗？',function(){
				auth.logout(vm).then(function () {					
					vm.$route.router.go('/login');
				});
			});
		}
	}
}