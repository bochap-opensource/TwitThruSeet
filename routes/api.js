/*
 * Serve JSON to our AngularJS client
 */
exports.name = function (req, res) {
  //console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
  	name: 'Bob'
  });
};
