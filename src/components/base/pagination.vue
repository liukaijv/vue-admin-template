<template>
    <nav class="pull-right" v-show="isShow">
        <ul class="pagination">
            <li v-if="showPrev" @click="action(page-1)"><a>&laquo;</a></li>
            <li v-for="i in pages" :class="{active : page == i}" @click="action(i)">
                <a>{{i}}</a>
            </li>           
            <li v-if="showNext" @click="action(page+1)"><a>&raquo;</a></li>
        </ul>
    </nav>
</template>

<script> 

    export default {        
        props: {
            action: {              
                type: Function,
                default: (page)=>{}
            },
            page: {
                required: true,
                type: Number,
                default: 1
            },
            totalPage: {               
                type: Number,
                default: 1
            },
            showSize: {
                type: Number,
                default: 10
            },
            count: {               
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            }        
        },
        computed: {
            isShow(){ 
                return this.totalPage > 1 || Math.ceil(this.count / this.pageSize) > 1;
            },            
            pages(){ 
                let totalPage = this.totalPage;               
                if(this.count){                    
                    totalPage = Math.ceil(this.count / this.pageSize);
                }     
                let currentPage = this.page,
                showSize = this.showSize,                   
                left = 1,
                right = totalPage,
                pageArr = [];                           
                if(totalPage > showSize){
                    let halfLeft = Math.floor((showSize - 1) / 2);
                    let halfRight = Math.ceil((showSize - 1) / 2);                   
                    if (currentPage > halfRight && currentPage < totalPage - halfLeft) {
                        left = currentPage - halfRight;
                        right = currentPage + halfLeft;
                    } else {
                        if (currentPage <= halfRight) {
                            left = 1;
                            right = showSize;
                        } else {
                            right = totalPage;
                            left = totalPage - (showSize - 1);
                        }
                    }
                }
                while (left <= right) {
                    pageArr.push(left)
                    left++
                }                
                return pageArr;
            },
            showPrev(){
                return this.page > 1;
            },
            showNext(){
                return this.page < this.totalPage;
            }
        }
    }
</script>