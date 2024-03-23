// 'use strict'
import {Task} from '../modules/task.js'
import {Base} from '../modules/base.js'
import {TaskWidget} from '../modules/task_widget.js'
import {Form} from '../modules/form.js'


// class ManageGroup {
//     constructor(task_widget, base, node_class, node_num){
//         this.task = task_widget
//         this.base = base
//         this.node_num = node_num
//         this.node_class = node_class
//         this.group = document.createElement('div')
//         this.group.className = 'container manage-group row-flex'

//         this.red = document.createElement('div')
//         this.red.className = 'manage-btns red-btn'
//         this.red.addEventListener('click', ()=>{
//         })

//         this.del = document.createElement('div')
//         this.del.className = 'manage-btns del-btn'
//         this.del.addEventListener('click', ()=>{

//         })

//         this.group.appendChild(this.red)
//         this.group.appendChild(this.del)
//         this.group.appendChild(this.undo)
//     }
// }

export async function start(){
    let start_widget = document.querySelector('.start')
    let base_btn = document.querySelector('.button-base')
    let var_btn = document.querySelector('.button-variants')
    let log_btn = document.querySelector('.button-login')
    console.log('asasa')
    base_btn.addEventListener('click', ()=>{
        let form = new Form('/base', 'get', 'info')
        start_widget.appendChild(form.form)
        form.input.click()

    })
    var_btn.addEventListener('click', ()=>{
        let form = new Form('/variants', 'get', 'info')
        start_widget.appendChild(form.form)
        form.input.click()

    })
    log_btn.addEventListener('click', ()=>{
        let form = new Form('/login', 'get', 'info')
        start_widget.appendChild(form.form)
        form.input.click()

    })
    document.querySelector('.nav-group').style.left = '-10vw'
    document.querySelector('.login-group').style.right = '-10vw'
}