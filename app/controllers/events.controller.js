module.exports = {
  //show all events
  showEvents: (req, res) => {
    //create dummy data
    const events = [
      { name: 'Basketball', slug:'basketball', description: 'Throwing into a basket'},
      { name: 'Swimming', slug: 'swimming', description: 'Michael Phelpis is the fast fish'},
      { name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up'}
    ];
    //return a view with data
    res.render('pages/events', {events: events});
  }
};