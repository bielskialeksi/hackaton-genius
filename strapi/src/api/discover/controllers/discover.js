'use strict';

/**
 *  discover controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::discover.discover');
