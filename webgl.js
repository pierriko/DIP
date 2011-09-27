$(function() {
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage();
	}
	var width = $(window).width(), height = $(window).height();
	var container = $("body");
	var renderer = new THREE.WebGLRenderer({antialias: true});
	var scene = new THREE.Scene();
	//scene.fog = new THREE.Fog(0xffffff, 1000, 2000);
	
	var geometry = new THREE.PlaneGeometry(2000, 2000, 200, 200);
	var material = new THREE.ShaderMaterial({
		vertexShader: vertexShader,
		uniforms: {phase: {type: "f", value: 0}}
	});
	var terrain = new THREE.Mesh(geometry, [new THREE.MeshLambertMaterial(), material]);
	terrain.rotation.x = -Math.PI / 2;
	scene.add(terrain);
	
	var sun = new THREE.DirectionalLight();
	sun.position.y = 1000;
	sun.position.z = 1000;
	scene.add(sun);
	
	var camera = new THREE.FirstPersonCamera({
		fov: 60,
		aspect: width/height,
		lookSpeed: 0.1,
		movementSpeed: 1000
	});
	camera.position.y = 200;
	renderer.setSize(width, height);
	
	container.append(renderer.domElement);
	
	var gui = new DAT.GUI();
	gui.add(terrain.materials[0].color, "r", 0, 1);
	gui.add(terrain.materials[0].color, "g", 0, 1);
	gui.add(terrain.materials[0].color, "b", 0, 1);
	//gui.add(terrain.materials[0].uniforms.phase, "value", 0, Math.PI * 2).name("phase");
	gui.add(terrain.materials[0], "wireframe");
	gui.add(terrain.materials[1], "wireframe");
	
	var stats = new Stats();
	stats.domElement.style.position = "absolute";
	stats.domElement.style.bottom = 0;
	stats.domElement.style.right = 0;
	container.append(stats.domElement);
	
	$("div").hover(function() {camera.activeLook = false});
	$("> canvas", container).hover(function() {camera.activeLook = true});
	
	frame();
	
	function frame() {
		requestAnimationFrame(frame);
		stats.update();
		terrain.materials[1].uniforms.phase.value += 0.05;
		renderer.render(scene, camera);
	}
});
