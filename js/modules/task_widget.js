import {Form} from './form.js'
import {Base} from './base.js'

export class TaskWidget{
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