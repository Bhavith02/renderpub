// import * as THREE from '../../../public/scripts/three/three.module.js'
import { defaults, cdnPath, config } from './config'
import * as Utils from './utils'
// const THREE = await import('https://unpkg.com/three@0.136.0/build/three.module.js')

export function Hotspots(THREE, scene, locations) {
  // let sceneScale = defaults.SCENE_SCALE
  const raycaster = new THREE.Raycaster()
  const scope = this
  // sceneScale = sceneConfig.data.scale ? sceneConfig.data.scale * SCENE_SCALE : sceneScale

  const geometry = new THREE.PlaneGeometry(defaults.HOTSPOT_RADIUS, defaults.HOTSPOT_RADIUS)
  geometry.translate(-0.0, -0.0, 0.05)
  geometry.rotateX(-Math.PI / 2)
  const group = scene.getObjectByName(defaults.MAIN_GROUP_NAME)
  const hotspots = new THREE.Group()
  hotspots.name = defaults.HOTSPOT_GROUP_NAME
  const material = new THREE.MeshBasicMaterial({ transparent: 1, opacity: defaults.HOTSPOT_OPACITY })
  const texture = new THREE.TextureLoader().load(`${cdnPath}hotspot_image.webp`)
  material.alphaMap = texture
  material.alphaMap.minFilter = THREE.LinearFilter

  for (const positionName in locations) {
    // console.log(positionName)
    const pos = locations[positionName].position
    raycaster.set(pos, new THREE.Vector3(0, -1, 0))
    const intersects = raycaster.intersectObject(group, false)
    if (intersects.length > 0) {
      const hotspot = new THREE.Mesh(geometry, material)
      hotspot.renderOrder = 3
      // let hotSpotPosition = new THREE.Vector3(0.0,0.0,0.0)
      // hotSpotPosition = intersects[0].point.add(new THREE.Vector3(0.0,0.0,0.0))
      hotspot.position.copy(intersects[0].point)
      hotspot.name = positionName
      hotspots.add(hotspot)
      // console.log(hotSpotPosition)
      // console.log(hotspots.position)
      locations[positionName].hotspot = hotspot.position
    }
  }

  scope.objects = hotspots.children
  scene.add(hotspots)
  let scale = 1
  const minScale = 1
  const maxScale = 1.5
  const scaleDelta = 0.01
  let dirUp = !0
  this.update = function() {
    if (defaults.HOTSPOT_ANIMATE === !1)
      return

    if (!Utils.isDesktop() && hotspots && hotspots.children) {
      if (dirUp) scale += scaleDelta
      else scale -= scaleDelta
      hotspots.children.forEach((hotspot) => {
        if (dirUp) {
          if (scale >= maxScale) dirUp = !1
        } else {
          if (scale <= minScale) dirUp = !0
        }
        hotspot.scale.set(scale, 1, scale)
      })
    }
  }
  this.changeActiveLocation = function(name) {
    if (hotspots && hotspots.children) {
      hotspots.children.forEach((hotspot) => {
        hotspot.visible = name !== hotspot.name
      })
    }
  }
  this.show = function() {
    if (hotspots && hotspots.children) {
      hotspots.children.forEach((hotspot) => {
        hotspot.visible = !0
      })
    }
  }
  this.hide = function() {
    if (hotspots && hotspots.children) {
      hotspots.children.forEach((hotspot) => {
        hotspot.visible = !1
      })
    }
  }
}
