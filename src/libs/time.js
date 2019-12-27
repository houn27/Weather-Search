export const Time={
    getUnix:function(){
        var date=new Date();
        return date.getTime();
    },
    //获取今天0点0分0秒的时间戳
    getTodayUnix:function(){
        var date=new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    },
    //获取今年1月1日0点0分0秒的时间戳
    getYearUnix:function(){
        var date=new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
        
    },
    //获取标准年月日格式
    getLastDate: function( date){
        //var date=new Date(time);
        const year= date.getFullYear();
        //js中月份为0-11
        const month=date.getMonth()+1<10 ? '0'+(date.getMonth()+1):date.getMonth()+1;
        const day=date.getDate()<10 ? '0'+date.getDate():date.getDate();
        return year+'-'+month+'-'+day;
    },
    //转换时间
    getFormatTime:function(timestamp){
        var now=this.getUnix();
        var today=this.getTodayUnix();
        //var year=this.getYearUnix();
        var timer=(now-timestamp)/1000;
        var tip='';
        if(timer<=0){
            tip='recently';
        }else if(Math.floor(timer/60 )<=0){
            tip='recently'
        }else if(timer<3600){
            tip=Math.floor(timer/60)+'minutes ago';
        }else if(timer>=3600 && (timestamp-today>=0)){
            tip=Math.floor(timer/3600)+'hours ago';
        }else{
            tip=this.getLastDate(timestamp);
        }
        return tip;
    }
 
}

