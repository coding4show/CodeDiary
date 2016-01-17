attribute vec3 aVertexPosition;
varying vec4 vColor;

void main(void) {
    gl_Position = vec4(aVertexPosition, 1.0);
    vColor = vec4(1,0,0,1);
}