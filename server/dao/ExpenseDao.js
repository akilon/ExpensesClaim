
var connectionProvider = require('../mysqlConnectionStringProvider');

var ExpenseDao = {
    getAll: function (callback) {
        var result = [
            { id: 1, name: 'Akilon', date: '2016-10-10', branch_code: '1A', bank_code: '123', bank_acc: '54321', bank_accholder: 'Akilon Krishnan', total: '00.00' },
            { id: 2, name: 'Cynthia', date: '2016-10-10', branch_code: '1B', bank_code: '456', bank_acc: '895565', bank_accholder: 'Cynthia Lee', total: '00.00' }
        ];
        callback(result);
    },
    getGLcodes: function (callback) {
        var result = [
            { id: 4165, name: 'Staff Reimbursement Mobile Claim - Mobile phone charges' },
            { id: 4190, name: 'Postage' },
            { id: 4191, name: 'Couriers' },
            { id: 4200, name: 'Stationery' },
            { id: 4311, name: 'International Fares - Oversea Air-ticket' },
            { id: 4312, name: 'International Accomodation - Oversea hotel' },
            { id: 4313, name: 'International Expenses - Oversea Transports and Meals Expense' },
            { id: 4321, name: 'Local Fares - Taxi claim (client & candidate visit)' },
            { id: 4001, name: 'Local Accomodation' },
            { id: 4002, name: 'Local Expenses - OT meal' },
            { id: 4003, name: 'Staff Incentives' },
            { id: 4004, name: 'Staff flowers / Gifts - Gift / Bday cake for staff' },
            { id: 4005, name: 'Candidate Flowers / Gifts - Meals with Candidates' },
            { id: 4006, name: 'Entertainment - Clients (Meals with Client)' },
            { id: 4007, name: 'Entertainment - Staff (Meals with Team / Staff)' },
            { id: 4008, name: 'Subscriptions' },
            { id: 4009, name: 'Memberships' }
        ];
        callback(result);
    }
};

module.exports.ExpenseDao = ExpenseDao;