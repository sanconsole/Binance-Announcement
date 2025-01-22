


const { ENVIRONMENT_IS_PRODUCTION } = process.env as any;
export const cronInit = () => {
  //COMMENT:Test
  if (ENVIRONMENT_IS_PRODUCTION == "false") {
    // InvestingEconomicCalenderFetcherCronJob.start(); //Ryan
    // InvestingEarningCalenderFetcherCronJob.start(); // Ryan
    // ReutersTokenCronJob.start();
    // PiQAuthTokenFetcherCronJob.start();
  }

  if (ENVIRONMENT_IS_PRODUCTION == "true") {
    // reutersFeedFetcher.start();
    // ReutersTokenCronJob.start();
    // PiQAuthTokenFetcherCronJob.start();
  }
};
