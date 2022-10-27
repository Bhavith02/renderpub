<script context="module">
	import TWEEN from 'tween';
	// import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';
	import * as Utils from './helpers/utils';
	import { defaults, cdnPath, config } from './helpers/config';
	import { CursorObject } from './helpers/cursorObject';
	import { Measure } from './helpers/measure';
	import { VREffect } from './helpers/VREffect';
	import { Hotspots } from './helpers/hotspots';
	import { getShaders } from './helpers/shaders';
	import { Tags } from './helpers/tags';
</script>

<script>
	import { onMount } from 'svelte';

	export let userID;
	export let projectID;
	export let startScene;
	export let startHotspot;

	let THREE;
	let OrbitControls;
	let GLTFLoader;
	let DRACOLoader;
	let computeBoundsTree;
	let disposeBoundsTree;
	let acceleratedRaycast;

	onMount(async () => {
        let THREEPromise =  import('https://cdn.skypack.dev/three@0.136.0');
		let OrbitControlsPromise = import('https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js');
		let GLTFLoaderPromise = import('https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js');
		let DRACOLoaderPromise = import('https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/DRACOLoader.js');
		let BVHPromise = import('https://cdn.skypack.dev/three-mesh-bvh@0.5.5');


		Promise.all([THREEPromise, OrbitControlsPromise, GLTFLoaderPromise, DRACOLoaderPromise, BVHPromise]).then((values) => {
			console.log(values);
			THREE = values[0];
			let OrbitControlsModule = values[1];
			let GLTFLoaderModule = values[2];
			let DRACOLoaderModule = values[3];
			let BVH = values[4];


			OrbitControls = OrbitControlsModule.OrbitControls;
			GLTFLoader = GLTFLoaderModule.GLTFLoader
			DRACOLoader = DRACOLoaderModule.DRACOLoader
			computeBoundsTree = BVH.computeBoundsTree
	 	 	disposeBoundsTree = BVH.disposeBoundsTree
		 	acceleratedRaycast = BVH.acceleratedRaycast
		    webviewer(userID, projectID, startScene, startHotspot);
		   
		})

	});

	function webviewer(userid, projectid, initialScene, initialHotspot) {
		// console.log(THREE)
		console.log(OrbitControls);
		// container
		let rpWebvrContainer, container, element;
		// window
		let originalWidth, originalHeight;
		// camera

		let touchMoveFlag = 0;

		let raycaster;
		let camera, cursor, stats;
		let scene, renderer, effect;
		let controls;
		let renderRequested = false;
		let maxAnisotropy = 6;
		const doVisualUpdates = !0;
		let shaderMaterial;
		// custom global variables
		let cube;
		let projector;
		const MousePos = {};
		const mouseDownPos = {};
		const mouseUpPos = {};
		let sprite1;
		let spritey;
		let canvas1, context1, texture1;

		let deletionSprite, sprite, point;

		let clicked = 0;

		let currentScene = 0;
		let currenthotspot = 0;

		let modelObj;
		let tags;
		let cubeMap0 = new THREE.CubeTexture();
		let cubeMap1 = new THREE.CubeTexture();

		const clock = new THREE.Clock();
		const sceneConfig = {
			db: '',
			mdl: '',
			map: '',
			size: 0,
			uid: -1,
			scale: 1.0,
			data: {},
			cursorRadius: 0.15,
			tagsRadius: 0.05,
		};
		const callBackFns = [];
		const locations = {};
		let startPosition;
		let currentPosition, nextPosition;

		let allDataLoaded = !0;

		const manager = new THREE.LoadingManager();
		const manager2 = new THREE.LoadingManager();
		const manager3 = new THREE.LoadingManager();
		const gltfLoadingManager = new THREE.LoadingManager();
		let loadingScreen;

		let loadedExpectedResources = 0;
		let hotspots;
		let coveringSphere;
		let measurements;
		const measurementsActive = !1;

		let positionIsMoving = !1;
		let IsCameraRotating = false;
		const CameraRotationStarted = false;
		let PrevCameraRotation;
		let globalImagesArray = [];
		const streamedCubeMaps = [];
		const shaderBoxMap = ['uBoxMap0', 'uBoxMap1'];
		const shaderBoxMapPosition = ['uBoxPosition0', 'uBoxPosition1'];
		let shaderBoxMapState = 0;
		const subV = new THREE.Vector3();
		let windowLoaded = 0;
		let alreadyInit = !1;
		let bbox;

		// UI
		const loadDummy = document.getElementById('load-dummy');
		const progressBg = document.getElementById('progress-bg');
		const progressPreview = document.getElementById('progress-preview');
		const progressBar = document.getElementById('progress-bar');
		const progressBar2 = document.getElementById('load-progress');
		const tagsUIDom = document.getElementById('tagsUI');

		function getData() {
			// console.log(userid, ' ', projectid)
			// sceneConfig.db = `${cdnPath}spacesDemo/user1/project1/payload.json`
			sceneConfig.db = `${cdnPath}${userid}/${projectid}/Data/payload.json`;

			const jsonData = Utils.getFileData(sceneConfig.db).then((data) => {
				//console.log("here-1")
				try {
					return data.json();
				} catch (error1) {
					console.log('Error happened here!');
					console.error(error1);
				}
			});
			//console.log("Successfully read JSON at Path = " + sceneConfig.db)
			jsonData.then((data) => {
				//console.log(data)
				return dataParse(data);
			});
		}

		function dataParse(data) {
			//console.log("parsing JSON")
			if (initialScene) currentScene = initialScene;
			else currentScene = data.initialScene;

			if (initialHotspot) currenthotspot = initialHotspot;
			else currenthotspot = data.scenes[currentScene].initialView;

			startPosition = currenthotspot;
			sceneConfig.data = data;
			sceneConfig.path = data.scenes[data.initialScene].path;
			sceneConfig.onSceneUpdate = function (callback) {
				callBackFns.push(callback);
			};
			switch (sceneConfig.data.sceneUnits) {
				case 'Meters':
					sceneConfig.scale = 1.0;
					sceneConfig.cursorRadius = 0.15;
					sceneConfig.tagsRadius = 0.05;
					break;
				case 'Centimeters':
					sceneConfig.scale = 0.01;
					sceneConfig.cursorRadius = 15;
					sceneConfig.tagsRadius = 5;
					break;
				case 'Feet':
					sceneConfig.scale = 0.3;
					sceneConfig.cursorRadius = 0.5;
					sceneConfig.tagsRadius = 0.15;
					break;
				case 'inches':
					sceneConfig.scale = 0.0254;
					sceneConfig.cursorRadius = 6;
					sceneConfig.tagsRadius = 2;
					break;
				default:
					sceneConfig.scale = 1.0;
					sceneConfig.cursorRadius = 0.15;
					sceneConfig.tagsRadius = 0.05;
					break;
			}
			// console.log(data)
			// console.log(currentScene)
			sceneConfig.mdl = data.scenes[currentScene].modelPath;
			// console.log(sceneConfig.mdl)
			sceneConfig.size = data.scenes[currentScene].size;
			init();
			loadSceneGLTF(currentScene, currenthotspot);
			//console.log("here2")
			//loadTags(currentScene)
			requestRenderIfNotRequested();
		}
		getData();

		function resize() {
			let tmr;
			const w = rpWebvrContainer.getBoundingClientRect().width;
			const h = rpWebvrContainer.getBoundingClientRect().height;
			//console.log(w, h)

			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
			effect.setSize(w, h);
			window.removeEventListener('resize', resize, !0);
			clearTimeout(tmr);
			tmr = setTimeout(() => {
				window.addEventListener('resize', resize, !1);
			}, 1000);
			requestRenderIfNotRequested();
		}

		function visibleElement(el, state) {
			const display = state ? 'inherit' : 'none';
			if (el instanceof HTMLCollection) {
				for (const i in el) {
					if (typeof el[i] === 'object') el[i].style.display = display;
				}
				return;
			}
			el.style.display = display;
		}

		function IsAdjacent(h1, h2) {
			const origin = h1.position;
			const dest = new THREE.Vector3().subVectors(
				h2.position,
				new THREE.Vector3(0.0, 113.4, 0.0),
			);
			// console.log(origin)
			// console.log(dest)

			const geometry = new THREE.SphereGeometry(15, 32, 16);
			const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
			const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			const sphere1 = new THREE.Mesh(geometry, material1);
			const sphere2 = new THREE.Mesh(geometry, material2);

			// scene.add(sphere1)
			// scene.add(sphere2)
			sphere1.position.set(origin.x, origin.y, origin.z);
			sphere2.position.set(dest.x, dest.y, dest.z);

			const normal = new THREE.Vector3();
			normal.subVectors(dest, origin).normalize();
			raycaster.set(origin, normal);
			const intersects = raycaster.intersectObjects(locations, true);
			if (intersects.length > 0) {
				// console.log(intersects[0].object.name)
				return intersects[0].object == h2;
			} else {
				// console.log('no hits')
				return false;
			}
		}

		function onDocumentMouseUp(e) {
			if (e.type.startsWith('touch')) {
				if (touchMoveFlag == 1) IsCameraRotating = true;
			} else {
				mouseUpPos.x = e.offsetX;
				mouseUpPos.y = e.offsetY;
				// console.log(mouseDownPos)
				// console.log(mouseUpPos)

				if (mouseDownPos.x != mouseUpPos.x && mouseDownPos.y != mouseUpPos.y)
					IsCameraRotating = true;
				else IsCameraRotating = false;
			}

			const cursorPosition = cursor.getPosition();
			if (cursorPosition && !IsCameraRotating && !controls.fovChanged && allDataLoaded) {
				let nextPosition = currentPosition;
				let distanceToNextPosition = Infinity;
				for (const positionName in locations) {
					let pos = locations[positionName].hotspot;
					if (!pos) pos = locations[positionName].position;
					const distance = cursorPosition.distanceTo(pos);
					// console.log(distance, distanceToNextPosition)
					if (distance < distanceToNextPosition) {
						distanceToNextPosition = distance;
						nextPosition = locations[positionName];
					}
				}
				// console.log(nextPosition.position, currentPosition.position)
				// console.log(locations[nextPosition.name].position, locations[currentPosition.name].position)

				if (nextPosition != currentPosition) {
					const adjacent = IsAdjacent(currentPosition, nextPosition);
					// console.log(adjacent)
					streamCubeMap(nextPosition.name);
				}
			}
			IsCameraRotating = false;
		}

		function onDocumentMouseDown(e) {
			// console.log(e)
			// if (e.which == 2) {
			//   e.preventDefault();
			//   if(shaderMaterial.uniforms.uShaderToggle.value == 1.0){
			//     shaderMaterial.uniforms.uShaderToggle.value = 0.0
			//   }
			//   else{
			//     shaderMaterial.uniforms.uShaderToggle.value = 1.0
			//   }
			//   console.log("middle button");
			//   console.log(shaderMaterial.uniforms.uShaderToggle.value);
			// }
			// else{
			mouseDownPos.x = e.offsetX;
			mouseDownPos.y = e.offsetY;
			// console.log(mouseDownPos)
			// }
		}

		// key pressed
		// function onDocumentMouseMove(e) {
		//  shaderMaterial.uniforms.uShaderToggle.value = "1.0"
		// }

		function onDocumentMouseMove(e) {
			MousePos.x = e.offsetX;
			MousePos.y = e.offsetY;
			requestRenderIfNotRequested();
		}
		function onCameraRotationStarted() {}
		function onCameraRotationEnded() {}
		function onCameraRotationChanged() {
			requestRenderIfNotRequested();
		}

		function onDocumentTouchStart(e) {
			onDocumentMouseDown(e);
			const t = e.touches.length;
			// if (!doubleTap) {
			//   doubleTap = !0
			//   setTimeout(() => {
			//     doubleTap = !1
			//   }, 300)
			//   return !1
			// }
			if (t != 1) return !1;

			onDocumentMouseUp(e);
			e.preventDefault();
		}

		function onDocumentTouchMove(e) {
			touchMoveFlag = 1;
		}

		function onDocumentTouchEnd(e) {
			touchMoveFlag = 0;
			onDocumentMouseUp(e);
			// e.preventDefault()
		}

		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const needResize = canvas.width !== width || canvas.height !== height;
			// console.log(width, height)
			if (needResize) {
				// console.log('resizing')
				camera.aspect = width / height;
				camera.updateProjectionMatrix();
				renderer.setSize(width, height, false);
				effect.setSize(width, height);
			}

			return needResize;
		}

		function render() {
			renderRequested = undefined;
			if (resizeRendererToDisplaySize(renderer)) {
				const canvas = renderer.domElement;
				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
			}
			if (hotspots) hotspots.update();
			if (clicked == 1) TWEEN.update();
			cursor.update();
			if (tags !== undefined) {
				tags.update();
			}

			controls.update();
			effect.render(scene, camera);
		}

		function requestRenderIfNotRequested() {
			if (!renderRequested) {
				renderRequested = true;
				requestAnimationFrame(render);
			}
		}

		function update() {
			// camera.updateProjectionMatrix()
			if (hotspots) hotspots.update();
			if (clicked == 1) TWEEN.update();
			// console.log("happenign")

			cursor.update();
			tags.update();
			// console.log(clock.delta)
			// controls.update()
			effect.render(scene, camera);
			// stats.update()
			// console.log("ticking")
		}

		function cancelStream() {
			for (const i in globalImagesArray) {
				const url = globalImagesArray[i].src;
				if (!isStreamed(url) && url.includes('@')) globalImagesArray[i].src = '';
			}
			globalImagesArray = [];
		}

		function getInverse(v) {
			if (v == 1) return 0;
			else return 1;
		}

		function addStreamCubeMap(name) {
			if (isCubeMapStreamed(name)) return !1;
			streamedCubeMaps.push(`${name}@`);
			return !0;
		}

		function isCubeMapStreamed(name) {
			return streamedCubeMaps.includes(`${name}@`);
		}

		function updateCubemap2(targetCubemap, sourceCubemap) {
			targetCubemap.value = sourceCubemap;
			try {
				if (
					targetCubemap.value.image &&
					targetCubemap.value.image.length > 0 &&
					sourceCubemap.image.length > 0
				) {
					for (let i = 0; i < targetCubemap.image.length; i++)
						targetCubemap.value.image[i] = sourceCubemap.image[i].cloneNode();
				} else {
					targetCubemap.value.image = sourceCubemap.image.slice();
				}
				targetCubemap.value.needsUpdate = !0;
			} catch (e) {}
		}

		function streamNearCubeMaps(name, cancel = !0) {
			const max = defaults.STREAM_CUBEMAPS_CNT;
			setTimeout(() => {
				if (cancel) cancelStream();
				const arr = [];
				for (const pos in locations) {
					const distance = locations[name].position.distanceTo(locations[pos].position);
					arr.push({ name: pos, dist: distance.toFixed(3) });
				}
				arr.sort((a, b) => {
					return a.dist - b.dist;
				});
				if (arr.length > 1) arr.shift();
				let loaded = 0;
				for (const i in arr) {
					var tempName = arr[i].name;
					if (!tempName) continue;
					if (isCubeMapStreamed(tempName)) continue;
					if (loaded >= max) break;
					loaded++;
					const urls = getCubemapUrls(tempName);

					new THREE.CubeTextureLoader(manager3).load(urls, () => {
						// console.log(`Streamed: ${name}`)
						addStreamCubeMap(tempName);
					});
				}
			}, 100);
		}

		function goToPosition(object3D) {
			// console.log(`${clicked} from gotoposition`)
			clicked = 1;
			if (positionIsMoving) return;
			const origState = shaderBoxMapState;
			shaderBoxMapState = getInverse(shaderBoxMapState);
			positionIsMoving = !0;
			nextPosition = object3D;
			const state = shaderBoxMap[shaderBoxMapState];
			const statePosition = shaderBoxMapPosition[shaderBoxMapState];
			const currentStatePosition = shaderBoxMapPosition[origState];
			shaderMaterial.uniforms[statePosition].value = object3D.position;
			shaderMaterial.uniforms[currentStatePosition].value = currentPosition.position;
			visibleElement(loadDummy, !1);
			updateCubemap2(shaderMaterial.uniforms[state], object3D.data.cubeTexture);
			new TWEEN.Tween(camera.position)
				.to(object3D.position, defaults.TIME_CHANGE_POSITION)
				.easing(TWEEN.Easing.Cubic.InOut)
				.onUpdate(function () {
					// console.log(`${clicked} from tween update`)
					controls.enabled = !0;
					cursor.enabled = !1;
					const vector = new THREE.Vector3();
					vector.set(this.x, this.y, this.z);
					setCameraPos(vector);
					if (currentPosition && nextPosition && currentPosition != nextPosition) {
						const totalLength = subV
							.subVectors(nextPosition.position, currentPosition.position)
							.length();
						const progressLength = subV
							.subVectors(camera.position, currentPosition.position)
							.length();
						if (shaderMaterial.uniforms.uProgress) {
							let v = progressLength / totalLength;
							if (shaderBoxMapState == 0) v = 1.0 - v;
							shaderMaterial.uniforms.uProgress.value = v.toFixed(3);
							requestRenderIfNotRequested();
						}
					}
				})
				.onComplete(() => {
					clicked = 0;
					renderer.renderLists.dispose();
					camera.position.copy(object3D.position);
					currentPosition = object3D;
					controls.update();
					controls.enabled = !0;
					cursor.enabled = !0;
					if (hotspots) hotspots.changeActiveLocation(object3D.name);
					positionIsMoving = !1;
					streamNearCubeMaps(currentPosition.name, !0);
					tags.updateTagVisiblity();
				})
				.delay(defaults.TWEEN_DELAY_MOVEMENT)
				.start();
		}

		function streamNextPositon(Object3D) {
			if (Object3D.expectedResources < config.expectedResources) return !1;
			setTimeout(() => {
				positionIsMoving = !1;
				goToPosition(Object3D);
			}, 0);
			// console.log("Go to: " + Object3D.name);
			return !0;
		}

		function streamCubeMap(name) {
			if (!locations[name]) return !1;
			if (positionIsMoving) return !1;
			positionIsMoving = !0;
			allDataLoaded = !1;
			cursor.enabled = !1;
			cancelStream();
			const urls = getCubemapUrls(name);
			locations[name].expectedResources = 0;
			const cubeTexture = new THREE.CubeTextureLoader(manager2).load(urls, () => {
				addStreamCubeMap(name);
				locations[name].expectedResources++;
				// console.log(locations)
				streamNextPositon(locations[name]);
			});
			cubeTexture.mapping = THREE.CubeRefractionMapping;
			cubeTexture.magFilter = THREE.LinearFilter;
			cubeTexture.minFilter = THREE.LinearFilter;
			locations[name].data.cubeTexture = cubeTexture;
		}

		function init() {
			// Exetnd Threejs with BVH Plugin
			THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
			THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
			THREE.Mesh.prototype.raycast = acceleratedRaycast;
			raycaster = new THREE.Raycaster();
			// originalWidth = rpWebvrContainer.getBoundingClientRect()
			// originalHeight = rpWebvrContainer.getBoundingClientRect()
			rpWebvrContainer = document.getElementById('RPWebVR');
			container = document.createElement('div');
			container.classList.add('container');
			rpWebvrContainer.appendChild(container);
			camera = new THREE.PerspectiveCamera(
				defaults.CAMERA_FOV,
				rpWebvrContainer.getBoundingClientRect().width /
					rpWebvrContainer.getBoundingClientRect().height,
				defaults.CAMERA_MIN,
				defaults.CAMERA_MAX,
			);
			scene = new THREE.Scene();
			const geometry = new THREE.SphereGeometry(38, 60, 40);
			// invert the geometry on the x-axis so that all of the faces point inward
			geometry.scale(-1, 1, 1);
			// const texture = new THREE.TextureLoader().load('public/Studio.jpg')
			// const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
			// const mesh = new THREE.Mesh(geometry, material)
			// scene.add(mesh)
			const loadingManager = new THREE.LoadingManager(() => {
				loadingScreen = document.getElementById('loading-screen');
				loadingScreen.classList.add('fade-out');

				// optional: remove loader from DOM via event listener
				loadingScreen.addEventListener('transitionend', onTransitionEnd);
			});

			renderer = new THREE.WebGLRenderer({
				antialias: Utils.isDesktop(),
				preserveDrawingBuffer: true,
			});
			// renderer.setClearColor(0xFFFFFF)
			element = renderer.domElement;
			container.appendChild(element);
			maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
			effect = new VREffect(THREE, renderer);
			effect.setSize(
				rpWebvrContainer.getBoundingClientRect().width,
				rpWebvrContainer.getBoundingClientRect().height,
			);
			controls = new OrbitControls(camera, renderer.domElement);
			// console.log(renderer.domElement)
			controls.enableZoom = true;
			controls.enablePan = false;
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.rotateSpeed = -0.4;
			PrevCameraRotation = camera.rotation;
			controls.update();
			cursor = new CursorObject(
				THREE,
				scene,
				camera,
				renderer.domElement,
				controls,
				sceneConfig.cursorRadius,
				rpWebvrContainer,
			);
			measurements = new Measure(THREE, renderer, scene, camera);
			scene.add(camera);
			const light = new THREE.HemisphereLight(0xfffff, 0x444444, 1);
			light.position.set(0, 1, 0);
			scene.add(light);

			//camera far
			camera.far = 1000000;
			camera.updateProjectionMatrix();

			controls.addEventListener('change', onCameraRotationChanged);
			controls.addEventListener('start', onCameraRotationStarted);
			controls.addEventListener('end', onCameraRotationEnded);
			window.addEventListener('resize', resize);
			renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, !1);
			renderer.domElement.addEventListener(
				'mousedown',
				(e) => {
					onDocumentMouseDown(e);
				},
				!1,
			);
			renderer.domElement.addEventListener('mousemove', (e) => {
				onDocumentMouseMove(e);
			});
			// renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, !1)
			// renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, !1)
			// renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, !1)
		}

		function onTransitionEnd(event) {
			event.target.remove();
		}

		function loadTags(sceneNo = 0) {
			// console.log("asd")
			const tagsData = sceneConfig.data.scenes[sceneNo].tags;
			const tempTags = [];
			for (let i = 0; i < tagsData.length; i++) {
				const tempTag = tagsData[i];
				const tag = {};
				tag.name = tempTag.name;
				tag.location = new THREE.Vector3(
					tempTag.location[0],
					tempTag.location[1],
					tempTag.location[2],
				);
				tag.height = tempTag.height;
				tag.color = tempTag.color;
				tag.medialink = tempTag.mediaLink;
				tag.description = tempTag.description;
				tag.mediatype = tempTag.mediaType;
				tempTags.push(tag);
			}
			// console.log(tempTags)
			tags = new Tags(
				THREE,
				container,
				renderer,
				scene,
				camera,
				tempTags,
				sceneConfig.tagsRadius,
				rpWebvrContainer,
			);
		}

		function loadSceneGLTF(sceneNo = 0, hostspotNo = 0) {
			const mainGroup = scene.getObjectByName(defaults.MAIN_GROUP_NAME);
			scene.remove(mainGroup);

			const hotspotsGroup = scene.getObjectByName(defaults.HOTSPOT_GROUP_NAME);
			scene.remove(hotspotsGroup);

			shaderMaterial = new THREE.ShaderMaterial({
				vertexShader: getShaders().vertexShader,
				fragmentShader: getShaders().fragmentShader,
			});
			shaderMaterial.transparent = defaults.TRANSPARENT;
			shaderMaterial.wireframe = defaults.WIREFRAME;

			// const GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader
			const loader = new GLTFLoader(gltfLoadingManager);
			// const DRACOLoader = require('three/examples/jsm/loaders/DRACOLoader').DRACOLoader
			const dracoLoader = new DRACOLoader();
			// dracoLoader.setDecoderConfig({ type: 'object' })
			dracoLoader.setDecoderPath('https://unpkg.com/three@0.136.0/examples/js/libs/draco/');
			// dracoLoader.setDecoderPath('https://cdn.skypack.dev/three@0.136.0/examples/js/libs/draco/')

			loader.setDRACOLoader(dracoLoader);
			// console.log(awsPath + sceneConfig.mdl)
			// const uri_glb = `aws/${userid}/${projectid}/model/output.glb`
			// toEncode()
			// const test2 = toEncode(uri_glb)
			// sceneConfig.mdl = `${cdnPath}spacesDemo/user1/project1/model/output.glb`
			sceneConfig.mdl = `${cdnPath}${userid}/${projectid}/Data/WorldMesh.glb`;
			// console.log(sceneConfig.mdl)
			// console.log('starting to load')

			loader.load(
				sceneConfig.mdl,
				(object) => {
					// console.log(cdnPath + sceneConfig.mdl)
					// console.log(modelObj)
					modelObj = object.scene.children[0];
					// console.log(modelObj)

					cubeMap0 = new THREE.CubeTexture();
					cubeMap1 = new THREE.CubeTexture();
					// console.log(cubeMap0, cubeMap1)
					const rotXAngleInRadians = THREE.Math.degToRad(defaults.SHADER_ROTATION_X);
					const rotYAngleInRadians = THREE.Math.degToRad(defaults.SHADER_ROTATION_Y);
					const rotZAngleInRadians = THREE.Math.degToRad(defaults.SHADER_ROTATION_Z);
					const sy = Math.sin(rotYAngleInRadians);
					const cy = Math.cos(rotYAngleInRadians);
					const sz = Math.sin(rotZAngleInRadians);
					const cz = Math.cos(rotZAngleInRadians);
					const sx = Math.sin(rotXAngleInRadians);
					const cx = Math.cos(rotXAngleInRadians);
					const rotYMatrix = new THREE.Matrix3();
					rotYMatrix.set(cy, 0, sy, 0, 1, 0, -sy, 0, cy);
					const rotZMatrix = new THREE.Matrix3();
					rotZMatrix.set(cz, -sz, 0, sz, cz, 0, 0, 0, 1);
					const rotXMatrix = new THREE.Matrix3();
					rotXMatrix.set(1, 0, 0, 0, cx, -sx, 0, sx, cx);
					shaderMaterial.uniforms = {
						uShaderToggle: { value: 0.0 },
						uProgress: { value: getShaders().uniforms.progress.value },
						uBoxMap0: { value: cubeMap0 },
						uBoxPosition0: { value: camera.position },
						uBoxMap1: { value: cubeMap1 },
						uBoxPosition1: { value: camera.position },
						uRotYMatrix: { value: rotYMatrix },
						uRotZMatrix: { value: rotXMatrix },
						uRotXMatrix: { value: rotZMatrix },
					};
					const tempLocs = new THREE.Object3D();
					for (let i = 0; i < sceneConfig.data.scenes[sceneNo].viewpoints.length; i++) {
						const tempObject = new THREE.Object3D();
						const tempData = sceneConfig.data.scenes[sceneNo].viewpoints[i];
						tempObject.name = tempData.name;
						tempObject.position.copy(
							new THREE.Vector3(
								tempData.location[0],
								tempData.location[1],
								tempData.location[2],
							),
						);
						tempLocs.add(tempObject);
					}

					tempLocs.traverse((child) => {
						if (child.name) {
							locations[child.name] = child;
							locations[child.name].data = { cubeTexture: {} };
						}
					});
					// console.log(object.scene.children[0])
					// object.scene.children[0].children[0].traverse((child) => {
					object.scene.children[0].traverse((child) => {
						console.log('traversing scene.childeren');
						// object.scene.children[0].children[0].children[0].traverse((child) => {
						child.originalMaterial = child.material;
						if (Array.isArray(child.originalMaterial)) {
							child.originalMaterial.forEach((material) => {
								if (!material.map) {
									material.emissive = new THREE.Color(1, 1, 1);
									material.emissiveIntensity = 0.2;
								}
							});
						} else {
							const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
							child.originalMaterial = material;
							child.originalMaterial.emissive = new THREE.Color(1, 1, 1);
							child.originalMaterial.emissiveIntensity = 0.2;
						}
						child.shaderMaterial = shaderMaterial;
						child.material = child.shaderMaterial;
						child.renderOrder = 2;
						// console.log(child)
						child.geometry.computeBoundsTree();
						// console.log(child.geometry)
						cursor.addTargetObject(child);
					});
					object.scene.children[0].name = defaults.MAIN_GROUP_NAME;
					scene.add(object.scene.children[0]);
					requestRenderIfNotRequested();
					// modelObj.name = 'ModelMesh'
					// scene.add(modelObj)
					// modelObj.visible = true

					// console.log(scene.getObjectByName('ModelMesh'))
					// let bbox = new THREE.Box3().setFromObject(scene.getObjectByName(modelObj.name))
					// console.log(bbox.min, bbox.max)
					// bbox = new THREE.Box3().setFromObject(object.scene.children[0])

					new KeyControls(camera, locations);
					setTimeout(() => {
						initCubeMaps(() => {
							cubeMap0.image = currentPosition.data.cubeTexture.image.slice();
							cubeMap0.needsUpdate = !0;
							cubeMap0.mapping = THREE.CubeRefractionMapping;
							cubeMap0.minFilter = THREE.LinearFilter;
							cubeMap1.image = currentPosition.data.cubeTexture.image.slice();
							cubeMap1.needsUpdate = !0;
							cubeMap1.mapping = THREE.CubeRefractionMapping;
							cubeMap1.minFilter = THREE.LinearFilter;
							loadedExpectedResources++;
							initHotspots();
							// console.log("here1")
							loadTags(currentScene);
							requestRenderIfNotRequested();
							alreadyInit = !0;
							streamNearCubeMaps(startPosition, !1);
						});
					}, 20);
				},
				(xhr) => {
					// console.log(`${xhr.loaded / xhr.total * 100}% loaded`)
					requestRenderIfNotRequested();
				},
				(error) => {
					console.log('Error loading GLTF');
					console.log(error);
				},
			);
		}

		function initCubeMaps(callback, callback2) {
			currentPosition = locations[startPosition];
			//console.log(startPosition)
			camera.rotation.copy(currentPosition.rotation);
			setCameraPos(currentPosition.position);
			const urls = getCubemapUrls(currentPosition.name);

			const cubeTexture = new THREE.CubeTextureLoader(manager).load(urls, callback);
			cubeTexture.mapping = THREE.CubeRefractionMapping;
			cubeTexture.minFilter = THREE.LinearFilter;
			cubeTexture.magFilter = THREE.LinearFilter;
			cubeTexture.minFilter = THREE.LinearFilter;
			cubeTexture.anisotropy = maxAnisotropy;
			locations[startPosition].data.cubeTexture = cubeTexture;
		}

		function getCubemapUrls(pos) {
			// console.log(pos)
			const out = [];
			const format = 'webp';
			// if(pos == 0) format = 'webp'
			/*
        for (let i = 0; i <= 15; i = i + 3) {
          var tempPath
          if (i < 10)
            tempPath = `${cdnPath}${userid}/${projectid}/Walk0/${pos}/000${i}.${format}`
          // console.log(tempPath)
          else
            tempPath = `${cdnPath}${userid}/${projectid}/Walk0/${pos}/00${i}.${format}`

          out.push(tempPath)
        }*/
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/front.${format}`);
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/back.${format}`);
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/up.${format}`);
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/down.${format}`);
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/left.${format}`);
			out.push(`${cdnPath}${userid}/${projectid}/Walk0/${pos}/right.${format}`);
			// console.log(out)
			return out;
		}

		function setCameraPos(v) {
			camera.position.copy(v);
			camera.translateZ(-defaults.CAMERA_TARGET_OFFSET);
			controls.target.copy(camera.position);
			camera.translateZ(defaults.CAMERA_TARGET_OFFSET);
			camera.updateProjectionMatrix();
		}

		function animate(t) {
			// stats.update()
			if (!doVisualUpdates) return;
			requestAnimationFrame(animate);
			// update(clock.getDelta())
			// render(clock.getDelta())
			// console.log("ticking")
		}

		function initHotspots() {
			if (
				(Utils.isDesktop() && defaults.HOTSPOT_SHOW_FOR_DESkTOP) ||
				(!Utils.isDesktop() && defaults.HOTSPOT_SHOW_FOR_DESkTOP)
			) {
				const hotspotsGroup = scene.getObjectByName(defaults.HOTSPOT_GROUP_NAME);
				scene.remove(hotspotsGroup);
				hotspots = new Hotspots(THREE, scene, locations);
				hotspots.changeActiveLocation(startPosition);
			}
		}

		function setProgress(p) {
			/* Progress throbber can be done here */

			p = Math.round(p, 2);
			// progressBar.style.width = p + "%";
			if (p > 90) {
				// console.log(controls)
				// controls.setRotation(THREE.Math.degToRad(90), THREE.Math.degToRad(sceneConfig.data.initialAngle))
				if (p >= 100) {
					/* Initial hotspot loaded */
				}
			}
		}

		// Called when navigating to hotspots
		function setProgress2(p, l, t) {
			p = Math.round(p, 2);
			if (p < 95) visibleElement(loadDummy, !0);
			// console.log(p)
			// progressBar2.style.width = p + "%";
			if (p >= 99) allDataLoaded = !0;
		}

		// Progress bar
		gltfLoadingManager.onProgress = function (item, loaded, total) {
			const p = (loaded / total) * 100.0;
			setProgress2(p, loaded, total);
			// console.log('gltfLoadingManager ', p, loaded, total)
		};

		manager2.onProgress = function (item, loaded, total) {
			const p = (loaded / total) * 100.0;
			setProgress2(p, loaded, total);
			// console.log('manager2 ', p, loaded, total)
		};
		manager2.onLoad = function () {
			positionIsMoving = !1;
		};
		manager.onProgress = function (item, loaded, total) {
			const part2 = 40;
			const p = (loaded / total) * part2 + (100 - part2);
			setProgress(p);
			// console.log('manager ', p, loaded, total)
		};
		const onProgress = function (xhr) {
			const part1 = 60;
			const p = (xhr.loaded / sceneConfig.size) * part1;
			setProgress(p);
		};
		const onError = function (xhr) {
			console.error(xhr);
		};

		window.onload = function () {
			windowLoaded = 1;
			// console.log("Windows loaded")
		};

		function KeyControls(camera, locations) {
			const maxAngel = Math.PI / 2;
			const minCameraAngel = Math.PI / 8;
			const actions = {
				forward: [38, 87],
				back: [40, 83],
				left: [37, 65],
				right: [39, 68],
				chageMode: [32],
			};
			const findClosestLocation = function (direction) {
				const cameraWorldDirection = new THREE.Vector3();
				camera.getWorldDirection(cameraWorldDirection);
				cameraWorldDirection.y = 0;
				switch (direction) {
					case 'back':
						cameraWorldDirection.multiplyScalar(-1);
						break;
					case 'left':
						cameraWorldDirection.applyAxisAngle(
							new THREE.Vector3(0, 1, 0),
							Math.PI / 2,
						);
						break;
					case 'right':
						cameraWorldDirection.applyAxisAngle(
							new THREE.Vector3(0, 1, 0),
							-Math.PI / 2,
						);
						break;
				}
				let minAngle = Math.PI * 2;
				let newLocationName;
				let minDistance = Infinity;
				for (const locationName in locations) {
					const camToLocationVector = new THREE.Vector3();
					camToLocationVector
						.subVectors(locations[locationName].position, camera.position)
						.normalize();
					camToLocationVector.y = 0;
					const angle = camToLocationVector.angleTo(cameraWorldDirection);
					if (!isNaN(angle)) {
						const tempDistance = camera.position.distanceTo(
							locations[locationName].position,
						);
						if (
							(angle < minAngle && angle >= minCameraAngel) ||
							(angle < minCameraAngel && tempDistance < minDistance)
						) {
							minAngle = angle;
							minDistance = tempDistance;
							newLocationName = locationName;
						}
					}
				}
				if (minAngle < maxAngel) {
					if (locations[newLocationName] != currentPosition)
						streamCubeMap(newLocationName);
				}
			};
			document.body.onkeyup = function (e) {
				for (const actionName in actions) {
					if (actions[actionName].includes(e.keyCode)) {
						findClosestLocation(actionName);
						break;
					}
				}
			};
		}
	}
</script>

<p style="color:white; font-size:32px; text-align:center;"> Spaces Preview</p>
<div
	id="RPWebVR"
	style="
width:1200px;
height:800px;
position: relative;
top: 25em;
left: 50%;
transform: translate(-50%, -50%);
font-family: Arial
"
>
	<!-- <div id="loading-screen">

      <div id="loader"></div>
    </div> -->

	<div id="load-dummy" style="">
		<div> </div>
	</div>
	<div id="tagsUI" style="position:absolute; width:100%;"> </div>
</div>
