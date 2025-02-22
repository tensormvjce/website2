import * as THREE from 'three';

export class ThreeService {
  private renderer: THREE.WebGLRenderer | null = null;

  constructor() {
    this.setupErrorHandling();
  }

  private setupErrorHandling() {
    window.addEventListener('webglcontextlost', this.handleContextLost, false);
    window.addEventListener('webglcontextrestored', this.handleContextRestored, false);
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    console.error('WebGL Context Lost. Attempting to recover...');
    
    // Optional: Add user-friendly notification
    this.notifyContextLoss();
  }

  private handleContextRestored = () => {
    console.log('WebGL Context Restored');
    // Reinitialize your Three.js scene if needed
    this.reinitializeRenderer();
  }

  private notifyContextLoss() {
    // Implement a user-friendly notification mechanism
    // For example, show a toast or modal
    const notification = document.createElement('div');
    notification.textContent = 'Graphics rendering encountered an issue. Please refresh the page.';
    notification.style.position = 'fixed';
    notification.style.top = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = 'red';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  }

  private reinitializeRenderer() {
    // Implement scene reinitialization logic
    // This is a placeholder and should be customized based on your specific Three.js setup
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = new THREE.WebGLRenderer();
    }
  }

  public createRenderer(options?: THREE.WebGLRendererParameters): THREE.WebGLRenderer {
    this.renderer = new THREE.WebGLRenderer(options);
    return this.renderer;
  }
}
