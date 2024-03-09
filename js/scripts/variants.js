import { RandomVariant } from "../modules/randomvariant.js";
import { Variant } from "../modules/variant.js";

export async function variants(folder=''){
    let base_widget = document.querySelector('.base-widgets')
    let rand_var_butt = document.querySelector('.rand_btn')
    rand_var_butt.addEventListener('click', ()=>{
        base_widget.innerHTML = ''
        let variant = new RandomVariant(base_widget)
        variant.main(folder + '/data.json')
    })
}