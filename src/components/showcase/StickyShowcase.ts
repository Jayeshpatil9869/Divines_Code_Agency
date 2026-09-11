import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders";

export interface SlideItem {
  id: number | string;
  title: string;
  meta: string;
  category?: string;
  year?: string;
  image: string;
  url?: string;
  blurb?: string;
}

export interface StickyShowcaseOptions {
  container: HTMLElement;
  slidesData: SlideItem[];
  onActiveChange?: (index: number) => void;
  onMove?: (indexFloat: number) => void;
}

export class StickyShowcase {
  container: HTMLElement;
  data: SlideItem[];
  onActiveChange?: (index: number) => void;
  onMove?: (indexFloat: number) => void;

  currentIndex: number = 0;
  nextIndex: number = 0;

  // Animation values with continuous lerping
  progress: number = 0;
  targetProgress: number = 0;
  waveIntensity: number = 0;
  targetWaveIntensity: number = 0;
  textureProgress: number = 1;
  targetTextureProgress: number = 1;

  index = {
    target: 0,
    current: 0,
    initial: 0,
    scrollSize: 220,
    active: 0,
  };

  follower = {
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 400,
    targetX: typeof window !== "undefined" ? window.innerWidth / 2 : 500,
    targetY: typeof window !== "undefined" ? window.innerHeight / 2 : 400,
    vx: 0,
    vy: 0,
  };

  time: number = 0;
  loopRaf: number | null = null;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  mesh!: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  material!: THREE.ShaderMaterial;
  textures: THREE.Texture[] = [];
  factors: THREE.Vector2[] = [];

  private isDestroyed: boolean = false;
  private isGrabbing: boolean = false;
  private startY: number | null = null;
  private eventCleanups: (() => void)[] = [];

  constructor({
    container,
    slidesData,
    onActiveChange,
    onMove,
  }: StickyShowcaseOptions) {
    this.container = container;
    this.data = slidesData.length > 0 ? slidesData : [];
    this.onActiveChange = onActiveChange;
    this.onMove = onMove;

    this.index.scrollSize = Math.max(160, window.innerHeight / 4.5);

    this.initScene();
    this.initTextures();
    this.initMesh();
    this.bindEvents();
    this.startLoop();
  }

  private initScene() {
    this.scene = new THREE.Scene();
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.container.appendChild(this.renderer.domElement);
  }

  private getViewSize(): number {
    const fov = (this.camera.fov * Math.PI) / 180;
    return Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2);
  }

  private getPlaneSize(): { width: number; height: number; posX: number } {
    const viewSize = this.getViewSize();
    const width = this.container.clientWidth || window.innerWidth;
    const isDesktop = width >= 1024;
    const isTablet = width >= 768 && width < 1024;

    let heightFactor = 0.68;
    let ratio = 1.85;
    let posX = 0.72;

    if (isDesktop) {
      heightFactor = 0.68;
      ratio = 1.85;
      posX = 0.72; // Wide, expansive presentation covering the right and center-right
    } else if (isTablet) {
      heightFactor = 0.58;
      ratio = 1.65;
      posX = 0.35;
    } else {
      // Mobile
      heightFactor = 0.48;
      ratio = 1.45;
      posX = 0; // Centered on mobile
    }

    const height = viewSize * heightFactor;
    const planeWidth = height * ratio;

    return {
      width: planeWidth,
      height: height,
      posX,
    };
  }

  private initTextures() {
    const loader = new THREE.TextureLoader();
    this.factors = this.data.map(() => new THREE.Vector2(1, 1));
    this.textures = this.data.map((item, i) =>
      loader.load(
        item.image,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          this.calcAspect(i, tex);
        },
        undefined,
        () => {
          this.render();
        }
      )
    );
  }

  private calcAspect(index: number, texture: THREE.Texture) {
    const img = texture.image as HTMLImageElement | ImageBitmap | { width: number; height: number } | undefined;
    if (!img || !img.width || !img.height) return;
    const plane = this.getPlaneSize();
    const planeRatio = plane.width / plane.height;
    const imageRatio = img.width / img.height;

    let factorX = 1;
    let factorY = 1;

    // Cover math: preserves 100% natural pixel aspect ratio without stretching
    if (planeRatio > imageRatio) {
      factorY = imageRatio / planeRatio;
    } else {
      factorX = planeRatio / imageRatio;
    }

    if (this.factors[index]) {
      this.factors[index].set(factorX, factorY);
    }

    if (this.material) {
      if (this.currentIndex === index) {
        this.material.uniforms.u_textureFactor.value = this.factors[index];
      }
      if (this.nextIndex === index) {
        this.material.uniforms.u_texture2Factor.value = this.factors[index];
      }
    }
  }

  private initMesh() {
    const plane = this.getPlaneSize();
    const geometry = new THREE.PlaneGeometry(plane.width, plane.height, 64, 64);
    const initialTex = this.textures[0] || new THREE.Texture();
    const initialFactor = this.factors[0] || new THREE.Vector2(1, 1);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        u_texture: { value: initialTex },
        u_textureFactor: { value: initialFactor },
        u_texture2: { value: initialTex },
        u_texture2Factor: { value: initialFactor },
        u_textureProgress: { value: 1.0 },
        u_offset: { value: 4.2 },
        u_progress: { value: 0 },
        u_direction: { value: 1.0 },
        u_time: { value: 0 },
        u_waveIntensity: { value: 0.08 },
        u_resolution: { value: new THREE.Vector2(w, h) },
        u_rgbPosition: { value: new THREE.Vector2(w / 2, h / 2) },
        u_rgbVelocity: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.x = plane.posX;
    this.scene.add(this.mesh);
  }

  startLoop() {
    if (this.loopRaf !== null || this.isDestroyed) return;

    const tick = () => {
      if (this.isDestroyed) return;

      this.time += 0.035;

      // 1. Lerp slide index float smoothly
      const prevIndex = this.index.current;
      this.index.current += (this.index.target - this.index.current) * 0.12;

      if (Math.abs(this.index.current - prevIndex) > 0.0001) {
        if (this.onMove) this.onMove(this.index.current);
      }

      // 2. Lerp progress (rubber stretch)
      this.progress += (this.targetProgress - this.progress) * 0.14;
      // 3. Lerp wave intensity
      this.waveIntensity += (this.targetWaveIntensity - this.waveIntensity) * 0.12;
      // 4. Lerp texture transition cross-fade
      this.textureProgress += (this.targetTextureProgress - this.textureProgress) * 0.16;

      // 5. Follower smooth trailing & velocity decay for chromatic aberration
      const dx = this.follower.targetX - this.follower.x;
      const dy = this.follower.targetY - this.follower.y;
      this.follower.x += dx * 0.15;
      this.follower.y += dy * 0.15;
      this.follower.vx = dx * 0.8;
      this.follower.vy = dy * 0.8;

      if (this.material) {
        this.material.uniforms.u_time.value = this.time;
        this.material.uniforms.u_progress.value = this.progress;
        this.material.uniforms.u_waveIntensity.value = this.waveIntensity;
        this.material.uniforms.u_textureProgress.value = this.textureProgress;
        this.material.uniforms.u_rgbPosition.value.set(this.follower.x, this.follower.y);
        this.material.uniforms.u_rgbVelocity.value.set(this.follower.vx, this.follower.vy);
      }

      this.render();
      this.loopRaf = requestAnimationFrame(tick);
    };

    this.loopRaf = requestAnimationFrame(tick);
  }

  stopLoop() {
    if (this.loopRaf !== null) {
      cancelAnimationFrame(this.loopRaf);
      this.loopRaf = null;
    }
  }

  render() {
    if (this.isDestroyed || !this.renderer || !this.scene || !this.camera) return;
    this.renderer.render(this.scene, this.camera);
  }

  onMouseMove(clientX: number, clientY: number) {
    this.follower.targetX = clientX;
    this.follower.targetY = clientY;
  }

  onGrabStart() {
    this.isGrabbing = true;
    this.index.initial = this.index.current;
    this.targetProgress = 1.0;
    this.targetWaveIntensity = 0.55;
  }

  onGrabMove(deltaY: number) {
    if (this.data.length <= 1) return;

    // Apply elastic resistance at upper and lower boundaries
    const rawTarget = this.index.initial + deltaY / this.index.scrollSize;
    let clampedTarget = rawTarget;
    const maxBound = 0.45;
    const minBound = -(this.data.length - 1) - 0.45;

    if (rawTarget > maxBound) {
      clampedTarget = maxBound + (rawTarget - maxBound) * 0.3;
    } else if (rawTarget < minBound) {
      clampedTarget = minBound + (rawTarget - minBound) * 0.3;
    }

    this.index.target = clampedTarget;

    const activeIdx = Math.max(
      0,
      Math.min(this.data.length - 1, Math.round(-this.index.target))
    );

    if (this.index.active !== activeIdx) {
      this.index.active = activeIdx;
      if (this.onActiveChange) this.onActiveChange(activeIdx);
      this.updateTexture(activeIdx);
    }
  }

  updateTexture(nextIdx: number) {
    if (this.data.length === 0 || nextIdx === this.currentIndex) return;

    this.nextIndex = nextIdx;

    if (this.material) {
      this.material.uniforms.u_texture.value = this.textures[this.currentIndex];
      this.material.uniforms.u_textureFactor.value = this.factors[this.currentIndex];
      this.material.uniforms.u_texture2.value = this.textures[nextIdx];
      this.material.uniforms.u_texture2Factor.value = this.factors[nextIdx];
    }

    this.textureProgress = 0;
    this.targetTextureProgress = 1.0;

    // Transition completion
    this.currentIndex = nextIdx;
  }

  onGrabEnd() {
    this.isGrabbing = false;
    this.targetProgress = 0;
    this.targetWaveIntensity = 0.08; // Ambient resting wave

    // Snap smoothly to nearest integer slide
    const targetSnap = Math.max(
      -(this.data.length - 1),
      Math.min(0, Math.round(this.index.target))
    );

    this.index.target = targetSnap;
    const activeIdx = Math.abs(targetSnap);
    if (this.index.active !== activeIdx) {
      this.index.active = activeIdx;
      if (this.onActiveChange) this.onActiveChange(activeIdx);
      this.updateTexture(activeIdx);
    }
  }

  goToIndex(targetIdx: number) {
    if (targetIdx < 0 || targetIdx >= this.data.length) return;
    this.index.active = targetIdx;
    this.index.target = -targetIdx;
    this.updateTexture(targetIdx);
    if (this.onActiveChange) this.onActiveChange(targetIdx);
  }

  next() {
    const nextIdx = Math.min(this.data.length - 1, this.index.active + 1);
    this.goToIndex(nextIdx);
  }

  prev() {
    const prevIdx = Math.max(0, this.index.active - 1);
    this.goToIndex(prevIdx);
  }

  private bindEvents() {
    const onMouseDown = (e: MouseEvent) => {
      this.startY = e.clientY;
      this.onMouseMove(e.clientX, e.clientY);
      this.onGrabStart();
    };

    const onMouseMove = (e: MouseEvent) => {
      this.onMouseMove(e.clientX, e.clientY);
      if (this.startY !== null) {
        this.onGrabMove(e.clientY - this.startY);
      }
    };

    const onMouseUp = () => {
      if (this.startY !== null) {
        this.startY = null;
        this.onGrabEnd();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        this.startY = e.touches[0].clientY;
        this.onMouseMove(e.touches[0].clientX, e.touches[0].clientY);
        this.onGrabStart();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (this.startY !== null && e.touches.length > 0) {
        const touch = e.touches[0];
        this.onMouseMove(touch.clientX, touch.clientY);
        this.onGrabMove(touch.clientY - this.startY);
      }
    };

    const onTouchEnd = () => {
      if (this.startY !== null) {
        this.startY = null;
        this.onGrabEnd();
      }
    };

    let wheelTimeout: number | null = null;
    let accumulatedWheel = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Smooth trackpad / mousewheel dampening
      accumulatedWheel += Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 60) * 0.45;

      if (!this.isGrabbing) {
        this.index.initial = this.index.current;
        this.onGrabStart();
      }

      this.onGrabMove(-accumulatedWheel);

      if (wheelTimeout !== null) clearTimeout(wheelTimeout);
      wheelTimeout = window.setTimeout(() => {
        accumulatedWheel = 0;
        this.onGrabEnd();
      }, 140);
    };

    const onResize = () => {
      if (this.isDestroyed || !this.renderer || !this.camera) return;
      const w = this.container.clientWidth || window.innerWidth;
      const h = this.container.clientHeight || window.innerHeight;

      this.index.scrollSize = Math.max(160, h / 4.5);

      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (this.material) {
        this.material.uniforms.u_resolution.value.set(w, h);
      }

      const plane = this.getPlaneSize();
      if (this.mesh && this.mesh.geometry) {
        this.mesh.geometry.dispose();
        this.mesh.geometry = new THREE.PlaneGeometry(plane.width, plane.height, 64, 64);
        this.mesh.position.x = plane.posX;
      }

      // Recompute aspect factors
      this.textures.forEach((tex, i) => {
        this.calcAspect(i, tex);
      });
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    this.container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    window.addEventListener("resize", onResize);

    this.eventCleanups.push(
      () => window.removeEventListener("mousedown", onMouseDown),
      () => window.removeEventListener("mousemove", onMouseMove),
      () => window.removeEventListener("mouseup", onMouseUp),
      () => this.container.removeEventListener("wheel", onWheel),
      () => window.removeEventListener("touchstart", onTouchStart),
      () => window.removeEventListener("touchmove", onTouchMove),
      () => window.removeEventListener("touchend", onTouchEnd),
      () => window.removeEventListener("touchcancel", onTouchEnd),
      () => window.removeEventListener("resize", onResize),
      () => {
        if (wheelTimeout !== null) clearTimeout(wheelTimeout);
      }
    );
  }

  destroy() {
    this.isDestroyed = true;
    this.stopLoop();

    this.eventCleanups.forEach((cleanup) => cleanup());
    this.eventCleanups = [];

    if (this.mesh) {
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.material) this.material.dispose();
      this.scene.remove(this.mesh);
    }

    this.textures.forEach((tex) => tex.dispose());
    this.textures = [];

    if (this.renderer) {
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
    }
  }
}
