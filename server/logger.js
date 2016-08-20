"use strict";

var winston = require("winston");
var logger = new winston.Logger({
    transports: [new winston.transports.Console({
        level: 'info',
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: true
    })],
    levels: {
        fatal: 5,
        error: 4,
        info: 3,
        warn: 2,
        debug: 1,
        trace: 0
    }, colors: {
        fatal: 'blue',
        error: 'red',
        info: 'green',
        warn: 'yellow',
        debug: 'grey',
        trace: 'white'
    }
});
exports.logger = logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlci9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBWSxVQUFPLFFBQU0sU0FBTixDQUFuQjtBQUVBLElBQUksU0FBUyxJQUFJLFFBQVEsTUFBWixDQUFtQjtBQUU5QixnQkFBWSxDQUNWLElBQUssUUFBUSxVQUFSLENBQW1CLE9BQXhCLENBQWlDO0FBQy9CLGVBQU8sTUFEd0I7QUFFL0IscUJBQWEsSUFGa0I7QUFHL0Isa0JBQVUsSUFIcUI7QUFJL0IsZ0JBQVEsS0FKdUI7QUFLL0IsbUJBQVc7QUFMb0IsS0FBakMsQ0FEVSxDQUZrQjtBQVc5QixZQUFRO0FBQ04sZUFBTyxDQUREO0FBRU4sZUFBTyxDQUZEO0FBR04sY0FBTSxDQUhBO0FBSU4sY0FBTSxDQUpBO0FBS04sZUFBTyxDQUxEO0FBTU4sZUFBTztBQU5ELEtBWHNCLEVBa0IzQixRQUFRO0FBQ1QsZUFBTyxNQURFO0FBRVQsZUFBTyxLQUZFO0FBR1QsY0FBTSxPQUhHO0FBSVQsY0FBTSxRQUpHO0FBS1QsZUFBTyxNQUxFO0FBTVQsZUFBTztBQU5FO0FBbEJtQixDQUFuQixDQUFiO0FBNEJRLFFBQUEsTUFBQSxHQUFNLE1BQU4iLCJmaWxlIjoic2VydmVyL2xvZ2dlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tIFwid2luc3RvblwiO1xuXG52YXIgbG9nZ2VyID0gbmV3IHdpbnN0b24uTG9nZ2VyKHtcblxuICB0cmFuc3BvcnRzOiBbXG4gICAgbmV3ICh3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSkoe1xuICAgICAgbGV2ZWw6ICdpbmZvJyxcbiAgICAgIHByZXR0eVByaW50OiB0cnVlLFxuICAgICAgY29sb3JpemU6IHRydWUsXG4gICAgICBzaWxlbnQ6IGZhbHNlLFxuICAgICAgdGltZXN0YW1wOiB0cnVlXG4gICAgfSlcbiAgXSxcbiAgbGV2ZWxzOiB7XG4gICAgZmF0YWw6IDUsXG4gICAgZXJyb3I6IDQsXG4gICAgaW5mbzogMyxcbiAgICB3YXJuOiAyLFxuICAgIGRlYnVnOiAxLFxuICAgIHRyYWNlOiAwXG4gIH0sIGNvbG9yczoge1xuICAgIGZhdGFsOiAnYmx1ZScsXG4gICAgZXJyb3I6ICdyZWQnLFxuICAgIGluZm86ICdncmVlbicsXG4gICAgd2FybjogJ3llbGxvdycsXG4gICAgZGVidWc6ICdncmV5JyxcbiAgICB0cmFjZTogJ3doaXRlJ1xuICB9XG59KTtcblxuZXhwb3J0IHtsb2dnZXJ9OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
