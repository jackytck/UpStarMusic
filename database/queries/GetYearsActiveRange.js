const Artist = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  // Approach 1: separated queries
  // const minQuery = Artist
  //   .find()
  //   .sort({ yearsActive: 1 })
  //   .limit(1)
  //   .then(artists => artists[0].yearsActive);
  //
  // const maxQuery = Artist
  //   .find()
  //   .sort({ yearsActive: -1 })
  //   .limit(1)
  //   .then(artists => artists[0].yearsActive);
  //
  // return Promise.all([minQuery, maxQuery])
  //   .then(result => {
  //     return {
  //       min: result[0],
  //       max: result[1]
  //     };
  //   });

  // Approach 2: aggregation
  return Artist.aggregate()
    .group({
      _id: null,
      min: { $min: '$yearsActive' },
      max: { $max: '$yearsActive' }
    })
    .project({ _id: 0, min: 1, max: 1 })
    .then(result => result[0]);
};
