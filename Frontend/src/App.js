// Code with react-Xr moves to 3d.


import './App.css';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MapControls, Sky, Stars, OrbitControls } from '@react-three/drei';
import { VRButton, XR, Controllers } from '@react-three/xr';  
import { Camera } from 'three';

// import Learner from './components/Learner';
import Plane from './components/Plane';
import Snowman from './components/Snowman';
import SnowmanTutor from './components/SnowmanTutor';
import Teacher from './components/Teacher';
import Student from './components/Student'
import BusinessMan from './components/BusinessMan'

function App() {
  const camera = new Camera();  

  const [speechText, setSpeechText] = useState("")
  const gltf = useLoader(GLTFLoader, '/businessMan.gltf')
  const gltfClass = useLoader(GLTFLoader, '/classRoom.gltf')
  const mixerRef = useRef();

  const [isInVRMode, setIsInVRMode] = useState(false);

  const handleEnterVR = () => {
    setIsInVRMode(true);
    XR.camera.position = [0, 0, 7]; // Set the initial camera position in VR mode.
  };

  camera.addEventListener('change', () => {
    console.log("Cam position", camera.position);
  });
  
  // useEffect(() => { 
  //   console.log("Current Camera Position:", );
  // }, [ ]);


  /* Test code to Stablizing the mouse movement */
  // const camera = useThree((state) => state.camera);
  // useFrame((state, delta) => {
  //   // Only update the camera position if the mouse is moving.
  //   if (state.mouse.down) {
  //     // Update the camera position based on the mouse movement.
  //     camera.position.x += state.mouse.x * delta;
  //     camera.position.y += state.mouse.y * delta;
  //   }
  // });

  // console.log("animatoins:", gltf.animations)

  return (
      <>
      {/* <VRButton onEnterVR={handleEnterVR} /> */}
      <Canvas camera={{ position: [9, 2, 7], up: [0, 0, 1], far: 10000 }} style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {/* <XR  > */}
          {/* <Controllers />   */}
            <Suspense fallback={null}>
            <Sky
                distance={450000}
                sunPosition={[0, 1, 0]}
                inclination={0}
                azimuth={0.25}
              />
            <Stars
                radius={200} // Radius of the inner sphere (default=100)
                depth={100} // Depth of area where stars should fit (default=50)
                count={5000} // Amount of stars (default=5000)
                factor={10} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade // Faded dots (default=false)
              />
              <ambientLight intensity={0.75} />
              <directionalLight color="red"/>
              {/* <Snowman rotation={[0,0,-Math.PI/2]} position={[-5,0,0]} setSpeechText={setSpeechText}></Snowman>
              <SnowmanTutor rotation={[0,0,Math.PI/2]} position={[5,0,0]} speechText={speechText}></SnowmanTutor> */}
              <Teacher rotation={[Math.PI/2, Math.PI/2, 0]} position={[-9, -2,0]} scale={1.75} speechText={speechText}></Teacher>
              {/* <Student rotation={[-Math.PI/2, -Math.PI/2, Math.PI]} position ={[-4,-1, 0]} scale={2} setSpeechText={setSpeechText}></Student> */}
              <primitive object={gltfClass.scene} rotation={[Math.PI/2, 0, 0]}/>
              <BusinessMan rotation={[-Math.PI/2, -Math.PI/2, Math.PI]} position ={[-4,-1, 0]} scale={2} setSpeechText={setSpeechText}/>
              {/* <primitive ref={mixerRef} object={gltf.scene} rotation={[Math.PI/2, Math.PI/2, 0]} position={[-9, -2,0]} scale={1.75}/> */}
              {/* <animationMixer ref={mixerRef} clips={gltf.animations} /> */}
              <Plane></Plane>
              <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.1} zoomSpeed={0.3} />
              </Suspense>
              <MapControls />
          {/* </XR> */}
      </Canvas>
      </>
      );
}

export default App;
