export class Form{
    constructor(action, method, name, value = ''){
        this.form = document.createElement('form')
        this.form.action = action
        this.form.method = method
        this.form.enctype = 'multipart/form-data'
        this.input = document.createElement('input')
        this.input.type = 'submit'
        this.input.name = name
        this.input.value = value
        this.form.appendChild(this.input)
        this.form.style.display = 'none'
    }
}