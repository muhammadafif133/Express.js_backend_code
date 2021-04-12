const Router = require('koa-router');
const usersAuth = require('../controllers/users_auth');
const employeesAuth = require('../controllers/employees_auth');

const router = Router({prefix: '/api/v1'});

router.get('/', publicAPI);
router.get('/usersprivate', usersAuth, usersPrivateAPI);

//public access header
function publicAPI(ctx) {
  ctx.body = {
    message: `PUBLIC PAGE: You requested a new message URI (root) of the API`
  }
}

//private user access header
function usersPrivateAPI(ctx){
  const user = ctx.state.user; //this will be accessed by the done(null, user) in strategy and add user value as 'ctx.state.user'
  ctx.body = {
    message: `Hello ${user.userUsername} you registered on ${user.dateRegistered}`
  }
}

//private employee access header
function employeesPrivateAPI(ctx){
  const employee = ctx.state.user; //this will be accessed by the done(null, user) in strategy and add employee value as 'ctx.state.user'
  ctx.body = {
    message: `Hello ${employee.empUsername} you registered on ${employee.dateRegistered}`}
}
 
module.exports = router;
