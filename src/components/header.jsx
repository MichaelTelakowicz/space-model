import React, { useEffect } from "react";
import "./header.css";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sun from "../images/sun.jpg";
import Mercury from "../images/mercury.jpg";
import Venus from "../images/venus.jpg";
import Earth from "../images/earth.jpg";
import Moon from "../images/moon.jpg";
import Mars from "../images/mars.jpg";
import Jupiter from "../images/jupiter.jpg";
import Saturn from "../images/saturn.jpg";
import SaturnRing from "../images/saturnring.png";
import Uranus from "../images/uranus.jpg";
import Neptune from "../images/neptune.jpg";

const Header = () => {
  useEffect(() => {
    console.log(window.innerWidth);
    /*

      FUNCTIONS

    */

    let r = 1;
    let theta = 0;
    let dTheta = (1.2 * Math.PI) / 600;
    function animate() {
      let rotationAmount = 0.003;

      requestAnimationFrame(animate);

      // earth.rotation.y += rotationAmount / 3;

      theta += dTheta;
      moon.position.x = r * Math.cos(theta) - 3.8;
      moon.position.z = r * Math.sin(theta);
      moon.position.y = r * Math.cos(theta);

      saturn.rotation.x += rotationAmount;
      saturn.rotation.y += rotationAmount;
      saturn.rotation.z += rotationAmount;

      saturnRing.rotation.x += rotationAmount;
      saturnRing.rotation.y += rotationAmount;

      // controls.update();

      renderer.render(scene, camera);
    }

    function addStar() {
      const starGeometry = new THREE.SphereGeometry(0.025, 24, 24);
      const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(starGeometry, starMaterial);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(50));

      star.position.set(x, y, z);
      scene.add(star);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      let cameraPosition = window.innerWidth >= 1250 ? 1250 : window.innerWidth;

      camera.position.setZ(12500 / cameraPosition);
    }

    /*

      STARTING VARIABLES

    */

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector("#background"),
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let cameraPosition = window.innerWidth >= 1250 ? 1250 : window.innerWidth;

    camera.position.setZ(12500 / cameraPosition);

    /*

      GEOMETRY SHAPES

    */

    const sunGeometry = new THREE.SphereGeometry(1.4, 32, 32);
    const sunTexture = new THREE.TextureLoader().load(Sun);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    sun.position.x = -10;

    scene.add(sun);

    //

    const mercuryGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const mercuryTexture = new THREE.TextureLoader().load(Mercury);
    const mercuryMaterial = new THREE.MeshBasicMaterial({
      map: mercuryTexture,
    });
    const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

    mercury.position.x = -7;

    scene.add(mercury);

    //

    const venusGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const venusTexture = new THREE.TextureLoader().load(Venus);
    const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
    const venus = new THREE.Mesh(venusGeometry, venusMaterial);

    venus.position.x = -5.5;

    scene.add(venus);

    //

    const earthGeometry = new THREE.SphereGeometry(0.65, 32, 32);
    const earthTexture = new THREE.TextureLoader().load(Earth);
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    earth.position.x = -3.8;
    // earth.rotation.z = 0.3;

    scene.add(earth);

    //

    const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const moonTexture = new THREE.TextureLoader().load(Moon);
    const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);

    moon.position.x = -3.8;
    moon.position.y = 0.05;

    scene.add(moon);

    //

    const marsGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const marsTexture = new THREE.TextureLoader().load(Mars);
    const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
    const mars = new THREE.Mesh(marsGeometry, marsMaterial);

    mars.position.x = -2;

    scene.add(mars);

    //

    const jupiterGeometry = new THREE.SphereGeometry(1.4, 32, 16);
    const jupiterTexture = new THREE.TextureLoader().load(Jupiter);
    const jupiterMaterial = new THREE.MeshBasicMaterial({
      map: jupiterTexture,
    });

    const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);

    jupiter.position.x = 0.75;

    scene.add(jupiter);

    const saturnGeometry = new THREE.SphereGeometry(1.2, 32, 16);
    const saturnTexture = new THREE.TextureLoader().load(Saturn);
    const saturnMaterial = new THREE.MeshBasicMaterial({
      map: saturnTexture,
    });

    const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);

    //

    const saturnRingGeometry = new THREE.RingBufferGeometry(1.25, 2, 64);
    const saturnRingTexture = new THREE.TextureLoader().load(SaturnRing);
    var pos = saturnRingGeometry.attributes.position;
    var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      saturnRingGeometry.attributes.uv.setXY(i, v3.length() < 1.55 ? 0 : 1, 1);
    }

    const saturnRingMaterial = new THREE.MeshBasicMaterial({
      map: saturnRingTexture,
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
    });

    const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);

    saturn.position.x = 4.7;
    saturnRing.position.x = 4.7;

    scene.add(saturn, saturnRing);

    //

    const uranusGeometry = new THREE.SphereGeometry(0.85, 32, 32);
    const uranusTexture = new THREE.TextureLoader().load(Uranus);

    const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
    const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);

    uranus.position.x = 8;

    scene.add(uranus);

    //

    const neptuneGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const neptuneTexture = new THREE.TextureLoader().load(Neptune);
    const neptuneMaterial = new THREE.MeshBasicMaterial({
      map: neptuneTexture,
    });
    const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);

    neptune.position.x = 10.8;

    scene.add(neptune);

    /*

      LIGHTING

    */

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointLight, ambientLight);

    /*

      HELPERS

    */

    /*

      FUNCTION CALLS

    */

    window.addEventListener("resize", () => onWindowResize(), false);

    Array(450).fill().forEach(addStar);

    animate();
  }, []);

  return (
    <div id="header">
      <canvas id="background"></canvas>
    </div>
  );
};

export default Header;
