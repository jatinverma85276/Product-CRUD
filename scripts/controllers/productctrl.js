import {productOperations} from "../services/product_operations.js";
import {CONSTANTS} from "../utils/constants.js";

window.addEventListener('load', initApp);

function initApp() {
    bindEvents();
    updateCounts();
    disableButtons();
    loadLocal();
    changeSearch();
}

function disableButtons() {
    document.querySelector('#delete').setAttribute('disabled', true);
}

const enableButtons =() => document.querySelector('#delete').removeAttribute('disabled');

function bindEvents() {
    document.getElementById('add').
    addEventListener('click', addProduct);
    document.getElementById('delete').addEventListener('click', deleteProduct);
    document.getElementById('update').addEventListener('click', update);
    document.getElementById('save').addEventListener('click', saveLocal);
    document.getElementById('load').addEventListener('click', loadLocal);
    document.getElementById('search').addEventListener('click', search);
    let sorting = document.getElementsByClassName('sortAsceDesc');
    for(let i=0; i<sorting.length; i++) {
        sorting[i].addEventListener('click',sort);
    }

}

function changeSearch(){
    let placeholderSearches = document.getElementById("searchbox");
    let sel = document.getElementById("box1");
    let text= sel.options[sel.selectedIndex].text;
    if(text === "Search By Price"){
        placeholderSearches.placeholder ="Enter Price By which You have to Search";
    }else{
        placeholderSearches.placeholder ="Enter Name By which You have to Search";
    }
    return text;
}

function saveLocal() {
    if(window.localStorage){
        localStorage.products = JSON.stringify(productOperations.products);
        alert("Data saved successfully");
    }else{
        alert("You don't have local storage")
    }
}

function loadLocal() {
    if(window.localStorage){
        if(localStorage.products){
            productOperations.products = JSON.parse(localStorage.products);
            printAllProducts(productOperations.products);
        }
        else{
            alert("No Data to Load...");
        }
    }
    else{
        alert('Ur Browser is Outdated , Not Support LocalStorage...');
    }
}


function deleteProduct() {
    // all red gone
    let products = productOperations.removeMarked();
    printAllProducts(products);
}

function createObject() {
    const fields = ['id', 'name', 'description', 'date', 'url', 'price'];
    const productObject = {};

    for(let field of fields) {
        productObject[field] = document.querySelector(`#${field}`).value;
    }

    // console.log('Product Object', productObject);
    return productObject;
}

function addProduct() {
    let productObject = createObject();
    let product = productOperations.add(productObject);
    console.log(product)
    printProduct(product);
    updateCounts();
}

function createIcon(className, callBackFn, id) {
    let icon  = document.createElement('i');
    icon.className = `${CONSTANTS.SOLID} ${className} ${CONSTANTS.MARGIN_RIGHT} ${CONSTANTS.HAND}`;
    icon.addEventListener('click', callBackFn)
    icon.setAttribute('pid', id);

    return icon;

}

function updateCounts(){
    document.querySelector('#total').innerText = productOperations.getTotal();
    let mark = productOperations.getMarkTotal();
    document.querySelector('#mark').innerText = productOperations.getMarkTotal();
    document.querySelector('#unmark').innerText = productOperations.getUnmarkTotal();
    if(mark>0){
        enableButtons();
    }else{
        disableButtons();
    }
}

function edit(){
    const fields = ['id', 'name', 'description', 'date', 'url', 'price'];
    let id = this.getAttribute('pid');
    let product = productOperations.products.find(product=>product.id == id);
    for(let field of fields) {
        document.querySelector(`#${field}`).value = product[field];
    }    
}

function search() {
    
    let searchBy = changeSearch();
    let searchLetter = document.querySelector('#searchbox').value;
    searchProduct = productOperations.search(searchBy,searchLetter);
    printAllProducts(searchProduct);
}

function update(){
    let productObject = createObject();
    let products = productOperations.update(productObject);
    // console.log(products);
    printAllProducts(products);
}

function toggleDelete(){
    let icon = this;
    let id = icon.getAttribute('pid');
    productOperations.toggleMarking(id);
    let tr = icon.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    updateCounts();

    // Mark the flag on each object
}

function sort() {
    let name = this.getAttribute("name");
    // console.log(this.getAttribute("name"));
    let product = productOperations.sort(name);
    printAllProducts(product);
}


function printAllProducts(products) {
    const tbody = document.querySelector('#products');
    tbody.innerHTML = '';
    products.forEach(printProduct);
    updateCounts();
}

function printProduct(product){
    const tbody = document.querySelector('#products');
    const tr = tbody.insertRow();
    let index = 0;
    let td;
    let id = product['id'];
    for(let key in product){
        if(key == 'isMarkForDelete'){
            continue;
        }
        td = tr.insertCell(index);
        td.innerText = product[key];
        index++;
    }
    td = tr.insertCell(index);
    td.appendChild(createIcon(CONSTANTS.TRASH_ICON, toggleDelete, id));
    td.appendChild(createIcon(CONSTANTS.EDIT_ICON, edit, id));
}