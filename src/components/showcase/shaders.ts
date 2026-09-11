export const vertexShader = `
#define PI 3.14159265359
uniform float u_offset;
uniform float u_progress;
uniform float u_direction;
uniform float u_time;
uniform float u_waveIntensity;
varying vec2 vUv;

void main() {
    vec3 pos = position.xyz;
    float dist = length(uv.xy - 0.5);
    float sizeDist = length(vec2(0.5, 0.5));
    float normalizedDist = dist / sizeDist;
    float stickOutEffect = normalizedDist;
    float stickInEffect = -normalizedDist;
    float stickEffect = mix(stickOutEffect, stickInEffect, u_direction);
    
    // Backwards V-wave calculation
    float stick = 0.5;
    float waveIn = u_progress * (1.0 / stick);
    float waveOut = -(u_progress - 1.0) * (1.0 / (1.0 - stick));
    waveOut = pow(smoothstep(0.0, 1.0, waveOut), 0.7);
    float stickProgress = min(waveIn, waveOut);
    float offsetInProgress = clamp(waveIn, 0.0, 1.0);
    float offsetOutProgress = clamp(1.0 - waveOut, 0.0, 1.0);
    float offsetProgress = mix(offsetInProgress, offsetOutProgress, u_direction);
    
    // Z-axis displacement for the sticky pull effect + subtle resting undulation
    pos.z += stickEffect * u_offset * stickProgress - u_offset * offsetProgress;
    pos.z += sin(dist * 8.0 - u_time * 2.5) * u_waveIntensity;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vUv = uv;
}
`;

export const fragmentShader = `
uniform vec2 u_resolution;
uniform sampler2D u_texture;
uniform sampler2D u_texture2;
uniform vec2 u_textureFactor;
uniform vec2 u_texture2Factor;
uniform float u_textureProgress;

// RGB Displacement uniforms
uniform vec2 u_rgbPosition;
uniform vec2 u_rgbVelocity;
varying vec2 vUv;

vec2 centeredAspectRatio(vec2 uvs, vec2 factor) {
    return (uvs - 0.5) * factor + 0.5;
}

void main() {
    vec2 normalizedRgbPos = u_rgbPosition / u_resolution;
    normalizedRgbPos.y = 1.0 - normalizedRgbPos.y; 
    vec2 vel = u_rgbVelocity;
    float dist = distance(normalizedRgbPos + vel / u_resolution, vUv.xy);
    float ratio = clamp(1.0 - dist * 4.5, 0.0, 1.0);
    
    vec4 tex1 = vec4(1.0);
    vec4 tex2 = vec4(1.0);
    vec2 uv = vUv;
    
    // Red Channel Shift
    vec2 uvR = uv;
    uvR.x -= sin(uv.y * 3.1415) * ratio * 0.012 * (vel.x + vel.y) / 8.0;
    uvR.y -= sin(uv.x * 3.1415) * ratio * 0.012 * (vel.x + vel.y) / 8.0;
    tex1.r = texture2D(u_texture, centeredAspectRatio(uvR, u_textureFactor)).r;
    tex2.r = texture2D(u_texture2, centeredAspectRatio(uvR, u_texture2Factor)).r;
    
    // Green Channel Shift
    vec2 uvG = uv;
    uvG.x -= sin(uv.y * 3.1415) * ratio * 0.008 * (vel.x + vel.y) / 8.0;
    uvG.y -= sin(uv.x * 3.1415) * ratio * 0.008 * (vel.x + vel.y) / 8.0;
    tex1.g = texture2D(u_texture, centeredAspectRatio(uvG, u_textureFactor)).g;
    tex2.g = texture2D(u_texture2, centeredAspectRatio(uvG, u_texture2Factor)).g;
    
    // Blue Channel Shift
    vec2 uvB = uv;
    uvB.x -= sin(uv.y * 3.1415) * ratio * 0.004 * (vel.x + vel.y) / 8.0;
    uvB.y -= sin(uv.x * 3.1415) * ratio * 0.004 * (vel.x + vel.y) / 8.0;
    tex1.b = texture2D(u_texture, centeredAspectRatio(uvB, u_textureFactor)).b;
    tex2.b = texture2D(u_texture2, centeredAspectRatio(uvB, u_texture2Factor)).b;
    
    // Alpha blending
    float alpha1 = texture2D(u_texture, centeredAspectRatio(uv, u_textureFactor)).a;
    float alpha2 = texture2D(u_texture2, centeredAspectRatio(uv, u_texture2Factor)).a;
    float alpha = mix(alpha1, alpha2, u_textureProgress);
    
    vec4 finalColor = mix(tex1, tex2, u_textureProgress);
    gl_FragColor = vec4(finalColor.rgb, alpha);
}
`;
