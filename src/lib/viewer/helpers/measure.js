export function Measure(THREE, renderer, scene, camera) {
    const sceneScale = 0.013
    const lengthCof = 1
    const scope = this
    const mouse = new THREE.Vector2()
    let mouseStart = new THREE.Vector2()
    let canAddPoint = !1
    const raycaster = new THREE.Raycaster()
    const color = 0xF4CA00
    const length = 0
    let isActive = !1
    let rulers = []
    let activeRuler = null
    const domElement = renderer !== undefined && renderer.domElement !== undefined ? renderer.domElement : document
    let isUserInteracting = !1
    let orientationChange = !1
    const cameraObjVector = new THREE.Vector3()
    const cameraP1Vector = new THREE.Vector3()
    const cameraP2Vector = new THREE.Vector3()
    let labelScale = 1
    const frustum = new THREE.Frustum()
    const hotspotsHtml = {}
    // var measureIcon = document.getElementById("measure-icon");
    // var measureMsg = document.getElementById("measure-msg");
    scope.toggleMeasure = function() {
      isActive = !isActive
      // updateMeasureIcon();
    }
    scope.disableMeasure = function() {
      if (isActive) {
        scope.toggleMeasure()
        mouseStart = new THREE.Vector2()
        clearActiveRuler(scene)
        activeRuler = null
        canAddPoint = !1
      }
    }
    const getMousePos = function(event) {
      mouse.x = (getClientX(event) / domElement.clientWidth) * 2 - 1
      console.log(domElement.clientWidth)
      mouse.y = -(getClientY(event) / domElement.clientHeight) * 2 + 1
    }
    const createHtmlHotspot = function(title, ruler) {
      const hotspotHtml = document.createElement('div')
      hotspotHtml.classList.add('hotspot')
      const span = document.createElement('span')
      span.innerHTML = '0 mm'
      hotspotHtml.appendChild(span)
      const closeBtn = document.createElement('i')
      closeBtn.classList.add('fa')
      closeBtn.classList.add('fa-times')
      closeBtn.setAttribute('aria-hidden', 'true')
      closeBtn.setAttribute('title', 'Delete measurements')
      hotspotHtml.appendChild(closeBtn)
      closeBtn.onclick = function(e) {
        scene.remove(ruler.p1)
        scene.remove(ruler.p2)
        scene.remove(ruler.label)
        scene.remove(ruler.line)
        document.getElementsByTagName('body')[0].removeChild(hotspotHtml)
      }
      document.getElementsByTagName('body')[0].appendChild(hotspotHtml)
      ruler.htmlLabel = hotspotHtml
    }
    scope.removeRulers = function() {
      rulers.forEach((ruler) => {
        if (ruler && ruler.htmlLabel) {
          scene.remove(ruler.p1)
          scene.remove(ruler.p2)
          scene.remove(ruler.label)
          scene.remove(ruler.line)
          try {
            document.getElementsByTagName('body')[0].removeChild(ruler.htmlLabel)
          } catch (e) {}
        }
      })
      rulers = []
    }
    scope.hide = function() {
      rulers.forEach((ruler) => {
        if (ruler && ruler.htmlLabel) {
          ruler.p1.visible = !1
          ruler.p2.visible = !1
          ruler.line.visible = !1
          ruler.htmlLabel.style.opacity = '0.0'
        }
      })
      // console.log('Rulers hidden!')
    }
    scope.show = function() {
      rulers.forEach((ruler) => {
        if (ruler && ruler.htmlLabel) {
          ruler.p1.visible = !0
          ruler.p2.visible = !0
          ruler.line.visible = !0
          ruler.htmlLabel.style.opacity = '1.0'
        }
      })
      // console.log('Rulers visible!')
    }
    const toScreenPosition = function(obj, camera) {
      const vector = new THREE.Vector3()
      const widthHalf = 0.5 * renderer.context.canvas.width
      const heightHalf = 0.5 * renderer.context.canvas.height
      obj.updateMatrixWorld()
      vector.setFromMatrixPosition(obj.matrixWorld)
      vector.project(camera)
      vector.x = vector.x * widthHalf + widthHalf
      vector.y = -(vector.y * heightHalf) + heightHalf
      return { x: vector.x, y: vector.y }
    }
    var clearActiveRuler = function(scene) {
      if (activeRuler) {
        if (activeRuler.p1)
          scene.remove(activeRuler.p1)
  
        if (activeRuler.p2)
          scene.remove(activeRuler.p2)
  
        if (activeRuler.line)
          scene.remove(activeRuler.line)
  
        if (activeRuler.label)
          scene.remove(activeRuler.label)
  
        if (activeRuler.htmlLabel) {
          try {
            document.getElementsByTagName('body')[0].removeChild(activeRuler.htmlLabel)
          } catch (e) {}
        }
        activeRuler = null
      }
    }
    const recalculateLabelSize = function(camera) {
      rulers.forEach((ruler) => {
        if (!ruler)
          return
  
        cameraObjVector.subVectors(ruler.label.position, camera.position)
        labelScale = camera.position.distanceTo(ruler.label.position)
        if (0) {
          camera.target = controls.target
          labelScale *= Math.cos(cameraObjVector.angleTo(camera.target))
          ruler.label.scale.set((16 * labelScale) / 70, (4 * labelScale) / 70, 1)
        } else {
          ruler.label.scale.set((16 * labelScale) / 100, (4 * labelScale) / 100, 1)
        }
      })
    }
    const updateScreenPosition = function() {
      rulers.forEach((ruler) => {
        if (!ruler || !ruler.htmlLabel)
          return
  
        frustum.setFromMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))
        ruler.position2d = toScreenPosition(ruler.label, camera)
        if (frustum.containsPoint(ruler.label.position)) {
          ruler.position2d = toScreenPosition(ruler.label, camera)
          ruler.htmlLabel.style.display = 'block'
          ruler.htmlLabel.style.left = `${Math.floor(ruler.position2d.x / window.devicePixelRatio)}px`
          ruler.htmlLabel.style.top = `${Math.floor(ruler.position2d.y / window.devicePixelRatio)}px`
          ruler.htmlLabel.style.zIndex = 590 - Math.floor(camera.position.distanceTo(ruler.label.position))
        } else {
          ruler.htmlLabel.style.display = 'none'
        }
        if (0) {
          camera.target = controls.target
          cameraP1Vector.subVectors(ruler.p1.position, camera.position)
          let p1Scale = camera.position.distanceTo(ruler.p1.position)
          p1Scale *= Math.cos(cameraP1Vector.angleTo(camera.target)) / lengthCof / 5
          ruler.p1.scale.set(p1Scale, p1Scale, p1Scale)
          cameraP2Vector.subVectors(ruler.p2.position, camera.position)
          let p2Scale = camera.position.distanceTo(ruler.p2.position)
          p2Scale *= Math.cos(cameraP2Vector.angleTo(camera.target)) / lengthCof / 5
          ruler.p2.scale.set(p2Scale, p2Scale, p2Scale)
        }
      })
    }
    const getLengthBetweenPoint = function(pointA, pointB) {
      const dir = pointB.clone().sub(pointA)
      return ((dir.length() * 1000) / lengthCof).toFixed(0)
    }
    const getPointInBetweenByPerc = function(pointA, pointB, percentage) {
      let dir = pointB.clone().sub(pointA)
      const len = dir.length()
      dir = dir.normalize().multiplyScalar(len * percentage)
      return pointA.clone().add(dir)
    }
    const changeCanvas = function(text, canvas, ctx) {
      ctx.font = '27pt Arial'
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'white'
      ctx.fillRect(1, 1, canvas.width - 2, canvas.height - 2)
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, canvas.width / 2, canvas.height / 2)
    }
    const onDocumentDown = function(event) {
      event.preventDefault()
      if (isActive) {
        isUserInteracting = !0
        orientationChange = !1
        canAddPoint = !1
        getMousePos(event)
        mouseStart.copy(mouse)
      }
      // console.log('Down')
      // console.log(scene)
      // console.log(scene.getObjectByName('ModelMesh'))
      // var bbox = new THREE.Box3().setFromObject(scene.getObjectByName('ModelMesh'))
      // console.log(bbox)
    }
    const onDocumentMove = function(event) {
      event.preventDefault()
      if (isActive) {
        // updateMeasureIcon();
        getMousePos(event)
        if (isUserInteracting && !mouseStart.equals(mouse)) {
          canAddPoint = !1
          orientationChange = !0
        }
      }
    }
    const onDocumentUp = function(event) {
      event.preventDefault()
      if (isActive) {
        isUserInteracting = !1
        canAddPoint = !orientationChange
        if (!canAddPoint) {
        }
        // console.log('mouseup')
      }
      // updateMeasureIcon();
    }
    domElement.addEventListener(
      'contextmenu',
      (ev) => {
        ev.preventDefault()
        scope.disableMeasure()
        return !1
      },
      !1
    )
    domElement.addEventListener('mousedown', onDocumentDown, !1)
    domElement.addEventListener('mousemove', onDocumentMove, !1)
    domElement.addEventListener('mouseup', onDocumentUp, !1)
    domElement.addEventListener('touchstart', onDocumentDown, !1)
    domElement.addEventListener('touchmove', onDocumentMove, !1)
    domElement.addEventListener('touchend', onDocumentUp, !1)
    this.targetObjects = []
    this.isActive = function() {
      return isActive
    }
    this.processIntersections = function() {
      if (isActive) {
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(scope.targetObjects)
        if (intersects.length > 0) {
          if (!activeRuler && canAddPoint) {
            var coneGeometry = new THREE.ConeGeometry(1 * sceneScale, 10 * sceneScale, 16)
            coneGeometry.rotateX(-Math.PI / 2)
            coneGeometry.translate(0, 0, 4.99 * sceneScale)
            var sphere = new THREE.Mesh(coneGeometry, new THREE.MeshLambertMaterial({ color }))
            sphere.position.copy(intersects[0].point)
            scene.add(sphere)
            activeRuler = { p1: sphere }
            rulers.push(activeRuler)
          } else if (activeRuler && !activeRuler.p2) {
            var coneGeometry = new THREE.ConeGeometry(1 * sceneScale, 10 * sceneScale, 16)
            coneGeometry.rotateX(-Math.PI / 2)
            coneGeometry.translate(0, 0, 4.99 * sceneScale)
            var sphere = new THREE.Mesh(coneGeometry, new THREE.MeshLambertMaterial({ color }))
            sphere.position.copy(intersects[0].point)
            scene.add(sphere)
            activeRuler.p2 = sphere
            const geometry = new Geometry()
            geometry.vertices.push(activeRuler.p1.position, activeRuler.p2.position)
            const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, linewidth: 10 }))
            line.frustumCulled = !1
            scene.add(line)
            activeRuler.line = line
            const label = new THREE.Object3D()
            scene.add(label)
            activeRuler.label = label
            createHtmlHotspot('0', activeRuler)
          }
          if (activeRuler && activeRuler.p2) {
            activeRuler.p2.position.copy(intersects[0].point)
            activeRuler.line.geometry.vertices[1].copy(intersects[0].point)
            activeRuler.line.geometry.verticesNeedUpdate = !0
            activeRuler.p2.lookAt(activeRuler.p1.position)
            activeRuler.p1.lookAt(activeRuler.p2.position)
            activeRuler.label.position.copy(getPointInBetweenByPerc(activeRuler.p1.position, activeRuler.p2.position, 0.5))
            const length = getLengthBetweenPoint(activeRuler.p1.position, activeRuler.p2.position)
            if (length != activeRuler.length) {
              activeRuler.needUpdate = !0
              activeRuler.length = length
              activeRuler.htmlLabel.querySelector('span').innerHTML = `${activeRuler.length} mm`
            }
            if (canAddPoint) {
              setTimeout(() => {}, 500)
              activeRuler = null
              // updateMeasureIcon();
            }
          }
          canAddPoint = !1
        }
      } else {
        clearActiveRuler(scene)
        recalculateLabelSize(camera)
      }
      updateScreenPosition()
    }
    this.calculateVisibility = function(camera) {
      rulers.forEach((ruler) => {
        if (!ruler)
          return
  
        if (0) {
          let p1IsVisible = !1
          let cameraP1Vector = new THREE.Vector3()
          cameraP1Vector.subVectors(ruler.p1.position, camera.position)
          cameraP1Vector = cameraP1Vector.normalize()
          raycaster.set(camera.position, cameraP1Vector)
          let intersects = raycaster.intersectObjects(scene.children, !0)
          if (intersects.length > 0 && ruler.p1 === intersects[0].object)
            p1IsVisible = !0
  
          let p2IsVisible = !1
          let cameraP2Vector = new THREE.Vector3()
          cameraP2Vector.subVectors(ruler.p2.position, camera.position)
          cameraP2Vector = cameraP2Vector.normalize()
          raycaster.set(camera.position, cameraP2Vector)
          intersects = raycaster.intersectObjects(scene.children, !0)
          if (intersects.length > 0 && ruler.p2 === intersects[0].object)
            p2IsVisible = !0
  
          ruler.label.material.depthTest = !(p1IsVisible && p2IsVisible)
        } else {
          ruler.label.material.depthTest = !1
        }
      })
    }
  }
  