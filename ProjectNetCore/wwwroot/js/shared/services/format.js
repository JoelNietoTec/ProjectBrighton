var formatService = function () {
    var formatFunctions = {};

    formatFunctions.relativeTime = function (date) {
        if (moment(date).isValid() && date)
            return moment(date).startOf('minute').fromNow();
        else
            return ' ';
    };

    formatFunctions.frmDates = function (array) {
        array.forEach(function (e) {
            e.frmtCreateDate = formatFunctions.relativeTime(e.CreateDate);
            e.frmtModifyDate = formatFunctions.relativeTime(e.ModifyDate);
        }, this);
        return array;
    };

    formatFunctions.closeModal = function (id) {
        $(document).ready(function(){
            $(id).modal('hide');
        });
    };

    return formatFunctions;
}