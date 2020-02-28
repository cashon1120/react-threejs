import React, {Component, Fragment} from 'react';
import * as THREE from 'three'
import requestAnimationFrame from 'requestanimationframe'
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats-js'
import TWEEN from 'tween'
import {setCanvasSize} from '../utils/utils'

class Ion extends Component {
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
    var flag = false; //是否开始变换
    var container,
      stats;
    var camera,
      scene,
      renderer,
      particles,
      geometry,
      material,
      glist = []; // glist 点阵数组
    var around,
      aroundMaterial,
      aroundPoints; // 环境点组
    var mouseX = 0,
      mouseY = 0;
    var objIndex = 0; // 当前点阵模型index
    // renderer 的承载容器
    container = document.createElement('div');
    document
      .body
      .appendChild(container);
    // 初始化相机
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 10, 10000);
    camera.position.z = 1000;
    // 初始化场景
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001); // 雾化
    //初始化renderer
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 初始化geometry
    geometry = new THREE.Geometry();
    around = new THREE.Geometry();
    // 初始化贴图
    var textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = '';
    textureLoader.load('../images/gradient.png', texture => addPoint(texture)); // 圆点

    function addPoint(texture) {
      //初始变换点组
      for (let i = 0; i < 10000; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = 800 * Math.random() - 400;
        vertex.y = 800 * Math.random() - 400;
        vertex.z = 800 * Math.random() - 400;

        geometry
          .vertices
          .push(vertex);
        geometry
          .colors
          .push(new THREE.Color(1, 1, 1));

      }
      material = new THREE.PointsMaterial({size: 10, sizeAttenuation: true, transparent: true, opacity: 0.5, map: texture});

      material.vertexColors = THREE.VertexColors;
      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      //环境点组
      for (let i = 0; i < 1000; i++) {

        let vertex = new THREE.Vector3();
        vertex.x = 10000 * Math.random() - 5000;
        vertex.y = 10000 * Math.random() - 5000;
        vertex.z = 10000 * Math.random() - 5000;

        around
          .vertices
          .push(vertex);

        around
          .colors
          .push(new THREE.Color(1, 1, 1));

      }
      aroundMaterial = new THREE.PointsMaterial({
        size: 1,
        sizeAttenuation: true,
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        map: texture
      });

      aroundMaterial.vertexColors = THREE.VertexColors;
      aroundPoints = new THREE.Points(around, aroundMaterial);
      scene.add(aroundPoints);
      animate()
    }

    //添加状态监控面板
    stats = new Stats();
    document
      .body
      .appendChild(stats.dom);

    //事件监听
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener("mousewheel", onDocumentMouseWheel, false);
    document.addEventListener("keydown", onDocumentKeyDown, false);
    window.addEventListener('resize', onWindowResize, false);

    function onDocumentMouseWheel(event) {
      camera.position.z = Math.max(camera.position.z += event.deltaY, 50)
    }

    function tweenObj(index) {
      geometry
        .vertices
        .forEach(function (e, i, arr) {
          var length = glist[index].vertices.length;
          var o = glist[index].vertices[i % length];
          new TWEEN
            .Tween(e)
            .to({
              x: o.x,
              y: o.y,
              z: o.z
            }, 1000)
            .easing(TWEEN.Easing.Exponential.In)
            .delay(1000 * Math.random())
            .start();
        })
      camera.position.z = 750;
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentKeyDown(event) {
      if (event.which === 40 && objIndex < 4) {
        objIndex++;
        // tweenObj(objIndex);
        flag = true;
      } else if (event.which === 38 && objIndex > 0) {
        objIndex--;
        // tweenObj(objIndex);
        flag = true;
      }
    }

    function onDocumentMouseDown(event) {
      event.preventDefault();
      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('mouseout', onDocumentMouseOut, false);
      mouseX = event.pageX;
      mouseY = event.pageY;
    }

    function onDocumentMouseMove(event) {
      geometry.rotateY((event.pageX - mouseX) / 1000 * 2 * Math.PI);
      geometry.rotateX((event.pageY - mouseY) / 500 * 2 * Math.PI);

      event.preventDefault();
      mouseX = event.pageX;
      mouseY = event.pageY;
    }

    function onDocumentMouseUp(event) { //释放鼠标键
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
      document.removeEventListener('mouseup', onDocumentMouseUp, false);
      document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }

    function onDocumentMouseOut(event) { //移走鼠标
      document.removeEventListener('mousemove', onDocumentMouseMove, false);
      document.removeEventListener('mouseup', onDocumentMouseUp, false);
      document.removeEventListener('mouseout', onDocumentMouseOut, false);
    }

    function animate(time) {
      // requestAnimationFrame(animate);
      render();
      stats.update();
    }

    function render() {
      renderer.render(scene, camera); //执行渲染操作
    }
    var controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
    controls.addEventListener('change', render); //监听鼠标、键盘事件
    controls.enableDamping = true
    controls.dampingFactor = 
    controls.enableZoom = false
  }

  render() {
    return (
      <Fragment>
        <canvas id="canvas"></canvas>
      </Fragment>
    );
  }
}

export default Ion;