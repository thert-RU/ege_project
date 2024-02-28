// 'use strict'

class Task {
    constructor(number_all, number_ege, theme, widget_inner, ans, base_widget, red=false) {
        this.number_ege = number_ege
        this.number_all = number_all
        this.theme = theme
        this.ans = ans
        this.widget = document.createElement('div')
        this.widget.innerHTML = widget_inner
        let ans_widget = document.createElement('div')
        ans_widget.className = 'task-ans'
        ans_widget.innerHTML = this.ans
        this.widget.className = `container column-flex task task${this.number_ege}-ege task${this.number_all}-all theme-${this.theme}`
        this.widget.querySelector('.task-number-ege').innerHTML = `${this.number_ege}`
        this.widget.querySelector('.task-number-all').innerHTML = `№${this.number_all }`
        this.widget.appendChild(ans_widget)
        this.red = red
        // if (red){
        //     let task_top = this.widget.querySelector('task-top')
        //     let red_group = document.createElement('div')

        // }
        this.widget.style.display = 'none'
        this.base = base_widget
        this.base.appendChild(this.widget)
        
    }

    show(){
        this.widget.style.display = 'flex'
    }
    hide() {
        this.widget.style.display = 'none'
    }
    info() {
        console.log(this.number_all, this.number_ege, this.theme, this.text, this.img_link, this.file_link, this.ans)
    }
}

class Base {
    constructor(base_widget=document.createElement('div'), select=document.createElement('div'), select_text=document.createElement('div'), inner=document.createElement('div'), red=false) {
        this.base = base_widget
        this.select = select
        this.select_text = select_text
        this.inner = inner
        this.red = red
    }
    async main(url, do_funcs=true){
    await fetch(url)
     .then(response => response.json())
     .then(data_json => {
        // Добавляем результат в глобальную переменную
        this.data = data_json
        let list = this.getTasksAndThemesList(this.data['tasks'])
        this.tasks_list = list[0]
        this.themes_list = list[1]
        console.log(this.tasks_list, this.themes_list)
        
        this.setSelectText(this.select, this.select_text, this.inner)
        if (do_funcs){
            for(let i of this.tasks_list){
                i.show()
            }
        }

        window.tasks = this.tasks_list
        window.themes = this.themes_list
    })
    .catch(error => console.error(error))
    }
    getTasksAndThemesList(tasks_data){
      let tasks = [];
      let themes = []
      for (let i in tasks_data) {
        let task_data = tasks_data[i];
        let task_theme = task_data['theme']

        let widget = document.createElement('div')
        widget.innerHTML = task_data.widget
        let task_info = widget.querySelector('.task-info')
        let count = 0
        for (let child of task_info.children)     {
            if (child.className.includes('task-img')){
                child.src=task_data['sources'][count]
                count++
            }
            if (child.className.includes('task-file')){
                child.href=task_data['sources'][count]
                count++
            }
        }   
        task_data['widget'] = widget.innerHTML
    
        let task = new Task(
          i,
          task_data['number_ege'],
          task_theme,
          task_data['widget'],
          task_data["ans"],
          this.base,
          this.red
        );
        tasks.push(task);
        if (themes.indexOf(task_theme) == -1) {
            themes.push(task_theme)
        }
    }
      return [tasks, themes]
    }
    setSelectText (select, select_text, inner){
        select_text.innerHTML = `${this.themes_list[0]}`
        console.log(select)
        inner.style.backgroundColor = 'azure'
        for (let i of this.themes_list) {
        // for(let i = 0; i<100; i++){
            let p = document.createElement('p')
            p.innerHTML = i
            p.className = 'inner-text'
            p.addEventListener('click', ()=>{
                select_text.innerHTML = p.innerHTML
                inner.style.display = 'none'
            })
            inner.appendChild(p)
        }
        
    }
    showTasks(tasks){
        for (let i of tasks) {
            i.show()
        }
    }
    getTasksWithOneTheme(tasks, theme){
        list = []
        for (let i of tasks) {
            if (theme == i.theme) {
                list.push(i)
            }
        }
        return list
    }
    getTaskByNumber(tasks, number){
        list = []
        for (let i of tasks) {
            if (number == i.number_all) {
                list.push(i)
            }
        }
        return list
    }
}   

class TaskWidget{
    constructor(widget, base, ans_widget){
        this.widget = widget
        this.base = base
        this.widget.style.border = 'none'
        this.form = new Form('/change', 'post', 'info', 'upload')
        this.files = []
        this.nodes = []
        this.tasks = []
        this.ans_widget = ans_widget
        this.count_nodes = 0
        // this.show()
        
    }
    main(base, new_btn, inner, text_btn, img_btn, file_btn, back_btn, save_btn, num_field, num, ege_input){
        
        num_field.innerHTML = `№${num}`
        console.log(num_field.innerHTML)
        base.appendChild(this.widget)
        this.show()
        inner.style.display = 'none'

        new_btn.addEventListener('click', ()=>{
            new_btn.style.display = 'none'
            inner.style.display = 'flex'
        })
        text_btn.addEventListener('click', ()=>{
            let input = this.createInputTextNode()
            inner.style.display = 'none'
            new_btn.style.display = 'flex'
            this.widget.appendChild(input)
        })
        img_btn.addEventListener('click', ()=>{
            let input = this.createInputImgNode()
            inner.style.display = 'none'
            new_btn.style.display = 'flex'
            this.widget.appendChild(input)
        })
        file_btn.addEventListener('click', ()=>{
            let input = this.createInputFileNode()
            inner.style.display = 'none'
            new_btn.style.display = 'flex'
            this.widget.appendChild(input)
        })
        back_btn.addEventListener('click', ()=>{
            inner.style.display = 'none'
            new_btn.style.display = 'flex'
            
        })
        // save_btn.style.display = 'none'
        save_btn.addEventListener('click', ()=>{
            let nodes = this.getNodes()
            console.log(this.files)
            for (let node of this.files){
                    this.form.form.appendChild(node)
                    console.log(node.files)
            }
            console.log(this.form.form.innerHTML)
            let names = {'number_ege':ege_input.value, 'theme':'theme', 'widget':nodes, 'ans':this.ans_widget.value}
            
            let names_input = document.createElement('input')
            names_input.type = 'hidden'
            names_input.value = ''
            names_input.name = 'names'
            this.form.form.appendChild(names_input)
            for (let i in names){
                names_input.value += i + ', '
                let save_widget = document.createElement('input')
                save_widget.type = 'hidden'
                save_widget.name = i
                save_widget.value = names[i]
                this.form.form.appendChild(save_widget)
                console.log(save_widget.value)
            }
            save_btn.appendChild(this.form.form)
            this.form.input.click()
        })

    }
    async createFictiveBase(url, select, select_text, inner) {
        let fictive_base = new Base(document.createElement('div'),select, select_text, inner, true)
        await fictive_base.main(url)
        for (let i of window.tasks){
            this.createRedGroup(i)
            this.tasks.push(i)
        }
        
    }
    createRedGroup(task_element){
        let red_group = document.createElement('div')
        red_group.className = 'container manage-group row-flex'
        red_group.style.display = 'flex'
        let del = document.createElement('div')
        del.style.display = 'flex'
        del.className = 'manage-btns del-btn'
        del.innerHTML = 'del'
        del.addEventListener('click', ()=>{
            let is_del = confirm('Подтвердите удаление')
            if (is_del){
                let form  = new Form('/change', 'post', 'info', 'del')
                let data_input = document.createElement('input')
                data_input.name = 'num'
                data_input.value = task_element.number_all
                form.form.appendChild(data_input)
                task_element.widget.appendChild(form.form)
                form.input.click()
            }
        })
        red_group.appendChild(del)
        task_element.widget.appendChild(red_group)
    }
    show() {
        console.log(this.nodes)
        console.log(this.tasks)
        this.widget.style.display = 'flex'
        this.widget.innerHTML = ``
        for (let i of this.tasks){
            this.base.appendChild(i.widget)
            i.show()
        }
        for (let i of this.nodes){
            let group = document.createElement('div')
            group.className = 'container manage-group row-flex'
            group.style.display = 'none'
            
            let red = document.createElement('div')
            red.style.display = 'flex'
            red.className = 'manage-btns red-btn'
            red.innerHTML = 'red'
            red.addEventListener('click', ()=>{
                this.changeNode(this.nodes.indexOf(i), i.className)
            })
            if (i.className.includes('input')){
                red.style.display = 'none'
            }

            let del = document.createElement('div')
            del.style.display = 'flex'
            del.className = 'manage-btns del-btn'
            del.innerHTML = 'del'
            del.addEventListener('click', ()=>{
                this.deleteNode(this.nodes.indexOf(i))
            })

            group.appendChild(red)
            group.appendChild(del)
            
            i.addEventListener('click', ()=>{
                if (group.style.display == 'none'){
                    group.style.display = 'flex'
                }
                else {
                    group.style.display = 'none'
                }
            })
            this.widget.appendChild(group)

            this.widget.appendChild(i)
        }
    }
    getNodes(){
        console.log(this.nodes)
        let nodes = ''
        // let files = []
        for (let j of this.nodes){
            if (!(j.className.includes('input'))){
                let i = document.createElement('div')
                i.appendChild(j)
                if (j.className.includes('text')){
                    nodes += i.innerHTML
                }
                else if (j.className.includes('img')){
                    // files.push(j.src)
                    j.src = ''
                    nodes += i.innerHTML
                }
                else if (j.className.includes('file')){
                    // files.push(j.href)
                    j.href = ''
                    nodes += i.innerHTML
                }
            }
            
        }
        // return [nodes, files]
        return nodes
    }
    createAnsNode(text=''){
        let input = document.createElement('textarea')
        input.value = text
        input.placeholder = 'answer'
            // input.rows = '10rem'
            // input.cols = '10rem'
        input.className = 'ans-node add-node-input'
        return input
    }
    createInputTextNode(text = ''){
        let input = document.createElement('textarea')
        input.value = text
            
            // input.rows = '10rem'
            // input.cols = '10rem'
            input.className = 'add-text-node-input add-node-input'
            input.addEventListener('change', ()=>{
                if (this.nodes.includes(input)){
                    this.nodes.splice(this.nodes.indexOf(input), 1)
                }
                let value = input.value
                this.addNewNode(this.getTextNode(value))
            })
        return input
    }
    createInputImgNode(text = ''){
        let input = document.createElement('input')
        input.value = text
            input.type = 'file'
            input.name = `file${this.nodes.length}`
            input.className = 'add-img-node-input add-node-input'
            input.addEventListener('change', ()=>{
                if (this.nodes.includes(input)){
                    this.nodes.splice(this.nodes.indexOf(input), 1)
                }
                if (input.files && input.files[0]){

                    let value = input.files[0]
                    let new_node = this.getImgNode(URL.createObjectURL(value))
                    this.files.push(input)

                    this.addNewNode(new_node)
                }
            })
        return input
    }
    createInputFileNode(text = ''){
        let input = document.createElement('input')
        input.value = text
            input.type = 'file'
            input.name = `file${this.nodes.length}`
            input.className = 'add-file-node-input add-node-input'
            input.addEventListener('change', ()=>{
                if (this.nodes.includes(input)){
                    this.nodes.splice(this.nodes.indexOf(input), 1)
                }
                if (input.files && input.files[0]){
                    
                    let value = input.files[0]
                    let new_node = this.getFileNode(URL.createObjectURL(value))
                    this.files.push(input)
                    this.addNewNode(new_node)
                }
            })
        return input
    }
    addNewNode(text_node){
        // let index = this.nodes.indexOf(input)
        // if (index > -1){
        //     this.nodes.slice(index, index)
        // }
        // else{
        //     console.log('syka ne poluchilos da kakogo huya')
        // }
        this.nodes.push(text_node)
        this.show()
    }
    getTextNode(text){
        // let new_text = ''
        // for (let i = 0; i<text.length/25;i++){
        //     new_text += text.slice(i * 25, (i + 1) * 25) + '<br>'
        // }
        let text_node = `<p class="task-text">${text}</p>`
        let node = document.createElement('p')
        node.className = 'task-text'
        node.innerHTML = text
        return node
    }
    getImgNode(link){
        let text_node = `<img class="task-img" src="${link}">`
        let node = document.createElement('img')
        node.className = 'task-img'
        node.src = link
        return node
    }
    getFileNode(link){
        let text_node = `<a href="${link}" download class="task-file">Скачать файл</a>`
        let node = document.createElement('a')
        node.className = 'task-file'
        node.href = link
        node.download = 'file'
        node.innerHTML = 'file'
        return node
    }
    deleteNode(number){
        this.nodes.splice(number, 1)
        this.show()
        // if (this.count_nodes > 0){
        //     this.count_nodes -= 1
        // }
    }
    changeNode(number, node_class){
        let node = this.nodes[number]
        if (node_class.indexOf('text') >=0){
            this.nodes.splice(number, 1, this.createInputTextNode(node.innerHTML))
            this.show()
        }
        else if (node_class.indexOf('img') >=0){
            this.nodes.splice(number, 1, this.createInputImgNode())
            this.show()
        }
        else if (node_class.indexOf('file') >=0){
            this.nodes.splice(number, 1, this.createInputFileNode())
            this.show()
        }
        else {
            alert('Ошибка! Неизвестный вид узла')
        }
    }

}

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
class Form{
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
async function start(){
    let start_widget = document.querySelector('.start')
    let base_btn = document.querySelector('.button-base')
    let var_btn = document.querySelector('.button-variants')
    let log_btn = document.querySelector('.button-login')

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
    
}
async function base(){
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
    await base.main('/ege project/data.json')

}
async function change(){
    
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
    await add_task.createFictiveBase('/ege project/data.json', select, select_text, inner)
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

async function base_red(){
    
    
    
}