    import '../assets/js/plugins/sweetalert/sweetalert.css';
    import '../assets/js/plugins/sweetalert/themes/bootstrap/bootstrap.css';
    import Swal from  '../assets/js/plugins/sweetalert/sweetalert.min';

    export default {
      install: function (vue) {
        "use strict";            

          //   let defaultParams = {
          //     title: '',
          //     text: '',
          //     type: null,
          //     allowOutsideClick: false,
          //     showConfirmButton: true,
          //     showCancelButton: false,
          //     closeOnConfirm: true,
          //     closeOnCancel: true,
          //     confirmButtonText: 'OK',
          //     confirmButtonColor: '#8CD4F5',
          //     cancelButtonText: 'Cancel',
          //     imageUrl: null,
          //     imageSize: null,
          //     timer: null,
          //     customClass: '',
          //     html: false,
          //     animation: true,
          //     allowEscapeKey: true,
          //     inputType: 'text',
          //     inputPlaceholder: '',
          //     inputValue: '',
          //     showLoaderOnConfirm: false
          // };

          vue.prototype.$swal = Swal;

          // alert
          vue.prototype.$alert = function(title="确定要这样吗？", text, callbackOk) {

            if (typeof text === 'function') {
              callbackOk = arguments[1];
              text = undefined;
            }

            return Swal({
              title: title,
              text: text,
              confirmButtonText:'确定'
            },function(){
             typeof callbackOk  === 'function' && callbackOk();
           });

          };

        // 确认框
        vue.prototype.$confirm = function(title="确定要这样吗？", text, callbackOk, callbackCancel) {
          if (typeof text === 'function') {
            callbackCancel = arguments[2];
            callbackOk = arguments[1];
            text = undefined;
          }
          return Swal({
            title: title,
            text: text,            
            showCancelButton: true,
            cancelButtonText:'取消',
            confirmButtonText:'确定'
          },function(isConfirm){
            if (isConfirm) {
              typeof callbackOk  === 'function' && callbackOk();
            }else{
              typeof callbackCancel  === 'function' && callbackCancel();
            }

          })
        };

        // prompt
        vue.prototype.$prompt = function(title="确定要这样吗？", text, callbackOk, callbackCancel) {
          if (typeof text === 'function') {
            callbackCancel = arguments[2];
            callbackOk = arguments[1];
            text = undefined;
          }
          return Swal({
            title: title,
            text: text,
            type: "input",
            showCancelButton: true,
            cancelButtonText:'取消',
            confirmButtonText:'确定',
            closeOnConfirm: false,
          },function(inputValue ){
            if (inputValue === false) {   
              typeof callbackCancel  === 'function' && callbackCancel();            
              return false;
            }else{
              typeof callbackOk  === 'function' && callbackOk(inputValue);                  
            }                

          })
        };

        // toast
        vue.prototype.$toast = function(title){
          return Swal({
            title: title,
            text: '',
            type: "success",
            showCancelButton: false,
            showConfirmButton:false,
            timer:3000,
            allowOutsideClick:true
          });
        }

      }

    }