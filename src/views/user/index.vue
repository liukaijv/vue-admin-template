<template>
    <div>

        <bread-crumb :paths="breadcrumbs"></bread-crumb>

        <div class=" wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox float-e-margins">                      
                        <div class="ibox-title">  
                            <div class="row">
                                <div class="col-lg-10">     
                                    <div class="ibox-title-info"> 
                                        <h3>用户列表</h3>
                                    </div>  
                                </div>                               
                            </div> 
                        </div>
                        <div class="ibox-content">

                           <div class="row m-t-sm">
                            <div class="col-lg-2">                            
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="姓名" v-model="keyword">
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-primary" type="button" @click="indexData(page, keyword)">搜索</button>
                                    </span>
                                </div>
                            </div>                          
                            <div class="col-lg-2">
                                <div class="form-group">
                                    <button type="button" class="btn btn-white" @click="toggleModal()">新增用户</button>
                                </div>
                            </div>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>               
                                    <td>序号</td>                                  
                                    <td>姓名</td>   
                                    <td>email</td>   
                                    <td>创建时间</td>                                   
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in users">
                                    <td>{{$index+1}}</td>                                    
                                    <td>{{item.name}}</td>                                    
                                    <td>{{item.email}}</td>                                    
                                    <td>{{item.created_at}}</td>                                   
                                    <td>
                                        <a @click="toggleModal(item.id)">编辑</a>
                                        <a @click="deleteData(item.id)">删除</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>                    

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="pull-right">
                                    <pagination :page="page" :page-size="page_size" :count="count" :action="indexData"></pagination>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div> 

        <modal v-ref:form_modal :title="modalTitle">
            <div class="modal-body">               
               <div class="form-group">
                <input placeholder="用户名" class="form-control" type="text" v-model="entity.name">
            </div>
            <div class="form-group">               
                <input placeholder="email" class="form-control" type="text" v-model="entity.email">                           
            </div>    
            <div class="form-group">
                <input placeholder="设置密码" class="form-control" type="password" v-model="entity.password">
            </div>
            <div class="form-group">
                <input placeholder="确认密码" class="form-control" type="password" v-model="entity.repeat_password">
            </div>                      
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary" @click="saveData">确定</button>
        </div>
    </modal>

</div>

</template>

<script>       

    export default {
        ready() {
            this.indexData();
        },
        data() {
            return {               
                breadcrumbs: [
                {
                    name: '用户管理',
                    url: ''
                }],
                keyword: '',
                page: 1,
                page_size: 10,                
                count: 1,
                users: [],          
                isEdit: true,            
                entity: {
                    id: 0,
                    name: '',
                    password: '',
                    repeat_password: '',
                    email: ''                   
                }                  
            }
        },
        methods: {
            indexData(page = 1, keyword = ''){                
                this.$http.get('user', {
                    params: {
                        keyword: keyword,
                        page: page,
                        page_size: this.page_size
                    }
                }).then((result)=>{
                    let data = result.data;
                    if(data.flag == true){
                        this.users = data.data;                          
                        this.count = data.count;
                        this.page = page;                        
                    }else{
                        this.users = [];
                    }
                    
                });
            },
            deleteData(id){
                this.$confirm('确定要退出吗？',()=>{
                    this.$http.delete('user/' + id).then((result)=>{
                        let data = result.data;
                        if(data.flag == true){
                            this.$alert('删除成功'); 
                            this.indexData();         
                        }else{
                            this.$alert('删除失败');
                        }
                    });
                });                
            },
            createData(){

            },
            storeData(){
                this.$http.post('user', this.entity).then((result)=>{
                    let data = result.data;
                    if(data.flag == true){
                        this.$alert('添加成功'); 
                        this.indexData();         
                    }else{
                        this.$alert('添加失败');
                    }
                });
            },
            eidtData(id){
                this.$http.get('user/' + id + '/edit').then((result)=>{
                    let data = result.data;                    
                    if(data.flag == true || data.data){
                       this.entity = {
                        id: data.data.id,
                        name: data.data.name,
                        email: data.data.email,
                        password: '',                                         
                        repeat_password: ''                                         
                    };                            
                }
            });
            },
            updateData(){
                this.$http.put('user/' + this.entity.id, this.entity).then((result)=>{
                    let data = result.data;
                    if(data.flag == true){
                        this.$alert('修改成功'); 
                        this.indexData();         
                    }else{
                        this.$alert('修改失败');
                    }
                });
            },
            toggleModal(id){                
                if(id){          
                    this.isEdit = true;  
                    this.eidtData(id);                       
                }else{
                    this.isEdit = false;
                    this.entity = {
                        id: 0,
                        name: '',
                        email: '',
                        password: '',
                        repeat_password: ''
                    } 
                    this.createData();   
                }
                this.$refs.form_modal.open();
            },
            saveData(){
                this.isEdit ? this.updateData(): this.storeData();      
                this.$refs.form_modal.close();        
            }            
        },
        computed: {
            modalTitle(){
                return this.isEdit ? '修改用户' : '新增用户'
            }
        }
    }

</script>