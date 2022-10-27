/** *
 *
 *  Shader Code
 *
 ***/
export function getShaders() {
    return {
      uniforms: { progress: { type: 'f', value: 0 } },
      vertexShader: [
        'uniform vec3 uBoxPosition0;',
        'uniform vec3 uBoxPosition1;',
        'uniform mat3 uRotXMatrix;',
        'uniform mat3 uRotYMatrix;',
        'uniform mat3 uRotZMatrix;',
        '',
        'varying vec3 vWorldPosition0;',
        'varying vec3 vWorldPosition1;',
        '',
        'void main()',
        '{',
        '   vec4 worldPosition = modelMatrix * vec4(position, 1.0);',
        '   vWorldPosition0 = (worldPosition.xyz - uBoxPosition0) * vec3( 1.0, 1.0, -1.0);',
        '   vWorldPosition1 = (worldPosition.xyz - uBoxPosition1) * vec3( 1.0, 1.0, -1.0);',
        '   vWorldPosition0 = uRotYMatrix * uRotZMatrix * uRotXMatrix * vWorldPosition0;',
        '   vWorldPosition1 = uRotYMatrix * uRotZMatrix * uRotXMatrix * vWorldPosition1;',
        '',
        '   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
        '   gl_Position = projectionMatrix * mvPosition;',
        '}',
      ].join('\n'),
      fragmentShader: [
        'uniform float uProgress;',
        'uniform samplerCube uBoxMap0;',
        'uniform samplerCube uBoxMap1;',
        '',
        'varying vec3 vWorldPosition0;',
        'varying vec3 vWorldPosition1;',
        '',
        'void main( void ) {',
        '',
        '   vec4 colorFromBox0 = textureCube(uBoxMap0, vWorldPosition0.xyz);',
        '   vec4 colorFromBox1 = textureCube(uBoxMap1, vWorldPosition1.xyz);',
        '   vec3 color = mix(colorFromBox0.xyz, colorFromBox1.xyz, uProgress);',
        '   gl_FragColor = vec4( color,  1.0 ); ',
        '}',
      ].join('\n'),
    }
  }
  