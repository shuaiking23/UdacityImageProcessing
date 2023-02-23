import * as cfg from '../utilities/appConfigs';

const path = require('path');
const {
  resizeImage,
  fileExists,
  removeThumb,
} = require('../utilities/processImage');

describe('3. Functionality tests', () => {
  describe('3.1 fileExists', () => {
    it('3.1.1 Not found (images)', () => {
      const result = fileExists('name');
      expect(result).toBe(false);
    });

    it('3.1.2 Not found (thumbs)', () => {
      const result = fileExists('name', true);
      expect(result).toBe(false);
    });

    it('3.1.3 found (images)', () => {
      const result = fileExists('fjord');
      expect(result).toBe(true);
    });
  });

  describe('3.2 resizeImage', () => {
    const fileName = 'fjord';
    const height = 200;
    const width = 200;
    const thumbFileName = `${fileName}_thumb_${height.toString()}_${width.toString()}`;
    const outputImage = path.resolve(
      cfg.ASSET_PATH + cfg.THUMBS_URL_PART + thumbFileName + cfg.FILE_EXT
    );

    it('3.2.1 Test resize', async () => {
      const result = await resizeImage(fileName, height, width);
      expect(result).toEqual(outputImage);
      const result2 = fileExists(thumbFileName, true);
      expect(result2).toBe(true);
    });
    it('3.2.2 Remove Thumb after test resize', async () => {
      removeThumb(thumbFileName);
      const result = fileExists(thumbFileName, true);
      expect(result).toBe(false);
    });
  });
});
