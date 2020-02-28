import React, {Component, Fragment} from 'react';
import * as THREE from 'three'
import requestAnimationFrame from 'requestanimationframe'
import Stats from 'stats-js'
import {setCanvasSize} from '../utils/utils'

class Line extends Component {
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
    camera.position.x = 0;
    camera.position.y = 0
    camera.position.z = 200;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    for (let i = 0; i < 40; i++) {
      var geometry = new THREE.Geometry()
      var material = new THREE.LineBasicMaterial()
      geometry
        .vertices
        .push(new THREE.Vector3(i * 5, -100, 0));
      geometry
        .vertices
        .push(new THREE.Vector3(i * 5, 100, 0));
      var line = new THREE.Line(geometry, material)
      scene.add(line)
    }

    for (let i = 0; i < 40; i++) {
      geometry = new THREE.Geometry()
      material = new THREE.LineBasicMaterial()
      geometry
        .vertices
        .push(new THREE.Vector3(-100, i * 5, 0));
      geometry
        .vertices
        .push(new THREE.Vector3(100, i * 5, 0));
      line = new THREE.Line(geometry, material)
      scene.add(line)
    }

    // document .body .appendChild(renderer.domElement);

    stats = new Stats();
    document
      .body
      .appendChild(stats.dom);

    //

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      //  camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    }

    //

    function animate() {
      //  requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render() {
      // var timer = Date.now() * 0.0001; camera.position.x = Math.cos(timer) * 800;
      // camera.position.z = Math.sin(timer) * 800;
      camera.lookAt(scene.position);
      // scene.traverse(function (object) {   if (object.isMesh === true) {
      // object.rotation.x = timer * 5;     object.rotation.y = timer * 2.5;   } });

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

export default Line;