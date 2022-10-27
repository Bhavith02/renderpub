export async function getFileData(path) {
    const promise = fetch(path,
      {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .catch(error => console.log(`Failed because: ${error}`))
    return promise
  }
  
  export function isDesktop() {
    return true
  }
  export function isHQ() {
    return true
  }
  
  export function getClientX(e) {
    return typeof e.clientX === 'undefined' ? e.touches[0].clientX : e.clientX
  }
  export function getClientY(e) {
    return typeof e.clientY === 'undefined' ? e.touches[0].clientY : e.clientY
  }
  
  export function createSphere(THREE, name, radius, center, material, sectionX = 200, sectionY = 200) {
    const geometry = new THREE.SphereBufferGeometry(radius, sectionX, sectionY)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.name = name
    mesh.position.copy(center)
    mesh.scale.set(new THREE.Vector3(1, 1, -1))
    return mesh
  }
  