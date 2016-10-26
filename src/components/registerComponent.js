import Pagination from './base/pagination';
import Loading from './base/loading';
import BreadCrumb from './base/bread-crumb';
import Modal from './base/modal';

export default function(Vue){
	Vue.component('pagination', Pagination);
	Vue.component('loading', Loading);
	Vue.component('bread-crumb', BreadCrumb);
	Vue.component('modal', Modal);
}