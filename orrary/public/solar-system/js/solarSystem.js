//Import
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";  // Importa GLTFLoader

//////////////////////////////////////
//Creating renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//////////////////////////////////////
//texture loader
const textureLoader = new THREE.TextureLoader();

//////////////////////////////////////
//import all texture
const starTexture = textureLoader.load("../../static/image/stars.jpg");
const sunTexture = textureLoader.load("../../static/image/sun.jpg");
const mercuryTexture = textureLoader.load("../../static/image/mercury.jpg");
const venusTexture = textureLoader.load("../../static/image/venus.jpg");
const earthTexture = textureLoader.load("../../static/image/earth.jpg");
const marsTexture = textureLoader.load("../../static/image/mars.jpg");
const jupiterTexture = textureLoader.load("../../static/image/jupiter.jpg");
const saturnTexture = textureLoader.load("../../static/image/saturn.jpg");
const uranusTexture = textureLoader.load("../../static/image/uranus.jpg");
const neptuneTexture = textureLoader.load("../../static/image/neptune.jpg");
const plutoTexture = textureLoader.load("../../static/image/pluto.jpg");
const saturnRingTexture = textureLoader.load("../../static/image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("../../static/image/uranus_ring.png");

//////////////////////////////////////
//scene
const scene = new THREE.Scene();

//////////////////////////////////////
// Cargar el modelo del skybox (space.glb)
const gltfLoader = new GLTFLoader();
gltfLoader.load('../../static/image/space.glb', (gltf) => {
  const skyboxModel = gltf.scene;

  // Ajusta el tamaño del skybox para que envuelva toda la escena
  skyboxModel.scale.set(500, 500, 500); // Ajusta según sea necesario

  // Agrega el skybox a la escena
  scene.add(skyboxModel);
}, undefined, (error) => {
  console.error('Error al cargar el skybox:', error);
});


//////////////////////////////////////
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-50, 90, 150);

//////////////////////////////////////
//Percpective controll
const orbit = new OrbitControls(camera, renderer.domElement);

//////////////////////////////////////
//sun
const sungeo = new THREE.SphereGeometry(15, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sungeo, sunMaterial);
scene.add(sun);

//////////////////////////////////////
//sun light (point light)
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);

//////////////////////////////////////
//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

//////////////////////////////////////
//path for planet
const path_of_planets = [];
function createLineLoopWithMesh(radius, color, width) {
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: width,
  });
  const geometry = new THREE.BufferGeometry();
  const lineLoopPoints = [];

  // Calculate points for the circular path
  const numSegments = 100; 
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * Math.PI * 2;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    lineLoopPoints.push(x, 0, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(lineLoopPoints, 3)
  );
  const lineLoop = new THREE.LineLoop(geometry, material);
  scene.add(lineLoop);
  path_of_planets.push(lineLoop);
}

/////////////////////////////////////
//create planet
const genratePlanet = (size, planetTexture, x, ring) => {
  const planetGeometry = new THREE.SphereGeometry(size, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: planetTexture,
  });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);
  const planetObj = new THREE.Object3D();
  planet.position.set(x, 0, 0);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    planetObj.add(ringMesh);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(planetObj);

  planetObj.add(planet);
  createLineLoopWithMesh(x, 0xffffff, 3);
  return {
    planetObj: planetObj,
    planet: planet,
  };
};

const planets = [
  {
    ...genratePlanet(3.2, mercuryTexture, 28),
    rotaing_speed_around_sun: 0.004,
    self_rotation_speed: 0.004,
  },
  {
    ...genratePlanet(5.8, venusTexture, 44),
    rotaing_speed_around_sun: 0.015,
    self_rotation_speed: 0.002,
  },
  {
    ...genratePlanet(6, earthTexture, 62),
    rotaing_speed_around_sun: 0.01,
    self_rotation_speed: 0.02,
  },
  {
    ...genratePlanet(4, marsTexture, 78),
    rotaing_speed_around_sun: 0.008,
    self_rotation_speed: 0.018,
  },
  {
    ...genratePlanet(12, jupiterTexture, 100),
    rotaing_speed_around_sun: 0.002,
    self_rotation_speed: 0.04,
  },
  {
    ...genratePlanet(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }),
    rotaing_speed_around_sun: 0.0009,
    self_rotation_speed: 0.038,
  },
  {
    ...genratePlanet(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }),
    rotaing_speed_around_sun: 0.0004,
    self_rotation_speed: 0.03,
  },
  {
    ...genratePlanet(7, neptuneTexture, 200),
    rotaing_speed_around_sun: 0.0001,
    self_rotation_speed: 0.032,
  },
  {
    ...genratePlanet(2.8, plutoTexture, 216),
    rotaing_speed_around_sun: 0.0007,
    self_rotation_speed: 0.008,
  },
];

//////////////////////////////////////
//GUI options
var GUI = dat.gui.GUI;
const gui = new GUI();
const options = {
  "Real view": true,
  "Show path": true,
  speed: 1,
};
gui.add(options, "Real view").onChange((e) => {
  ambientLight.intensity = e ? 0 : 0.5;
});
gui.add(options, "Show path").onChange((e) => {
  path_of_planets.forEach((dpath) => {
    dpath.visible = e;
  });
});
const maxSpeed = new URL(window.location.href).searchParams.get("ms")*1
gui.add(options, "speed", 0, maxSpeed?maxSpeed:20);

//////////////////////////////////////
//animate function
function animate(time) {
  sun.rotateY(options.speed * 0.004);
  planets.forEach(
    ({ planetObj, planet, rotaing_speed_around_sun, self_rotation_speed }) => {
      planetObj.rotateY(options.speed * rotaing_speed_around_sun);
      planet.rotateY(options.speed * self_rotation_speed);
    }
  );
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

//////////////////////////////////////
//resize camera view
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/////////////////////////////////
// planet click
planets.forEach(({ planet }, index) => {
  planet.userData = { planetName: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"][index] };
  
  // event click
  planet.callback = (event) => {
    const planetName = event.target.userData.planetName;
    const planetData = getPlanetInfo(planetName);
    
    if (planetData) {
      openModal(planetName, planetData, planet.material.map);
    }
  };
});

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  
  const intersects = raycaster.intersectObjects(planets.map(p => p.planet));
  
  if (intersects.length > 0) {
    intersects[0].object.callback({ target: intersects[0].object });
  }
});

///////////////////////////
// Modal planet's infomation
function openModal(planetName, planetData, texture) {
  const modal = document.getElementById('planet-modal');
  const planetView = document.getElementById('planet-view');
  const planetDataTable = document.getElementById('planet-data');

  planetView.innerHTML = '';
  modal.style.display = 'block';

  planetDataTable.innerHTML = `
    <tr><td>Name</td><td>${planetName}</td></tr>
    <tr><td>Sun's Distance</td><td>${planetData.distance} millions of kilometers</td></tr>
    <tr><td>Radius</td><td>${planetData.radius} km</td></tr>
    <tr><td>Gravity</td><td>${planetData.gravity} m/s²</td></tr>
    <tr><td>Day</td><td>${planetData.dayLength} hours</td></tr>
    <tr><td>Year</td><td>${planetData.yearLength} days</td></tr>
  `;

  // Planet render modal
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, planetView.clientWidth / planetView.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(planetView.clientWidth, planetView.clientHeight);
  planetView.appendChild(renderer.domElement);

  const planetGeometry = new THREE.SphereGeometry(5, 50, 50);
  const planetMaterial = new THREE.MeshStandardMaterial({
    map: texture,  });
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
  scene.add(planetMesh);

  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 10, 10);
  scene.add(light);

  camera.position.z = 15;

  function animate() {
    requestAnimationFrame(animate);
    planetMesh.rotation.y += 0.01;  
    renderer.render(scene, camera);
  }

  animate();
}

// Close modal
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('planet-modal').style.display = 'none';
});

// Function to get planet's info
function getPlanetInfo(planetName) {
  const planetData = {
    "Mercury": { distance: 57.9, radius: 2439.7, gravity: 3.7, dayLength: 4222.6, yearLength: 88 },
    "Venus": { distance: 108.2, radius: 6051.8, gravity: 8.87, dayLength: 2802.0, yearLength: 225 },
    "Earth": { distance: 149.6, radius: 6371.0, gravity: 9.8, dayLength: 24, yearLength: 365 },
    "Mars": { distance: 227.9, radius: 3389.5, gravity: 3.71, dayLength: 24.6, yearLength: 687 },
    "Jupiter": { distance: 778.5, radius: 69911, gravity: 24.79, dayLength: 9.9, yearLength: 4333 },
    "Saturn": { distance: 1434, radius: 58232, gravity: 10.44, dayLength: 10.7, yearLength: 10759 },
    "Uranus": { distance: 2871, radius: 25362, gravity: 8.69, dayLength: 17.2, yearLength: 30688 },
    "Neptune": { distance: 4495, radius: 24622, gravity: 11.15, dayLength: 16.1, yearLength: 60182 },
    "Pluto": { distance: 5906, radius: 1188, gravity: 0.62, dayLength: 153.3, yearLength: 90560 }
  };

  return planetData[planetName];
}

// Funtion click planet's detector
planets.forEach((planetInfo, index) => {
  planetInfo.planetObj.userData = { name: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"][index] };
});

window.addEventListener('click', (event) => {
  const intersects = new THREE.Raycaster().intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const planetName = intersects[0].object.parent.userData.name;
    if (planetName) {
      const planetData = getPlanetInfo(planetName);
      const texture = eval('${planetName.toLowerCase()}Texture');
      openModal(planetName, planetData, texture);
    }
  }
});




// Create an information panel in the top left corner
const createInfoPanel = () => {
  const infoPanel = document.createElement('div');
  infoPanel.id = 'infoPanel';
  infoPanel.style.position = 'absolute';
  infoPanel.style.top = '10px';
  infoPanel.style.left = '10px';
  infoPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  infoPanel.style.color = 'white';
  infoPanel.style.padding = '15px';
  infoPanel.style.borderRadius = '8px';
  infoPanel.style.width = '250px';
  infoPanel.style.height = '350px';
  infoPanel.style.overflowY = 'auto';
  infoPanel.innerHTML = `
  <h3 style="margin: 0 0 10px 0;">Asteroid  Information</h3>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Ceres (A801 AA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.767 million km</p>
      <p><strong>Orbital Period:</strong> 4.6 years</p>
      <p><strong>Observations:</strong> 1075 </p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Pallas (A802 FA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.77 million km</p>
      <p><strong>Orbital Period:</strong> 4.61 years</p>
      <p><strong>Observations:</strong> 9724</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Juno (A804 RA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.67 million km</p>
      <p><strong>Orbital Period:</strong> 4.36 years</p>
      <p><strong>Observations:</strong> 8269</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Vesta (A807 FA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.361 million km</p>
      <p><strong>Orbital Period:</strong> 3.63 years</p>
      <p><strong>Observations:</strong> 9451</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Astraea (A845 XA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.576 million km</p>
      <p><strong>Orbital Period:</strong> 4.14 years</p>
      <p><strong>Observations:</strong> 4204</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Hebe (A847 NA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.426 million km</p>
      <p><strong>Orbital Period:</strong> 3.78 years</p>
      <p><strong>Observations:</strong> 6723</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Iris (A847 PA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.386 million km</p>
      <p><strong>Orbital Period:</strong> 3.69 years</p>
      <p><strong>Observations:</strong> 5807</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Flora (A847 UA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.201 million km</p>
      <p><strong>Orbital Period:</strong> 3.27 years</p>
      <p><strong>Observations:</strong> 3481</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Metis (A848 HA)</p>
      <p><strong>Average Distance to Sun:</strong> 2.386 million km</p>
      <p><strong>Orbital Period:</strong> 3.69 years</p>
      <p><strong>Observations:</strong> 3618</p>
    </div><br>
    <div style="border: 2px solid #48e; border-radius: 8px; padding: 10px; font-size: 12px; background-color: rgba(255, 255, 255, 0.2);">
      <p><strong>Name:</strong> Hygiea (A849 GA)</p>
      <p><strong>Average Distance to Sun:</strong> 3.141 million km</p>
      <p><strong>Orbital Period:</strong> 5.57 years</p>
      <p><strong>Observations:</strong> 5038</p>
    </div><br>
  `;
  
  document.body.appendChild(infoPanel);

  // Create the toggle button
  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggleButton';
  toggleButton.innerText = 'Hide Info';
  toggleButton.style.position = 'absolute';
  toggleButton.style.top = '10px';
  toggleButton.style.left = '270px';
  toggleButton.style.padding = '10px';
  toggleButton.style.backgroundColor = '#48e';
  toggleButton.style.color = 'black';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '5px';
  toggleButton.style.cursor = 'pointer';
  document.body.appendChild(toggleButton);

  // Add event listener for the toggle button to hide/show the panel and change position
  toggleButton.addEventListener('click', () => {
      if (infoPanel.style.display === 'none') {
          infoPanel.style.display = 'block';
          toggleButton.innerText = 'Hide Info';
          toggleButton.style.left = '270px'; 
          toggleButton.style.top = '10px'; 
      } else {
          infoPanel.style.display = 'none';
          toggleButton.innerText = 'Show Info';
          toggleButton.style.left = '10px'; 
          toggleButton.style.top = '10px';  
      }
  });
};

// Call the function to create the panel and the toggle button
createInfoPanel();