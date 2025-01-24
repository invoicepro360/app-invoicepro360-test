<template>
<div class="skeleton">
  <div class="grid grid-cols-12 gap-6"> 
        <!-- BEGIN: General Report -->
        <div class="col-span-12 mt-8">
            <div class="flex items-center h-10">
                <h2 class="mr-5 heading full-rounded"></h2>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-5">
                <div class="col-span-12 sm:col-span-6 xl:col-span-3" v-for="index in 4" :key="index">
                    <div class="report-box">
                        <div class="box p-5">
                            <div class="flex">
                                <div class="full-rounded"></div>
                                <div class="ml-auto rounded"></div>
                            </div>
                            <div class="amount mt-6"></div>
                            <div class="item-name mt-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END: General Report -->
        
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 lg:col-span-6 mt-8">
          <div class="block sm:flex items-center h-10"><h2 class="heading mr-5"></h2></div>
            <div class="box p-5 mt-12 sm:mt-5">
             <div class="flex flex-col xl:flex-row xl:items-center">
                <div class="flex">
                  <div><div class="amount"></div><div class="mt-0.5 item-name"></div></div>
                  <div class="w-px h-12 border border-r border-dashed border-gray-300 mx-4 xl:mx-6"></div>
                  <div><div class="amount"></div><div class="item-name"></div></div>
                </div>
                <div class="dropdown xl:ml-auto mt-5 xl:mt-0">
                  <button class="dropdown-toggle btn btn-outline-secondary font-normal" aria-expanded="false">
                    <LoadingIcon icon="oval" color="grey" class="w-7 h-7" /></button>
                </div>
              </div>
              <div class="report-chart">
                <div style="height:215px;"><LoadingIcon icon="oval" color="grey" class="w-4 h-4" /></div>
              </div>
            </div>  
         </div>
        <!-- END: Sales Report -->
        <!-- BEGIN: Weekly Top Seller -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
          <div class="flex items-center h-10">
            <h2 class="heading mr-5"></h2>
          </div>
          <div class="box p-5 mt-5" style="height:300px;">
            <div class="mt-8"><LoadingIcon icon="oval" color="grey" class="w-4 h-4" /></div>
          </div>
        </div>
        <!-- END: Weekly Top Seller -->
        <!-- BEGIN: Sales Report -->
        <div class="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
          <div class="flex items-center h-10">
            <h2 class="heading mr-5"></h2>
          </div>
          <div class="box p-5 mt-5" style="height:300px;">
            <div class="mt-8"><LoadingIcon icon="oval" color="grey" class="w-4 h-4" /></div>
          </div>
        </div>
        <!-- END: Sales Report -->


        <!-- BEGIN: General Report -->
        <div class="col-span-12 grid grid-cols-12 gap-6 mt-8" >
          <div class="col-span-12 sm:col-span-6 xxl:col-span-3" v-for="index in 4" :key="index">
            <div class="box p-5">
              <div class="flex items-center">
                <div class="w-2/4 flex-none">
                  <div class="heading"></div>
                  <div class="amount mt-1"></div>
                </div>
                <div class="flex-none ml-auto relative" style="height:150px">
                    <LoadingIcon icon="oval" color="grey" class="w-4 h-4" />                                                  
                </div>
              </div>
            </div>
           </div>                        
        </div>  
        <!-- END: General Report -->        
  </div>
</div>
</template>


<style scoped>

.skeleton .heading{
    height:20px;
    width:100%;
    animation: pulse-bg 1s infinite;
}
.skeleton .report-box .full-rounded{
    height:20px;
    width:20px;
    animation: pulse-bg 1s infinite;
}

.skeleton .report-box .full-rounded,
.skeleton .report-box .ml-auto{
    height:15px;
    width:25px;
  	animation: pulse-bg 1s infinite;    
}

.skeleton  .amount,
.skeleton .item-name{
    width:100px;
    height:16px;
    animation: pulse-bg 1s infinite;
}

@keyframes pulse-bg {
	0% {
		background-color: #eee;
	}
	50% {
		background-color: #eaeaea;
	}
	100% {
		background-color: #eee;
	}
}
</style>