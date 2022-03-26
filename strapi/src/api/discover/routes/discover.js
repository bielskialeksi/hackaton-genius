'use strict';

/**
 * discover router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::discover.discover');
