import React, {Component, Fragment} from 'react';
import * as THREE from 'three'
import requestAnimationFrame from 'requestanimationframe'
import Stats from 'stats-js'
import {setCanvasSize} from '../utils/utils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const canvas = document.getElementById('canvas')
    setCanvasSize(canvas, window.innerWidth, window.innerHeight)
    this.init(canvas)
  }

  init(canvas) {
    var camera,
      scene,
      renderer,
      stats;
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 800;

    scene = new THREE.Scene();

    var object;

    var ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    camera.add(pointLight);
    scene.add(camera);

    var map = new THREE
      .TextureLoader()
      .load('../images/ash_uvgrid01.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    // 球体
    var material = new THREE.MeshPhongMaterial({map: map, side: THREE.DoubleSide});
    object = new THREE.Mesh(new THREE.SphereBufferGeometry(75, 20, 10), material);
    object
      .position
      .set(-300, 0, 200);
    scene.add(object);

    // 24面体
    object = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(75, 1), material);
    object
      .position
      .set(-100, 0, 200);
    scene.add(object);

    // 8面体
    object = new THREE.Mesh(new THREE.OctahedronBufferGeometry(75, 2), material);
    object
      .position
      .set(100, 0, 200);
    scene.add(object);

    // 四面体
    object = new THREE.Mesh(new THREE.TetrahedronBufferGeometry(75, 0), material);
    object
      .position
      .set(300, 0, 200);
    scene.add(object);

    // 平面
    object = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100, 4, 4), material);
    object
      .position
      .set(- 300, 0, 0);
    scene.add(object);

    // 立方体
    object = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100, 100, 4, 4, 4), material);
    object
      .position
      .set(- 100, 0, 0);
    scene.add(object);

    // 圆
    object = new THREE.Mesh(new THREE.CircleBufferGeometry(50, 20, 0, Math.PI * 2), material);
    object
      .position
      .set(100, 0, 0);
    scene.add(object);

    // 环
    object = new THREE.Mesh(new THREE.RingBufferGeometry(10, 50, 20, 5, 0, Math.PI * 2), material);
    object
      .position
      .set(300, 0, 0);
    scene.add(object);

    // 圆台
    object = new THREE.Mesh(new THREE.CylinderBufferGeometry(25, 75, 100, 40, 5), material);
    object
      .position
      .set(- 300, 0, - 200);
    scene.add(object);

    // 车床
    var points = [];
    for (var i = 0; i < 50; i++) {
      points.push(new THREE.Vector2(Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
    }
    object = new THREE.Mesh(new THREE.LatheBufferGeometry(points, 20), material);
    object
      .position
      .set(-100, 0, - 200);
    scene.add(object);

    // 圆环
    object = new THREE.Mesh(new THREE.TorusBufferGeometry(50, 20, 20, 20), material);
    object
      .position
      .set(100, 0, - 200);
    scene.add(object);

    // 环面纽结
    object = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(50, 10, 50, 20), material);
    object
      .position
      .set(300, 0, - 200);
    scene.add(object);

    renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var geometry = new THREE.Geometry()
    material = new THREE.LineBasicMaterial()
    // material.color = new THREE.Color('#f45343')
    geometry.colors.push( new THREE.Color('#f45343'), new THREE.Color('#f45343') )
    geometry.vertices.push(new THREE.Vector3(-100,0,0));
    geometry.vertices.push(new THREE.Vector3(0,0,-100));
    geometry.vertices.push(new THREE.Vector3(0,100, 0));
   
    var line = new THREE.LineLoop(geometry, material)

    scene.add(line)
    // document .body .appendChild(renderer.domElement);

    stats = new Stats();
    document
      .body
      .appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    function animate() {
      requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render() {
      var timer = Date.now() * 0.0001;
      camera.position.x = Math.cos(timer) * 800;
      camera.position.z = Math.sin(timer) * 800;
      camera.lookAt(scene.position);
      scene.traverse(function (object) {
        if (object.isMesh === true) {
          object.rotation.x = timer * 5;
          object.rotation.y = timer * 2.5;
        }
      });

      renderer.render(scene, camera);

    }
    animate()
  }

  render() {
    return (
      <Fragment>
        <canvas id="canvas"></canvas>
      </Fragment>
    );
  }
}

export default Home;