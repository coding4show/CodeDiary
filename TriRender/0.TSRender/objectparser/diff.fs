precision mediump float;

uniform sampler2D uSampler;

varying vec4 vColor;
varying vec2 vUV0;
varying vec3 vNormal;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vec2(vUV0.s, vUV0.t));
    float l = dot(vNormal, vec3(0, 0, -1));
    float am = 0.1;
    gl_FragColor = vec4(textureColor.xyz * l + vec3(am, am, am), 1.0);
}