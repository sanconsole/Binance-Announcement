import axios from 'axios';
import binanceAnnouncementModel from '../models/Binance-Announcement';
import { slugifyWithoutRandomText } from './common';
import { postToTelegram } from '../Helper/common';

interface BinanceArticle {
  id: number;
  title: string;
  releaseDate: number;
  catalogId: number;
  catalogName: string;
  articleUrl: string;
}

interface BinanceResponse {
  code: string;
  message: string | null;
  messageDetail: string | null;
  data: {
    catalogs: any[];
    articles: BinanceArticle[];
    total: number;
  };
  success: boolean;
}

const fetchBinanceAnnouncements = async (): Promise<BinanceArticle[]> => {
  try {
    const response = await axios.get<BinanceResponse>(
      'https://www.binance.com/bapi/apex/v1/public/apex/cms/article/list/query',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Referer': 'https://www.binance.com/',
          'Origin': 'https://www.binance.com',
          'Connection': 'keep-alive',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin'
        },
        params: {
          type: 1,
          pageNo: 1,
          pageSize: 10,
          catalogId: 48
        },
        timeout: 10000
      }
    );

    if (!response.data.success) {
      throw new Error('Failed to fetch Binance announcements');
    }
    const articles = response.data.data.catalogs[0].articles;
    for (const article of articles) {
      const existingArticle = await binanceAnnouncementModel.findOne({ id: article.id, code: `${article.code}`, title: article.title });
      if (existingArticle) {
        continue;
      }
      const data: any = {
        title: article.title,
        code: article.code,
        id: article.id,
        releaseDate: article.releaseDate,
        slug: slugifyWithoutRandomText(article.title),
        articleUrl: `https://www.binance.com/en/support/announcement/${slugifyWithoutRandomText(article.title)}-${article.code}`,
      }
      await binanceAnnouncementModel.create(data);
      if (!data.title.includes("Will List")) {
        continue;
      }
      postToTelegram(data);
    }
    return articles;
  } catch (error) {
    console.error('Error fetching Binance announcements:', error);
    throw error;
  }
};

export { fetchBinanceAnnouncements, BinanceArticle };
