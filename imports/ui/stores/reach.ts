// imports
import {createSignal, createMemo, createEffect, Accessor} from 'solid-js';
import {Meteor} from 'meteor/meteor';
import createReachTool from '../functions/reach';
import {Strategy, SortedByName, Results} from '../../both/typings/types';
import {allMarkets} from '../../both/constants/constants';

// variables
const reachTool = createReachTool();

// Helper function to create a writable signal with .set method
function createWritableSignal<T>(initialValue: T) {
  const [get, set] = createSignal<T>(initialValue);
  (get as any).set = set;
  return get as Accessor<T> & {set: (value: T) => void};
}

// strategy
export const userId = createWritableSignal<Strategy['userId']>('user_01');
export const title = createWritableSignal<Strategy['title']>('New strategy');
export const marketName = createWritableSignal<Strategy['marketName']>('nl');
export const createdAt = createWritableSignal<Strategy['createdAt']>(new Date());
export const lastChanged = createWritableSignal<Strategy['lastChanged']>(new Date());
export const useForResults = createWritableSignal<Strategy['useForResults']>('formula');
export const ageGroupIndexStart = createWritableSignal<Strategy['ageGroupIndexStart']>(0);
export const ageGroupIndexEnd = createWritableSignal<Strategy['ageGroupIndexEnd']>(1);
export const genders = createWritableSignal<Strategy['genders']>(['f', 'm', 'x']);
export const companyId = createWritableSignal<Strategy['companyId']>('c');
export const brandName = createWritableSignal<Strategy['brandName']>('b');
export const productName = createWritableSignal<Strategy['productName']>('p');
export const deployment = createWritableSignal<Strategy['deployment']>([]);

export const briefing = createMemo(() => ({
  userId: userId(),
  title: title(),
  marketName: marketName(),
  createdAt: createdAt(),
  lastChanged: lastChanged(),
  useForResults: useForResults(),
  ageGroupIndexStart: ageGroupIndexStart(),
  ageGroupIndexEnd: ageGroupIndexEnd(),
  genders: genders(),
  companyId: companyId(),
  brandName: brandName(),
  productName: productName()
}));

// Create async memo for marketData
const [getMarketData, setMarketData] = createSignal<boolean>(false);
export const marketData = getMarketData;

// Watch marketName changes and update marketData
let lastMarketName: string | undefined;
const updateMarketData = () => {
  const currentMarketName = marketName();
  if (currentMarketName !== lastMarketName) {
    lastMarketName = currentMarketName;
    Meteor.callAsync('probabilities.checkForMarketData', {marketName: currentMarketName})
      .then((result) => {
        console.log('result check in marketData ', result);
        setMarketData(result);
      })
      .catch((error) => console.log('error in check for market - in stores', error));
  }
};

export const ageGroups = createMemo(() => {
  return reachTool.getAgeGroupsForMarket(marketName(), allMarkets());
});

export const strategy = createMemo(() => ({
  ...briefing(),
  deployment: deployment()
}));

export const sortedByName = createWritableSignal<SortedByName>(true);

// Async derived stores for respondents and population counts
const [getRespondentsCountForStrategy, setRespondentsCountForStrategy] = createSignal<number>(0);
export const respondentsCountForStrategy = getRespondentsCountForStrategy;

const [getRespondentsCountForMarket, setRespondentsCountForMarket] = createSignal<number>(0);
export const respondentsCountForMarket = getRespondentsCountForMarket;

const [getPopulationCountForMarket, setPopulationCountForMarket] = createSignal<number>(0);
export const populationCountForMarket = getPopulationCountForMarket;

const [getPopulationCountForStrategy, setPopulationCountForStrategy] = createSignal<number>(0);
export const populationCountForStrategy = getPopulationCountForStrategy;

// Watch dependencies and update respondentsCountForStrategy
let lastRespondentsParams: string = '';
const updateRespondentsCountForStrategy = () => {
  if (marketData() && useForResults() === 'data') {
    const params = JSON.stringify({
      userId: userId(),
      marketName: marketName(),
      genders: genders(),
      ageGroupIndexStart: ageGroupIndexStart(),
      ageGroupIndexEnd: ageGroupIndexEnd(),
      deployment: deployment(),
      ageGroups: ageGroups()
    });

    if (params !== lastRespondentsParams) {
      lastRespondentsParams = params;
      console.log(
        'marketName, useForResults',
        marketName(),
        ' and ',
        useForResults(),
        'in countRespondentsForStrategy'
      );

      Meteor.callAsync('strategies.prepareRespondents', {
        userId: userId(),
        marketName: marketName(),
        genders: genders(),
        ageGroupIndexStart: ageGroupIndexStart(),
        ageGroupIndexEnd: ageGroupIndexEnd(),
        deployment: deployment(),
        ageGroups: ageGroups()
      })
        .then((result: number) => {
          if (result >= 0) {
            setRespondentsCountForStrategy(result);
          }
        })
        .catch((error) => console.log('error in respondentsCountForStrategy in async prepare respondents: ', error));
    }
  }
};

export const respondentsReady = createMemo(() => {
  return marketData() && useForResults() === 'data' && respondentsCountForStrategy() > 0;
});

// Watch dependencies and update respondentsCountForMarket
let lastMarketForRespondents: string = '';
const updateRespondentsCountForMarket = () => {
  const currentMarket = marketName();
  if (currentMarket && marketData() && useForResults() === 'data' && currentMarket !== lastMarketForRespondents) {
    lastMarketForRespondents = currentMarket;
    console.log('respondentsCountForMarket client, args sent: ', currentMarket);

    Meteor.callAsync('probabilities.countRespondentsForMarket', {marketName: currentMarket})
      .then((result: number) => {
        if (result >= 0) {
          setRespondentsCountForMarket(result);
        }
      })
      .catch((error) => console.log('error in respondents for market', error));
  }
};

// Watch dependencies and update populationCountForMarket
let lastMarketForPopulation: string = '';
const updatePopulationCountForMarket = () => {
  const currentMarket = marketName();
  if (marketData() && useForResults() === 'data' && currentMarket !== lastMarketForPopulation) {
    lastMarketForPopulation = currentMarket;
    console.log('marketName, useForResults', currentMarket, ' and ', useForResults(), 'in countPopulationForStrategy');

    Meteor.callAsync('populations.countPopulationForMarket', {marketName: currentMarket})
      .then((result: number) => {
        if (result >= 0) {
          setPopulationCountForMarket(result);
        }
      })
      .catch((error) => console.log('error in population ', error));
  }
};

// Watch dependencies and update populationCountForStrategy
let lastPopulationParams: string = '';
const updatePopulationCountForStrategy = () => {
  if (marketData() && useForResults() === 'data') {
    const params = JSON.stringify({
      userId: userId(),
      marketName: marketName(),
      genders: genders(),
      ageGroupIndexStart: ageGroupIndexStart(),
      ageGroupIndexEnd: ageGroupIndexEnd(),
      ageGroups: ageGroups()
    });

    if (params !== lastPopulationParams) {
      lastPopulationParams = params;
      console.log('marketName, useForResults', marketName(), ' and ', useForResults(), 'in countPopulationForStrategy');

      Meteor.callAsync('populations.countPopulationForStrategy', {
        userId: userId(),
        marketName: marketName(),
        genders: genders(),
        ageGroupIndexStart: ageGroupIndexStart(),
        ageGroupIndexEnd: ageGroupIndexEnd(),
        ageGroups: ageGroups()
      })
        .then((result: number) => {
          if (result >= 0) {
            setPopulationCountForStrategy(result);
          }
        })
        .catch((error) => console.log('error in populationsCountForStrategy in async prepare respondents: ', error));
    }
  }
};

export const results = createWritableSignal<Results>([0, 0]);

export const totalReach = createMemo(() => {
  const res = results();
  if (!res) return 0;
  return res[0];
});

export const overlap = createMemo(() => {
  const res = results();
  if (!res) return 0;
  return res[1];
});

// Set up reactive effects to trigger async updates when dependencies change
createEffect(() => {
  updateMarketData();
});

createEffect(() => {
  updateRespondentsCountForStrategy();
});

createEffect(() => {
  updateRespondentsCountForMarket();
});

createEffect(() => {
  updatePopulationCountForMarket();
});

createEffect(() => {
  updatePopulationCountForStrategy();
});
