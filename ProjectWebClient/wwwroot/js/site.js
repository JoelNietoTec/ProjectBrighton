// Write your Javascript code.
$('#new-employee-date').datepicker({
    language: 'es',
    autoclose: true,
    maxViewMode: 3,
    startView: 2, 
    title: 'Fecha de Ingreso'
});


$('#edit-employee-date').datepicker({
    language: 'es',
    autoclose: true,
    maxViewMode: 3,
    title: 'Fecha de Ingreso'
})

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});