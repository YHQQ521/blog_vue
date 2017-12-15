window.onload=function(){
	var wrap=document.getElementById('wrap')
	var ulObj=document.getElementById('ul1');
	var liObj=ulObj.getElementsByTagName('li');
	var ul2Obj=document.getElementById('ul2'); 
	var li1Obj=ul2Obj.getElementsByTagName('li');
	var pre=document.getElementById('pre'); 
	var next=document.getElementById('next'); 
	//这个地方不能用for循环（也就是说在定时器中一般不要用循环，定时器本身就是在循环），只能声明一个全局变量判断条件做累加。
	var ii=0;
	var timer;
	//将定时器封装成函数；这个地方如果想调用定时器的话只能调用这个封装函数，不能直接调用定时器了，因为定时器被封装成函数之后，就不能作为函数的一部分调用。
	autoplay();
	function autoplay(){
		timer=setInterval(function(){		
			ii++;//这个地方从i=1开始执行，因为一开始第一张图片默认显示
			if(ii==liObj.length){
				ii=0;
			}
			goto(ii);
			
		},4000)
	}
	//该函数被调用多次，所以封装成一个函数。
	function goto(num){
		for(var i=0;i<liObj.length;i++){
		
			if(num==i){
				liObj[num].style.display='block';
				li1Obj[num].style.background='#AACC03';
			}else{
				liObj[i].style.display='none';
				li1Obj[i].style.background='#FFF';
			}
		}
	}

	pre.onclick=function(){
		ii-=1;
		if(ii<0){
			ii=2;
		}
		goto(ii);
	}
	next.onclick=function(){
		ii+=1;
		if(ii>2){
			ii=0;
		}
		goto(ii);
	}
	wrap.onmouseover=function(){
		clearInterval(timer);
	}
	wrap.onmouseout=function(){
	    autoplay();
	}
	for(var i=0;i<li1Obj.length;i++){
		li1Obj[i].index=i;
		li1Obj[i].onclick=function(){
			goto(this.index);
	ii=this.index;
			}
	}		
}