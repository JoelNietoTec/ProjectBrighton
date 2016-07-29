var formatService = function () {
    var formatFunctions = {};

    formatFunctions.relativeTime = function (date) {
        if (moment(date).isValid() && date)
            return moment(date).startOf('minute').fromNow();
        else
            return ' ';
    };

    formatFunctions.legibleDate = function (date) {
        if (moment(date).isValid() && date)
            return moment(date).format('LL');
        else
            return ' ';
    };

    formatFunctions.toObject = function (arr) {
        var rv = {};
        for (var i = 0; i < arr.length; ++i)
        console.log(arr[0]);
            if (arr[i] !== undefined) rv[arr[i].id] = arr[i].name;
        return rv;
    };

    formatFunctions.frmDates = function (array) {
        console.log(array);
        array.forEach(function (e) {
            //Formato de fechas legibles
            e.frmtCreateDate = formatFunctions.legibleDate(e.CreateDate);
            e.frmtModifyDate = formatFunctions.legibleDate(e.ModifyDate);
            e.frmtStartDate = formatFunctions.legibleDate(e.StartDate);

            //Fechas relativas
            e.relCreateDate = formatFunctions.relativeTime(e.CreateDate);
            e.relModifyDate = formatFunctions.relativeTime(e.ModifyDate);
        }, this);
        return array;
    };

    formatFunctions.toggleModal = function (id, event) {
        $(document).ready(function () {
            $(id).modal(event);
        });
    };

    return formatFunctions;
}