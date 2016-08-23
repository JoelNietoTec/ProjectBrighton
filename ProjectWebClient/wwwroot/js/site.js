// Write your Javascript code.
$('.datepicker').datepicker({
    language: 'es',
    autoclose: true,
    maxViewMode: 3,
    startView: 2, 
    title: 'Fecha de Ingreso'
});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});