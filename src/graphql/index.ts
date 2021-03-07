import { createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';

const cache = cacheExchange({
  resolvers: {
    Query: {
      launchesPast: simplePagination({
        offsetArgument: 'offset',
        limitArgument: 'limit',
        mergeMode: 'after'
      })
    }
  }
});

export const client = createClient({
  url: 'https://api.spacex.land/graphql',
  exchanges: [ dedupExchange, cache, fetchExchange ]
});