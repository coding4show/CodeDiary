attribute vec3 aVertexPosition;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec4 vColor;

void main(void) {
    //gl_Position = vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vColor = vec4(1,0,0,1);
}