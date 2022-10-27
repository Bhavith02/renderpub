import { defaults, cdnPath, config } from './config'
import * as Utils from './utils'

export function CursorObject(THREE, scene, camera, domElement, controls, radius, rpWebvrContainer) {
  this.domElement = domElement !== undefined ? domElement : document
  const scope = this
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const targetObjects = []
  const cameraObjVector = new THREE.Vector3()
  const geometry = new THREE.PlaneGeometry((radius / 2), (radius / 2))
  geometry.rotateX(-Math.PI / 2)
  const material = new THREE.MeshBasicMaterial({ transparent: 0, opacity: defaults.CURSOR_OPACITY, depthWrite: !1, depthTest: !1 })
  const texture = new THREE.TextureLoader().load(`${cdnPath}hotspot_image.webp`)
  material.alphaMap = texture
  material.alphaMap.minFilter = THREE.LinearFilter
  const sphereInter = new THREE.Mesh(geometry, material)
  sphereInter.renderOrder = 10
  sphereInter.visible = !0
  scene.add(sphereInter)
  scope.enabled = !0
  const hideSphereSpeed = 0.05
  let sphereScale = 1
  let showCursore = !0

  function onDocumentMouseMove(event) {
    event.preventDefault()
    if (scope.enabled === !1)
      return

    mouse.x = ((Utils.getClientX(event) - rpWebvrContainer.getBoundingClientRect().left) / (rpWebvrContainer.getBoundingClientRect().right - rpWebvrContainer.getBoundingClientRect().left)) * 2 - 1
    mouse.y = -((Utils.getClientY(event) - rpWebvrContainer.getBoundingClientRect().top) / (rpWebvrContainer.getBoundingClientRect().bottom - rpWebvrContainer.getBoundingClientRect().top)) * 2 + 1
    showCursore = !0
  }
  function onDocumentMouseOut(event) {
    event.preventDefault()
    sphereInter.show = !1
    showCursore = !1
  }
  function onDocumentTouchStart(event) {
    if (scope.enabled === !1)
      return

    mouse.x = (event.changedTouches['0'].clientX / rpWebvrContainer.getBoundingClientRect().width) * 2 - 1
    mouse.y = -(event.changedTouches['0'].clientY / rpWebvrContainer.getBoundingClientRect().height) * 2 + 1
    showCursore = !0
  }
  scope.domElement.addEventListener('mousemove', onDocumentMouseMove, !1)
  scope.domElement.addEventListener('mouseout', onDocumentMouseOut, !1)
  scope.domElement.addEventListener('touchstart', onDocumentTouchStart, !1)
  scope.domElement.addEventListener('touchmove', onDocumentMouseMove, !1)
  scope.domElement.addEventListener('touchend', onDocumentMouseOut, !1)
  this.addTargetObject = function(obj) {
    targetObjects.push(obj)
  }
  function toggleSpehreInter() {
    const isHideCursor = !1
    /*
        if (measurementsActive) {
            if (!CURSOR_RULER_ENABLED) isHideCursor = !0;
        } else {
            if (!CURSOR_ENABLED) isHideCursor = !0;
        } */
    if (isHideCursor) {
      sphereInter.material.opacity = 0.0
      return
    }
    let k = hideSphereSpeed
    if (!sphereInter.show)
      k = -hideSphereSpeed

    let v = sphereInter.material.opacity + k
    if (v < 0)
      v = 0

    if (v > defaults.HOTSPOT_OPACITY)
      v = defaults.HOTSPOT_OPACITY

    if (v == sphereInter.material.opacity)
      return

    sphereInter.material.opacity = v
  }
  this.update = function() {
    if (scope.enabled === !1)
      sphereInter.show = !1

    toggleSpehreInter()
    if (scope.enabled === !1)
      return

    //const state = controls.getState()
    const isRotating = controls.isRotating
    if (isRotating) {
      sphereInter.show = !0
      return
    }
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(targetObjects, !0)
    if (intersects.length > 0 && showCursore) {
      if (Utils.isDesktop())
        sphereInter.show = !0

      sphereInter.scale.set(defaults.CURSOR_ORBIT_SCALE, defaults.CURSOR_ORBIT_SCALE, defaults.CURSOR_ORBIT_SCALECURSOR_ORBIT_SCALE)
      sphereInter.position.copy(intersects[0].point)
      const normalMatrix = new THREE.Matrix4()
      normalMatrix.makeRotationFromQuaternion(intersects[0].object.quaternion)
      normalMatrix.copy(normalMatrix).invert()
      normalMatrix.transpose()
      if (config.panoramaIsActive) {
        cameraObjVector.subVectors(sphereInter.position, camera.position)
        sphereScale = camera.position.distanceTo(sphereInter.position)
        sphereScale *= Math.cos(cameraObjVector.angleTo(camera.target))
      } else {
        sphereScale = defaults.CURSOR_ORBIT_SCALE
      }
      sphereInter.scale.set(sphereScale, sphereScale, sphereScale)
      const normal = intersects[0].face.normal
      normal.applyMatrix4(normalMatrix)
      const side = new THREE.Vector3()
      side.crossVectors(normal, new THREE.Vector3(normal.z, -normal.x, normal.y))
      const up = new THREE.Vector3()
      up.crossVectors(side, normal)
      side.crossVectors(up, normal)
      const orientMatrix = new THREE.Matrix4()
      orientMatrix.makeBasis(up, normal, side)
      sphereInter.setRotationFromMatrix(orientMatrix)
    } else {
      sphereInter.show = !1
    }
  }
  this.getPosition = function() {
    return sphereInter.visible || !utils.isDesktop() ? sphereInter.position : null
  }
}
