'use client';
import { useEffect, useRef } from 'react';

interface WebGLExtension {
  HALF_FLOAT_OES?: number;
  ANGLE_instanced_arrays?: {
    drawArraysInstancedANGLE: () => void;
    drawElementsInstancedANGLE: () => void;
    vertexAttribDivisorANGLE: () => void;
    VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE?: number;
  };
}

type WebGLContextType = WebGLRenderingContext;

class PointerPrototype {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: number[];

  constructor() {
    this.id = -1;
    this.texcoordX = 0;
    this.texcoordY = 0;
    this.prevTexcoordX = 0;
    this.prevTexcoordY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.down = false;
    this.moved = false;
    this.color = [0, 0, 0];
  }
}

function isWebGLContext(context: RenderingContext | null): context is WebGLRenderingContext {
  return context !== null && 'drawingBufferWidth' in context;
}

function getWebGLContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
  const params = {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  };

  const context = canvas.getContext('webgl2', params) || 
                  canvas.getContext('webgl', params);
  
  if (!isWebGLContext(context)) {
    throw new Error('WebGL not supported');
  }
  
  return context;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number, type: number, param: number) {
  if (!gl) return null;

  const texture = gl.createTexture();
  if (!texture) return null;

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  return {
    texture,
    fbo,
    width: w,
    height: h,
    attach(id: number) {
      gl.activeTexture(gl.TEXTURE0 + id);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return id;
    },
  };
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dye = useRef<ReturnType<typeof createFBO> | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    canvas.current = canvasRef.current;
    const gl = getWebGLContext(canvas.current);

    if (!gl) {
      console.error('WebGL context not available');
      return;
    }

    dye.current = createFBO(gl, DYE_RESOLUTION, DYE_RESOLUTION, gl.HALF_FLOAT_OES, gl.LINEAR);

    if (!dye.current) {
      console.error('Failed to create dye framebuffer');
      return;
    }

    const halfFloat = gl.getExtension('OES_texture_half_float');
    const supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const texType = halfFloat ? halfFloat.HALF_FLOAT_OES : gl.FLOAT;
    const rgba = { internalFormat: gl.RGBA, format: gl.RGBA };

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    let pointers = [new PointerPrototype()];
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    function updateColors(dt: number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = 0;
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function generateColor() {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      return [c.r * 0.15, c.g * 0.15, c.b * 0.15];
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r, g, b;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
        default:
          r = 0;
          g = 0;
          b = 0;
      }

      return { r, g, b };
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      if (!dye.current) return;
      gl.viewport(0, 0, dye.current.width, dye.current.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, dye.current.fbo);
      
      const radius = correctRadius(config.SPLAT_RADIUS / 100.0);
      const force = config.SPLAT_FORCE;
      
      gl.uniform2f(gl.getUniformLocation(program, 'point'), x, y);
      gl.uniform3f(gl.getUniformLocation(program, 'color'), dx * force, dy * force, 0.0);
      gl.uniform1f(gl.getUniformLocation(program, 'radius'), radius);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function correctRadius(radius: number) {
      const aspectRatio = canvas.current ? canvas.current.width / canvas.current.height : 1;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    // Mouse event handlers
    function updatePointerDownData(pointer: any, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / (canvas.current ? canvas.current.width : 1);
      pointer.texcoordY = 1.0 - posY / (canvas.current ? canvas.current.height : 1);
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: any, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / (canvas.current ? canvas.current.width : 1);
      pointer.texcoordY = 1.0 - posY / (canvas.current ? canvas.current.height : 1);
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function correctDeltaX(delta: number) {
      const aspectRatio = canvas.current ? canvas.current.width / canvas.current.height : 1;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      const aspectRatio = canvas.current ? canvas.current.width / canvas.current.height : 1;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    // Event listeners
    canvas.current?.addEventListener('mousemove', (e) => {
      const pointer = pointers[0];
      const rect = canvas.current?.getBoundingClientRect();
      const x = e.clientX - (rect ? rect.left : 0);
      const y = e.clientY - (rect ? rect.top : 0);
      updatePointerMoveData(pointer, x, y);
      if (pointer.moved) {
        splat(pointer.texcoordX, pointer.texcoordY, pointer.deltaX, pointer.deltaY, pointer.color);
      }
    });

    canvas.current?.addEventListener('mousedown', (e) => {
      const pointer = pointers[0];
      const rect = canvas.current?.getBoundingClientRect();
      const x = e.clientX - (rect ? rect.left : 0);
      const y = e.clientY - (rect ? rect.top : 0);
      updatePointerDownData(pointer, -1, x, y);
    });

    // Animation frame
    function animate() {
      const now = Date.now();
      const dt = Math.min((now - lastUpdateTime) / 1000, 0.016666);
      lastUpdateTime = now;

      updateColors(dt);
      requestAnimationFrame(animate);
    }

    // Initialize
    const program = gl.createProgram();
    animate();

    return () => {
      canvas.current?.removeEventListener('mousemove', () => {});
      canvas.current?.removeEventListener('mousedown', () => {});
      if (dye.current) {
        // Cleanup logic for dye
        dye.current = null;
      }
      if (canvas.current) {
        // Additional cleanup if needed
        canvas.current = null;
      }
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-screen h-screen"
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
      />
    </div>
  );
}

export default SplashCursor;
