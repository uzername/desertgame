import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import { WebGLRenderer } from "three";
import { BoxGeometry } from "three";
import {MeshBasicMaterial} from "three";
import {AmbientLight} from "three";
import {DirectionalLight} from "three";
import {Mesh} from 'three';
//import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { PointerLockControls } from 'three/examples/jsm/controls/FirstPersonControls';
console.log("Inside MAIN.JS");
export function MYFUNCTION2 () {
    
}

/*
var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new BoxGeometry();
var material = new MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();
*/

export class MyRender {
    constructor (el) {
        this.el = document.querySelector(el)
        this.init()
        this.animate()
        this.obj = null
        this.mouse = {
            x: 0,
            y: 0
        }
    }

    init () {
        // renderer
        this.bbox = this.el.getBoundingClientRect()
        this.renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        })
        this.renderer.setSize(this.bbox.width, this.bbox.height)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.el.appendChild(this.renderer.domElement)

        // scene
        this.scene = new Scene()
        
        // camera
        this.camera = new PerspectiveCamera(40, this.bbox.width / this.bbox.height, 1, 10000)
        this.camera.position.set(0, 0, 20)
        
        // ambient
        this.scene.add(new AmbientLight(0x222222))
        
        // light
        let light = new DirectionalLight(0xffffff, 1)
        light.position.set(20,20, 0)
        this.scene.add(light)
        
       var geometry = new BoxGeometry();
       var material = new MeshBasicMaterial( { color: 0x00ff00 } );
       this.obj = new Mesh( geometry, material );
       this.scene.add( this.obj );


        window.addEventListener('mousemove', (e) => {
            let xPercent = parseInt(e.pageX / window.innerWidth * 100) - 50
            let yPercent = parseInt(e.pageY / window.innerHeight * 100) - 50
            this.mx = xPercent / 100
            this.my = yPercent / 100
            if (this.obj) {
                this.obj.rotation.y = this.mx
                this.obj.rotation.x = this.my
            }
        })

        window.addEventListener('resize', () => {
            this.resize()
        })

        return this
    }

    resize () {
        this.bbox = this.el.getBoundingClientRect()
        this.camera.aspect = this.bbox.width / this.bbox.height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.bbox.width, this.bbox.height)
    }

    animate () {
        requestAnimationFrame(() => this.animate())

        this.renderer.render(this.scene, this.camera)
    }
}
