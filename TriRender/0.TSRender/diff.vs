attribute vec3 aVertexPosition;
uniform mat4 uMtxModel;
uniform mat4 uMtxView;
uniform mat4 uMtxProject;
varying vec4 vColor;

void main(void) {
    gl_Position = uMtxProject * uMtxView * uMtxModel * vec4(aVertexPosition, 1.0);
    vColor = vec4(1,0,0,1);
}