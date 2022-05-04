const  canvas = new fabric.Canvas("canvas");
const uploader=document.getElementById("uploader");
uploader.onchange = function (e) {
	var reader = new FileReader();
	reader.onload = function (e) {
		var image = new Image();
		image.src = e.target.result;
		image.onload = function () {
			var img = new fabric.Image(image);
			img.set({
				left: 200,
				top: 200,
			});
			img.scaleToWidth(400);
			canvas.add(img).setActiveObject(img).renderAll();
		};
	};
	reader.readAsDataURL(e.target.files[0]);
};

canvas.on('mouse:wheel', function(opt) {
	var delta = opt.e.deltaY;
	var zoom = canvas.getZoom();
	const center=canvas.getCenter();
	const center_point=new fabric.Point(center.left,center.top);
	zoom *= 0.999 ** delta;
	if (zoom > 20) zoom = 20;
	if (zoom < 1) zoom = 1;
	if(delta<1){
		canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
	}else{
		canvas.zoomToPoint(   center_point,zoom);
		 console.log(center_point );
	}
	opt.e.preventDefault();
	opt.e.stopPropagation();
  });