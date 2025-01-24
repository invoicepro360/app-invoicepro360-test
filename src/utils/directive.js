import numeral from "numeral"

const systemKeys = [
    'Delete', 'Backspace', 'Tab', 'Esc', 'Escape', 'Enter',
    'Home', 'End', 'PageUp', 'PageDown', 'Del', 'Delete',
    'Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Insert',
    'Up', 'ArrowUp', 'Down', 'ArrowDown'
]

const keydown = (event) => {

    const { target, key, keyCode, ctrlKey, metaKey } = event;

    if (!(
        // Is numeric
        (key >= '0' && key <= '9') ||
        // Is special symbol allowed (.)
        ( (key === '.')  && !~target.value.indexOf(key) ) ||
        // Is system key
        systemKeys.includes(key) ||
        // Is ctrl + a, c, x, v
        ((ctrlKey || metaKey) && [65, 67, 86, 88].includes(keyCode))
    )) {
        event.preventDefault();
    }
}

export default app => {

    app.directive('decimal', {

        mounted(el,binding) {
            el.addEventListener('keydown',(e) => { keydown(e) } )

            if(binding.value === 'auto'){
                el.addEventListener('change', () => {
                    el.value = numeral(el.value).format('0.00');
                })
            }
        }                

      })
 
}