// import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest'
import { act, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios'
import { getColumnsApi } from '../api/index'
import App from '../App';
import COLUMN_JSON from './column.json'



const URL = import.meta.env.VITE_DOMAIN_URL


let mock: MockAdapter;

beforeAll(() => {
  const axiosInstance = axios.create();
  mock = new MockAdapter(axiosInstance);

}) 

describe('App', () => {

  it('fetches columns successfully', async () => {
    mock.onGet(`${URL}/columns`).reply(200, {
      data: COLUMN_JSON,
    });

    const data = (await getColumnsApi()).data.columns;

    await waitFor(() => {
      expect(data).toEqual(COLUMN_JSON.columns);
    })
  })


  it('should display fetched data', async ({ expect }) => {

    await act( async () => {
      render(<App />)
    });

    mock.onGet(`${URL}/columns`).reply(200, {
        data: COLUMN_JSON,
    });
    const data = (await getColumnsApi()).data;

    await waitFor(() => {
      screen.getByText('Year')
      expect(data.columns.length).toEqual(6)
      screen.debug();
    })
  });

})

afterEach(() => {
  mock.restore();
});