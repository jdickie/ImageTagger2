// itagger 
// Used as an experimental image tagger with the Raphaeljs library

// Creates an SVG canvas that groups together *.jpg,*.png,*.gif images and 
// draws shapes on top of them using a kind of shape stack


(function(){
// Tagger Main
var main=this;


var tagger=function(id,img){
	var self=this;
	// wrapper loaded into the div with id @id
	self.html='<div id="tagger_toolbar"><a id="drawshape" href="#">Draw Shape</a><a href="#" id="rotate">Rotate</a></div><div id="tagger_main"></div>';
	$("#"+id).append(self.html);
	// document width and height
	var h=$(document).height();
	var w=$(document).width();
	// create canvas
	self.paper=new Raphael($("#tagger_main")[0],w,h);
	// insert image element
	// arbitrary width and height - should create an img element 
	// and measure real width & height onload
	self.canvasheight=480;
	self.canvaswidth=800;
	self.centerw=400;
	self.centerh=240;
	self.totalrotation=0;
	self.img=self.paper.image(img,0,0,self.canvaswidth,self.canvasheight);
	
	// create a grouping - all shapes go in here
	self.shapegroup=self.paper.set();
	self.shapegroup.push(self.img);
	// attach listeners
	$("#tagger_toolbar > #drawshape").click(function(e){
		e.preventDefault();
		
		self.drawShape();
	});
	
	$("#tagger_toolbar > #rotate").click(function(e){
		e.preventDefault();
		self.rotatePaper();
	});
};
tagger.prototype={
	// draws random shape
	drawShape:function(){
		var self=this;
		var shapetype=Math.floor(Math.random()*3);
		switch(shapetype){
			case 0:
				// draw circle
				var x=Math.floor(Math.random()*self.canvaswidth);
				var y=Math.floor(Math.random()*self.canvasheight);
				var w=Math.floor(Math.random()*100);
				var h=Math.floor(Math.random()*100);
				var c=self.paper.circle(x,y,w,h);
				c.rotate(self.totalrotation);
				// add to group
				self.shapegroup.push(c);
				break;
			case 1:
				// draw ellipse
				var x=Math.floor(Math.random()*self.canvaswidth);
				var y=Math.floor(Math.random()*self.canvasheight);
				var rx=Math.floor(Math.random()*100);
				var ry=Math.floor(Math.random()*100);
				var e=self.paper.ellipse(x,y,rx,ry);
				e.rotate(self.totalrotation);
				self.shapegroup.push(e);
				break;
			case 2:
				// draw rectangle
				var x=Math.floor(Math.random()*self.canvaswidth);
				var y=Math.floor(Math.random()*self.canvasheight);
				var w=Math.floor(Math.random()*100);
				var h=Math.floor(Math.random()*100);
				var r=self.paper.rect(x,y,w,h);
				r.rotate(self.totalrotation);
				// add to group
				self.shapegroup.push(r);
				break;
		}
		
	},
	rotatePaper:function(degree){
		var self=this;
		if(!degree) degree=15;
		
		// animate the set in order to rotate
		var rotatestring=""+(degree+self.totalrotation)+" "+self.centerw+" "+self.centerh;
		self.shapegroup.animate({rotation:rotatestring},1000);
		self.totalrotation=(degree+self.totalrotation);
		// self.img.rotate(degree);
	}
};

main.tagger=tagger;

})();


// start up the canvas
$(function(){
	// make a canvas with moose picture
	var canvas=new tagger("container","http://3.bp.blogspot.com/_xs9T-jlzwhA/TNeYFzg-RUI/AAAAAAAAn3k/Wt65EiVvAj8/s1600/norway-moose.jpg");
});