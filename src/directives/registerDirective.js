import menu from './base/collapseMenu';
import datepicker from './base/datepicker';

export default function(Vue){
	Vue.directive('menu', menu);
	Vue.directive('datepicker', datepicker);
}