interface Handler {
  set: (user: any, property: string | symbol, value: any) => boolean
}

const handler: Handler = {
  set(user: any, property: string | symbol, value: any) {
    const query = `[data-mark="${String(property)}"]`
    const elements = Array.from(document.querySelectorAll(query))
    for (const el of elements)
      (el as HTMLElement).textContent = value

    return Reflect.set(user, property, value)
  },
}

function reactive(obj: any) {
  return new Proxy(obj, handler)
}

function defineComponents(): void {
  const templateList = document.querySelectorAll('template')
  templateList.forEach(defineComponent)
}

function defineComponent(template: HTMLTemplateElement): void {
  const name = template.getAttribute('name')
  customElements.define(
    name as string,
    class extends HTMLElement {
      constructor() {
        super()
        const component = template.content.children[0].cloneNode(true)
        this.attachShadow({ mode: 'open' }).appendChild(component as Node)
      }
    },
  )
}

function initBlueberry() {
  defineComponents()
}

export { initBlueberry, reactive }
