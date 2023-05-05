$(document).ready(function () {
    var table =  $('#example').DataTable({
        // dom: 'Bfrtip',
        buttons: [
            'colvis','excel', 'pdf',
            {
                extend: 'print',
                text: '🖨Print',
                title: '',
                exportOptions:{
                    columns:':visible'
                }
            },
        ],
        // columnDefs: [ {
        //     targets: -1,
        //     visible: false
        // } ],
        pagingType: 'full_numbers',
        initComplete: function () {
            this.api()
                .columns()
                .every(function () {
                    var column = this;
                    var select = $('<select><option value="">none</option></select>')
                        .appendTo($(column.footer()).empty())
                        // .appendTo($(column.header()))
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex($(this).val());
 
                            column.search(val ? '^' + val + '$' : '', true, false).draw();
                        });
 
                    column
                        .data()
                        .unique()
                        .sort()
                        .each(function (d, j) {
                            select.append('<option value="' + d + '">' + d + '</option>');
                        });
                });
        },
    });

    table.buttons().container()
    .appendTo('#dtButtonsHolder')
});