import { backendUrl } from '@/config/config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type BuchArt = 'DRUCKAUSGABE' | 'KINDLE';

export type Buch = {
    id: number;
    version: number;
    isbn: string;
    rating: number;
    art: BuchArt;
    preis: number;
    rabatt: string;
    lieferbar: boolean;
    datum: Date;
    homepage: string;
    schlagwoerter: string[];
    titel: string;
    untertitel?: string;
};

export type BuchResponse = Omit<Buch, 'datum' | 'titel'> & {
    datum: string;
    titel: {
        titel: string;
    };
};

export type BuchInputModell = Omit<BuchResponse, 'id' | 'version' | 'datum'> & {
    datum: Date;
};

export type BuchUpdateModell = Omit<
    BuchResponse,
    'titel' | 'datum' | 'untertitel'
> & {
    datum: Date;
};

export type BuchListResponse = {
    data: {
        buecher: BuchResponse[];
    };
};
export type BuchItemResponse = {
    data: {
        buch: BuchResponse;
    };
};

export type CreateBuchResponse = {
    id: number;
};

export type UpdateBuchResponse = {
    version: number;
};

export const getAlleBuecherApi = async (
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<BuchListResponse>> => {
    const body = JSON.stringify({
        query: `query {
  buecher {
    id
    isbn
    rating
    art
    preis
    rabatt(short: true)
    lieferbar
    datum
    homepage
    schlagwoerter
    titel {
      titel
      untertitel
    }
  }
}`,
    });
    const requestConfig = { ...baseRequestConfig, url: backendUrl, data: body };
    return await axios.request(requestConfig);
};

export const getBuchByIdApi = async (
    id: number,
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<BuchItemResponse>> => {
    const body = JSON.stringify({
        query: `query($id: ID!) {
  buch(id: $id) {
    id
    isbn
    rating
    art
    preis
    rabatt(short: true)
    lieferbar
    datum
    homepage
    schlagwoerter
    titel {
      titel
      untertitel
    }
  }
}`,
        variables: { id },
    });
    const requestConfig = { ...baseRequestConfig, url: backendUrl, data: body };
    return await axios.request(requestConfig);
};

export const createBuchApi = async (
    buchInputModell: BuchInputModell,
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<CreateBuchResponse>> => {
    const body = JSON.stringify({
        query: `mutation {
  create(
    input: {
      isbn: "${buchInputModell.isbn}",
      rating: ${buchInputModell.rating},
      art: ${buchInputModell.art},
      preis: ${buchInputModell.preis},
      rabatt: ${buchInputModell.rabatt},
      lieferbar: ${buchInputModell.lieferbar},
      datum: "${buchInputModell.datum.toISOString()}",
      homepage: "${buchInputModell.homepage}",
      schlagwoerter: [${formatKeywordsForRequest(
          buchInputModell.schlagwoerter,
      )}],
      titel: {
        titel: "${buchInputModell.titel.titel}",
        untertitel: "${
            buchInputModell.untertitel ?? 'Untertitel Create Mutation'
        }"
      },
      abbildungen: [{
        beschriftung: "Abb. 1",
        contentType: "img/png"
      }]
    }
  ) {
      id
  }
}`,
    });
    const requestConfig = { ...baseRequestConfig, url: backendUrl, data: body };
    return await axios.request(requestConfig);
};

export const updateBuchApi = async (
    buchUpdateModell: BuchUpdateModell,
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<UpdateBuchResponse>> => {
    const body = JSON.stringify({
        query: `mutation {
  update(
    input: {
      id: ${buchUpdateModell.id},
      version: ${buchUpdateModell.version},
      isbn: "${buchUpdateModell.isbn}",
      rating: ${buchUpdateModell.rating},
      art: ${buchUpdateModell.art},
      preis: ${buchUpdateModell.preis},
      rabatt: ${buchUpdateModell.rabatt},
      lieferbar: ${buchUpdateModell.lieferbar},
      datum: "${buchUpdateModell.datum.toISOString()}",
      homepage: "${buchUpdateModell.homepage}",
      schlagwoerter: [${formatKeywordsForRequest(
          buchUpdateModell.schlagwoerter,
      )}],
    }
  ) {
      version
  }
}`,
    });
    const requestConfig = { ...baseRequestConfig, url: backendUrl, data: body };
    return await axios.request(requestConfig);
};

export const deleteBuchApi = async (
    id: number,
    baseRequestConfig: AxiosRequestConfig<string>,
): Promise<AxiosResponse<void>> => {
    const body = JSON.stringify({
        query: `mutation {
        delete(id: "${id}")
        }`,
    });
    const requestConfig = { ...baseRequestConfig, url: backendUrl, data: body };
    return await axios.request(requestConfig);
};

const formatKeywordsForRequest = (keywords: string[]): string => {
    return keywords.map((s) => `"${s}"`).join(', ');
};
