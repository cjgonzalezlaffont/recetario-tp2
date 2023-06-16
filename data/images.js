const express = require('express');
require('dotenv').config();
const app = express();
const KEY_PEXEL = process.env.KEY;
const ID = process.env.IDBUSCADOR;


async function getImages() {
    const query = 'tomatoe';
    const url = `https://api.pexels.com/v1/search?query=${query}`;
    const headers = {
      'Authorization': KEY_PEXEL,
      'Cookie': '__cf_bm=pPCVYGupCRNax1qmHoI4Ag.BPc1Tb94mDWw_2bikhVY-1686878180-0-ATzTye0Y16iLQkbef51WjPEKzjl+8RAt8mZGrL06w347Jw9rNa20QOTI8CgsTfTVLJscWnAVCAtsmIcSKlX+10o='
      };
    
        fetch(url, { headers })
          .then(response => response.json())
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
    
      }