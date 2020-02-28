import React, {Component, Fragment} from 'react';
import * as THREE from 'three'
import requestAnimationFrame from 'requestanimationframe'
import StatsComponent from '../components/Stats'
import OrbitControls from 'three-orbitcontrols'
import {setCanvasSize} from '../utils/utils'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: null,
      carema: null,
      renderer: null,
      controls: null,
      animationType: 1,
      cube: null
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

    // 灯光
    var light = new THREE.DirectionalLight(0xffffff, 1.5);
    // 将灯光放置在场景外，指向原点
    light
      .position
      .set(0, 0, 1);
    scene.add(light);

    light = new THREE.DirectionalLight(0xffffff, 1.5);
    // 将灯光放置在场景外，指向原点
    light
      .position
      .set(0, 0, -1);
    scene.add(light);

    var mapUrl = "../images/webgl-logo-256.jpg"
    new THREE
      .TextureLoader()
      .load(mapUrl, map => this.initScene(map))

    window.addEventListener('resize', this.onWindowResize, false)
    document.addEventListener("mousewheel", this.onDocumentMouseWheel, false);
    const controls = new OrbitControls(camera, renderer.domElement); //创建控件对象
    controls.addEventListener('change', this.webGLRender); //监听鼠标、键盘事件
    controls.enableDamping = true
    controls.dampingFactor = 0.5
    controls.enableZoom = false
    this.setState({renderer, camera, controls, scene})
  }

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
  initScene = map => {
    const {scene} = this.state
    var material = new THREE.MeshPhongMaterial({map})
    var geometry = new THREE.CubeGeometry(2, 2, 2)
    const cube = new THREE.Mesh(geometry, material)
    cube.position.z = 0
    cube.rotation.x = -1
    cube.rotation.y = -1
    scene.add(cube)
    this.setState({cube, scene})
    this.webGLRender()
  }

  // 动画
  duration = 5000; // ms
  currentTime = Date.now();
  animate = () => {
    const {cube, animationType} = this.state
    if (animationType === 2) {
      requestAnimationFrame(this.animate);
      var now = Date.now();
      var deltat = now - this.currentTime;
      this.currentTime = now;
      var fract = deltat / this.duration;
      var angle = Math.PI * 2 * fract;
      cube.rotation.y += angle;

      this.setState({
        cube
      }, () => {
        this.webGLRender()
      })
    }
  }

  webGLRender = () => {
    const {renderer, scene, camera} = this.state
    renderer.render(scene, camera);
    this.refs.stats.update()
  }

  handleChange = (type) => {
    const {controls} = this.state
    if (type === 2) {
      controls.removeEventListener('change', this.webGLRender);
    } else {
      controls.addEventListener('change', this.webGLRender);
    }
    this.setState({
      animationType: type,
      controls
    }, () => {
      if (type === 2) {
        this.animate()
      }
    })
  }

  render() {
    const {animationType} = this.state
    return (
      <Fragment>
        <StatsComponent ref="stats" />
        <div className="opration">
          <label>拖动旋转
            <input
              type="radio"
              name="type"
              value="1"
              checked
              ={animationType === 1
              ? true
              : false}
              onChange={() => this.handleChange(1)}/>
          </label>
          <br/>
          <label>自动旋转
            <input
              type="radio"
              name="type"
              value="2"
              checked
              ={animationType === 2
              ? true
              : false}
              onChange={() => this.handleChange(2)}/></label>
        </div>

        <canvas id="canvas"></canvas>
      </Fragment>
    );
  }
}

export default Home;