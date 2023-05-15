// imports
import {writable, Writable, Readable, derived} from 'svelte/store';
import {Meteor} from 'meteor/meteor';
import createReachTool from '../functions/reach';
import {Strategy, SortedByName, Results, MaxValue} from '../../both/typings/types';
import {allMarkets} from '../../both/constants/constants';
import {TouchPointName} from '../../both/typings/types';

// variables
const reachTool = createReachTool();

// strategy
export const userId: Writable<Strategy['userId']> = writable('user_01');
export const title: Writable<Strategy['title']> = writable('New strategy');
export const marketName: Writable<Strategy['marketName']> = writable('nl');
export const createdAt: Writable<Strategy['createdAt']> = writable();
export const lastChanged: Writable<Strategy['lastChanged']> = writable(new Date());
export const useForResults: Writable<Strategy['useForResults']> = writable('formula');
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
    useForResults,
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
    $useForResults,
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
      useForResults: $useForResults,
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
export const respondentsCountForMarket: Readable<number> = derived(
  [marketName, marketData, useForResults],
  ([$marketName, $marketData, $useForResults], set) => {
    if ($marketName && $marketData && $useForResults == 'data') {
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

export const respondentsCountForStrategy: Writable<number> = writable();

export const populationCountForStrategy: Writable<number> = writable();

export const population: Readable<number> = derived(
  [marketData, marketName, useForResults],
  ([$marketData, $marketName, $useForResults], set) => {
    if ($marketData && $useForResults == 'data') {
      console.log('marketName, useForResults', $marketName, ' and ', $useForResults, 'in countPopulationForStrategy');

      Meteor.callAsync('populations.countPopulationForMarket', {
        marketName: $marketName
      })
        .then((result: number) => {
          if (result >= 0) {
            set(result);
          }
        })
        .catch((error) => console.log('error in population ', error));
    }
  }
);

export const maxValues: Writable<MaxValue[]> = writable();
export const averageProbabilities: Writable<
  {touchPoint?: TouchPointName | undefined; probability?: number | undefined}[]
> = writable();
export const respondentsNotReached: Writable<
  {touchPoint?: TouchPointName | undefined; respondents?: number | undefined}[]
> = writable();

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
