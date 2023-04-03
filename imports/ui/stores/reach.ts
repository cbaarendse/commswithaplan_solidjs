// imports
import {writable, Writable, Readable, derived} from 'svelte/store';
import {Meteor} from 'meteor/meteor';
import createReachTool from '../functions/reach';
import {
  Strategy,
  SortedByName,
  Results,
  RespondentsCount,
  PopulationCountForStrategy,
  PopulationCount
} from '../../both/typings/types';
import {allMarkets} from '../../both/constants/constants';

// variables
const reachTool = createReachTool();

// strategy
export const userId: Writable<Strategy['userId']> = writable('user_01');
export const title: Writable<Strategy['title']> = writable('New strategy');
export const marketName: Writable<Strategy['marketName']> = writable('nl');
export const createdAt: Writable<Strategy['createdAt']> = writable();
export const lastChanged: Writable<Strategy['lastChanged']> = writable(new Date());
export const useMarketData: Writable<Strategy['useMarketData']> = writable(false);
export const ageGroupIndexStart: Writable<Strategy['ageGroupIndexStart']> = writable(0);
export const ageGroupIndexEnd: Writable<Strategy['ageGroupIndexEnd']> = writable(1);
export const genders: Writable<Strategy['genders']> = writable(['f', 'm', 'x']);
export const companyId: Writable<Strategy['companyId']> = writable('c');
export const brandName: Writable<Strategy['brandName']> = writable('b');
export const productName: Writable<Strategy['productName']> = writable('p');
export const deployment: Writable<Strategy['deployment']> = writable();
export const briefing: Readable<Omit<Strategy, 'deployment'>> = derived(
  [
    userId,
    title,
    marketName,
    createdAt,
    lastChanged,
    useMarketData,
    ageGroupIndexStart,
    ageGroupIndexEnd,
    genders,
    companyId,
    brandName,
    productName
  ],
  ([
    $userId,
    $title,
    $marketName,
    $createdAt,
    $lastChanged,
    $useMarketData,
    $ageGroupIndexStart,
    $ageGroupIndexEnd,
    $genders,
    $companyId,
    $brandName,
    $productName
  ]) => {
    return {
      userId: $userId,
      title: $title,
      marketName: $marketName,
      createdAt: $createdAt,
      lastChanged: $lastChanged,
      useMarketData: $useMarketData,
      ageGroupIndexStart: $ageGroupIndexStart,
      ageGroupIndexEnd: $ageGroupIndexEnd,
      genders: $genders,
      companyId: $companyId,
      brandName: $brandName,
      productName: $productName
    };
  }
);

export const marketData = derived(
  marketName,
  ($marketName, set) => {
    Meteor.callAsync('probabilities.checkForMarketData', {marketName: $marketName})
      .then((result) => {
        console.log('result check in derived marketData ', result);
        set(result);
      })
      .catch((error) => console.log('error in check for market - in stores', error));
  },
  false
);

export const ageGroups = derived(marketName, ($marketName) => {
  return reachTool.getAgeGroupsForMarket($marketName, allMarkets());
});

export const strategy = derived([briefing, deployment], ([$briefing, $deployment]) => {
  return {...$briefing, deployment: $deployment};
});

export const sortedByName: Writable<SortedByName> = writable(true, () => {
  () => {
    console.log('sortedByName closed');
  };
});
export const respondentsReady: Writable<boolean> = writable(false, () => {
  () => {
    console.log('respondentsReady closed');
  };
});
// results
export const respondentsCountForMarket: Readable<RespondentsCount> = derived(
  [marketName, marketData, useMarketData],
  ([$marketName, $marketData, $useMarketData], set) => {
    if ($marketName && $marketData && $useMarketData) {
      console.log('respondentsCountForMarket client, args sent: ', $marketName);

      Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: $marketName})
        .then((result: number) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in respondents for market', error));
    }
  }
);

export const populationCountForStrategy: Readable<PopulationCountForStrategy> = derived(
  [marketName, marketData, useMarketData, genders, ageGroupIndexStart, ageGroupIndexEnd, userId, ageGroups],
  (
    [$marketName, $marketData, $useMarketData, $genders, $ageGroupIndexStart, $ageGroupIndexEnd, $userId, $ageGroups],
    set
  ) => {
    if ($marketData && $useMarketData) {
      Meteor.callAsync('populations.countPopulationForStrategy', {
        userId: $userId,
        marketName: $marketName,
        marketData: $marketData,
        genders: $genders,
        ageGroupIndexStart: $ageGroupIndexStart,
        ageGroupIndexEnd: $ageGroupIndexEnd,
        ageGroups: $ageGroups
      })
        .then((result: PopulationCountForStrategy) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in populationCountForStrategy ', error));
    }
  }
);

export const population: Readable<number> = derived(
  [marketData, marketName, useMarketData],
  ([$marketData, $marketName, $useMarketData], set) => {
    if ($marketData && $useMarketData) {
      console.log('marketName, useMarketData', $marketName, ' and ', $useMarketData, 'in countPopulationForStrategy');

      Meteor.callAsync('populations.countPopulationForMarket', {
        marketName: $marketName
      })
        .then((result: PopulationCount) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in population ', error));
    }
  }
);

export const maxValues: Writable<Partial<{[key: string]: number}>> = writable({});

export const results: Writable<Results> = writable([0, 0]);

export const totalReach = derived(results, ($results) => {
  if (!$results) {
    return 0;
  }
  return $results[0];
});

export const overlap = derived(results, ($results) => {
  if (!$results) {
    return 0;
  }
  return $results[1];
});
