
<template>

  <div>
    <bread-crumb :paths="breadcrumbs"></bread-crumb>

    <div class=" wrapper wrapper-content animated fadeInRight">

     <div class="row">

      <div class="col-md-12">

      </div>

    </div>
  </div>

</div>
</template>

<script>

  export default {

    data: function () {
      return {       
        breadcrumbs: [
        {
          name: 'Dashboard',
          url: ''
        }
        ]
      }
    }
    
  }
</script>