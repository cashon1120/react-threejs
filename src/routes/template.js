import React, {Component, Fragment} from 'react';
import * as THREE from 'three'
import requestAnimationFrame from 'requestanimationframe'
import StatsComponent from '../components/Stats'
import {setCanvasSize} from '../utils/utils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderer: null,
      camera: null,
      scene: null
    };
  }

  componentDidMount() {
    this.initCanvas()
  }

  initCanvas() {
    const canvas = document.getElementById('canvas')
    setCanvasSize(canvas, window.innerWidth, window.innerHeight)

    // 渲染器
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true})
    renderer.setSize(canvas.width, canvas.height)

    // 场景
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000);

    // 相机
    const camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 2000)
    camera.position.z = 20;

    // 灯光, 将灯光放置在场景外，指向原点
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    light
      .position
      .set(0, 0, 1);
    scene.add(light);

    this.setState({renderer, camera, scene})

    // 绑定用户操作事件
    window.addEventListener('resize', this.onWindowResize, false)
    document.addEventListener("mousewheel", this.onDocumentMouseWheel, false);
  }

  // 鼠标滚动事件
  onDocumentMouseWheel = event => {
    const {camera} = this.state
    camera.position.z = Math.max(camera.position.z += event.deltaY / 2, 5)
    camera.lookAt(0, 0, 0,)
    this.setState({
      camera
    }, () => {
      this.webGLRender()
    })
  }

  // 窗口大小改变
  onWindowResize = () => {
    const {camera, renderer} = this.state
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.setState({
      camera,
      renderer
    }, () => {
      this.webGLRender()
    })
  }

  // 初始化场景, 添加对象
  initScene = () => {
  }

  // 动画
  duration = 5000; // ms
  currentTime = Date.now();
  animate = () => {
    requestAnimationFrame(this.animate);
    this.webGLRender()
  }

  webGLRender = () => {
    const {renderer, scene, camera} = this.state
    renderer.render(scene, camera);
    this.refs.stats.update()
  }

  render() {
    return (
      <Fragment>
        <StatsComponent ref="stats" />
        <canvas id="canvas"></canvas>
      </Fragment>
    );
  }
}

export default Home;