import * as THREE from 'three';
import {MindARThree} from 'mindar-face-three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const mindARThree = new MindARThree({
    container: document.querySelector("#container"),
    imageTargetSrc:'./assets/targets.mind'
});

const {renderer, scene, camera} = mindARThree;

const geometry = new THREE.SphereGeometry(0.1,32,16);
const material = new THREE.MeshBasicMaterial({color:0x000fff, transparent:true, opacity:0.5});
const plane = new THREE.Mesh(geometry,material);
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );


const onLoad = (result)=>{
    const model = result.scene.children[0];
    //model.position.copy(position);
    model.scale.set(0.5, 0.5, 0.5);
    model.rotation.y = 90;
    scene.add(model);

    var glassParent = new THREE.Group();
    glassParent.add(model);

    const anchor = mindARThree.addAnchor(168);
    anchor.group.add(glassParent);
};

const loader = new GLTFLoader();
loader.load('assets/sunglasses.glb',glass=>onLoad(glass));



const start = async() => {
    await mindARThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
}

start();
