
$(document).ready(
    function(){
        var array = [1,2,3,4,5,6,7,8,9];
        var filterarray = $.grep(array,function(value){
            return value > 5;//筛选出大于5的
        });
        for(var i=0;i<filterarray.length;i++){
            console.log(filterarray[i]);
        }
        for (key in filterarray){
            console.log(filterarray[key]);
        }
    }
);
$(document).ready(
    function(){
        var anObject = {one:1,two:2,three:3};//对json数组each
        $.each(anObject,function(name,value) {
            console.log(name);
            console.log(value);
        });
        var anArray = ['one','two','three'];
        $.each(anArray,function(n,value){
            console.log(n);
            console.log(value);
        });
    }
);
$().ready(
    function(){
        var strings = ['0','1','2','3','4','S','6'];
        var values = $.map(strings,function(value){
                var result = new Number(value);
                return isNaN(result) ? null:result;//isNaN:is Not a Number的缩写
            }
        );
        for (key in values) {
            console.log(values[key]);
        }
    }
);
var json = [{name:'小姐姐',name2:'另一个小姐姐',name3:123},{age:'23',age2:'25'}];
for(var i=0,l=json.length;i<l;i++){
    for(var key in json[i]){
        console.log(key+':'+json[i][key]);
    }
}