import datepicker from  '../../assets/js/plugins/datapicker/bootstrap-datepicker';
import '../../assets/js/plugins/datapicker/datepicker3.css';

export default {
  twoWay: true,
  priority: 1000,
  params: ['options'],
  bind() {
    let self = this;
    let defaults = {
      format: "yyyy-mm-dd",
      minViewMode: 1,
      keyboardNavigation: false,
      forceParse: false,
      autoclose: true,
      todayHighlight: true
    };
    let settings = $.extend(defaults, self.params.options);
    $(this.el).datepicker(settings);
  },
  update(value) {
    // todo
  },
  unbind() {
    $(this.el).off();
  }
}
