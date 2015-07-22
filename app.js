import async from 'async';
import uploadcare from 'uploadcare';
import photos from './data/photos.json';
import { $C } from 'collection.js';

const upload = uploadcare('demopublickey', 'demoprivatekey');

let
  step = 0,
  chunk,
  totalFailed = 0;

const stepLength = 100;

console.log('Start uploading');

async.whilst(
  () => !chunk || !!chunk.length,

  (next) => {
    chunk =
      photos.slice(
        step * stepLength,
        (step + 1) * stepLength
      );

    if (!chunk.length) {
      return next()
    }

    console.log(`Start step ${step}`);

    let failed = 0;

    const tasks = $C(chunk).map((el) => (callback) => {
      upload.file.fromUrl(el, (err) => {
        if (err) {
          console.log('Upload error:', err);
          ++failed;
        }

        callback();
      })
    });

    async.parallel(tasks, (err) => {
      if (err) {
        throw err;
      }

      console.log(`Step ${step} ends, failed: ${failed}`);

      totalFailed += failed;
      ++step;

      next();
    })
  },

  () => {
    console.log(`Total failed: ${totalFailed}`);
  }
);