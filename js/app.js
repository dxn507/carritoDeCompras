const carrito = document.getElementById('carrito'); //icono de carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const iconoCarrito = document.querySelector('.img-carrito');
const vaciarCarrito = document.getElementById("vaciar");
const botonAgregarAlCarrito = [...document.querySelectorAll('.info-curso .boton')];
let articulosCarrito = [];

cargarListeners();
function cargarListeners(){
  carrito.addEventListener('click', eliminarCurso);
  //vaciar el carrito
  vaciarCarrito.addEventListener('click',()=>{
    articulosCarrito = [];
    vaciarHtml();
  })
};
  
botonAgregarAlCarrito.forEach(boton =>{
  boton.addEventListener('click', agregarAlCarrito)
});

function agregarAlCarrito(e){
  e.preventDefault();
  const cursoSeleccionado = e.target.parentElement.parentElement;
  leerDatosCurso(cursoSeleccionado);
}

//Elimina cursos del carrito
function eliminarCurso(e) {
  
  if (e.target.classList.contains('equis')) {
    const cursoId =e.target.getAttribute('data-id');
    //Elimina del arreglo de Articulos carrito por data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHtml();//Itera sobre carrito y muestra el html
  }
  
}
  /*
  if (e.target.classList.contains('equis')) {
    const cursoId = e.target.getAttribute('data-id');
    //Elimina del arreglo de Articulos carrito por data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
   
    carritoHtml();//Itera sobre carrito y muestra el html
  }
  } 
  */ 
// lee contenido del html y extrae los datos 
function leerDatosCurso(curso) {
  //extrae dotos del curso
  const infoCurso={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio .oferta').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  //Revisa si el elemento ya existe en el carrito
  const existe = articulosCarrito.some(curso =>curso.id===infoCurso.id);
  if(existe){
    // actualiza la cantidad
    const cursos = articulosCarrito.map(curso=>{
      if (curso.id===infoCurso.id) {
        curso.cantidad++;
        return curso //Retorna objetos actualizados
        
      }else{
        return curso //Retorna objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  }else{
    //Agregar elementos al arreglo del carrito
  articulosCarrito = [...articulosCarrito,infoCurso];
  }
  
  carritoHtml();

}
//muestra el carrito html en carrito de compras
function carritoHtml() {
  //limpiar el html
  vaciarHtml()

  //recorre el carrito y genera el html
  articulosCarrito.forEach(curso=>{
    const row=document.createElement('tr');
    row.innerHTML=`
      <td><img src="${curso.imagen}"></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>${curso.cantidad}</td>
      <td>
        <a href="#" class="equis" data-id=${curso.id}>X</a>
      </td>    

    `
    //Agrega el html del carrito en eltbody 
    contenedorCarrito.appendChild(row);

  });
}
//Eliminar curso del tbody
function vaciarHtml() {
  //Forma lenta
  //contenedorCarrito.innerHTML='';
  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}