// Utilitário para criar e gerenciar Shadow DOM

export class ShadowDOMManager {
  private container: HTMLDivElement | null = null;
  private shadowRoot: ShadowRoot | null = null;

  create(): HTMLDivElement {
    // Criar container principal
    this.container = document.createElement('div');
    this.container.id = 'chatbot-widget-root';
    
    // Criar Shadow DOM para isolamento completo
    this.shadowRoot = this.container.attachShadow({ mode: 'open' });
    
    // Criar div para o React render
    const appRoot = document.createElement('div');
    appRoot.id = 'chatbot-app';
    this.shadowRoot.appendChild(appRoot);
    
    // Adicionar ao body
    document.body.appendChild(this.container);
    
    return appRoot;
  }

  getShadowRoot(): ShadowRoot | null {
    return this.shadowRoot;
  }

  getAppRoot(): HTMLDivElement | null {
    return this.shadowRoot?.querySelector('#chatbot-app') as HTMLDivElement || null;
  }

  injectStyles(styles: string): void {
    if (!this.shadowRoot) return;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    this.shadowRoot.appendChild(styleElement);
  }

  destroy(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = null;
    this.shadowRoot = null;
  }
}

