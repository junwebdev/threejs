window.addEventListener("DOMContentLoaded", () => {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create a renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Resize window event listener
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Create a cube
  const geometry = new THREE.BoxGeometry();
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("deakin.png");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, -3, 0);
  scene.add(cube);

  // Create Earth model
  const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
  const earthTexture = new THREE.TextureLoader().load("earth.jpg");
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);
  scene.add(earth);

  // Create Moon model
  const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
  const moonTexture = new THREE.TextureLoader().load("moon.jpg");
  const moonMaterial = new THREE.MeshPhongMaterial({ map: moonTexture });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  scene.add(moon);

  // Set initial positions
  earth.position.set(0, 0, 0);
  moon.position.set(2, 0, 0);

  // Add galaxy background
  const galaxyTexture = new THREE.TextureLoader().load("space.jpg");
  scene.background = galaxyTexture;

  // Create directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Position camera
  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    earth.rotation.y += 0.005;
    moon.rotation.y += 0.005;

    // Calculate moon's orbit around Earth
    const angle = Date.now() * 0.0005; // Adjust speed of orbit
    const radius = 2; // Distance from Earth
    moon.position.x = Math.cos(angle) * radius;
    moon.position.z = Math.sin(angle) * radius;

    renderer.render(scene, camera);
  }

  animate();

  // Render scene to canvas
  const backgroundCanvas = document.getElementById("background-canvas");
  const backgroundRenderer = new THREE.WebGLRenderer({
    canvas: backgroundCanvas,
  });
  backgroundRenderer.setSize(window.innerWidth, window.innerHeight);

  function renderToCanvas() {
    backgroundRenderer.render(scene, camera);
    document.body.style.backgroundImage = `url('${backgroundCanvas.toDataURL()}')`;
  }

  renderToCanvas();
});
