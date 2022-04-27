const showFn = (data, $titulo, $detalles, $accion) => {
    $titulo.innerText = 'Modificar Artículo'
    $titulo.classList.add('text-green-500')
    $detalles.innerText = `Modify product data `
    document.getElementById('name').value = data.name
    document.getElementById('description').value = data.description
    document.getElementById('code').value = data.code
    document.getElementById('thumbnail').value = data.thumbnail
    document.getElementById('price').value = data.price
    document.getElementById('stock').value = data.stock
    $accion.innerText = `Modificar`
}

const modifyFn = (data, $div) => {
    let hiddenInput = document.createElement('input')
    hiddenInput.hidden = true
    hiddenInput.name = 'editMode'
    hiddenInput.value = 'modify'
    $div.append(hiddenInput)
    let hiddenInputId = document.createElement('input')
    hiddenInputId.hidden = true
    hiddenInputId.name = 'id'
    hiddenInputId.value = data.id
    $div.append(hiddenInputId)
}

const deleteFn = (data, $form, $titulo, $detalles, $accion) => {
    let hiddenInput = document.createElement('input')
    hiddenInput.hidden = true
    hiddenInput.name = 'editMode'
    hiddenInput.value = 'delete'
    $form.append(hiddenInput)
    let hiddenInputId = document.createElement('input')
    hiddenInputId.hidden = true
    hiddenInputId.name = 'id'
    hiddenInputId.value = data.id
    $form.append(hiddenInputId)
    $titulo.innerText = 'Borrar Artículo'
    $titulo.classList.add('text-red-500')
    $detalles.innerText = `Corrobore los detalles del product a borrar/remover. 
                Esta acción no se podrá deshacer.`
    $accion.innerText = 'Borrar'
    $accion.classList.remove("bg-green-500")
    $accion.classList.remove("hover:bg-green-700")
    $accion.classList.add("bg-red-500")
    $accion.classList.add("hover:bg-red-700")
    let $inputs = document.getElementsByTagName('input')
    for (let input of $inputs) {
        input.readOnly = true
        input.classList.add("text-zinc-400")
        input.classList.remove("focus:border-blue-600")
    }
}

