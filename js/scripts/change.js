import {TaskWidget} from '../modules/task_widget.js'
import {Form} from '../modules/form.js'

export async function change(folder){
    
    let to_base_button = document.querySelector('.base-btn')
    to_base_button.addEventListener('click', ()=>{
        let form = new Form('/base', 'get', 'info')
        to_base_button.appendChild(form.form)
        form.input.click()
    })
    
    let base_widget = document.querySelector('.base-widgets')
    base_widget.style.display = 'none'
    
    let task_widget = document.createElement('div')
    task_widget.className='container change-widget-inner column-flex'
    
    let big_change_widget = document.querySelector(".big-change-widget")
    big_change_widget.style.display = 'flex'
    let show_base_btn = document.querySelector('.show-base-btn')
    show_base_btn.addEventListener('click', ()=>{
        if (base_widget.style.display == 'none'){
            base_widget.style.display = 'flex'
            big_change_widget.style.display = 'none'
            show_base_btn.innerHTML = 'Скрыть базу заданий'
        }
        else{
            base_widget.style.display = 'none'
            big_change_widget.style.display = 'flex'
            show_base_btn.innerHTML = 'Показать базу заданий'
        }
    })
    let ans_widget = big_change_widget.querySelector('.ans-node')
    console.log(ans_widget)
    let add_task = new TaskWidget(task_widget, base_widget, ans_widget)
    
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
    await add_task.createFictiveBase(folder + '/data.json', select, select_text, inner)
    // let base = new Base(task_widget, select, select_text, inner, red=true)
    // await base.main('/ege project/data.json')
    
    let change_widget = document.querySelector('.change-widget')
    let new_btn = document.querySelector('.add-node-button')
    let task_inner = document.querySelector('.add-node-inner')
    let text_btn = document.querySelector('.add-node-text')
    let img_btn = document.querySelector('.add-node-img')
    let file_btn = document.querySelector('.add-node-file')
    let back_btn = document.querySelector('.add-node-back')
    let save_btn = document.querySelector('.save-button')
    let num_field = document.querySelector('.change-number-all')
    let num = window.tasks.length + 1   
    let ege_input = document.querySelector('.change-ege-input')
    
    add_task.main(change_widget, new_btn, task_inner, text_btn, img_btn, file_btn, back_btn, save_btn, num_field, num, ege_input)
}