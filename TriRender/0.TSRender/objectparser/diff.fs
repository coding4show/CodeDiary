precision mediump float;

uniform sampler2D uSampler;

varying vec4 vColor;
varying vec2 vUV0;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vec2(vUV0.s, vUV0.t));
    gl_FragColor = vec4(textureColor.xyz, 1.0);
}