var formatService = function () {
    var formatFunctions = {};

    formatFunctions.relativeTime = function (date) {
        if (moment(date).isValid())
            return moment(date).startOf('minute').fromNow();
        else
            return ' ';
    }
    return formatFunctions;
}