'use strict';

/**
 * discover-article service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::discover-article.discover-article');
