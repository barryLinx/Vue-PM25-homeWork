Vue.component('pm-card', {
  template: '#card',
  props:['data','saveobj'],
  // props: {
  //   data: Object,
  //   saveobj:Array, 
  // },
  // data() {
  //   return {
  //     Status_Class: {
  //       'status-aqi2': this.data.Status === '普通',
  //       'status-aqi3': this.data.Status === '對敏感族群不健康',
  //       'status-aqi4': this.data.Status === '對所有族群不健康',
  //       'status-aqi5': this.data.Status === '非常不健康',
  //       'status-aqi6': this.data.Status === '危害',
  //     },
  //   }
  // },
  methods: {
    pointCity() {      
      this.$emit('point-city',this.data.SiteName);
    }
  },
  computed:{
    status: function(){
      return { 
          'status-aqi1': this.data.Status == '良好',   
          'status-aqi2': this.data.Status == '普通',
          'status-aqi3': this.data.Status == '對敏感族群不健康',
          'status-aqi4': this.data.Status == '對所有族群不健康',
          'status-aqi5': this.data.Status == '非常不健康',
          'status-aqi6': this.data.Status == '危害',
          'status-aqi7': this.data.Status == '設備維護',        
      }
     
    },   
    star() {
      return new Set(this.saveobj).has(this.data.SiteName) ? 'fas' : 'far';
    }   
  },
})   
  
    var app = new Vue({
      el: '#app',
      data: {
        pmdata: [],
        location: [],
       // stared: [],
        filter: '',      
        countyArray:[],
       // interval:[],
        NewPmData:[]
        
      },
      // 請在此撰寫 JavaScript
      created:function(){
        this.getData();
        this.clientLocalation();
      },
      methods: {
        getData() {
          const vm = this;
         // const api = 'http://opendata2.epa.gov.tw/AQI.json';
           const api ='https://cors-anywhere.herokuapp.com/opendata2.epa.gov.tw/AQI.json';
          axios.get(api).then(function (response) {           
            vm.pmdata = response.data;
          }).catch(function (error) {
            console.log('error');
          });       
      
       
          // 使用 jQuery ajax
          // $.get(api).then(function( response ) {
          //   vm.data = response;
          //   console.log(response)
          // });
        },
        clientLocalation:function(){
          const vm = this;         
          if(localStorage.SaveCounty !== undefined  ){
            //step.1 =>先倒入
            vm.location = JSON.parse(window.localStorage.getItem('SaveCounty'));; 
          }
        },
        changeSaveSite:function(SiteName){
          console.log(SiteName);
          var vm = this;                  
           let changeObj = new Set(vm.location);  
           if (changeObj.has(SiteName)) {
            changeObj.delete(SiteName)
          }else{
            changeObj.add(SiteName)
          }
          vm.location = Array.from(changeObj);        
        },        
      },
      watch: {
        location: function() {
          var vm = this; 
          localStorage.setItem("SaveCounty", JSON.stringify(vm.location))
        }
      },
       computed:{
          selectArray: function () {
            var vm = this; 
            if(vm.filter ){
              return vm.pmdata.filter(function (item) {
                return item.County.match(vm.filter);
              });             
            }    
            return  vm.pmdata;           
          },
          county:function(){
             var vm = this; 
             let newData =[];
             const locations = new Set();
             vm.pmdata.forEach(function(item) {
               locations.add( item.County)
             });
             newData = Array.from(locations);  
            return newData;
          },
          saveObj:function(){
            const vm = this;
            let newData = [];
            vm.location.forEach(el => {
              vm.pmdata.filter(item => {
                if (el === item.SiteName) {
                  newData.push(item)
                  return
                }
              });
            });           
            return newData;
          }        
        },      
    });


