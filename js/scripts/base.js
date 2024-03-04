import {Task} from '../modules/task.js'
import {Base} from '../modules/base.js'
import {TaskWidget} from '../modules/task_widget.js'
import {Form} from '../modules/form.js'

export async function base(folder){
    let start_widget = document.querySelector('.base')
    let change_btn = document.querySelector('.button-to-change')
    change_btn.addEventListener('click', ()=>{
        let form = new Form('/change', 'get', 'info')
        start_widget.appendChild(form.form)
        form.input.click()
    })
    let base_widget = document.querySelector('.base-widgets')
    
    let select = document.querySelector('.type-select')
    let select_text = select.querySelector('p')
    let inner = document.querySelector('.type-select-inner')
    
    inner.style.display = 'none'
    
    select.addEventListener('click', ()=>{
        if (inner.style.display == 'none') {
            inner.style.display = 'flex'
        }
        else {
            inner.style.display = 'none'
        }
    })
    let base = new Base(base_widget, select, select_text, inner)
    await base.main(folder + '/data.json')

}