export class EventManager {
    constructor() {
        this.events = {};

        // Método para registrar eventos
        this.on = (elementSelector, eventType, handler) => {
            if (!this.events[elementSelector]) {
                this.events[elementSelector] = [];
            }
            this.events[elementSelector].push({ eventType, handler });
        };

        // Método para ejecutar eventos registrados
        this.applyEvents = () => {
            Object.keys(this.events).forEach(selector => {
                const elements = document.querySelectorAll(selector);
                this.events[selector].forEach(({ eventType, handler }) => {
                    elements.forEach(element => {
                        element.addEventListener(eventType, handler);
                    });
                });
            });
        };
    }
}
  