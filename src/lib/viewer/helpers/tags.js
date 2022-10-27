/* eslint-disable vars-on-top */
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faInfoCircle, faExternalLinkAlt, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import { defaults, cdnPath, config } from './config'
// import { text } from '@fortawesome/fontawesome-svg-core'
// import * as THREE from '../../../public/scripts/three/three.module.js'
import * as Utils from './utils'
// const THREE = await import('https://unpkg.com/three@0.136.0/build/three.module.js')

let container, scene, camera, renderer, controls, stats
let touchFlag = 0
// custom global variables
let cube
let projector; const mouse = { x: 0, y: 0 }; let INTERSECTED
let sprite1
let canvas1, context1, texture1
let spritePos

export function Tags(THREE, container, renderer, scene, camera, tagsData, radius, rpWebvrContainer) {
  this.domElement = renderer.domElement !== undefined ? renderer.domElement : document
  const scope = this
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  scope.enabled = !0
  const tagGroup = new THREE.Group()
  tagGroup.name = 'Tags'

  function createTextLabel() {
    
    const card = document.createElement('div')
    card.className = 'text-label'
    card.style.position = 'absolute'
    // card.style.border = '2px solid red'
    card.hidden = false
    card.style.overflow = 'hidden'
    // card.style.backgroundColor = 'rgba(24, 24, 27, 0.8)'
    // card.style.border = '8px solid rgba(24, 24, 27, 1)'
    // // card.style.borderColor = 'white'
    // card.style.color = '#FAFAFA'
    // card.style.width = '340px'
    // card.innerHTML = ''
    const _this = this

    return {
      element: card,
      parent: false,
      position: new THREE.Vector3(0, 0, 0),

      setHTML(name, description, medialink, mediatype) {
        const cardContent = document.createElement('div')
        cardContent.style.padding = '10px'
        cardContent.style.display = 'none'

        cardContent.style.backgroundColor = 'rgba(24, 24, 27, 0.8)'
        cardContent.style.border = '8px solid rgba(24, 24, 27, 1)'
        cardContent.style.color = '#FAFAFA'
        cardContent.style.width = '340px'
        cardContent.innerHTML = ''
        cardContent.hidden = false
        cardContent.style.overflow = 'hidden'
        cardContent.style.padding = '10px'
        cardContent.style.borderRadius = '4px'

        // library.add(faInfoCircle)
        // const iconContainer = document.createElement('span')
        // iconContainer.innerHTML = icon({ prefix: 'fas', iconName: 'info-circle' }).html
        // iconContainer.style.fontSize = '26px'
        // iconContainer.style.border = '1px solid white'
        // iconContainer.style.borderRadius = '25px'
        // iconContainer.style.backgroundColor = 'white'

        // iconContainer.style.paddingTop = '0px'
        // iconContainer.style.backgroundColor = 'white'
        // iconContainer.style.display = 'inline-block'

        const iconContainer = document.createElement('img')
        iconContainer.src = `${cdnPath}icons8-info.svg`
        iconContainer.style.border = '0px solid red'
        iconContainer.style.width = '32px'

        card.addEventListener('touchstart', (e) => { touchFlag = 1 }, false)
        card.addEventListener('touchend', (e) => { touchFlag = 0 }, false)

        // card.addEventListener('mouseover', mOver_tags, false)
        // card.addEventListener('mouseout', mOut_tags, false)
        card.addEventListener('click', clickToggle, false)

        const cardTitle = document.createElement('div')
        cardTitle.innerText = `${name}`
        cardTitle.style.fontWeight = 'bold'
        cardTitle.style.paddingBottom = '20px'

        library.add(faExternalLinkAlt)
        const popOut = document.createElement('a')
        popOut.setAttribute('id', 'test')
        popOut.innerHTML = icon({ prefix: 'fas', iconName: 'external-link-alt' }).html
        popOut.style.fontSize = '15px'
        popOut.style.color = 'white'
        popOut.style.position = 'absolute'
        popOut.style.display = 'inline'
        popOut.style.right = '20px'
        popOut.setAttribute('href', medialink)
        popOut.setAttribute('target', '_blank')
        cardContent.appendChild(popOut)

        // const aTag = document.createElement('a')
        // aTag.setAttribute('href', medialink)
        // aTag.setAttribute('target', '_blank')
        // aTag.innerText = 'Click here to view\n'
        // aTag.style.textDecoration = 'underline'

        // aTag.addEventListener('mouseover', mOver, false)
        // aTag.addEventListener('mouseout', mOut, false)

        // function mOver() {
        //   aTag.setAttribute('style', 'color:#60A5FA;')
        //   aTag.style.textDecoration = 'underline'
        // }

        // function mOut() {
        //   aTag.setAttribute('style', 'color:#FAFAFA;')
        //   aTag.style.textDecoration = 'underline'
        // }

        // const images = ['jpg', 'jpeg', 'gif', 'png', 'tiff', 'pdf', 'raw']
        // const videos = ['mp4', '3gp', 'ogg', 'mov', 'wmv', 'avi', 'flv', 'mkv']

        // const extension = medialink.pathname.split('.')[1]

        // if (images.includes(extension)) {
        //   const img = document.createElement('img')
        //   img.src = medialink
        // }

        // else if (videos.includes(extension)) {
        //   const media = document.createElement('iframe')
        //   media.setAttribute('src', `https://www.youtube.com/embed/${videoCode()}`)
        //   media.setAttribute('width', '100%')
        //   media.style.paddingBottom = '20px'
        //   // console.log(media.src)
        //   media.src = medialink
        // }

        function videoCode() {
          const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
          // console.log(medialink)

          // Handle failure - this statement throws exception
          try {
            var check = `${medialink}`.match(VID_REGEX)[1]
          } catch (e) {
            // error video
          // if( check fails){return 'njX2bu-_Vw4'}
            var check = 'njX2bu-_Vw4'
          }

          // console.log(check);
          return check
        }

        // if-else ladder
        // check mediaType and proceed
        let media
        if (mediatype == 'Video') {
          // media element attributes for video type
          media = document.createElement('iframe')
          media.setAttribute('src', `https://www.youtube.com/embed/${videoCode()}` + '?enablejsapi=1')
        }
        else if (mediatype == 'Image') {
          media = document.createElement('img')
          media.setAttribute('src', `${medialink}`)
        }
        else {
          media = document.createElement('div')
          media.innerHTML = `Go to ${medialink}`
        }

        // Common media element styling
        media.setAttribute('width', '100%')
        media.style.paddingBottom = '20px'

        function stopThis(cardContent) {
          const iframeWindow = cardContent.getElementsByTagName('iframe')[0].contentWindow
          iframeWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*')
        }

        const toggle = function(cardContent) {
          if (cardContent.style.display === "none") {
            cardContent.style.display = "block";
          } else {
            cardContent.style.display = "none";
          }
        }

        const show = function(cardContent) {
          cardContent.style.display = 'block'
          // console.log(cardContent.style.width);
          // console.log('displaying cardContent')
          scope.domElement.addEventListener('touchstart', ontouchstart, false)
        }

        const hide = function(cardContent) {
          if (mediatype == 'Video')
            stopThis(cardContent)

          cardContent.style.display = 'none'
          // console.log('hiding cardContent')
        }

        function clickToggle(e) {
          e.stopPropagation()
          toggle(cardContent);
        }

        function mOver_tags() {
          // console.log("over")
          if (touchFlag == 0) {
            // console.log('mouse over')
            window.mytimeout = setTimeout(() => {
              show(cardContent)
            }, 600)
          }
          else {
            show(cardContent)
          }

          // aTag.style.textDecoration = 'underline'
        }

        function mOut_tags(e) {
          // console.log("out")
          // console.log('mouse out')
          hide(cardContent)
          clearTimeout(window.mytimeout)
        }

        function ontouchstart() {
          hide(cardContent)
        }

        // const thumbnailURL = `https://i.ytimg.com/vi/${videoCode()}/maxresdefault.jpg`
        // const cardMedia = document.createElement('img')
        // cardMedia.src = thumbnailURL
        // cardMedia.style.cursor = 'pointer'
        // cardMedia.onclick = function() {
        //   window.location = medialink
        //   cardMedia.setAttribute('target', '_blank')
        // }
        // cardMedia.innerHTML = '\n\n'
        // const example1 = `https://www.youtube.com/embed/${videoCode()}`
        // cardMedia.style.border = '2px solid red'
        // console.log(example1)

        const cardDescription = document.createElement('div')
        cardDescription.innerText = description

        cardContent.appendChild(cardTitle)
        // cardContent.appendChild(aTag)
        // cardContent.appendChild(media)
        cardContent.appendChild(cardDescription)

        this.element.appendChild(iconContainer)
        //console.log(this.element)
        this.element.appendChild(cardContent)
      },
      setParent(threejsobj) {
        this.parent = threejsobj
      },
      updatePosition() {
        if (parent) {
          const tempPos = new THREE.Vector3()
          tempPos.copy(this.parent.position)
          tempPos.add(this.parent.circle.position)
          this.position.copy(tempPos)
        }
        const coords2d = this.get2DCoords(this.position, camera)
        if (!this.parent.textVisible || coords2d.x < 0.0 || coords2d.y < 0.0 || coords2d.x >= (rpWebvrContainer.getBoundingClientRect().width - 20.0) || coords2d.y >= (rpWebvrContainer.getBoundingClientRect().height - 20.0) || coords2d.z >= 1.0) {
          this.element.hidden = true
          return
        } else {
          this.element.hidden = false
        }

        if (this.parent.name == 't1') {
          // console.log(coords2d)
        }
        this.element.style.left = `${coords2d.x}px`
        this.element.style.top = `${coords2d.y}px`
      },
      get2DCoords(position, camera) {
        const vector = position.project(camera)
        vector.x = (vector.x + 1) / 2 * rpWebvrContainer.getBoundingClientRect().width // + rpWebvrContainer.getBoundingClientRect().left
        vector.y = -(vector.y - 1) / 2 * rpWebvrContainer.getBoundingClientRect().height // + rpWebvrContainer.getBoundingClientRect().top
        return vector
      }
    }
  }

  function createTag(name, position, height, color, medialink, description, mediatype) {
    const tempGroup = new THREE.Group()
    tempGroup.name = name
    // const material = new THREE.LineBasicMaterial({
    //   color: 0xFFFFFF,
    //   linewidth: 2,
    //   linecap: 'round', // ignored by WebGLRenderer
    //   linejoin: 'round' // ignored by WebGLRenderer
    // })
    const points = []
    points.push(new THREE.Vector3(0, 0, 0))
    points.push(new THREE.Vector3(0, height, 0))
    // const geometry = new THREE.BufferGeometry().setFromPoints(points)
    // const line = new THREE.Line(geometry, material)

    const circleGeometry = new THREE.CircleGeometry(1, 1)
    const circleMaterial = new THREE.MeshBasicMaterial({
      color: 0x00FFFF,
      side: THREE.DoubleSide
    })

    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.renderOrder = 100
    circle.name = 'Circle'
    circle.visible = false
    circle.position.copy(new THREE.Vector3(0, height, 0))
    const text = createTextLabel()

    tempGroup.circle = circle
    // tempGroup.add(line)
    tempGroup.add(circle)
    tempGroup.position.copy(position)
    tempGroup.textTag = text
    tempGroup.textVisible = true
    tempGroup.description = description
    tempGroup.color = color
    tempGroup.medialink = medialink
    tempGroup.mediatype = mediatype
    text.setHTML(name, description, medialink, mediatype)
    text.setParent(tempGroup)
    const tagsUI = document.getElementById('tagsUI')
    tagsUI.appendChild(text.element)

    return tempGroup
  }

  function onDocumentMouseMove(event) {
    event.preventDefault()
    if (scope.enabled === !1)
      return

    mouse.x = (Utils.getClientX(event) / rpWebvrContainer.getBoundingClientRect().width) * 2 - 1
    mouse.y = -(Utils.getClientY(event) / rpWebvrContainer.getBoundingClientRect().height) * 2 + 1
  }
  function onDocumentMouseOut(event) {
    event.preventDefault()
  }
  function onDocumentTouchStart(event) {
    if (scope.enabled === !1)
      return

    mouse.x = (event.changedTouches['0'].clientX / rpWebvrContainer.getBoundingClientRect().width) * 2 - 1
    mouse.y = -(event.changedTouches['0'].clientY / rpWebvrContainer.getBoundingClientRect().height) * 2 + 1
  }

  function main() {
    for (let i = 0; i < tagsData.length; i++) {
      
      const tag = createTag(tagsData[i].name, tagsData[i].location, tagsData[i].height, tagsData[i].color, tagsData[i].medialink, tagsData[i].description, tagsData[i].mediatype)
      tagGroup.add(tag)
    }

    scene.add(tagGroup)
    // console.log(scene)
  }

  scope.domElement.addEventListener('mousemove', onDocumentMouseMove, !1)
  scope.domElement.addEventListener('mouseout', onDocumentMouseOut, !1)
  scope.domElement.addEventListener('touchstart', onDocumentTouchStart, !1)
  scope.domElement.addEventListener('touchmove', onDocumentMouseMove, !1)
  scope.domElement.addEventListener('touchend', onDocumentMouseOut, !1)

  this.updateTagVisiblity = function() {
    tagGroup.traverse((child) => {
      if (child.circle) {
        let tempPos = new THREE.Vector3()
        tempPos = tempPos.copy(child.position)
        tempPos = tempPos.add(child.circle.position)
        tempPos = (tempPos.sub(camera.position)).normalize()
        raycaster.camera = camera
        raycaster.set(camera.position, tempPos)
        const intersects = raycaster.intersectObjects(scene.children, true)
        // console.log("---------------------")
        // console.log(intersects)
        // console.log(intersects[0].object.parent.name)
        // console.log(child.name)
        // console.log(child.name + " position = "+ child.position.x+","+child.position.y+","+child.position.z)
        // console.log(child.name + " circle position = "+ child.circle.position.x+","+child.circle.position.y+","+child.circle.position.z)
        
        if (intersects[0].object.parent.name == child.name){
          child.textVisible = true
          // console.log("visible")
        }
        else{
          if ( (intersects.length > 1) && (intersects[1].object.parent.name == child.name)) {
              //hack: need better way to resolve floating point precision errors
              // console.log("distance = " + intersects[1].point.distanceTo(intersects[0].point))
              if ((intersects[1].point.distanceTo(intersects[0].point) < 12)){
                // console.log("visible")
                child.textVisible = true
              }
              else{
                // console.log("invisible")
                child.textVisible = false
              }
          }
          else{
            // console.log("invisible")
          child.textVisible = false
          }
          
        }
        // console.log("---------------------\n\n")
          
      }
    })
  }

  this.update = function() {
    tagGroup.traverse((child) => {
      if (child.circle) {
        child.circle.quaternion.copy(camera.quaternion)
        child.textTag.updatePosition()
        // console.log(scene.children)
        // console.log(intersects)
      }
    })
    // raycaster.setFromCamera(mouse, camera)
    // var intersects = raycaster.intersectObjects(tagGroup.children, true)
    // console.log(intersects)
  }

  main()
  this.updateTagVisiblity()
}
